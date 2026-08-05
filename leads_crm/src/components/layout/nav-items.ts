import {
  Users,
  FileUp,
  DollarSign,
  Activity,
  LayoutDashboard,
  Target,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  adminOnly?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Leads', href: '/leads', icon: Target },
  { label: 'Upload Leads', href: '/upload', icon: FileUp, adminOnly: true },
  { label: 'Users', href: '/users', icon: Users, adminOnly: true },
  { label: 'Commissions', href: '/commissions', icon: DollarSign },
  { label: 'Activity Log', href: '/activity', icon: Activity, adminOnly: true },
];
