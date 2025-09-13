
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
  ClipboardCheck,
  User,
  Sparkles,
  GraduationCap,
  LogOut,
  FilePenLine,
  MessageCircleQuestion,
  UserPlus,
  LogIn,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

const studentMenuItems = [
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
    href: '/portfolio',
    label: 'My Portfolio',
    icon: User,
  },
  {
    href: '/summarizer',
    label: 'AI Summarizer',
    icon: Sparkles,
  },
  {
    href: '/interview-coach',
    label: 'Interview Coach',
    icon: MessageCircleQuestion,
  },
];

const facultyMenuItems = [
  {
    href: '/approvals',
    label: 'Faculty Dashboard',
    icon: ClipboardCheck,
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  const menuItems = user?.role === 'faculty' ? facultyMenuItems : studentMenuItems;

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="font-headline text-xl font-semibold text-primary group-data-[collapsible=icon]:hidden">
            AchieveMe
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {user && (
          <SidebarMenu>
            {menuItems.map((item) => (
               <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
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
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          {!user ? (
            <>
              <SidebarMenuItem>
                <Link href="/auth/signup">
                  <SidebarMenuButton variant="ghost" tooltip="Sign Up">
                    <UserPlus />
                    <span>Sign Up</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/auth/login">
                  <SidebarMenuButton variant="ghost" tooltip="Login">
                    <LogIn />
                    <span>Login</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </>
          ) : (
             <SidebarMenuItem>
                <SidebarMenuButton variant="ghost" tooltip="Logout" onClick={logout}>
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
