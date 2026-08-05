'use client';

import { useActivityLog } from '@/hooks/useActivityLog';
import { RoleGuard } from '@/components/shared/RoleGuard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, Activity } from 'lucide-react';
import { formatDate, formatDistanceToNow } from '@/lib/utils';
import { ActivityAction } from '@/types/activity.types';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';

const ACTION_DESCRIPTIONS: Record<ActivityAction, string> = {
  lead_assigned: 'Lead Assigned / Bulk Import',
  lead_created: 'New Lead Created',
  status_changed: 'Lead Status Updated',
  note_added: 'Client Note Added',
  lead_converted: 'Lead Converted to Project',
  commission_generated: 'Commission Generated',
  user_created: 'New Sales User Created',
  user_updated: 'User Profile Updated',
  lead_updated: 'Lead Details Updated',
};

export default function ActivityLogPage() {
  const { logs, loading, error } = useActivityLog(100); // Fetch last 100 entries

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="page-container">
        <PageHeader
          title="Global Activity Log"
          description="Audit history tracking every user action, status modification, and system creation."
        />

        {error && (
          <div className="bg-destructive/8 text-destructive text-xs p-3 rounded-lg border border-destructive/20 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
            Unable to load activity logs. Please refresh and try again.
          </div>
        )}

        <Card className="premium-card overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-sm font-semibold">Audit Logs</CardTitle>
              <CardDescription className="text-xs">
                A system-wide history of operations.
              </CardDescription>
            </div>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex h-40 flex-col items-center justify-center gap-2">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-xs text-muted-foreground">Loading audit logs…</p>
              </div>
            ) : logs.length === 0 ? (
              <EmptyState
                icon={Activity}
                title="No activity records"
                description="Activity will appear here as the team performs actions in the CRM."
              />
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Action</TableHead>
                      <TableHead>Performed By</TableHead>
                      <TableHead>Event Details</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => (
                      <TableRow key={log.id} className="text-xs hover:bg-muted/20 transition-colors">
                      <TableCell className="font-semibold text-foreground">
                        {ACTION_DESCRIPTIONS[log.action] || log.action}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-foreground">{log.userName}</span>
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground">
                        {log.leadId && `Lead: ${log.leadId.substring(0, 8)}…`}
                        {log.metadata && Object.keys(log.metadata).length > 0 && (
                          <span className="ml-1">{JSON.stringify(log.metadata)}</span>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="text-xs text-foreground">{formatDate(log.createdAt)}</div>
                        <div className="text-[10px] text-primary">{formatDistanceToNow(log.createdAt)}</div>
                      </TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}
