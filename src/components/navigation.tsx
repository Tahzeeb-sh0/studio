
'use client';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  FilePenLine,
  ClipboardCheck,
  User,
  Sparkles,
  GraduationCap,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/activities',
    label: 'Activity Tracker',
    icon: FilePenLine,
  },
  {
    href: '/approvals',
    label: 'Faculty Approvals',
    icon: ClipboardCheck,
  },
  {
    href: '/portfolio',
    label: 'My Portfolio',
    icon: User,
  },
  {
    href: '/summarizer',
    label: 'AI Summarizer',
    icon: Sparkles,
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="font-headline text-xl font-semibold text-foreground group-data-[collapsible=icon]:hidden">
            AchieveMe
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
             <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  as="a"
                  variant="ghost"
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/login" legacyBehavior passHref>
              <SidebarMenuButton as="a" variant="ghost" tooltip="Logout">
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
