/**
 * Modal de Edição de Exercício.
 * Permite ajustar o volume do treino (séries, repetições/tempo) e adicionar observações personalizadas.
 */
import { motion } from 'motion/react';
import { WorkoutExercise } from '../../types';

interface EditModalProps {
  exercise: WorkoutExercise | null;
  onClose: () => void;
  series: string;
  setSeries: (s: string) => void;
  reps: string;
  setReps: (r: string) => void;
  notes: string;
  setNotes: (n: string) => void;
  onSave: () => void;
  theme: 'light' | 'dark';
}

export default function EditModal({
  exercise,
  onClose,
  series,
  setSeries,
  reps,
  setReps,
  notes,
  setNotes,
  onSave,
  theme
}: EditModalProps) {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className={`relative w-full max-w-sm ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-[#FFFFFF]'} rounded-[32px] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden p-8 space-y-6`}
      >
        <div className="text-center space-y-2">
          <h3 className="text-xl font-black uppercase italic tracking-tight text-text-main">Editar <span className="text-brand">Volume</span></h3>
          <p className="text-text-secondary text-sm font-medium">{exercise.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-text-secondary px-1">
              {exercise.isTimeBased ? 'Tempo' : 'Séries'}
            </label>
            <input 
              type="text" 
              value={series}
              onChange={(e) => setSeries(e.target.value)}
              className={`w-full ${theme === 'dark' ? 'bg-white/5 text-text-main' : 'bg-zinc-100 text-text-main'} border-none rounded-2xl py-4 px-4 focus:ring-2 focus:ring-brand/20 focus:outline-none transition-all font-black text-center text-xl`}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-text-secondary px-1">
              {exercise.isTimeBased ? 'Minutos' : 'Repetições'}
            </label>
            <input 
              type="text" 
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className={`w-full ${theme === 'dark' ? 'bg-white/5 text-text-main' : 'bg-zinc-100 text-text-main'} border-none rounded-2xl py-4 px-4 focus:ring-2 focus:ring-brand/20 focus:outline-none transition-all font-black text-center text-xl`}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-text-secondary px-1">Observações</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ex: Pegada aberta, foco na descida..."
            className={`w-full ${theme === 'dark' ? 'bg-white/5 text-text-main' : 'bg-zinc-100 text-text-main'} border-none rounded-2xl py-4 px-4 focus:ring-2 focus:ring-brand/20 focus:outline-none transition-all font-medium text-sm min-h-[100px] resize-none`}
          />
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className={`flex-1 py-4 font-bold ${theme === 'dark' ? 'bg-white/5 text-text-main' : 'bg-zinc-100 text-text-secondary'} rounded-2xl transition-all`}
          >
            Voltar
          </button>
          <button 
            onClick={onSave}
            className="flex-1 py-4 font-black bg-brand text-white rounded-2xl shadow-lg shadow-brand/20 active:scale-95 transition-all"
          >
            Salvar
          </button>
        </div>
      </motion.div>
    </div>
  );
}