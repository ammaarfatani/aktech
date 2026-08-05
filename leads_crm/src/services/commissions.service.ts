import { db } from '@/firebase/config';
import {
  doc,
  writeBatch,
  serverTimestamp,
  collection,
} from 'firebase/firestore';

export const commissionsService = {
  // Mark commission as paid
  async markAsPaid(
    commissionId: string,
    leadId: string,
    adminId: string,
    adminName: string
  ): Promise<void> {
    const batch = writeBatch(db);
    
    // Update commission doc
    const commissionRef = doc(db, 'commissions', commissionId);
    batch.update(commissionRef, {
      status: 'paid',
      paidAt: serverTimestamp(),
    });

    // Update lead record
    const leadRef = doc(db, 'leads', leadId);
    batch.update(leadRef, {
      commissionPaid: true,
      updatedAt: serverTimestamp(),
    });

    // Log activity
    const activityRef = doc(collection(db, 'activityLog'));
    batch.set(activityRef, {
      action: 'lead_updated', // Action code matching types
      leadId,
      userId: adminId,
      userName: adminName,
      metadata: {
        commissionId,
        paymentStatus: 'paid',
      },
      createdAt: serverTimestamp(),
    });

    await batch.commit();
  },
};
