import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { DayOfWeek, UserWorkout, WorkoutExercise, Exercise, MuscleGroup } from '../types';
import { DAYS } from '../constants';

/**
 * Hook customizado para gerenciar a lógica de treinos da aplicação.
 * Responsável por:
 * 1. Buscar treinos do Supabase ou LocalStorage (Cache)
 * 2. Gerenciar operações CRUD (Adicionar, Remover, Editar, Reordenar)
 * 3. Sincronizar dados entre o estado local e o backend
 */
export function useWorkouts(user: User | null) {
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState<UserWorkout>(() => {
    const defaultWorkouts = DAYS.reduce((acc, day) => ({ ...acc, [day]: [] }), {});
    return defaultWorkouts as UserWorkout;
  });

  // Busca inicial e gerenciamento de cache
  useEffect(() => {
    let isMounted = true;
    async function fetchWorkouts() {
      if (!user) {
        // Se deslogado, busca do LocalStorage para manter funcionalidade offline/guest
        const saved = localStorage.getItem('meu_treino_pro_data');
        if (saved && isMounted) {
          try {
            setWorkouts(JSON.parse(saved));
          } catch (e) {
            console.error('Erro ao ler treinos locais:', e);
          }
        }
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('workouts')
        .select('workout_id, day, exercise_id, name, muscle_group, image_url, series, reps, notes, is_time_based, order_index')
        .eq('user_id', user.id)
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Erro ao buscar treinos:', error);
        setLoading(false);
        return;
      }

      if (isMounted) {
        const transformed: UserWorkout = DAYS.reduce((acc, day) => ({ ...acc, [day]: [] }), {} as UserWorkout);
        data?.forEach((item: any) => {
          const exercise: WorkoutExercise = {
            id: item.exercise_id,
            workoutId: item.workout_id,
            name: item.name,
            muscleGroup: item.muscle_group as MuscleGroup,
            imageUrl: item.image_url,
            series: item.series,
            reps: item.reps,
            notes: item.notes,
            isTimeBased: item.is_time_based
          };
          transformed[item.day as DayOfWeek].push(exercise);
        });

        setWorkouts(transformed);
        setLoading(false);
      }
    }

    fetchWorkouts();
    return () => { isMounted = false; };
  }, [user]);

  // Sincronização automática para o cache local
  useEffect(() => {
    if (!loading && workouts) {
      localStorage.setItem('meu_treino_pro_data', JSON.stringify(workouts));
    }
  }, [workouts, loading]);

  // Adiciona um novo exercício ao dia ativo
  const addExercise = async (day: DayOfWeek, exercise: Exercise) => {
    const dayExercises = workouts[day] || [];
    const isFirst = dayExercises.length === 0;

    const newWorkoutEx: WorkoutExercise = {
      ...exercise,
      workoutId: `${Date.now()}-${Math.random()}`,
      series: isFirst ? '4' : '3',
      reps: '12',
      notes: isFirst ? "A primeira série é de aquecimento, então faça com o peso mais leve e na série seguinte o peso mais pesado." : ''
    };

    setWorkouts(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), newWorkoutEx]
    }));
    
    if (user) {
      await supabase.from('workouts').insert({
        user_id: user.id,
        workout_id: newWorkoutEx.workoutId,
        day: day,
        exercise_id: exercise.id,
        name: exercise.name,
        muscle_group: exercise.muscleGroup,
        image_url: exercise.imageUrl,
        series: newWorkoutEx.series,
        reps: newWorkoutEx.reps,
        notes: newWorkoutEx.notes,
        is_time_based: exercise.isTimeBased,
        order_index: dayExercises.length
      });
    }
  };

  // Remove um exercício
  const removeExercise = async (day: DayOfWeek, workoutId: string) => {
    setWorkouts(prev => ({
      ...prev,
      [day]: prev[day].filter(ex => ex.workoutId !== workoutId)
    }));

    if (user) {
      await supabase.from('workouts').delete().eq('workout_id', workoutId);
    }
  };

  // Atualiza detalhes de um exercício existente
  const updateExercise = async (day: DayOfWeek, workoutId: string, updates: Partial<WorkoutExercise>) => {
    setWorkouts(prev => ({
      ...prev,
      [day]: prev[day].map(ex => 
        ex.workoutId === workoutId ? { ...ex, ...updates } : ex
      )
    }));

    if (user) {
      const dbUpdates: any = {};
      if (updates.series) dbUpdates.series = updates.series;
      if (updates.reps) dbUpdates.reps = updates.reps;
      if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
      
      await supabase.from('workouts').update(dbUpdates).eq('workout_id', workoutId);
    }
  };

  // Reordena exercícios (Sobe ou Desce na lista)
  const reorderExercise = async (day: DayOfWeek, index: number, direction: 'up' | 'down') => {
    const dayExercises = [...(workouts[day] || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= dayExercises.length) return;
    
    [dayExercises[index], dayExercises[targetIndex]] = [dayExercises[targetIndex], dayExercises[index]];
    
    setWorkouts(prev => ({
      ...prev,
      [day]: dayExercises
    }));

    if (user) {
      const updates = [
        { workout_id: dayExercises[targetIndex].workoutId, order_index: targetIndex, user_id: user.id },
        { workout_id: dayExercises[index].workoutId, order_index: index, user_id: user.id }
      ];
      await supabase.from('workouts').upsert(updates, { onConflict: 'workout_id' });
    }
  };

  return {
    workouts,
    loading,
    addExercise,
    removeExercise,
    updateExercise,
    reorderExercise,
    setWorkouts
  };
}
