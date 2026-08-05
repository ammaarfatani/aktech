'use client';

import { Lead } from '@/types/lead.types';
import { Commission } from '@/types/commission.types';
import { useSalesNotes } from '@/hooks/useSalesNotes';
import { StatsCard } from './StatsCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ListChecks,
  PhoneCall,
  CalendarDays,
  CheckCircle2,
  Send,
  Sparkles,
  XCircle,
  MessageSquare,
  ChevronRight,
  Phone,
  Mail,
  CheckSquare,
  ArrowUpRight,
  Clock,
  Briefcase,
  FileText,
  Flame,
} from 'lucide-react';
import Link from 'next/link';
import { formatDate, formatDistanceToNow, formatCurrency } from '@/lib/utils';
import { LEAD_STATUS_COLORS } from '@/lib/constants';

interface SalesDashboardProps {
  leads: Lead[];
  commissions: Commission[];
}

export function SalesDashboard({ leads, commissions }: SalesDashboardProps) {
  const { notes, loading: loadingNotes } = useSalesNotes(5);

  // 1. 7 Metric Card Counts (Strictly sales user's assigned leads)
  const assignedLeadsCount = leads.length;
  const contactedCount = leads.filter((l) => l.status === 'Contacted').length;
  const followUpCount = leads.filter((l) => l.status === 'Follow Up').length;
  const interestedCount = leads.filter((l) => l.status === 'Interested').length;
  const proposalSentCount = leads.filter((l) => l.status === 'Proposal Sent').length;
  const convertedCount = leads.filter((l) => l.status === 'Converted').length;
  const lostCount = leads.filter((l) => l.status === 'Lost').length;

  // Wallet / Commission summary
  const totalEarnings = commissions.reduce((sum, c) => sum + c.amount, 0);
  const pendingAmount = commissions
    .filter((c) => c.status === 'pending')
    .reduce((sum, c) => sum + c.amount, 0);

  // 2. Data for Today's Tasks
  const todaysTasks = leads
    .filter((l) => ['New', 'Follow Up', 'Interested', 'Proposal Sent'].includes(l.status))
    .slice(0, 5)
    .map((lead) => {
      let taskAction = 'Follow-Up Call Required';
      let badgeColor = 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400';

      if (lead.status === 'New') {
        taskAction = 'Initial Contact & Discovery';
        badgeColor = 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400';
      } else if (lead.status === 'Interested') {
        taskAction = 'Prepare & Send Proposal';
        badgeColor = 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400';
      } else if (lead.status === 'Proposal Sent') {
        taskAction = 'Follow Up on Sent Proposal';
        badgeColor = 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400';
      }

      return {
        id: lead.id,
        company: lead.company,
        contactPerson: lead.contactPerson,
        phone: lead.phone,
        service: lead.requiredService,
        status: lead.status,
        taskAction,
        badgeColor,
      };
    });

  // 3. Recent Leads (assigned to current sales user)
  const recentLeads = leads.slice(0, 5);

  // 4. Upcoming Follow Ups
  const upcomingFollowUps = leads
    .filter((l) => l.status === 'Follow Up' || l.status === 'Interested')
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Commission Earnings Banner */}
      <div className="bg-card border border-primary/15 p-5 rounded-xl shadow-sm ring-1 ring-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> Sales Performance & Wallet
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time track of your converted deals and active sales pipeline.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-muted-foreground block text-[10px]">Pending Payout</span>
            <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">
              {formatCurrency(pendingAmount, 'PKR')}
            </span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <span className="text-muted-foreground block text-[10px]">Total Earned</span>
            <span className="font-bold text-green-600 dark:text-green-400 text-sm">
              {formatCurrency(totalEarnings, 'PKR')}
            </span>
          </div>
        </div>
      </div>

      {/* 7 Required Metrics Cards Grid */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
        <StatsCard
          title="Assigned"
          value={assignedLeadsCount}
          icon={ListChecks}
          description="Total Leads"
        />
        <StatsCard
          title="Contacted"
          value={contactedCount}
          icon={PhoneCall}
          description="In Touch"
        />
        <StatsCard
          title="Follow Up"
          value={followUpCount}
          icon={CalendarDays}
          description="Scheduled"
        />
        <StatsCard
          title="Interested"
          value={interestedCount}
          icon={Flame}
          description="Hot Prospects"
        />
        <StatsCard
          title="Proposal"
          value={proposalSentCount}
          icon={Send}
          description="Sent Deals"
        />
        <StatsCard
          title="Converted"
          value={convertedCount}
          icon={CheckCircle2}
          description="Closed Won"
        />
        <StatsCard
          title="Lost"
          value={lostCount}
          icon={XCircle}
          description="Closed Lost"
        />
      </div>

      {/* 4 Main Content Sections Grid */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Section 1: Today's Tasks */}
        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-primary" /> Today's Action Tasks
              </CardTitle>
              <CardDescription className="text-xs">
                Priority follow-ups and actions scheduled for your assigned pipeline.
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-[10px]">
              {todaysTasks.length} Pending
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            {todaysTasks.length === 0 ? (
              <div className="py-10 text-center text-xs text-muted-foreground">
                No pending tasks for today. Great job!
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                {todaysTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/leads/${task.id}`}
                          className="text-sm font-semibold hover:underline truncate text-foreground"
                        >
                          {task.company}
                        </Link>
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${task.badgeColor}`}>
                          {task.taskAction}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        Contact: {task.contactPerson} • {task.service}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {task.phone && (
                        <a
                          href={`tel:${task.phone}`}
                          className="h-8 w-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                          title={`Call ${task.phone}`}
                        >
                          <Phone className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <Link href={`/leads/${task.id}`}>
                        <Button size="sm" variant="ghost" className="h-8 text-xs gap-1">
                          View <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 2: Recent Leads */}
        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" /> Recent Assigned Leads
              </CardTitle>
              <CardDescription className="text-xs">
                Latest prospects assigned to you by administrators.
              </CardDescription>
            </div>
            <Link
              href="/leads"
              className="text-xs text-primary font-medium hover:underline flex items-center gap-0.5"
            >
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {recentLeads.length === 0 ? (
              <div className="py-10 text-center text-xs text-muted-foreground">
                No leads assigned to your account yet.
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                {recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/leads/${lead.id}`}
                        className="text-sm font-semibold hover:underline block truncate text-foreground"
                      >
                        {lead.company}
                      </Link>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {lead.contactPerson} • {lead.requiredService}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant="outline" className={LEAD_STATUS_COLORS[lead.status]}>
                        {lead.status}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground hidden sm:inline">
                        {formatDate(lead.assignedDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 3: Recent Notes */}
        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" /> My Recent Activity Notes
              </CardTitle>
              <CardDescription className="text-xs">
                Latest updates and call logs recorded across your leads.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loadingNotes ? (
              <div className="py-10 text-center text-xs text-muted-foreground">
                Loading notes...
              </div>
            ) : notes.length === 0 ? (
              <div className="py-10 text-center text-xs text-muted-foreground">
                No notes recorded yet. Add notes on lead detail pages.
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                {notes.map((note) => {
                  const lead = leads.find((l) => l.id === note.leadId);
                  const companyName = lead ? lead.company : 'Lead';

                  return (
                    <div key={note.id} className="p-4 hover:bg-muted/10 transition-colors">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <Link
                          href={`/leads/${note.leadId}`}
                          className="font-semibold text-foreground hover:underline truncate"
                        >
                          {companyName}
                        </Link>
                        <span className="text-[10px] text-muted-foreground shrink-0">
                          {formatDistanceToNow(note.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        "{note.message}"
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 4: Upcoming Follow Ups */}
        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Upcoming Follow-Ups
              </CardTitle>
              <CardDescription className="text-xs">
                Active leads in Follow Up or Interested stage awaiting response.
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-[10px]">
              {upcomingFollowUps.length} Active
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            {upcomingFollowUps.length === 0 ? (
              <div className="py-10 text-center text-xs text-muted-foreground">
                No active follow-ups scheduled.
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                {upcomingFollowUps.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/leads/${lead.id}`}
                        className="text-sm font-semibold hover:underline block truncate text-foreground"
                      >
                        {lead.company}
                      </Link>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {lead.contactPerson} {lead.phone ? `• ${lead.phone}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className={LEAD_STATUS_COLORS[lead.status]}>
                        {lead.status}
                      </Badge>
                      <Link href={`/leads/${lead.id}`}>
                        <Button size="sm" variant="outline" className="h-8 text-xs">
                          Follow Up
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
