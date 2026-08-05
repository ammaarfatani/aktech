import { AppUser, CreateUserPayload, UpdateUserPayload } from '@/types/user.types';

export const usersService = {
  async getAllUsers(): Promise<AppUser[]> {
    const res = await fetch('/api/users');
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to fetch users');
    }
    return res.json();
  },

  async createUser(payload: CreateUserPayload): Promise<{ uid: string }> {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create user');
    }
    return res.json();
  },

  async updateUser(uid: string, payload: UpdateUserPayload): Promise<void> {
    const res = await fetch(`/api/users/${uid}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update user');
    }
  },

  async resetPassword(uid: string, newPassword: string): Promise<void> {
    const res = await fetch(`/api/users/${uid}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resetPassword: newPassword }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to reset password');
    }
  },

  async deleteUser(uid: string): Promise<void> {
    const res = await fetch(`/api/users/${uid}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to delete user');
    }
  },

  /**
   * Generate the next AK-XXX username based on existing users.
   * Scans all usernames like AK-001, AK-002 and returns the next one.
   */
  generateNextUsername(users: AppUser[]): string {
    const nums = users
      .map((u) => {
        const match = u.username.match(/^AK-(\d{3})$/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter((n) => n > 0);

    const nextNum = nums.length > 0 ? Math.max(...nums) + 1 : 1;
    return `AK-${String(nextNum).padStart(3, '0')}`;
  },
};
