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
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isForgotMode) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;
        setSuccess('Link de recuperação enviado para o seu e-mail!');
      } else if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: window.location.origin
          }
        });
        if (error) throw error;
        setSuccess('Conta criada! Verifique seu e-mail para confirmar.');
      }
    } catch (err: any) {
      setError(err.message === 'Invalid login credentials' ? 'E-mail ou senha incorretos.' : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-[#FFFFFF]'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md p-8 rounded-[40px] border shadow-2xl ${
          theme === 'dark' ? 'bg-[#1A1A1A] border-white/5 shadow-white/5' : 'bg-[#FFFFFF] border-black/5 shadow-black/5'
        }`}
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-brand rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-lg shadow-brand/20">
            <Barbell weight="fill" className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-black mb-2 tracking-tight uppercase">Meu Treino Pro</h1>
          <p className="text-text-muted font-bold">
            {isForgotMode ? 'Recuperar senha' : isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta gratuita'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <Envelope className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-text-muted group-focus-within:text-brand transition-colors" />
              <input 
                type="email"
                placeholder="Seu e-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full h-16 pl-14 pr-4 rounded-2xl border font-bold outline-none transition-all ${
                  theme === 'dark' 
                    ? 'bg-white/5 border-white/10 focus:border-brand/50 focus:bg-white/10' 
                    : 'bg-black/5 border-black/10 focus:border-brand/50 focus:bg-black/10'
                }`}
              />
            </div>

            {!isForgotMode && (
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-text-muted group-focus-within:text-brand transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full h-16 pl-14 pr-14 rounded-2xl border font-bold outline-none transition-all ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 focus:border-brand/50 focus:bg-white/10' 
                      : 'bg-black/5 border-black/10 focus:border-brand/50 focus:bg-black/10'
                  }`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-brand transition-colors"
                >
                  {showPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
                </button>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm font-bold text-center"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} weight="fill" />
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit"
            disabled={loading}
            className="w-full h-16 bg-brand text-white rounded-2xl font-black text-lg shadow-lg shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale uppercase tracking-wider"
          >
            {loading ? 'Processando...' : isForgotMode ? 'Enviar link' : isLogin ? 'Entrar agora' : 'Cadastrar conta'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}></div>
          </div>
          <div className="relative flex justify-center">
            <span className={`px-4 text-xs font-black uppercase text-text-muted ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-[#FFFFFF]'}`}>Ou continue com</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className={`w-full h-16 rounded-2xl border font-black flex items-center justify-center gap-3 transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98] ${
            theme === 'dark' ? 'border-white/10 text-white' : 'border-black/10 text-black'
          }`}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        <div className="mt-8 text-center space-y-4">
          <button 
            onClick={() => {
              setIsForgotMode(!isForgotMode);
              setError(null);
              setSuccess(null);
            }}
            className="text-sm font-bold text-brand hover:underline block mx-auto"
          >
            {isForgotMode ? (
              <div className="flex items-center gap-2">
                <ArrowLeft size={16} weight="bold" />
                Voltar para o login
              </div>
            ) : 'Esqueceu sua senha?'}
          </button>

          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setIsForgotMode(false);
              setError(null);
              setSuccess(null);
            }}
            className="text-sm font-bold text-text-muted hover:text-brand transition-colors"
          >
            {isLogin ? (
              <>Não tem uma conta? <span className="text-brand">Cadastre-se</span></>
            ) : (
              <>Já tem uma conta? <span className="text-brand">Entrar</span></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}