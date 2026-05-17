import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash, 
  Pencil,
  Barbell, 
  Moon,
  Sun,
  SquaresFour,
  CaretUp,
  CaretDown
} from '@phosphor-icons/react';

// Tipagens e Constantes
import { EXERCISE_LIBRARY, DAYS } from './constants';
import { DayOfWeek, UserWorkout, WorkoutExercise, Exercise, MuscleGroup } from './types';

// Serviços e Hooks
import { supabase } from './lib/supabase';
import { User } from '@supabase/supabase-js';
import { useWorkouts } from './hooks/useWorkouts';

/**
 * Lazy loading de componentes para otimizar o carregamento inicial (Code Splitting).
 * Isso reduz o tamanho do bundle principal, carregando modais apenas quando necessário.
 */
const LibraryModal = lazy(() => import('./components/modals/LibraryModal'));
const EditModal = lazy(() => import('./components/modals/EditModal'));
const DeleteModal = lazy(() => import('./components/modals/DeleteModal'));

/**
 * Componente Principal da Aplicação.
 * Coordena o estado global, autenticação mínima e renderização da UI baseada no dia da semana.
 */
export default function App() {
  // --- Estado de Autenticação e Tema ---
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('meu_treino_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  // --- Lógica de Treinos via Hook Customizado ---
  const { 
    workouts, 
    loading: workoutsLoading, 
    addExercise, 
    removeExercise, 
    updateExercise, 
    reorderExercise,
    setWorkouts 
  } = useWorkouts(user);

  // --- Estado da Interface ---
  const [activeDay, setActiveDay] = useState<DayOfWeek>('Segunda');
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState<WorkoutExercise | null>(null);
  const [editedSeries, setEditedSeries] = useState('');
  const [editedReps, setEditedReps] = useState('');
  const [editedNotes, setEditedNotes] = useState('');
  const [exerciseToDelete, setExerciseToDelete] = useState<WorkoutExercise | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'Todos'>('Todos');
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  /**
   * Monitora a sessão de autenticação do Supabase.
   */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Gerencia a persistência e aplicação visual do tema (Light/Dark mode).
   */
  useEffect(() => {
    localStorage.setItem('meu_treino_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  /**
   * Filtra a biblioteca de exercícios com base na busca e grupo muscular.
   * Utiliza useMemo para evitar cálculos desnecessários em cada render.
   */
  const filteredLibrary = useMemo(() => {
    return EXERCISE_LIBRARY.filter(ex => {
      const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMuscle = selectedMuscle === 'Todos' || ex.muscleGroup === selectedMuscle;
      return matchesSearch && matchesMuscle;
    });
  }, [searchQuery, selectedMuscle]);

  const currentDayWorkouts = workouts[activeDay] || [];

  // --- Handlers de Ações ---
  const handleAddExercise = async (exercise: Exercise) => {
    await addExercise(activeDay, exercise);
    setLastAddedId(exercise.id);
  };

  const handleOpenEdit = (ex: WorkoutExercise) => {
    setExerciseToEdit(ex);
    setEditedSeries(ex.series);
    setEditedReps(ex.reps);
    setEditedNotes(ex.notes || '');
  };

  const handleSaveEdit = async () => {
    if (!exerciseToEdit) return;
    await updateExercise(activeDay, exerciseToEdit.workoutId, {
      series: editedSeries.trim() || exerciseToEdit.series,
      reps: editedReps.trim() || exerciseToEdit.reps,
      notes: editedNotes.trim()
    });
    setExerciseToEdit(null);
  };

  const handleRemoveExercise = async () => {
    if (!exerciseToDelete) return;
    await removeExercise(activeDay, exerciseToDelete.workoutId);
    setExerciseToDelete(null);
  };

  const loading = authLoading || workoutsLoading;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1A1A1A] text-white' : 'bg-[#FFFFFF] text-black'} font-sans selection:bg-brand/30 relative overflow-x-hidden`}>
      {/* Gradiente de fundo decorativo */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Cabeçalho Fixo */}
      <header className="sticky top-0 z-40 glass border-b border-black/5 dark:border-white/5 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand rounded-2xl flex items-center justify-center shadow-lg shadow-brand/20">
              <Barbell weight="fill" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tight uppercase">Meu Treino Pro</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {theme === 'light' ? <Moon weight="bold" className="w-6 h-6" /> : <Sun weight="bold" className="w-6 h-6" />}
            </button>
            
            <button 
              onClick={() => setIsLibraryOpen(true)}
              className="flex items-center gap-2 bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-brand/20"
            >
              <Plus weight="bold" className="w-5 h-5" />
              <span className="hidden sm:inline">Adicionar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navegação de Dias da Semana */}
      <nav className="max-w-4xl mx-auto px-4 py-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 min-w-max pb-2">
          {DAYS.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-3 rounded-2xl font-black transition-all ${
                activeDay === day 
                  ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-105' 
                  : 'bg-black/5 dark:bg-white/5 text-text-muted hover:bg-black/10 dark:hover:bg-white/10'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="max-w-4xl mx-auto px-6 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {currentDayWorkouts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-[40px] flex items-center justify-center">
                  <SquaresFour weight="duotone" className="w-10 h-10 text-text-muted opacity-20" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text-muted">Nenhum exercício para {activeDay}</h2>
                  <p className="text-text-muted opacity-60">Toque em "Adicionar" para começar seu treino.</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-6">
                {currentDayWorkouts.map((ex, index) => (
                  <motion.div
                    key={ex.workoutId}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`group relative ${theme === 'dark' ? 'bg-[#1A1A1A] border-white/5' : 'bg-[#FFFFFF] border-black/5'} border rounded-[40px] overflow-hidden flex flex-col sm:flex-row items-center p-4 gap-6 shadow-sm hover:shadow-xl transition-all duration-500`}
                  >
                    {/* Controles de Reordenamento */}
                    <div className="flex sm:flex-col gap-2 order-last sm:order-first">
                      <button 
                        onClick={() => reorderExercise(activeDay, index, 'up')}
                        disabled={index === 0}
                        className={`p-2 rounded-xl transition-all ${index === 0 ? 'opacity-20 cursor-not-allowed' : 'bg-black/5 dark:bg-white/5 hover:bg-brand/10 hover:text-brand active:scale-90'}`}
                      >
                        <CaretUp weight="bold" className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => reorderExercise(activeDay, index, 'down')}
                        disabled={index === currentDayWorkouts.length - 1}
                        className={`p-2 rounded-xl transition-all ${index === currentDayWorkouts.length - 1 ? 'opacity-20 cursor-not-allowed' : 'bg-black/5 dark:bg-white/5 hover:bg-brand/10 hover:text-brand active:scale-90'}`}
                      >
                        <CaretDown weight="bold" className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Imagem do Exercício */}
                    <div className="w-full sm:w-48 aspect-square flex-shrink-0 bg-white rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 p-2 shadow-inner">
                      <img 
                        src={ex.imageUrl} 
                        alt={ex.name}
                        className="w-full h-full object-contain mix-blend-multiply" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    {/* Informações e Detalhes */}
                    <div className="flex-grow min-w-0 w-full sm:w-auto flex flex-col">
                      <div className="mb-4">
                        <span className="text-[12px] font-black uppercase tracking-[0.2em] text-brand bg-brand/10 px-3 py-1 rounded-full mb-3 inline-block">
                          {ex.muscleGroup}
                        </span>
                        <h3 className="text-2xl sm:text-4xl font-black leading-[1.1] mb-2 group-hover:text-brand transition-colors uppercase">{ex.name}</h3>
                        {ex.notes && (
                          <div className="text-base font-bold text-text-secondary mt-2 bg-black/5 dark:bg-white/5 p-3 rounded-xl border border-black/5 dark:border-white/5">
                            <span className="text-[10px] uppercase font-black text-brand block mb-1">Obs:</span>
                            {ex.notes}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-6">
                          <div>
                            <p className="text-[10px] uppercase font-black text-text-muted mb-1 tracking-widest">Séries</p>
                            <p className="text-2xl font-black">{ex.series}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-black text-text-muted mb-1 tracking-widest">{ex.isTimeBased ? 'Tempo' : 'Reps'}</p>
                            <p className="text-2xl font-black">{ex.reps}</p>
                          </div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex gap-2 w-full sm:w-auto">
                          <button onClick={() => handleOpenEdit(ex)} className="flex-1 sm:flex-initial p-4 text-text-muted hover:text-brand bg-black/5 dark:bg-white/5 hover:bg-brand/10 rounded-2xl transition-all active:scale-90" title="Editar">
                            <Pencil weight="bold" className="w-6 h-6 mx-auto" />
                          </button>
                          <button onClick={() => setExerciseToDelete(ex)} className="flex-1 sm:flex-initial p-4 text-text-muted hover:text-red-500 bg-black/5 dark:bg-white/5 hover:bg-red-500/10 rounded-2xl transition-all active:scale-90" title="Excluir">
                            <Trash weight="bold" className="w-6 h-6 mx-auto" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modais Lazy Loaded */}
      <Suspense fallback={null}>
        <LibraryModal 
          isOpen={isLibraryOpen} 
          onClose={() => setIsLibraryOpen(false)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedMuscle={selectedMuscle}
          setSelectedMuscle={setSelectedMuscle}
          filteredLibrary={filteredLibrary}
          addExerciseToDay={handleAddExercise}
          lastAddedId={lastAddedId}
          theme={theme}
        />
        <EditModal 
          exercise={exerciseToEdit}
          onClose={() => setExerciseToEdit(null)}
          series={editedSeries}
          setSeries={setEditedSeries}
          reps={editedReps}
          setReps={setEditedReps}
          notes={editedNotes}
          setNotes={setEditedNotes}
          onSave={handleSaveEdit}
          theme={theme}
        />
        <DeleteModal 
          exercise={exerciseToDelete}
          onClose={() => setExerciseToDelete(null)}
          onConfirm={handleRemoveExercise}
          theme={theme}
        />
      </Suspense>
    </div>
  );
}
