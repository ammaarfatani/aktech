'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { AppUser } from '@/types/user.types';
import { userConverter } from '@/firebase/converters';
import { useAuth } from '@/providers/AuthProvider';

interface UseUsersReturn {
  users: AppUser[];
  loading: boolean;
  error: string | null;
}

export function useUsers(): UseUsersReturn {
  const { user } = useAuth();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only admins can list all users
    if (!user || user.role !== 'admin') {
      setUsers([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'users').withConverter(userConverter),
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs.map((d) => d.data());

        // Client-side sort by createdAt descending
        data.sort((a, b) => {
          const tA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
          const tB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
          return tB - tA;
        });

        setUsers(data);
        setLoading(false);
      },
      (err) => {
        console.warn('Users fetch notice:', err.message);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [user]);

  return { users, loading, error };
}
