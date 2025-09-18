
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ListPlus,
  User,
  BrainCircuit,
  MessageSquareHeart,
} from 'lucide-react';

const studentMenuItems = [
  {
    href: '/',
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
    label: 'My Portfolio',
    icon: User,
  },
  {
    href: '/interview-coach',
    label: 'Interview Coach',
    icon: BrainCircuit,
  },
  {
    href: '/career-counselor',
    label: 'AI Counselor',
    icon: MessageSquareHeart,
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

  const menuItems =
    user?.role === 'faculty' ? facultyMenuItems : studentMenuItems;

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === item.href ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
