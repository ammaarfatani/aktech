export type CommissionStatus = 'pending' | 'paid';

export interface Commission {
  id: string;
  leadId: string;
  userId: string;
  userName: string;
  projectName: string;
  projectAmount: number;
  currency: string;
  percentage: number;
  amount: number;
  status: CommissionStatus;
  createdAt: Date;
  paidAt?: Date;
}
