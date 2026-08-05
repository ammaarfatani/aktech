'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserSchema, UpdateUserFormData } from '@/lib/validations/user.schema';
import { usersService } from '@/services/users.service';
import { toast } from '@/components/ui/toast';
import { AppUser } from '@/types/user.types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface EditUserDialogProps {
  user: AppUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function EditUserDialog({ user, open, onOpenChange, onSuccess }: EditUserDialogProps) {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
  });

  const selectedRole = watch('role');

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        phone: user.phone,
        commissionPercentage: user.commissionPercentage,
        active: user.active,
        role: user.role,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UpdateUserFormData) => {
    if (!user) return;
    setError(null);
    try {
      await usersService.updateUser(user.uid, data);
      toast.add({
        title: 'User Updated',
        description: `Successfully updated profile of ${user.name}.`,
        type: 'success',
      });
      onOpenChange(false);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to update user');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit User Profile</DialogTitle>
          <DialogDescription>
            Modify profile settings for {user?.name} ({user?.username}).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {error && (
            <div className="bg-destructive/10 text-destructive text-xs p-3 rounded-lg border border-destructive/20">
              {error}
            </div>
          )}

          {/* Read-only info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-muted-foreground">User ID</Label>
              <Input value={user?.username || ''} readOnly className="bg-muted cursor-not-allowed font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-muted-foreground">Email</Label>
              <Input value={user?.email || ''} readOnly className="bg-muted cursor-not-allowed" />
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-name">Full Name</Label>
            <Input id="edit-name" placeholder="John Doe" {...register('name')} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-phone">Phone Number</Label>
            <Input id="edit-phone" type="tel" placeholder="+92 300 1234567" {...register('phone')} />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>

          {/* Role & Commission */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-role">Role</Label>
              <Select
                value={selectedRole || 'sales'}
                onValueChange={(val) => {
                  if (val) setValue('role', val as 'admin' | 'sales', { shouldValidate: true });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-commission">Commission (%)</Label>
              <Input
                id="edit-commission"
                type="number"
                {...register('commissionPercentage', { valueAsNumber: true })}
              />
              {errors.commissionPercentage && (
                <p className="text-xs text-destructive">{errors.commissionPercentage.message}</p>
              )}
            </div>
          </div>

          {/* Account Status */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-status">Account Status</Label>
            <Select
              value={watch('active') ? 'active' : 'disabled'}
              onValueChange={(val) => {
                if (val) setValue('active', val === 'active', { shouldValidate: true });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
