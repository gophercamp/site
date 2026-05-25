'use client';

import { loginAction, logoutAction } from '@/app/admin/actions';
import { createContext, useContext, useState } from 'react';

type AuthContextType = {
  userEmail: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  userEmail: initialEmail,
}: {
  children: React.ReactNode;
  userEmail: string | null;
}) {
  const [userEmail, setUserEmail] = useState<string | null>(initialEmail);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    const result = await loginAction(email, password);
    setIsLoading(false);
    if (!result.error) setUserEmail(email);
    return { error: result.error ?? null };
  };

  const signOut = async () => {
    setIsLoading(true);
    await logoutAction();
  };

  return (
    <AuthContext.Provider value={{ userEmail, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
