'use client';

import { useEffect, useState } from 'react';
import { collectionGroup, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuth } from '@/providers/AuthProvider';
import { Note } from '@/types/note.types';

export interface NoteWithLead extends Note {
  leadId: string;
}

export function useSalesNotes(limitCount: number = 10) {
  const { user } = useAuth();
  const [notes, setNotes] = useState<NoteWithLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setNotes([]);
      setLoading(false);
      return;
    }

    const q = query(
      collectionGroup(db, 'notes'),
      where('createdBy', '==', user.uid)
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: NoteWithLead[] = snap.docs.map((d) => {
          const data = d.data();
          const leadId = d.ref.parent.parent ? d.ref.parent.parent.id : '';
          return {
            id: d.id,
            leadId,
            message: data.message || '',
            createdBy: data.createdBy || '',
            createdByName: data.createdByName || '',
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          };
        });

        // Sort by createdAt descending
        list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        setNotes(list.slice(0, limitCount));
        setLoading(false);
      },
      (err) => {
        console.warn('Sales notes fetch notice:', err.message);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [user, limitCount]);

  return { notes, loading, error };
}
