'use client';

import { useState, useMemo } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { useAuth } from '@/providers/AuthProvider';
import { uploadService } from '@/services/upload.service';
import { RoleGuard } from '@/components/shared/RoleGuard';
import { toast } from '@/components/ui/toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Loader2,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  Users,
  CheckSquare,
  Square,
  Trash2,
  ListFilter,
  ArrowRight,
} from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { LeadCSVRow } from '@/types/lead.types';
import { PageHeader } from '@/components/shared/PageHeader';

export interface ValidatedLeadRow extends LeadCSVRow {
  _id: string;
  _company: string;
  _contactPerson: string;
  _phone: string;
  _email: string;
  _website: string;
  _businessCategory: string;
  _country: string;
  _city: string;
  _requiredService: string;
  _isValid: boolean;
  _warningMessage?: string;
}

export default function UploadLeadsPage() {
  const { user: currentUser } = useAuth();
  const { users, loading: loadingUsers } = useUsers();

  const [file, setFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<ValidatedLeadRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [assignedTo, setAssignedTo] = useState<string>('');
  const [rowTargetUser, setRowTargetUser] = useState<Record<string, string>>({});
  
  const [filterMode, setFilterMode] = useState<'all' | 'valid' | 'warnings'>('all');
  const [isParsing, setIsParsing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [assigningRowId, setAssigningRowId] = useState<string | null>(null);

  const activeSalesUsers = useMemo(
    () => users.filter((u) => u.role === 'sales' && u.active),
    [users]
  );

  // Validate parsed rows
  const validateRows = (rawRows: LeadCSVRow[]): ValidatedLeadRow[] => {
    return rawRows.map((row, idx) => {
      const _id = `row-${idx}-${Date.now()}`;
      const _company = (row.Company || row.company || '').toString().trim();
      const _contactPerson = (row['Contact Person'] || row.contactPerson || '').toString().trim();
      const _phone = (row.Phone || row.phone || '').toString().trim();
      const _email = (row.Email || row.email || '').toString().trim();
      const _website = (row.Website || row.website || '').toString().trim();
      const _businessCategory = (
        row['Business Category'] ||
        row.businessCategory ||
        row['Business Type'] ||
        row.businessType ||
        ''
      ).toString().trim();
      const _country = (row.Country || row.country || '').toString().trim();
      const _city = (row.City || row.city || '').toString().trim();
      const _requiredService = (
        row['Required Service'] ||
        row.requiredService ||
        row['Service Required'] ||
        row.serviceRequired ||
        ''
      ).toString().trim();

      let _isValid = true;
      let _warningMessage: string | undefined;

      if (!_company && !_contactPerson && !_phone && !_email) {
        _isValid = false;
        _warningMessage = 'Empty contact details';
      } else if (!_company && !_contactPerson) {
        _isValid = false;
        _warningMessage = 'Missing company & contact name';
      } else if (!_email && !_phone) {
        _isValid = true;
        _warningMessage = 'Missing phone & email';
      }

      return {
        ...row,
        _id,
        _company,
        _contactPerson,
        _phone,
        _email,
        _website,
        _businessCategory,
        _country,
        _city,
        _requiredService,
        _isValid,
        _warningMessage,
      };
    });
  };

  // File Change Handler (CSV & Excel)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setParsedRows([]);
    setSelectedIds([]);
    setIsParsing(true);

    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();

    const handleError = () => {
      toast.add({
        title: 'Parsing Error',
        description: 'Failed to parse file. Please verify CSV/Excel structure.',
        type: 'error',
      });
      setFile(null);
      setIsParsing(false);
    };

    if (fileExtension === 'csv') {
      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const validated = validateRows(results.data as LeadCSVRow[]);
          setParsedRows(validated);
          // Select all valid rows by default
          setSelectedIds(validated.filter((r) => r._isValid).map((r) => r._id));
          setIsParsing(false);
        },
        error: handleError,
      });
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const bstr = evt.target?.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws) as LeadCSVRow[];
          const validated = validateRows(data);
          setParsedRows(validated);
          setSelectedIds(validated.filter((r) => r._isValid).map((r) => r._id));
        } catch {
          handleError();
        } finally {
          setIsParsing(false);
        }
      };
      reader.onerror = handleError;
      reader.readAsBinaryString(selectedFile);
    } else {
      toast.add({
        title: 'Unsupported Format',
        description: 'Please upload a valid CSV or Excel spreadsheet (.csv, .xlsx, .xls).',
        type: 'warning',
      });
      setFile(null);
      setIsParsing(false);
    }
  };

  // Selection Handlers
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredRows.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRows.map((r) => r._id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Filtered rows for preview table
  const filteredRows = useMemo(() => {
    if (filterMode === 'valid') return parsedRows.filter((r) => r._isValid && !r._warningMessage);
    if (filterMode === 'warnings') return parsedRows.filter((r) => !r._isValid || !!r._warningMessage);
    return parsedRows;
  }, [parsedRows, filterMode]);

  // Validation Stats
  const validCount = parsedRows.filter((r) => r._isValid && !r._warningMessage).length;
  const warningCount = parsedRows.filter((r) => !r._isValid || !!r._warningMessage).length;

  // 1. Assign All / Selected Leads
  const handleBatchImport = async (targetUserUid: string, rowsToAssign: ValidatedLeadRow[]) => {
    if (!currentUser || !targetUserUid || rowsToAssign.length === 0) return;

    const targetUser = users.find((u) => u.uid === targetUserUid);
    if (!targetUser) {
      toast.add({
        title: 'User Not Found',
        description: 'Selected sales representative not found.',
        type: 'error',
      });
      return;
    }

    setIsImporting(true);
    try {
      const count = await uploadService.importLeads(
        rowsToAssign,
        targetUser.uid,
        targetUser.name,
        currentUser.uid,
        currentUser.name
      );

      toast.add({
        title: 'Leads Assigned!',
        description: `Successfully assigned ${count} lead(s) to ${targetUser.name}. They will appear immediately on their dashboard.`,
        type: 'success',
      });

      // Remove assigned rows from state
      const assignedIdsSet = new Set(rowsToAssign.map((r) => r._id));
      const remaining = parsedRows.filter((r) => !assignedIdsSet.has(r._id));
      
      setParsedRows(remaining);
      setSelectedIds((prev) => prev.filter((id) => !assignedIdsSet.has(id)));

      if (remaining.length === 0) {
        setFile(null);
        setAssignedTo('');
      }
    } catch (err: any) {
      toast.add({
        title: 'Import Failed',
        description: err.message || 'Error occurred while assigning leads.',
        type: 'error',
      });
    } finally {
      setIsImporting(false);
    }
  };

  // 2. Assign Single Lead Row
  const handleAssignSingleRow = async (row: ValidatedLeadRow) => {
    const targetUid = rowTargetUser[row._id] || assignedTo;
    if (!targetUid) {
      toast.add({
        title: 'Select Agent',
        description: 'Please select a sales representative for this lead.',
        type: 'warning',
      });
      return;
    }

    setAssigningRowId(row._id);
    await handleBatchImport(targetUid, [row]);
    setAssigningRowId(null);
  };

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="page-container">
        <PageHeader
          title="Lead Upload & Assignment"
          description="Bulk import prospects from CSV or Excel files, validate rows, and assign to sales users."
        />

        {/* Upload Dropzone Card */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-primary" /> Spreadsheet Source
            </CardTitle>
            <CardDescription className="text-xs">
              Upload `.csv`, `.xlsx`, or `.xls`. Standard fields: Company, Contact Person, Phone, Email, Website, Business Category, Country, City, Required Service.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center bg-muted/5 hover:bg-muted/10 transition-colors relative cursor-pointer">
              <input
                type="file"
                accept=".csv, .xlsx, .xls"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isParsing || isImporting}
              />
              {isParsing ? (
                <div className="flex flex-col items-center gap-2 py-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm font-medium text-foreground">Parsing & Validating data...</p>
                </div>
              ) : file ? (
                <div className="flex items-center justify-between w-full max-w-md bg-background border border-border p-3 rounded-lg">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileSpreadsheet className="h-6 w-6 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB • {parsedRows.length} rows parsed
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 text-xs text-muted-foreground hover:text-destructive shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setParsedRows([]);
                      setSelectedIds([]);
                    }}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center py-4">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Click or drag file to upload</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Supports CSV, XLSX, XLS spreadsheets</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Validation & Preview Section */}
        {parsedRows.length > 0 && (
          <Card className="premium-card overflow-hidden space-y-0">
            {/* Header & Controls */}
            <CardHeader className="border-b border-border/60 bg-muted/5 pb-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-primary" /> Data Validation & Preview
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Review parsed rows, select target leads, and assign to team members.
                  </CardDescription>
                </div>

                {/* Validation Stats Badges */}
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <Badge variant="outline" className="bg-background">
                    Total: {parsedRows.length}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Valid: {validCount}
                  </Badge>
                  {warningCount > 0 && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Warnings: {warningCount}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Assignment Controls Bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-border/60 mt-4">
                {/* Filter Mode Selector */}
                <div className="flex items-center gap-1.5 bg-background border border-border p-1 rounded-lg">
                  <Button
                    size="sm"
                    variant={filterMode === 'all' ? 'secondary' : 'ghost'}
                    className="h-7 text-xs px-2.5"
                    onClick={() => setFilterMode('all')}
                  >
                    All ({parsedRows.length})
                  </Button>
                  <Button
                    size="sm"
                    variant={filterMode === 'valid' ? 'secondary' : 'ghost'}
                    className="h-7 text-xs px-2.5"
                    onClick={() => setFilterMode('valid')}
                  >
                    Valid Only ({validCount})
                  </Button>
                  <Button
                    size="sm"
                    variant={filterMode === 'warnings' ? 'secondary' : 'ghost'}
                    className="h-7 text-xs px-2.5"
                    onClick={() => setFilterMode('warnings')}
                  >
                    Warnings ({warningCount})
                  </Button>
                </div>

                {/* Bulk Assign Controls */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Select Agent for Bulk Assign */}
                  <Select value={assignedTo} onValueChange={(val) => setAssignedTo(val ?? '')}>
                    <SelectTrigger className="w-[180px] h-9 text-xs">
                      <SelectValue placeholder="Select Sales Agent..." />
                    </SelectTrigger>
                    <SelectContent>
                      {activeSalesUsers.map((u) => (
                        <SelectItem key={u.uid} value={u.uid}>
                          {u.name} ({u.username})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Assign Selected Leads Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!assignedTo || selectedIds.length === 0 || isImporting}
                    onClick={() => {
                      const rows = parsedRows.filter((r) => selectedIds.includes(r._id));
                      handleBatchImport(assignedTo, rows);
                    }}
                    className="h-9 text-xs gap-1.5"
                  >
                    <Users className="h-3.5 w-3.5" />
                    Assign Selected ({selectedIds.length})
                  </Button>

                  {/* Assign ALL Uploaded Leads Button */}
                  <Button
                    size="sm"
                    disabled={!assignedTo || parsedRows.length === 0 || isImporting}
                    onClick={() => handleBatchImport(assignedTo, parsedRows)}
                    className="h-9 text-xs gap-1.5"
                  >
                    {isImporting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <UserPlus className="h-3.5 w-3.5" />
                    )}
                    Assign ALL Leads ({parsedRows.length})
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Preview Data Table */}
            <CardContent className="p-0">
              <div className="overflow-x-auto max-h-[480px]">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10 shadow-xs">
                    <TableRow>
                      <TableHead className="w-10">
                        <button
                          type="button"
                          onClick={toggleSelectAll}
                          className="flex items-center justify-center text-muted-foreground hover:text-foreground"
                          title="Select / Deselect All"
                        >
                          {selectedIds.length === filteredRows.length && filteredRows.length > 0 ? (
                            <CheckSquare className="h-4 w-4 text-primary" />
                          ) : (
                            <Square className="h-4 w-4" />
                          )}
                        </button>
                      </TableHead>
                      <TableHead className="w-24">Validation</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Phone / Email</TableHead>
                      <TableHead>Business Category</TableHead>
                      <TableHead>Country / City</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead className="text-right min-w-[200px]">Assign Single Lead</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRows.map((row) => {
                      const isSelected = selectedIds.includes(row._id);
                      const targetUid = rowTargetUser[row._id] || assignedTo;

                      return (
                        <TableRow
                          key={row._id}
                          className={isSelected ? 'bg-primary/5' : 'hover:bg-muted/10'}
                        >
                          {/* Row Checkbox */}
                          <TableCell className="w-10">
                            <button
                              type="button"
                              onClick={() => toggleSelectRow(row._id)}
                              className="flex items-center justify-center text-muted-foreground hover:text-foreground"
                            >
                              {isSelected ? (
                                <CheckSquare className="h-4 w-4 text-primary" />
                              ) : (
                                <Square className="h-4 w-4" />
                              )}
                            </button>
                          </TableCell>

                          {/* Validation Badge */}
                          <TableCell>
                            {row._isValid && !row._warningMessage ? (
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200 text-[10px]"
                              >
                                Valid
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]"
                                title={row._warningMessage}
                              >
                                {row._warningMessage || 'Warning'}
                              </Badge>
                            )}
                          </TableCell>

                          {/* Company & Website */}
                          <TableCell className="font-semibold text-xs text-foreground">
                            <div>{row._company || '—'}</div>
                            {row._website && (
                              <span className="text-[10px] text-muted-foreground font-normal">
                                {row._website}
                              </span>
                            )}
                          </TableCell>

                          {/* Contact Person */}
                          <TableCell className="text-xs">{row._contactPerson || '—'}</TableCell>

                          {/* Phone / Email */}
                          <TableCell className="text-xs text-muted-foreground space-y-0.5">
                            <div>{row._phone || '—'}</div>
                            <div className="text-[10px] truncate max-w-[140px]">{row._email}</div>
                          </TableCell>

                          {/* Business Category */}
                          <TableCell className="text-xs text-muted-foreground">
                            {row._businessCategory || '—'}
                          </TableCell>

                          {/* Country / City */}
                          <TableCell className="text-xs text-muted-foreground">
                            {row._city && row._country
                              ? `${row._city}, ${row._country}`
                              : row._country || row._city || '—'}
                          </TableCell>

                          {/* Service Required */}
                          <TableCell className="text-xs font-medium">{row._requiredService || '—'}</TableCell>

                          {/* Single Lead Assign Column */}
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Select
                                value={targetUid}
                                onValueChange={(val) =>
                                  setRowTargetUser((prev) => ({ ...prev, [row._id]: val ?? '' }))
                                }
                              >
                                <SelectTrigger className="w-[130px] h-7 text-[11px]">
                                  <SelectValue placeholder="Agent" />
                                </SelectTrigger>
                                <SelectContent>
                                  {activeSalesUsers.map((u) => (
                                    <SelectItem key={u.uid} value={u.uid}>
                                      {u.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs px-2 gap-1"
                                disabled={!targetUid || assigningRowId === row._id}
                                onClick={() => handleAssignSingleRow(row)}
                                title="Assign single lead"
                              >
                                {assigningRowId === row._id ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <UserPlus className="h-3 w-3" />
                                )}
                                Assign
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </RoleGuard>
  );
}
