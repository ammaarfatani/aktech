export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Follow Up'
  | 'Interested'
  | 'Proposal Sent'
  | 'Converted'
  | 'Lost';

export type Currency = 'PKR' | 'USD' | 'AED';

export interface Lead {
  id: string;
  company: string;
  contactPerson: string;
  phone: string;
  email: string;
  website: string;
  businessCategory: string;
  country: string;
  city: string;
  requiredService: string;
  status: LeadStatus;
  assignedTo: string;       // uid
  assignedToName: string;   // denormalized
  assignedDate: Date;
  createdAt: Date;
  updatedAt: Date;

  // Conversion fields — only populated when status === 'Converted'
  projectName?: string;
  projectAmount?: number;
  currency?: Currency;
  completionDate?: Date;
  commissionAmount?: number;
  commissionPaid?: boolean;
}

export interface LeadFilters {
  status?: LeadStatus | 'all';
  assignedTo?: string;
  country?: string;
  requiredService?: string;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface LeadCSVRow {
  Company?: string;
  company?: string;
  'Contact Person'?: string;
  contactPerson?: string;
  Phone?: string;
  phone?: string;
  Email?: string;
  email?: string;
  Website?: string;
  website?: string;
  'Business Category'?: string;
  businessCategory?: string;
  'Business Type'?: string;
  businessType?: string;
  Country?: string;
  country?: string;
  City?: string;
  city?: string;
  'Required Service'?: string;
  requiredService?: string;
  'Service Required'?: string;
  serviceRequired?: string;
  [key: string]: any;
}
