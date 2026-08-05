export type ActivityAction =
  | 'lead_assigned'
  | 'lead_created'
  | 'status_changed'
  | 'note_added'
  | 'lead_converted'
  | 'commission_generated'
  | 'user_created'
  | 'user_updated'
  | 'lead_updated';

export interface ActivityLog {
  id: string;
  action: ActivityAction;
  leadId?: string;
  userId: string;       // who performed the action
  userName: string;
  targetUserId?: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export type NotificationType =
  | 'lead_assigned'
  | 'lead_updated'
  | 'commission_generated';

export interface Notification {
  id: string;
  recipientUid: string;
  type: NotificationType;
  message: string;
  leadId?: string;
  read: boolean;
  createdAt: Date;
}
