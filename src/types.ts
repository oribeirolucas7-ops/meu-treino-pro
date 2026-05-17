/**
 * Definições de Tipos e Interfaces globais da aplicação.
 * Utilizado para garantir consistência de dados entre componentes, hooks e banco de dados.
 */
export type MuscleGroup = 'Peito' | 'Costas' | 'Pernas' | 'Ombros' | 'Bíceps' | 'Tríceps' | 'Abdominal' | 'Cardio';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  imageUrl: string;
  isTimeBased?: boolean;
}

export interface WorkoutExercise extends Exercise {
  workoutId: string;
  series: string;
  reps: string;
  notes?: string;
}

export type DayOfWeek = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado' | 'Domingo';

export interface UserWorkout {
  [key: string]: WorkoutExercise[];
}
