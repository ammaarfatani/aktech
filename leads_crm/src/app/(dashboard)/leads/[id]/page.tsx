'use client';

import { useAuth } from '@/providers/AuthProvider';
import { leadsService } from '@/services/leads.service';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Lead, LeadStatus, Currency } from '@/types/lead.types';
import { Note } from '@/types/note.types';
import { db } from '@/firebase/config';
import {
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { leadConverter, noteConverter } from '@/firebase/converters';
import { toast } from '@/components/ui/toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { LEAD_STATUS_COLORS, CURRENCIES } from '@/lib/constants';
import { formatDate, formatDistanceToNow, formatCurrency } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { conversionSchema, ConversionFormData } from '@/lib/validations/lead.schema';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Loader2,
  ChevronLeft,
  Phone,
  Mail,
  Globe,
  Tag,
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  History,
  CheckCircle,
  Briefcase,
} from 'lucide-react';
import Link from 'next/link';

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: leadId } = use(params);
  const { user } = useAuth();
  const router = useRouter();

  // Firestore Real-time subscriptions state
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Notes Form State
  const [noteMessage, setNoteMessage] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Conversion Dialog State
  const [conversionOpen, setConversionOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<LeadStatus | null>(null);

  // Form for Conversion
  const {
    register,
    handleSubmit,
    setValue,
    reset: resetConversionForm,
    formState: { errors, isSubmitting: isConverting },
  } = useForm<ConversionFormData>({
    resolver: zodResolver(conversionSchema),
    defaultValues: {
      currency: 'PKR',
    }
  });

  // Subscribe to Lead, Notes, and Timeline in Real-time
  useEffect(() => {
    if (!leadId || !user) return;

    // Lead Sub
    const leadRef = doc(db, 'leads', leadId).withConverter(leadConverter);
    const unsubLead = onSnapshot(
      leadRef,
      (snap) => {
        if (!snap.exists()) {
          toast.add({
            title: 'Not Found',
            description: 'Lead does not exist or has been deleted.',
            type: 'error',
          });
          router.push('/leads');
          return;
        }
        
        const data = snap.data();
        // Security check: sales user can only view their own assigned leads
        if (user.role === 'sales' && data.assignedTo !== user.uid) {
          toast.add({
            title: 'Unauthorized',
            description: 'Access denied.',
            type: 'error',
          });
          router.push('/leads');
          return;
        }

        setLead(data);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );

    // Notes Sub
    const notesQ = query(
      collection(db, 'leads', leadId, 'notes').withConverter(noteConverter),
      orderBy('createdAt', 'desc')
    );
    const unsubNotes = onSnapshot(notesQ, (snap) => {
      setNotes(snap.docs.map((d) => d.data()));
    });

    // Timeline Sub
    const timelineQ = query(
      collection(db, 'leads', leadId, 'timeline'),
      orderBy('createdAt', 'desc')
    );
    const unsubTimeline = onSnapshot(timelineQ, (snap) => {
      setTimeline(
        snap.docs.map((d) => {
          const t = d.data();
          return {
            id: d.id,
            ...t,
            createdAt: t.createdAt ? t.createdAt.toDate() : new Date(),
          };
        })
      );
    });

    return () => {
      unsubLead();
      unsubNotes();
      unsubTimeline();
    };
  }, [leadId, user, router]);

  // Handle status update dropdown change
  const handleStatusChange = async (status: LeadStatus) => {
    if (!lead || !user) return;

    if (status === 'Converted') {
      // Open conversion dialog instead of direct update
      setUpdatingStatus(status);
      resetConversionForm({ currency: 'PKR' });
      setConversionOpen(true);
      return;
    }

    try {
      await leadsService.updateStatus(lead.id, status, user.uid, user.name);
      toast.add({
        title: 'Status Updated',
        description: `Lead status is now ${status}.`,
        type: 'success',
      });
    } catch (err: any) {
      toast.add({
        title: 'Error',
        description: err.message || 'Failed to update status.',
        type: 'error',
      });
    }
  };

  // Add Note Handler
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteMessage.trim() || !lead || !user) return;

    setIsAddingNote(true);
    try {
      await leadsService.addNote(lead.id, noteMessage.trim(), user.uid, user.name);
      setNoteMessage('');
      toast.add({
        title: 'Note Added',
        description: 'New comment successfully attached to lead.',
        type: 'success',
      });
    } catch (err: any) {
      toast.add({
        title: 'Error',
        description: err.message || 'Failed to add note.',
        type: 'error',
      });
    } finally {
      setIsAddingNote(false);
    }
  };

  // Project Conversion Submission
  const handleConversionSubmit = async (data: ConversionFormData) => {
    if (!lead || !user) return;

    try {
      await leadsService.convertProject(lead.id, {
        projectName: data.projectName,
        projectAmount: data.projectAmount,
        currency: data.currency,
        completionDate: data.completionDate,
        userCommissionPercentage: user.commissionPercentage,
        userId: user.uid,
        userName: user.name,
      });

      toast.add({
        title: 'Lead Converted!',
        description: `Successfully converted to project: ${data.projectName}`,
        type: 'success',
      });

      setConversionOpen(false);
      setUpdatingStatus(null);
    } catch (err: any) {
      toast.add({
        title: 'Conversion Failed',
        description: err.message || 'Failed to convert project.',
        type: 'error',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!lead) return null;

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link href="/leads">
          <Button variant="ghost" size="sm" className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Back to Leads
          </Button>
        </Link>
      </div>

      {/* Main Header Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{lead.company}</h2>
            <Badge variant="outline" className={LEAD_STATUS_COLORS[lead.status]}>
              {lead.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Assigned to {lead.assignedToName} on {formatDate(lead.assignedDate)}
          </p>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <Label htmlFor="status-select" className="text-xs text-muted-foreground">
            Update Status:
          </Label>
          <Select value={lead.status} onValueChange={(val) => { if (val) handleStatusChange(val as LeadStatus); }}>
            <SelectTrigger id="status-select" className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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
      </div>

      {/* Grid of detail elements */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Left column: Info card */}
        <div className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Lead Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Tag className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground leading-none">Contact Person</p>
                  <p className="font-medium mt-1">{lead.contactPerson}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground leading-none">Phone</p>
                  <p className="font-medium mt-1">{lead.phone || '—'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground leading-none">Email</p>
                  <p className="font-medium mt-1 truncate">{lead.email || '—'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground leading-none">Website</p>
                  <p className="font-medium mt-1 truncate">
                    {lead.website ? (
                      <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                        {lead.website}
                      </a>
                    ) : '—'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground leading-none">Location</p>
                  <p className="font-medium mt-1">
                    {lead.city && lead.country ? `${lead.city}, ${lead.country}` : lead.country || lead.city || '—'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground leading-none">Category & Service</p>
                  <p className="font-medium mt-1">
                    {lead.businessCategory} • {lead.requiredService}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project conversion stats if converted */}
          {lead.status === 'Converted' && (
            <Card className="border-green-200 shadow-sm bg-green-50/20">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-green-800 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" /> Project Conversion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <p className="text-[10px] text-muted-foreground leading-none">Project Name</p>
                  <p className="font-semibold text-foreground mt-1">{lead.projectName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-muted-foreground leading-none">Project Amount</p>
                    <p className="font-semibold text-foreground mt-1">
                      {formatCurrency(lead.projectAmount || 0, lead.currency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground leading-none">Completion Date</p>
                    <p className="font-semibold text-foreground mt-1">
                      {formatDate(lead.completionDate)}
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-green-200/50">
                  <p className="text-[10px] text-muted-foreground leading-none">Sales Commission ({user?.commissionPercentage}%)</p>
                  <p className="font-bold text-green-700 text-lg mt-0.5">
                    {formatCurrency(lead.commissionAmount || 0, lead.currency)}
                  </p>
                  <Badge className="mt-1" variant={lead.commissionPaid ? 'default' : 'secondary'}>
                    {lead.commissionPaid ? 'Paid' : 'Pending Payment'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Center/Right columns: Notes and Timeline tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notes Section */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Notes</CardTitle>
              <CardDescription className="text-xs">
                Add updates or logging details about calls and meetings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <Textarea
                  placeholder="Enter details here... e.g. Called client. Asked for quotation."
                  value={noteMessage}
                  onChange={(e) => setNoteMessage(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={!noteMessage.trim() || isAddingNote}>
                    {isAddingNote ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-1.5 h-4 w-4" /> Add Note
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Notes List */}
              <div className="space-y-3 pt-2">
                {notes.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">No notes added yet.</p>
                ) : (
                  <div className="space-y-3">
                    {notes.map((note) => (
                      <div key={note.id} className="bg-muted/10 rounded-xl p-3 border border-border/40 text-xs">
                        <div className="flex items-center justify-between text-muted-foreground mb-1">
                          <span className="font-semibold text-foreground">{note.createdByName}</span>
                          <span>{formatDistanceToNow(note.createdAt)}</span>
                        </div>
                        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                          {note.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Timeline / History Logs */}
          <Card className="premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold">Timeline Activity</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {timeline.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">No timeline events recorded.</p>
              ) : (
                <div className="relative border-l border-border pl-4 space-y-4 py-1 text-xs">
                  {timeline.map((item) => (
                    <div key={item.id} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                      <div className="flex items-center justify-between text-muted-foreground mb-0.5">
                        <span className="font-medium text-foreground">{item.performedByName}</span>
                        <span>{formatDistanceToNow(item.createdAt)}</span>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Project Conversion Dialog */}
      <Dialog open={conversionOpen} onOpenChange={(o) => { if (!o) { setConversionOpen(false); setUpdatingStatus(null); } }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Convert Lead to Deal</DialogTitle>
            <DialogDescription>
              Provide project detail values to generate your commission payout automatically.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleConversionSubmit)} className="space-y-4 py-2">
            {/* Project Name */}
            <div className="space-y-1.5">
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" placeholder="Mobile App / Web Redesign" {...register('projectName')} />
              {errors.projectName && <p className="text-xs text-destructive">{errors.projectName.message}</p>}
            </div>

            {/* Project Amount */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="projectAmount">Project Amount</Label>
                <Input
                  id="projectAmount"
                  type="number"
                  placeholder="50000"
                  {...register('projectAmount', { valueAsNumber: true })}
                />
                {errors.projectAmount && <p className="text-xs text-destructive">{errors.projectAmount.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  defaultValue="PKR"
                  onValueChange={(val: string | null) => {
                    if (val) setValue('currency', val as Currency, { shouldValidate: true });
                  }}
                >
                  <SelectTrigger id="currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((cur) => (
                      <SelectItem key={cur} value={cur}>
                        {cur}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.currency && <p className="text-xs text-destructive">{errors.currency.message}</p>}
              </div>
            </div>

            {/* Completion Date */}
            <div className="space-y-1.5">
              <Label htmlFor="completionDate">Target Completion Date</Label>
              <Input
                id="completionDate"
                type="date"
                onChange={(e) => {
                  if (e.target.value) {
                    setValue('completionDate', new Date(e.target.value), { shouldValidate: true });
                  }
                }}
              />
              {errors.completionDate && <p className="text-xs text-destructive">{errors.completionDate.message}</p>}
            </div>

            {/* Preview of estimated commission */}
            <div className="bg-primary/5 rounded-xl p-3 text-xs text-foreground mt-2 border border-primary/10">
              <p className="font-semibold text-primary">Automatic Commission</p>
              <p className="text-muted-foreground mt-0.5">
                Your rate of {user?.commissionPercentage || 35}% will calculate this deal earnings directly.
              </p>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => { setConversionOpen(false); setUpdatingStatus(null); }}>
                Cancel
              </Button>
              <Button type="submit" disabled={isConverting}>
                {isConverting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Converting...
                  </>
                ) : (
                  'Convert Project'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
