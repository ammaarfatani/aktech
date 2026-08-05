'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Notification } from '@/types/activity.types';
import { notificationConverter } from '@/firebase/converters';
import { useAuth } from '@/providers/AuthProvider';

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  markAllRead: () => Promise<void>;
  markRead: (id: string) => Promise<void>;
}

export function useNotifications(): UseNotificationsReturn {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'notifications').withConverter(notificationConverter),
      where('recipientUid', '==', user.uid),
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

        setNotifications(data);
        setLoading(false);
      },
      (err) => {
        console.warn('Notifications fetch notice:', err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = async (id: string) => {
    if (!user) return;
    await updateDoc(doc(db, 'notifications', id), { read: true });
  };

  const markAllRead = async () => {
    if (!user || unreadCount === 0) return;
    const batch = writeBatch(db);
    notifications
      .filter((n) => !n.read)
      .forEach((n) => batch.update(doc(db, 'notifications', n.id), { read: true }));
    await batch.commit();
  };

  return { notifications, unreadCount, loading, markAllRead, markRead };
}
