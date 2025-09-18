
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';

const studentMenuItems = [
  {
    href: '/',
    label: 'Dashboard',
  },
  {
    href: '/activities',
    label: 'Activity Tracker',
  },
  {
    href: '/portfolio',
    label: 'My Portfolio',
  },
  {
    href: '/interview-coach',
    label: 'Interview Coach',
  },
  {
    href: '/career-counselor',
    label: 'AI Counselor',
  }
];

const facultyMenuItems = [
  {
    href: '/approvals',
    label: 'Faculty Dashboard',
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const menuItems = user?.role === 'faculty' ? facultyMenuItems : studentMenuItems;

  return (
    <nav className="hidden md:flex gap-6">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-primary" : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
