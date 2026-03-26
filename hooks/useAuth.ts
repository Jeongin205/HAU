import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  user: User | null;
  initialized: boolean;
  setSession: (session: Session | null) => void;
  initialize: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  session: null,
  user: null,
  initialized: false,
  
  setSession: (session) => {
    set({ session, user: session ? session.user : null });
  },
  
  initialize: async () => {
    // 앱 시작 시 초기 세션 복구
    const { data: { session } } = await supabase.auth.getSession();
    set({ session, user: session ? session.user : null, initialized: true });
    
    // Auth 상태 변경 리스너 등록
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session ? session.user : null });
    });
  }
}));
