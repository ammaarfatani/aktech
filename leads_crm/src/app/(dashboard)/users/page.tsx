'use client';

import { useMemo, useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { RoleGuard } from '@/components/shared/RoleGuard';
import { CreateUserDialog } from '@/components/users/CreateUserDialog';
import { EditUserDialog } from '@/components/users/EditUserDialog';
import { AppUser } from '@/types/user.types';
import { usersService } from '@/services/users.service';
import { toast } from '@/components/ui/toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Edit,
  Trash,
  ToggleLeft,
  ToggleRight,
  Loader2,
  Search,
  KeyRound,
  Users,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';

export default function UsersPage() {
  const { users, loading, error } = useUsers();

  // Search & Filter
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Action states
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<AppUser | null>(null);
  const [togglingUid, setTogglingUid] = useState<string | null>(null);

  // Reset Password
  const [resetUser, setResetUser] = useState<AppUser | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [resetting, setResetting] = useState(false);

  // Filtered users
  const filteredUsers = useMemo(() => {
    let result = users;

    // Search filter
    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(s) ||
          u.email.toLowerCase().includes(s) ||
          u.username.toLowerCase().includes(s) ||
          u.phone.toLowerCase().includes(s)
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      result = result.filter((u) => u.role === roleFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((u) =>
        statusFilter === 'active' ? u.active : !u.active
      );
    }

    return result;
  }, [users, search, roleFilter, statusFilter]);

  // Status toggle handler
  const handleToggleStatus = async (user: AppUser) => {
    setTogglingUid(user.uid);
    try {
      await usersService.updateUser(user.uid, { active: !user.active });
      toast.add({
        title: user.active ? 'User Disabled' : 'User Activated',
        description: `${user.name}'s account status has been updated.`,
        type: 'success',
      });
    } catch (err: any) {
      toast.add({
        title: 'Error',
        description: err.message || 'Failed to update user status.',
        type: 'error',
      });
    } finally {
      setTogglingUid(null);
    }
  };

  // User delete handler
  const handleDeleteUser = async () => {
    if (!deletingUser) return;
    try {
      await usersService.deleteUser(deletingUser.uid);
      toast.add({
        title: 'User Deleted',
        description: `${deletingUser.name} has been removed from the system.`,
        type: 'success',
      });
      setDeletingUser(null);
    } catch (err: any) {
      toast.add({
        title: 'Error',
        description: err.message || 'Failed to delete user.',
        type: 'error',
      });
    }
  };

  // Reset password handler
  const handleResetPassword = async () => {
    if (!resetUser || !newPassword) return;
    setResetting(true);
    try {
      await usersService.resetPassword(resetUser.uid, newPassword);
      toast.add({
        title: 'Password Reset',
        description: `Password for ${resetUser.name} has been reset successfully.`,
        type: 'success',
      });
      setResetUser(null);
      setNewPassword('');
    } catch (err: any) {
      toast.add({
        title: 'Error',
        description: err.message || 'Failed to reset password.',
        type: 'error',
      });
    } finally {
      setResetting(false);
    }
  };

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="page-container">
        <PageHeader
          title="User Management"
          description="Create, edit, suspend, and delete team members."
        >
          <CreateUserDialog users={users} onSuccess={() => {}} />
        </PageHeader>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-lg border border-destructive/20">
            {error}
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, username, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 premium-input"
            />
          </div>
          <Select value={roleFilter} onValueChange={(val) => setRoleFilter(val ?? 'all')}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val ?? 'all')}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="disabled">Disabled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users Table */}
        <Card className="premium-card overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" /> Registered Users
                </CardTitle>
                <CardDescription className="text-xs">
                  {filteredUsers.length} of {users.length} users shown
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex h-32 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredUsers.length === 0 ? (
              <EmptyState
                icon={Users}
                title={users.length === 0 ? 'No users yet' : 'No matching users'}
                description={
                  users.length === 0
                    ? 'Create your first team member to get started.'
                    : 'Try adjusting your search or filter criteria.'
                }
              />
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((u) => (
                      <TableRow key={u.uid}>
                        <TableCell className="font-mono font-medium text-xs">{u.username}</TableCell>
                        <TableCell className="font-medium">{u.name}</TableCell>
                        <TableCell className="text-muted-foreground text-xs">{u.email}</TableCell>
                        <TableCell className="text-muted-foreground text-xs">{u.phone || '—'}</TableCell>
                        <TableCell>
                          <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                            {u.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{u.commissionPercentage}%</TableCell>
                        <TableCell>
                          <Badge
                            variant={u.active ? 'outline' : 'destructive'}
                            className={
                              u.active
                                ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-50 dark:bg-green-950 dark:text-green-400 dark:border-green-800'
                                : ''
                            }
                          >
                            {u.active ? 'Active' : 'Disabled'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatDate(u.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {/* Toggle Status */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                              disabled={togglingUid === u.uid}
                              onClick={() => handleToggleStatus(u)}
                              title={u.active ? 'Disable User' : 'Enable User'}
                            >
                              {u.active ? (
                                <ToggleRight className="h-4 w-4 text-green-600" />
                              ) : (
                                <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                            {/* Reset Password */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                              onClick={() => { setResetUser(u); setNewPassword(''); }}
                              title="Reset Password"
                            >
                              <KeyRound className="h-4 w-4" />
                            </Button>
                            {/* Edit */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                              onClick={() => setEditingUser(u)}
                              title="Edit User"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {/* Delete */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => setDeletingUser(u)}
                              title="Delete User"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit User Dialog */}
        <EditUserDialog
          user={editingUser}
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
          onSuccess={() => {}}
        />

        {/* Reset Password Dialog */}
        <Dialog
          open={!!resetUser}
          onOpenChange={(o) => { if (!o) { setResetUser(null); setNewPassword(''); } }}
        >
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                Set a new password for {resetUser?.name} ({resetUser?.username}).
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {newPassword.length > 0 && newPassword.length < 6 && (
                  <p className="text-xs text-destructive">Password must be at least 6 characters.</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setResetUser(null); setNewPassword(''); }}>
                Cancel
              </Button>
              <Button
                onClick={handleResetPassword}
                disabled={resetting || newPassword.length < 6}
              >
                {resetting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Alert Dialog */}
        <AlertDialog open={!!deletingUser} onOpenChange={(o) => !o && setDeletingUser(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the user account for{' '}
                <span className="font-semibold text-foreground">{deletingUser?.name}</span>{' '}
                ({deletingUser?.username}) and remove all their Firebase Auth & Firestore records.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeletingUser(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                onClick={handleDeleteUser}
              >
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </RoleGuard>
  );
}
