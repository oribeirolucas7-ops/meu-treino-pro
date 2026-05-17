/**
 * Biblioteca de Dados Estáticos da Aplicação.
 * Contém a lista completa de exercícios, dias da semana e grupos musculares suportados.
 */
import { Exercise, DayOfWeek, MuscleGroup } from './types';

export const EXERCISE_LIBRARY: Exercise[] = [
  // PEITO
  {
    id: 'chest-1',
    name: 'Supino Reto (Barra)',
    muscleGroup: 'Peito',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif'
  },
  {
    id: 'chest-2',
    name: 'Supino Inclinado (Barra)',
    muscleGroup: 'Peito',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Barbell-Bench-Press.gif'
  },
  {
    id: 'chest-3',
    name: 'Supino Reto com Halteres',
    muscleGroup: 'Peito',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif'
  },
  {
    id: 'chest-4',
    name: 'Supino Inclinado com Halteres',
    muscleGroup: 'Peito',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif'
  },
  {
    id: 'chest-5',
    name: 'Peck Deck (Voador)',
    muscleGroup: 'Peito',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif'
  },
  {
    id: 'chest-6',
    name: 'Crossover Polia Alta',
    muscleGroup: 'Peito',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif'
  },

  // COSTAS
  {
    id: 'back-1',
    name: 'Puxada Alta na Polia',
    muscleGroup: 'Costas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif'
  },
  {
    id: 'back-2',
    name: 'Remada Curvada (Barra)',
    muscleGroup: 'Costas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif'
  },
  {
    id: 'back-3',
    name: 'Remada Baixa (Triângulo)',
    muscleGroup: 'Costas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/close-grip-cable-row.gif'
  },
  {
    id: 'back-4',
    name: 'Pulldown (Corda)',
    muscleGroup: 'Costas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Rope-Straight-Arm-Pulldown.gif'
  },
  {
    id: 'back-5',
    name: 'Remada Unilateral (Serrote)',
    muscleGroup: 'Costas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif'
  },

  // PERNAS
  {
    id: 'legs-1',
    name: 'Agachamento Livre',
    muscleGroup: 'Pernas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif'
  },
  {
    id: 'legs-2',
    name: 'Leg Press 45°',
    muscleGroup: 'Pernas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif'
  },
  {
    id: 'legs-3',
    name: 'Cadeira Extensora',
    muscleGroup: 'Pernas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif'
  },
  {
    id: 'legs-4',
    name: 'Mesa Flexora',
    muscleGroup: 'Pernas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Curl.gif'
  },
  {
    id: 'legs-5',
    name: 'Agachamento Hack',
    muscleGroup: 'Pernas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Sled-Hack-Squat.gif'
  },
  {
    id: 'legs-6',
    name: 'Stiff',
    muscleGroup: 'Pernas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2022/01/Stiff-Leg-Deadlift.gif'
  },
  {
    id: 'legs-7',
    name: 'Agachamento Sumô',
    muscleGroup: 'Pernas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2023/01/Sumo-Plie-Dumbbell-Squat.gif'
  },
  {
    id: 'legs-8',
    name: 'Agachamento Búlgaro',
    muscleGroup: 'Pernas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Dumbbell-Bulgarian-Split-Squat.gif'
  },
  {
    id: 'legs-9',
    name: 'Cadeira Abdutora',
    muscleGroup: 'Pernas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/HiP-ABDUCTION-MACHINE.gif'
  },
  {
    id: 'legs-10',
    name: 'Cadeira Adutora',
    muscleGroup: 'Pernas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/HIP-ADDUCTION-MACHINE.gif'
  },
  {
    id: 'legs-11',
    name: 'Panturrilha em Pé',
    muscleGroup: 'Pernas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2022/04/Standing-Barbell-Calf-Raise.gif'
  },
  {
    id: 'legs-12',
    name: 'Panturrilha Sentado',
    muscleGroup: 'Pernas',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Seated-Calf-Raise.gif'
  },

  // OMBROS
  {
    id: 'shoulders-1',
    name: 'Desenvolvimento com Halteres',
    muscleGroup: 'Ombros',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif'
  },
  {
    id: 'shoulders-2',
    name: 'Elevação Lateral',
    muscleGroup: 'Ombros',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif'
  },
  {
    id: 'shoulders-3',
    name: 'Elevação Frontal',
    muscleGroup: 'Ombros',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/08/Two-Arm-Dumbbell-Front-Raise.gif'
  },
  {
    id: 'shoulders-4',
    name: 'Crucifixo Inverso',
    muscleGroup: 'Ombros',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Rear-Delt-Machine-Flys.gif'
  },

  // BÍCEPS
  {
    id: 'biceps-1',
    name: 'Rosca Direta (Barra)',
    muscleGroup: 'Bíceps',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif'
  },
  {
    id: 'biceps-2',
    name: 'Rosca Martelo',
    muscleGroup: 'Bíceps',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Seated-Hammer-Curl.gif'
  },
  {
    id: 'biceps-3',
    name: 'Rosca Scott',
    muscleGroup: 'Bíceps',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Z-Bar-Preacher-Curl.gif'
  },
  {
    id: 'biceps-4',
    name: 'Rosca Halteres Banco Inclinado',
    muscleGroup: 'Bíceps',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Incline-Dumbbell-Curl.gif'
  },

  // TRÍCEPS
  {
    id: 'triceps-1',
    name: 'Tríceps Pulley (Corda)',
    muscleGroup: 'Tríceps',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Rope-Pushdown.gif'
  },
  {
    id: 'triceps-2',
    name: 'Tríceps Testa',
    muscleGroup: 'Tríceps',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Skull-Crusher.gif'
  },
  {
    id: 'triceps-3',
    name: 'Tríceps Francês na Polia',
    muscleGroup: 'Tríceps',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Cable-Rope-Overhead-Triceps-Extension.gif'
  },

  // ABOMINAL
  {
    id: 'core-1',
    name: 'Prancha Abdominal',
    muscleGroup: 'Abdominal',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2023/07/High-Plank.gif',
    isTimeBased: true
  },
  {
    id: 'core-2',
    name: 'Abdominal Infra',
    muscleGroup: 'Abdominal',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lying-Leg-Raise.gif'
  },

  // CARDIO
  {
    id: 'cardio-1',
    name: 'Esteira (Corrida)',
    muscleGroup: 'Cardio',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Treadmill-.gif',
    isTimeBased: true
  },
  {
    id: 'cardio-2',
    name: 'Bicicleta Ergométrica',
    muscleGroup: 'Cardio',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Bike.gif',
    isTimeBased: true
  },
  {
    id: 'cardio-3',
    name: 'Elíptico',
    muscleGroup: 'Cardio',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/10/Elliptical-Machine.gif',
    isTimeBased: true
  },
];

export const DAYS: DayOfWeek[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export const MUSCLE_GROUPS: MuscleGroup[] = ['Peito', 'Costas', 'Pernas', 'Ombros', 'Bíceps', 'Tríceps', 'Abdominal', 'Cardio'];
