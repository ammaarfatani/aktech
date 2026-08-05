'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { ActivityLog } from '@/types/activity.types';
import { activityConverter } from '@/firebase/converters';
import { useAuth } from '@/providers/AuthProvider';

interface UseActivityLogReturn {
  logs: ActivityLog[];
  loading: boolean;
  error: string | null;
}

export function useActivityLog(limitCount = 50): UseActivityLogReturn {
  const { user } = useAuth();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      setLogs([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'activityLog').withConverter(activityConverter),
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        let data = snap.docs.map((d) => d.data());

        // Client-side sort to avoid compound index issues
        data.sort((a, b) => {
          const tA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
          const tB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
          return tB - tA;
        });

        // Client-side limit
        setLogs(data.slice(0, limitCount));
        setLoading(false);
      },
      (err) => {
        console.warn('Activity log fetch notice:', err.message);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [user, limitCount]);

  return { logs, loading, error };
}
