import { db } from '@/firebase/config';
import {
  collection,
  doc,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import { LeadCSVRow } from '@/types/lead.types';

export const uploadService = {
  /**
   * Bulk import and assign an array of lead rows (one, multiple, or all) to a target Sales user.
   */
  async importLeads(
    rows: LeadCSVRow[],
    assignedToId: string,
    assignedToName: string,
    adminId: string,
    adminName: string
  ): Promise<number> {
    if (rows.length === 0) return 0;

    const batchLimit = 200; // Under Firestore 500 operations batch limit
    let importedCount = 0;

    for (let i = 0; i < rows.length; i += batchLimit) {
      const chunk = rows.slice(i, i + batchLimit);
      const batch = writeBatch(db);

      let chunkCount = 0;

      chunk.forEach((row) => {
        const company = row.Company || row.company || '';
        const contactPerson = row['Contact Person'] || row.contactPerson || '';
        const phone = row.Phone || row.phone || '';
        const email = row.Email || row.email || '';
        const website = row.Website || row.website || '';
        const businessCategory =
          row['Business Category'] ||
          row.businessCategory ||
          row['Business Type'] ||
          row.businessType ||
          '';
        const country = row.Country || row.country || '';
        const city = row.City || row.city || '';
        const requiredService =
          row['Required Service'] ||
          row.requiredService ||
          row['Service Required'] ||
          row.serviceRequired ||
          '';

        // Skip completely empty rows
        if (!company && !contactPerson && !email && !phone) return;

        const leadRef = doc(collection(db, 'leads'));
        batch.set(leadRef, {
          company,
          contactPerson,
          phone,
          email,
          website,
          businessCategory,
          country,
          city,
          requiredService,
          status: 'New',
          assignedTo: assignedToId,
          assignedToName,
          assignedDate: serverTimestamp(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        // Add to timeline of this lead
        const timelineRef = doc(collection(leadRef, 'timeline'));
        batch.set(timelineRef, {
          type: 'assigned',
          description: `Lead created and assigned to ${assignedToName}`,
          performedBy: adminId,
          performedByName: adminName,
          createdAt: serverTimestamp(),
        });

        chunkCount++;
        importedCount++;
      });

      if (chunkCount > 0) {
        // Add activity log for the batch
        const activityRef = doc(collection(db, 'activityLog'));
        batch.set(activityRef, {
          action: 'lead_assigned',
          leadId: null,
          userId: adminId,
          userName: adminName,
          targetUserId: assignedToId,
          metadata: {
            count: chunkCount,
            assignedToName,
          },
          createdAt: serverTimestamp(),
        });

        // Notify the assigned sales user
        const notificationRef = doc(collection(db, 'notifications'));
        batch.set(notificationRef, {
          recipientUid: assignedToId,
          type: 'lead_assigned',
          message: `${chunkCount} new lead${chunkCount > 1 ? 's have' : ' has'} been assigned to you.`,
          leadId: null,
          read: false,
          createdAt: serverTimestamp(),
        });
      }

      await batch.commit();
    }

    return importedCount;
  },
};
