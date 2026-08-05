'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Lead, LeadFilters } from '@/types/lead.types';
import { leadConverter } from '@/firebase/converters';
import { useAuth } from '@/providers/AuthProvider';

interface UseLeadsReturn {
  leads: Lead[];
  loading: boolean;
  error: string | null;
}

export function useLeads(filters?: LeadFilters): UseLeadsReturn {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLeads([]);
      setLoading(false);
      return;
    }

    const constraints: Parameters<typeof query>[1][] = [];

    if (user.role === 'sales') {
      constraints.push(where('assignedTo', '==', user.uid));
    } else if (filters?.assignedTo) {
      constraints.push(where('assignedTo', '==', filters.assignedTo));
    }

    if (filters?.status && filters.status !== 'all') {
      constraints.push(where('status', '==', filters.status));
    }

    if (filters?.country) {
      constraints.push(where('country', '==', filters.country));
    }

    if (filters?.requiredService) {
      constraints.push(where('requiredService', '==', filters.requiredService));
    }

    const q = query(
      collection(db, 'leads').withConverter(leadConverter),
      ...constraints
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        let data = snap.docs.map((d) => d.data());

        // Sort by createdAt descending in JS to prevent compound index errors
        data.sort((a, b) => {
          const tA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
          const tB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
          return tB - tA;
        });

        // Client-side search filter
        if (filters?.search) {
          const s = filters.search.toLowerCase();
          data = data.filter(
            (l) =>
              l.company?.toLowerCase().includes(s) ||
              l.phone?.toLowerCase().includes(s) ||
              l.email?.toLowerCase().includes(s) ||
              l.website?.toLowerCase().includes(s) ||
              l.requiredService?.toLowerCase().includes(s)
          );
        }

        setLeads(data);
        setLoading(false);
      },
      (err) => {
        console.warn('Leads fetch notice:', err.message);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [user, filters?.status, filters?.assignedTo, filters?.country, filters?.requiredService, filters?.search]);

  return { leads, loading, error };
}
