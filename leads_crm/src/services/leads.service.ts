import { db } from '@/firebase/config';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
  getDoc,
  writeBatch,
} from 'firebase/firestore';
import { Lead, LeadStatus, Currency } from '@/types/lead.types';
import { Note } from '@/types/note.types';
import { leadConverter, noteConverter } from '@/firebase/converters';

interface ConvertProjectPayload {
  projectName: string;
  projectAmount: number;
  currency: Currency;
  completionDate: Date;
  userCommissionPercentage: number;
  userId: string;
  userName: string;
}

export const leadsService = {
  // Update lead status
  async updateStatus(
    leadId: string,
    status: LeadStatus,
    userId: string,
    userName: string
  ): Promise<void> {
    const batch = writeBatch(db);
    const leadRef = doc(db, 'leads', leadId);
    
    batch.update(leadRef, {
      status,
      updatedAt: serverTimestamp(),
    });

    // Add to timeline subcollection
    const timelineRef = doc(collection(leadRef, 'timeline'));
    batch.set(timelineRef, {
      type: 'status_change',
      description: `Status changed to ${status}`,
      performedBy: userId,
      performedByName: userName,
      createdAt: serverTimestamp(),
    });

    // Add to global activityLog
    const activityRef = doc(collection(db, 'activityLog'));
    batch.set(activityRef, {
      action: 'status_changed',
      leadId,
      userId,
      userName,
      metadata: { status },
      createdAt: serverTimestamp(),
    });

    await batch.commit();
  },

  // Add notes
  async addNote(
    leadId: string,
    message: string,
    userId: string,
    userName: string
  ): Promise<void> {
    const batch = writeBatch(db);
    const leadRef = doc(db, 'leads', leadId);
    
    const noteRef = doc(collection(leadRef, 'notes'));
    batch.set(noteRef, {
      message,
      createdBy: userId,
      createdByName: userName,
      createdAt: serverTimestamp(),
    });

    // Add to timeline
    const timelineRef = doc(collection(leadRef, 'timeline'));
    batch.set(timelineRef, {
      type: 'note_added',
      description: `Added note: "${message.substring(0, 40)}${message.length > 40 ? '...' : ''}"`,
      performedBy: userId,
      performedByName: userName,
      createdAt: serverTimestamp(),
    });

    await batch.commit();
  },

  // Convert project (sets status to Converted, saves project details, calculates commission)
  async convertProject(
    leadId: string,
    payload: ConvertProjectPayload
  ): Promise<void> {
    const batch = writeBatch(db);
    const leadRef = doc(db, 'leads', leadId);

    const percentage = payload.userCommissionPercentage && payload.userCommissionPercentage > 0
      ? payload.userCommissionPercentage
      : 35;
    const commissionAmount = payload.projectAmount * (percentage / 100);

    // Update Lead record
    batch.update(leadRef, {
      status: 'Converted',
      projectName: payload.projectName,
      projectAmount: payload.projectAmount,
      currency: payload.currency,
      completionDate: Timestamp.fromDate(payload.completionDate),
      commissionAmount,
      commissionPaid: false,
      updatedAt: serverTimestamp(),
    });

    // Create Commission record
    const commissionRef = doc(collection(db, 'commissions'));
    batch.set(commissionRef, {
      leadId,
      userId: payload.userId,
      userName: payload.userName,
      projectName: payload.projectName,
      projectAmount: payload.projectAmount,
      currency: payload.currency,
      percentage,
      amount: commissionAmount,
      status: 'pending',
      createdAt: serverTimestamp(),
      paidAt: null,
    });

    // Add to timeline
    const timelineRef = doc(collection(leadRef, 'timeline'));
    batch.set(timelineRef, {
      type: 'converted',
      description: `Project converted: ${payload.projectName} (${payload.currency} ${payload.projectAmount})`,
      performedBy: payload.userId,
      performedByName: payload.userName,
      createdAt: serverTimestamp(),
    });

    // Add activity log
    const activityRef = doc(collection(db, 'activityLog'));
    batch.set(activityRef, {
      action: 'project_converted',
      leadId,
      userId: payload.userId,
      userName: payload.userName,
      metadata: {
        projectName: payload.projectName,
        projectAmount: payload.projectAmount,
        currency: payload.currency,
        commissionAmount,
      },
      createdAt: serverTimestamp(),
    });

    // Create notification for admin / current user
    const notificationRef = doc(collection(db, 'notifications'));
    batch.set(notificationRef, {
      recipientUid: payload.userId,
      type: 'commission_generated',
      message: `Commission generated: ${payload.currency} ${commissionAmount.toFixed(2)} for ${payload.projectName}`,
      leadId,
      read: false,
      createdAt: serverTimestamp(),
    });

    await batch.commit();
  },
};
