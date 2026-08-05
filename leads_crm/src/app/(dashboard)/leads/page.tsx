'use client';

import { useLeads } from '@/hooks/useLeads';
import { useUsers } from '@/hooks/useUsers';
import { useAuth } from '@/providers/AuthProvider';
import { useState, useMemo } from 'react';
import { LeadStatus, LeadFilters } from '@/types/lead.types';
import { Badge } from '@/components/ui/badge';
import { LEAD_STATUS_COLORS } from '@/lib/constants';
import { formatDate, cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Search, ExternalLink, SlidersHorizontal, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';

export default function LeadsPage() {
  const { user } = useAuth();
  const { users } = useUsers();

  // Filters State
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('all');
  const [assignedTo, setAssignedTo] = useState<string>('all');
  const [country, setCountry] = useState<string>('all');
  const [service, setService] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Hook params memo
  const filterParams = useMemo<LeadFilters>(() => {
    const params: LeadFilters = {
      status: status === 'all' ? 'all' : (status as LeadStatus),
      assignedTo: assignedTo === 'all' ? undefined : assignedTo,
      country: country === 'all' ? undefined : country,
      requiredService: service === 'all' ? undefined : service,
      search: search.trim() !== '' ? search : undefined,
    };
    return params;
  }, [status, assignedTo, country, service, search]);

  const { leads, loading, error } = useLeads(filterParams);

  // Derive unique countries and services for filter dropdowns from leads
  // Since we want these filters to be based on actual data:
  const { countries, services } = useMemo(() => {
    const countriesSet = new Set<string>();
    const servicesSet = new Set<string>();

    leads.forEach((l) => {
      if (l.country) countriesSet.add(l.country);
      if (l.requiredService) servicesSet.add(l.requiredService);
    });

    return {
      countries: Array.from(countriesSet).sort(),
      services: Array.from(servicesSet).sort(),
    };
  }, [leads]);

  const handleResetFilters = () => {
    setSearch('');
    setStatus('all');
    setAssignedTo('all');
    setCountry('all');
    setService('all');
  };

  const salesUsers = users.filter((u) => u.role === 'sales');

  return (
    <div className="page-container">
      <PageHeader
        title="Leads"
        description={
          user?.role === 'admin'
            ? 'View, filter, and track all team leads in real-time.'
            : 'View and update your assigned leads.'
        }
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className={cn('gap-1.5 transition-colors', showFilters && 'bg-primary/5 border-primary/30 text-primary')}
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleResetFilters}
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
          title="Reset all filters"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </PageHeader>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <Card className="premium-card bg-muted/20 ring-1 ring-foreground/[0.02]">
          <CardContent className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {/* Status Filter */}
            <div className="space-y-1.5">
              <Label className="text-xs">Lead Status</Label>
              <Select value={status} onValueChange={(val) => setStatus(val ?? 'all')}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Follow Up">Follow Up</SelectItem>
                  <SelectItem value="Interested">Interested</SelectItem>
                  <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                  <SelectItem value="Converted">Converted</SelectItem>
                  <SelectItem value="Lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Admin User Filter */}
            {user?.role === 'admin' && (
              <div className="space-y-1.5">
                <Label className="text-xs">Assigned Agent</Label>
                <Select value={assignedTo} onValueChange={(val) => setAssignedTo(val ?? 'all')}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Agents" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agents</SelectItem>
                    {salesUsers.map((u) => (
                      <SelectItem key={u.uid} value={u.uid}>
                        {u.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Country Filter */}
            <div className="space-y-1.5">
              <Label className="text-xs">Country</Label>
              <Select value={country} onValueChange={(val) => setCountry(val ?? 'all')}>
                <SelectTrigger>
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Service Filter */}
            <div className="space-y-1.5">
              <Label className="text-xs">Required Service</Label>
              <Select value={service} onValueChange={(val) => setService(val ?? 'all')}>
                <SelectTrigger>
                  <SelectValue placeholder="All Services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {services.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search box */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search leads by company, email, phone, website or required service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-11 premium-input bg-background"
        />
      </div>

      {error && (
        <div className="bg-destructive/8 text-destructive text-xs p-3 rounded-lg border border-destructive/20 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
          Unable to load leads. Please refresh and try again.
        </div>
      )}

      {/* Leads Table */}
      <Card className="premium-card overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex h-52 flex-col items-center justify-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Loading leads…</p>
            </div>
          ) : leads.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No leads found"
              description="Try adjusting your search or filter criteria to find what you're looking for."
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact Info</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Service</TableHead>
                    {user?.role === 'admin' && <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Agent</TableHead>}
                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</TableHead>
                    <TableHead className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="font-semibold text-sm text-foreground max-w-[160px] truncate">{lead.company}</TableCell>
                      <TableCell className="text-sm text-foreground">{lead.contactPerson}</TableCell>
                      <TableCell className="space-y-0.5">
                        <div className="text-xs text-muted-foreground">{lead.email}</div>
                        <div className="text-xs text-muted-foreground">{lead.phone}</div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[120px] truncate">{lead.requiredService}</TableCell>
                      {user?.role === 'admin' && (
                        <TableCell className="text-xs font-medium text-foreground">{lead.assignedToName}</TableCell>
                      )}
                      <TableCell>
                        <Badge variant="outline" className={cn('text-[11px] font-medium border', LEAD_STATUS_COLORS[lead.status])}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(lead.assignedDate)}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/leads/${lead.id}`}>
                          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-primary hover:text-primary hover:bg-primary/5">
                            View <ExternalLink className="h-3 w-3" />
                          </Button>
                        </Link>
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
  );
}
