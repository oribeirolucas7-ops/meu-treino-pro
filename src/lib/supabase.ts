/**
 * Configuração do Cliente Supabase.
 * Fornece a instância centralizada para comunicação com o Backend (Auth, Database, Storage).
 */
import { createClient } from '@supabase/supabase-js';

// As credenciais são carregadas das variáveis de ambiente.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://aiphtfvmumkdqtovyoup.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_p7QDbluZIAG9whs5cn5Jpw_BabuCBIZ';

/**
 * Inicializa o cliente Supabase com otimizações de performance:
 * - Persistência de sessão ativa
 * - Refresh automático de tokens
 * - Detecção de sessão via URL (útil para redirects de OAuth)
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: { 'x-application-name': 'meu-treino-pro' }
  }
});

// Helper para verificar se as chaves foram devidamente configuradas no ambiente
export const isSupabaseConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
