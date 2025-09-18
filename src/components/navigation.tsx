
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
  Github,
  Bot,
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
    href: '/career-counselor',
    label: 'AI Counselor',
    icon: MessageSquareHeart,
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

  const menuItems =
    user?.role === 'faculty' ? facultyMenuItems : studentMenuItems;

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
