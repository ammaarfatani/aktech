import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  username: z
    .string()
    .min(2, 'Username required')
    .regex(/^AK-\d{3}$/, 'Username must follow AK-001 format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z
    .string()
    .min(7, 'Phone number required')
    .max(20, 'Phone number too long'),
  commissionPercentage: z
    .number()
    .min(0, 'Must be 0 or more')
    .max(100, 'Must be 100 or less'),
  role: z.enum(['admin', 'sales']),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(7).max(20).optional(),
  commissionPercentage: z.number().min(0).max(100).optional(),
  active: z.boolean().optional(),
  role: z.enum(['admin', 'sales']).optional(),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
