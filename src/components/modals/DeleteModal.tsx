/**
 * Modal de Confirmação de Exclusão.
 * Previne a remoção acidental de exercícios do fluxo de treino do usuário.
 */
import { motion } from 'motion/react';
import { Trash } from '@phosphor-icons/react';
import { WorkoutExercise } from '../../types';

interface DeleteModalProps {
  exercise: WorkoutExercise | null;
  onClose: () => void;
  onConfirm: () => void;
  theme: 'light' | 'dark';
}

export default function DeleteModal({
  exercise,
  onClose,
  onConfirm,
  theme
}: DeleteModalProps) {
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
        className={`relative w-full max-w-sm ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-[#FFFFFF]'} rounded-[32px] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden p-8 text-center space-y-6`}
      >
        <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mx-auto text-brand">
          <Trash weight="bold" className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-black uppercase italic tracking-tight text-text-main">Remover <span className="text-brand">Exercício?</span></h3>
          <p className="text-text-secondary text-sm font-medium">Você está prestes a remover <span className="font-bold text-text-main">{exercise.name}</span> do seu treino.</p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className={`flex-1 py-4 font-bold ${theme === 'dark' ? 'bg-white/5 text-text-main' : 'bg-zinc-100 text-text-secondary'} rounded-2xl transition-all`}
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-4 font-black bg-brand text-white rounded-2xl shadow-lg shadow-brand/20 active:scale-95 transition-all"
          >
            Confirmar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
