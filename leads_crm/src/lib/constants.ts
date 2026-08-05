import { LeadStatus } from '@/types/lead.types';

export const LEAD_STATUSES: LeadStatus[] = [
  'New',
  'Contacted',
  'Follow Up',
  'Interested',
  'Proposal Sent',
  'Converted',
  'Lost',
];

export const CURRENCIES = ['PKR', 'USD', 'AED'] as const;

export const ROLES = ['admin', 'sales'] as const;

export const DEFAULT_COMMISSION_PERCENTAGE = 35;

export const LEAD_STATUS_COLORS: Record<LeadStatus, string> = {
  New: 'bg-blue-100 text-blue-700 border-blue-200',
  Contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Follow Up': 'bg-orange-100 text-orange-700 border-orange-200',
  Interested: 'bg-purple-100 text-purple-700 border-purple-200',
  'Proposal Sent': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  Converted: 'bg-green-100 text-green-700 border-green-200',
  Lost: 'bg-red-100 text-red-700 border-red-200',
};

export const LEAD_STATUS_CHART_COLORS: Record<LeadStatus, string> = {
  New: '#3b82f6',
  Contacted: '#eab308',
  'Follow Up': '#f97316',
  Interested: '#a855f7',
  'Proposal Sent': '#6366f1',
  Converted: '#22c55e',
  Lost: '#ef4444',
};

export const ADMIN_ONLY_ROUTES = ['/upload', '/users', '/activity'];
