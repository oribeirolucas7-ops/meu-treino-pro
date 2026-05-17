/**
 * Modal da Biblioteca de Exercícios.
 * Permite ao usuário buscar e selecionar exercícios para adicionar ao treino do dia selecionado.
 */
import { motion } from 'motion/react';
import { X, MagnifyingGlass, CaretRight, Barbell } from '@phosphor-icons/react';
import { MuscleGroup, Exercise } from '../../types';
import { MUSCLE_GROUPS } from '../../constants';

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedMuscle: MuscleGroup | 'Todos';
  setSelectedMuscle: (m: MuscleGroup | 'Todos') => void;
  filteredLibrary: Exercise[];
  addExerciseToDay: (ex: Exercise) => void;
  lastAddedId: string | null;
  theme: 'light' | 'dark';
}

export default function LibraryModal({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  selectedMuscle,
  setSelectedMuscle,
  filteredLibrary,
  addExerciseToDay,
  lastAddedId,
  theme
}: LibraryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className={`relative w-full max-w-2xl ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-[#FFFFFF]'} rounded-t-[40px] sm:rounded-[40px] border-t sm:border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col`}
      >
        <div className="p-8 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-text-main">Biblioteca</h2>
            <p className="text-text-secondary text-base font-medium">Toque para adicionar ao seu dia</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-black/5 dark:bg-white/5 rounded-full transition-colors"
          >
            <X weight="bold" className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 pt-0 space-y-4">
          <div className="relative">
            <MagnifyingGlass weight="bold" className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input 
              type="text" 
              placeholder="Qual exercício você busca?" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full ${theme === 'dark' ? 'bg-white/5' : 'bg-zinc-100'} border-0 rounded-3xl py-4.5 pl-14 pr-6 focus:ring-2 focus:ring-brand/20 focus:outline-none transition-all font-medium text-text-main`}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            <button
              onClick={() => setSelectedMuscle('Todos')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedMuscle === 'Todos' 
                ? 'bg-brand text-white shadow-lg shadow-brand/20' 
                : 'bg-zinc-100 dark:bg-white/5 text-text-secondary hover:bg-zinc-200 dark:hover:bg-white/10'
              }`}
            >
              Todos
            </button>
            {MUSCLE_GROUPS.map(muscle => (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedMuscle === muscle 
                  ? 'bg-brand text-white shadow-lg shadow-brand/20' 
                  : 'bg-zinc-100 dark:bg-white/5 text-text-secondary hover:bg-zinc-200 dark:hover:bg-white/10'
                }`}
              >
                {muscle}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-grow overflow-y-auto px-8 pb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 scrollbar-hide">
          {filteredLibrary.map((ex, index) => (
            <motion.button
              key={ex.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              onClick={() => addExerciseToDay(ex)}
              className={`flex items-center gap-4 p-3 ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-zinc-50 hover:bg-zinc-100'} rounded-3xl transition-all active:scale-[0.97] text-left group`}
            >
              <div className="w-16 h-16 flex-shrink-0 bg-white rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 p-1">
                <img 
                  src={ex.imageUrl} 
                  alt={ex.name} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200&h=200';
                  }}
                />
              </div>
              <div className="flex-grow min-w-0">
                <span className="text-[12px] font-black uppercase text-brand tracking-wider">
                  {ex.muscleGroup}
                </span>
                <h4 className="font-bold text-lg leading-tight">{ex.name}</h4>
              </div>
              {lastAddedId === ex.id ? (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-0.5 text-green-500"
                >
                  <Barbell weight="fill" className="w-6 h-6" />
                  <span className="text-[8px] font-bold uppercase">Ok</span>
                </motion.div>
              ) : (
                <CaretRight weight="bold" className="w-5 h-5 text-text-muted group-hover:text-brand transition-colors flex-shrink-0" />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
