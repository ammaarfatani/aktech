'use client';

import { Lead } from '@/types/lead.types';
import { AppUser } from '@/types/user.types';
import { Commission } from '@/types/commission.types';
import { ActivityLog } from '@/types/activity.types';
import { StatsCard } from './StatsCard';
import { MonthlyRevenueChart } from './MonthlyRevenueChart';
import { LeadStatusPieChart } from './LeadStatusPieChart';
import { UserPerformanceChart } from './UserPerformanceChart';
import {
  Users,
  FileText,
  Sparkles,
  PhoneCall,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign,
  Clock,
  Heart,
  Send,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface AdminDashboardProps {
  leads: Lead[];
  users: AppUser[];
  commissions: Commission[];
  activities: ActivityLog[];
}

export function AdminDashboard({ leads, users, commissions, activities }: AdminDashboardProps) {
  // Aggregate stats
  const totalUsers = users.length;
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const contactedLeads = leads.filter((l) => l.status === 'Contacted').length;
  const followUpLeads = leads.filter((l) => l.status === 'Follow Up').length;
  const interestedLeads = leads.filter((l) => l.status === 'Interested').length;
  const proposalSentLeads = leads.filter((l) => l.status === 'Proposal Sent').length;
  const convertedLeads = leads.filter((l) => l.status === 'Converted').length;
  const lostLeads = leads.filter((l) => l.status === 'Lost').length;

  // Compute revenue and commissions from commissions collection
  const totalRevenue = commissions.reduce((sum, c) => sum + c.projectAmount, 0);
  const totalCommission = commissions.reduce((sum, c) => sum + c.amount, 0);

  // Lists
  const latestUsers = [...users]
    .sort((a, b) => (b.username > a.username ? 1 : -1))
    .slice(0, 5);
  const latestLeads = [...leads]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);
  const recentActivities = activities.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top statistics cards grid */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <StatsCard title="Total Users" value={totalUsers} icon={Users} description="Registered employees" />
        <StatsCard title="Total Leads" value={totalLeads} icon={FileText} description="Uploaded in CRM" />
        <StatsCard title="New Leads" value={newLeads} icon={Sparkles} description="Awaiting contact" />
        <StatsCard title="Contacted" value={contactedLeads} icon={PhoneCall} description="In conversation" />
        <StatsCard title="Follow Up" value={followUpLeads} icon={Clock} description="Pending response" />
        <StatsCard title="Interested" value={interestedLeads} icon={Heart} description="Warm prospects" />
        <StatsCard title="Proposal Sent" value={proposalSentLeads} icon={Send} description="Awaiting decision" />
        <StatsCard title="Converted" value={convertedLeads} icon={CheckCircle} description="Successful deals" />
        <StatsCard title="Lost" value={lostLeads} icon={XCircle} description="Unsuccessful deals" />
        <StatsCard title="Total Revenue" value={formatCurrency(totalRevenue, 'PKR')} icon={TrendingUp} description="PKR equivalent" />
        <StatsCard title="Total Commission" value={formatCurrency(totalCommission, 'PKR')} icon={DollarSign} description="Generated earnings" />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MonthlyRevenueChart commissions={commissions} />
        </div>
        <div>
          <LeadStatusPieChart leads={leads} />
        </div>
        <div className="lg:col-span-3">
          <UserPerformanceChart leads={leads} users={users} />
        </div>
      </div>

      {/* Lists Grid */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Latest Leads */}
        <Card className="premium-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Latest Leads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {latestLeads.length > 0 ? (
              latestLeads.map((lead) => (
                <div key={lead.id} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{lead.company}</p>
                    <p className="text-xs text-muted-foreground">{lead.contactPerson}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {lead.status}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">No leads available.</p>
            )}
          </CardContent>
        </Card>

        {/* Latest Users */}
        <Card className="premium-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Latest Added Users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {latestUsers.length > 0 ? (
              latestUsers.map((user) => (
                <div key={user.uid} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="text-[10px]">
                    {user.role}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">No users available.</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="premium-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex flex-col py-2 border-b border-border/50 last:border-0 last:pb-0">
                  <p className="text-sm">
                    <span className="font-medium">{activity.userName}</span>{' '}
                    <span className="text-muted-foreground">did</span>{' '}
                    <span className="font-medium text-primary">{activity.action.replace('_', ' ')}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">No recent activities.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
