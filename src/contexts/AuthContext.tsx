import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type UserRole = 'admin' | 'seller' | 'user' | null;

interface AuthState {
  session: Session | null;
  user: User | null;
  userRole: UserRole;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
    user: null,
    userRole: null,
    loading: true,
  });
  const navigate = useNavigate();

  const fetchUserRole = async (userId: string): Promise<UserRole> => {
    try {
      const { data, error } = await supabase
        .from('seller_profiles')
        .select('role, is_super_admin')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        return 'user';
      }

      return data.is_super_admin ? 'admin' : (data.role as UserRole);
    } catch (error) {
      console.error('Error fetching user role:', error);
      return 'user';
    }
  };

  const updateAuthState = async (session: Session | null) => {
    if (session?.user) {
      const role = await fetchUserRole(session.user.id);
      setAuthState({
        session,
        user: session.user,
        userRole: role,
        loading: false,
      });
    } else {
      setAuthState({
        session: null,
        user: null,
        userRole: null,
        loading: false,
      });
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateAuthState(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await updateAuthState(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Successfully signed in!');
      return { error: null };
    } catch (error: any) {
      toast.error(error.message);
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Please check your email to confirm your account');
      return { error: null };
    } catch (error: any) {
      toast.error(error.message);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setAuthState({
        session: null,
        user: null,
        userRole: null,
        loading: false,
      });
      toast.success('Successfully signed out');
      navigate('/login');
    } catch (error: any) {
      toast.error('Error signing out');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}