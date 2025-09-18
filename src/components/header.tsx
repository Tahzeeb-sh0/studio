
'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth-context';
import Navigation from './navigation';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-headline text-xl font-semibold text-primary">
            AchieveMe
          </span>
        </Link>
        
        <div className="flex flex-1 items-center justify-between">
          {user && <Navigation />}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                 <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="ghost" size="sm">
                    <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                    <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
