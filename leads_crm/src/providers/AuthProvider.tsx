'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from 'react';
import { AppUser } from '@/types/user.types';
import { signIn, signOutUser } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { toast } from '@/components/ui/toast';

interface AuthContextProps {
  user: AppUser | null;
  loading: boolean;
  login: (
    identifier: string,
    password: string,
    rememberMe: boolean,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const loginInProgressRef = useRef(false);

  useEffect(() => {
    const auth = getAuth();
    
    // We rely on Firebase Client SDK state to determine if user is logged in
    // This ensures that when user state is populated, the Firestore Client SDK 
    // has a valid auth token to make queries without throwing permission errors.
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      // If login is currently happening, don't overwrite state here.
      // login() handles setting the user state itself.
      if (loginInProgressRef.current) return;

      if (firebaseUser) {
        try {
          const userSnap = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userSnap.exists()) {
            const userData = userSnap.data() as AppUser;
            
            if (userData.active) {
              setUser(userData);
            } else {
              // Account deactivated while logged in
              setUser(null);
              await signOutUser(); 
              toast.add({
                title: 'Account Disabled',
                description: 'Your account has been deactivated.',
                type: 'error',
              });
            }
          } else {
            // User profile doesn't exist
            setUser(null);
            await signOutUser();
          }
        } catch (error) {
          console.error("Error fetching user profile in AuthProvider:", error);
          setUser(null);
          await signOutUser();
        }
      } else {
        setUser(null);
        // Clear server-side cookie to keep it in sync with client state
        fetch('/api/auth/session', { method: 'DELETE' }).catch(() => {});
      }
      
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const login = async (
    identifier: string,
    password: string,
    rememberMe: boolean,
  ) => {
    loginInProgressRef.current = true;
    setLoading(true);

    try {
      const loggedUser = await signIn(identifier, password, rememberMe);

      // Set httpOnly session cookie (server side)
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: loggedUser.uid,
          role: loggedUser.role,
          active: loggedUser.active,
        }),
      });

      setUser(loggedUser);
      setLoading(false);
      loginInProgressRef.current = false;

      // Navigate to dashboard
      router.replace('/dashboard');
    } catch (error) {
      loginInProgressRef.current = false;
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    await signOutUser();
    setUser(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
