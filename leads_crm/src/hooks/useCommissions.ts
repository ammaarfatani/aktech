'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Commission } from '@/types/commission.types';
import { commissionConverter } from '@/firebase/converters';
import { useAuth } from '@/providers/AuthProvider';

interface UseCommissionsReturn {
  commissions: Commission[];
  loading: boolean;
  error: string | null;
  totalEarnings: number;
  pendingAmount: number;
  paidAmount: number;
}

export function useCommissions(userId?: string): UseCommissionsReturn {
  const { user } = useAuth();
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setCommissions([]);
      setLoading(false);
      return;
    }

    const targetUid = user.role === 'admin' ? userId : user.uid;
    const constraints: Parameters<typeof query>[1][] = [];

    if (targetUid) {
      constraints.push(where('userId', '==', targetUid));
    }

    const q = query(
      collection(db, 'commissions').withConverter(commissionConverter),
      ...constraints
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

        setCommissions(data);
        setLoading(false);
      },
      (err) => {
        console.warn('Commissions fetch notice:', err.message);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [user, userId]);

  const totalEarnings = commissions.reduce((s, c) => s + (c.amount || 0), 0);
  const pendingAmount = commissions
    .filter((c) => c.status === 'pending')
    .reduce((s, c) => s + (c.amount || 0), 0);
  const paidAmount = commissions
    .filter((c) => c.status === 'paid')
    .reduce((s, c) => s + (c.amount || 0), 0);

  return { commissions, loading, error, totalEarnings, pendingAmount, paidAmount };
}
