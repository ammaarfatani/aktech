import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { AppUser } from '@/types/user.types';
import { Lead } from '@/types/lead.types';
import { Note } from '@/types/note.types';
import { Commission } from '@/types/commission.types';
import { ActivityLog, Notification } from '@/types/activity.types';

// Helper: converts Firestore Timestamp or any date-like to JS Date
function toDate(value: unknown): Date {
  if (value instanceof Timestamp) return value.toDate();
  if (value instanceof Date) return value;
  if (typeof value === 'string' || typeof value === 'number') return new Date(value);
  return new Date();
}

// Helper: converts Date or FieldValue to compatible firestore date field
function toFirestoreDate(value: any): any {
  if (value instanceof Date) {
    return Timestamp.fromDate(value);
  }
  return value;
}

export const userConverter: FirestoreDataConverter<AppUser> = {
  toFirestore: (user: any) => ({
    ...user,
    createdAt: toFirestoreDate(user.createdAt),
    updatedAt: toFirestoreDate(user.updatedAt),
  }),
  fromFirestore: (snap: QueryDocumentSnapshot): AppUser => {
    const d = snap.data();
    return {
      uid: snap.id,
      name: d.name,
      email: d.email,
      username: d.username,
      phone: d.phone ?? '',
      role: d.role,
      commissionPercentage: d.commissionPercentage ?? 35,
      active: d.active ?? true,
      createdAt: toDate(d.createdAt),
      updatedAt: toDate(d.updatedAt),
    };
  },
};

export const leadConverter: FirestoreDataConverter<Lead> = {
  toFirestore: (lead: any) => ({
    ...lead,
    assignedDate: toFirestoreDate(lead.assignedDate),
    createdAt: toFirestoreDate(lead.createdAt),
    updatedAt: toFirestoreDate(lead.updatedAt),
    completionDate: lead.completionDate
      ? toFirestoreDate(lead.completionDate)
      : null,
  }),
  fromFirestore: (snap: QueryDocumentSnapshot): Lead => {
    const d = snap.data();
    return {
      id: snap.id,
      company: d.company,
      contactPerson: d.contactPerson,
      phone: d.phone,
      email: d.email,
      website: d.website,
      businessCategory: d.businessCategory,
      country: d.country,
      city: d.city,
      requiredService: d.requiredService,
      status: d.status,
      assignedTo: d.assignedTo,
      assignedToName: d.assignedToName,
      assignedDate: toDate(d.assignedDate),
      createdAt: toDate(d.createdAt),
      updatedAt: toDate(d.updatedAt),
      projectName: d.projectName ?? undefined,
      projectAmount: d.projectAmount ?? undefined,
      currency: d.currency ?? undefined,
      completionDate: d.completionDate ? toDate(d.completionDate) : undefined,
      commissionAmount: d.commissionAmount ?? undefined,
      commissionPaid: d.commissionPaid ?? false,
    };
  },
};

export const noteConverter: FirestoreDataConverter<Note> = {
  toFirestore: (note: any) => ({
    ...note,
    createdAt: toFirestoreDate(note.createdAt),
  }),
  fromFirestore: (snap: QueryDocumentSnapshot): Note => {
    const d = snap.data();
    return {
      id: snap.id,
      message: d.message,
      createdBy: d.createdBy,
      createdByName: d.createdByName,
      createdAt: toDate(d.createdAt),
    };
  },
};

export const commissionConverter: FirestoreDataConverter<Commission> = {
  toFirestore: (c: any) => ({
    ...c,
    createdAt: toFirestoreDate(c.createdAt),
    paidAt: c.paidAt ? toFirestoreDate(c.paidAt) : null,
  }),
  fromFirestore: (snap: QueryDocumentSnapshot): Commission => {
    const d = snap.data();
    return {
      id: snap.id,
      leadId: d.leadId,
      userId: d.userId,
      userName: d.userName,
      projectName: d.projectName,
      projectAmount: d.projectAmount,
      currency: d.currency,
      percentage: d.percentage,
      amount: d.amount,
      status: d.status,
      createdAt: toDate(d.createdAt),
      paidAt: d.paidAt ? toDate(d.paidAt) : undefined,
    };
  },
};

export const activityConverter: FirestoreDataConverter<ActivityLog> = {
  toFirestore: (log: any) => ({
    ...log,
    createdAt: toFirestoreDate(log.createdAt),
  }),
  fromFirestore: (snap: QueryDocumentSnapshot): ActivityLog => {
    const d = snap.data();
    return {
      id: snap.id,
      action: d.action,
      leadId: d.leadId ?? undefined,
      userId: d.userId,
      userName: d.userName,
      targetUserId: d.targetUserId ?? undefined,
      metadata: d.metadata ?? {},
      createdAt: toDate(d.createdAt),
    };
  },
};

export const notificationConverter: FirestoreDataConverter<Notification> = {
  toFirestore: (n: any) => ({
    ...n,
    createdAt: toFirestoreDate(n.createdAt),
  }),
  fromFirestore: (snap: QueryDocumentSnapshot): Notification => {
    const d = snap.data();
    return {
      id: snap.id,
      recipientUid: d.recipientUid,
      type: d.type,
      message: d.message,
      leadId: d.leadId ?? undefined,
      read: d.read ?? false,
      createdAt: toDate(d.createdAt),
    };
  },
};
