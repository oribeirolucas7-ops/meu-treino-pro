/**
 * Tela de Autenticação (Login, Cadastro e Recuperação).
 * Gerencia a comunicação direta com o Supabase Auth para controle de acesso.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Envelope, Lock, Barbell, Eye, EyeSlash, ArrowLeft, CheckCircle } from '@phosphor-icons/react';
import { supabase } from '../../lib/supabase';

interface AuthScreenProps {
  theme: 'light' | 'dark';
}

export default function AuthScreen({ theme }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Gerencia as ações de autenticação (Entrar, Criar Conta ou Recuperar Senha)
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isForgotPassword) {
        // Recuperação de senha
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;
        setMessage('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
      } else if (isLogin) {
        // Login tradicional
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        // Cadastro de novo usuário
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Conta criada! Verifique seu e-mail para confirmar o cadastro.');
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent relative overflow-hidden">
      {/* Elemento visual de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md p-8 rounded-[40px] border shadow-2xl glass ${
          theme === 'dark' ? 'bg-[#1A1A1A]/80 border-white/10' : 'bg-white/80 border-black/5'
        }`}
      >
        {/* Cabeçalho do formulário */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-brand/10 rounded-3xl mb-4">
            <Barbell weight="fill" className="w-10 h-10 text-brand" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight">
            {isForgotPassword ? 'Recuperar Senha' : isLogin ? 'Bem-vindo de volta' : 'Criar conta'}
          </h2>
          <p className="text-text-secondary font-medium mt-2">
            {isForgotPassword 
              ? 'Enviaremos um link para seu e-mail' 
              : 'Organize seus treinos de forma profissional'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-x-0 space-y-4">
          {/* Campo de E-mail */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">E-mail</label>
            <div className="relative">
              <Envelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand" />
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className={`w-full pl-12 pr-4 py-4 rounded-2xl border bg-transparent font-bold outline-none transition-all focus:ring-2 focus:ring-brand/20 ${
                  theme === 'dark' ? 'border-white/10 focus:border-brand' : 'border-black/10 focus:border-brand'
                }`}
              />
            </div>
          </div>

          {/* Campo de Senha (escondido se for recuperação de senha) */}
          {!isForgotPassword && (
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-4 rounded-2xl border bg-transparent font-bold outline-none transition-all focus:ring-2 focus:ring-brand/20 ${
                    theme === 'dark' ? 'border-white/10 focus:border-brand' : 'border-black/10 focus:border-brand'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-brand transition-colors"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {isLogin && (
                <button 
                  type="button" 
                  onClick={() => setIsForgotPassword(true)}
                  className="text-xs font-bold text-brand hover:underline mt-1 ml-1"
                >
                  Esqueceu a senha?
                </button>
              )}
            </div>
          )}

          {/* Mensagens de feedback */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold rounded-xl"
              >
                {error}
              </motion.div>
            )}
            
            {message && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold rounded-xl flex items-center gap-2"
              >
                <CheckCircle weight="fill" size={16} />
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botão de Ação Principal */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand hover:bg-brand-hover text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-brand/20 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
          >
            {loading ? 'Processando...' : isForgotPassword ? 'Enviar Link' : isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        {/* Alternar entre telas (Login/Cadastro/Recuperação) */}
        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 text-center">
          {isForgotPassword ? (
            <button 
              onClick={() => { setIsForgotPassword(false); setError(null); setMessage(null); }}
              className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-brand transition-colors"
            >
              <ArrowLeft weight="bold" /> Voltar para o login
            </button>
          ) : (
            <p className="text-sm font-medium text-text-muted">
              {isLogin ? 'Não tem uma conta?' : 'Já possui uma conta?'}
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(null); setMessage(null); }}
                className="ml-2 font-black text-brand hover:underline"
              >
                {isLogin ? 'Cadastre-se' : 'Entrar'}
              </button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
