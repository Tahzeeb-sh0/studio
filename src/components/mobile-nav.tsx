
'use client';

import * as React from 'react';
import Link, { type LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, GraduationCap } from 'lucide-react';
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

export default function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  const menuItems =
    user?.role === 'faculty' ? facultyMenuItems : studentMenuItems;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground mr-2">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-bold">AchieveMe</span>
        </MobileLink>
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {menuItems?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.label}
                  </MobileLink>
                )
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(
        'transition-colors hover:text-foreground/80',
        pathname === href ? 'text-foreground' : 'text-foreground/60',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
