import { z } from 'zod';
import { LEAD_STATUSES, CURRENCIES } from '@/lib/constants';

export const conversionSchema = z.object({
  projectName: z.string().min(2, 'Project name is required'),
  projectAmount: z
    .number({ invalid_type_error: 'Must be a number' })
    .positive('Amount must be positive'),
  currency: z.enum(CURRENCIES, { required_error: 'Currency is required' }),
  completionDate: z.date({ required_error: 'Completion date is required' }),
});

export type ConversionFormData = z.infer<typeof conversionSchema>;

export const noteSchema = z.object({
  message: z.string().min(1, 'Note cannot be empty'),
});

export type NoteFormData = z.infer<typeof noteSchema>;

export const leadStatusSchema = z.object({
  status: z.enum(LEAD_STATUSES as [string, ...string[]]),
});

export type LeadStatusFormData = z.infer<typeof leadStatusSchema>;
