
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ListPlus,
  BrainCircuit,
  Github,
  Bot,
  Wallet,
  Trophy,
  View,
} from 'lucide-react';

const studentMenuItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/activities',
    label: 'Activity Tracker',
    icon: ListPlus,
  },
  {
    href: '/portfolio',
    label: 'Portfolio',
    icon: Wallet,
  },
  {
    href: '/leaderboard',
    label: 'Leaderboard',
    icon: Trophy,
  },
   {
    href: '/vision-board',
    label: 'Vision Board',
    icon: View,
  },
   {
    href: '/ai-twin',
    label: 'AI Twin',
    icon: Bot,
  },
  {
    href: '/interview-coach',
    label: 'Interview Coach',
    icon: BrainCircuit,
  },
  {
    href: '/github',
    label: 'GitHub',
    icon: Github,
  },
];

const facultyMenuItems = [
  {
    href: '/approvals',
    label: 'Faculty Dashboard',
    icon: LayoutDashboard,
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const menuItems = user.role === 'faculty' ? facultyMenuItems : studentMenuItems;

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'transition-all duration-300 ease-in-out hover:scale-105 hover:text-primary',
            pathname === item.href ? 'text-primary font-semibold' : 'text-foreground/70'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
