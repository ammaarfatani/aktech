export type UserRole = 'admin' | 'sales';

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  username: string; // AK-001, AK-002 …
  phone: string;
  role: UserRole;
  commissionPercentage: number; // 0–100
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  commissionPercentage: number;
  role?: UserRole;
}

export interface UpdateUserPayload {
  name?: string;
  phone?: string;
  commissionPercentage?: number;
  active?: boolean;
  role?: UserRole;
}
