'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema, CreateUserFormData } from '@/lib/validations/user.schema';
import { usersService } from '@/services/users.service';
import { toast } from '@/components/ui/toast';
import { AppUser } from '@/types/user.types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Loader2 } from 'lucide-react';

interface CreateUserDialogProps {
  users: AppUser[];
  onSuccess: () => void;
}

export function CreateUserDialog({ users, onSuccess }: CreateUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextUsername = usersService.generateNextUsername(users);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      username: nextUsername,
      password: '',
      phone: '',
      commissionPercentage: 35,
      role: 'sales',
    },
  });

  // Keep username in sync when dialog opens or users change
  useEffect(() => {
    if (open) {
      const next = usersService.generateNextUsername(users);
      setValue('username', next);
    }
  }, [open, users, setValue]);

  const selectedRole = watch('role');

  const onSubmit = async (data: CreateUserFormData) => {
    setError(null);
    try {
      await usersService.createUser(data);
      toast.add({
        title: 'User Created',
        description: `User ${data.name} (${data.username}) was created successfully.`,
        type: 'success',
      });
      reset();
      setOpen(false);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to create user');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { reset(); setError(null); } }}>
      <DialogTrigger
        render={
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> Add User
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Add a new team member to AKTECH CRM. The User ID is auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {error && (
            <div className="bg-destructive/10 text-destructive text-xs p-3 rounded-lg border border-destructive/20">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" {...register('name')} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@aktech.com" {...register('email')} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+92 300 1234567" {...register('phone')} />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Username (auto-generated, read-only) & Password */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="username">User ID (Auto)</Label>
              <Input
                id="username"
                readOnly
                className="bg-muted cursor-not-allowed font-mono"
                {...register('username')}
              />
              {errors.username && <p className="text-xs text-destructive">{errors.username.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Temporary Password</Label>
              <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>
          </div>

          {/* Role & Commission Percentage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Select
                value={selectedRole}
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
              <Label htmlFor="commissionPercentage">Commission (%)</Label>
              <Input
                id="commissionPercentage"
                type="number"
                {...register('commissionPercentage', { valueAsNumber: true })}
              />
              {errors.commissionPercentage && (
                <p className="text-xs text-destructive">{errors.commissionPercentage.message}</p>
              )}
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                'Create User'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
