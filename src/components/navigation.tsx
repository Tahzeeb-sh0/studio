'use client';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  FilePlus2,
  ClipboardCheck,
  Contact,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
    icon: FilePlus2,
  },
  {
    href: '/approvals',
    label: 'Faculty Approvals',
    icon: ClipboardCheck,
  },
  {
    href: '/portfolio',
    label: 'My Portfolio',
    icon: Contact,
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
        <div className="flex items-center gap-2">
          <Image
            src="/icon.svg"
            alt="AchieveMe Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <div className="flex flex-col">
            <h2 className="font-headline text-lg font-semibold text-sidebar-primary">
              AchieveMe
            </h2>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    as="a"
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
    </>
  );
}
