
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      if (user.role === 'faculty') {
        router.push('/approvals');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, router]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const user = login(email, password);
      toast({
        title: 'Login Successful!',
        description: `Welcome back, ${user.name}!`,
      });
      if (user.role === 'faculty') {
        router.push('/approvals');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
       toast({
        variant: "destructive",
        title: "Login Failed",
        description: err.message,
      });
    }
  };


  return (
    <div className="flex min-h-full items-center justify-center">
      <Card className="w-full max-w-md transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <GraduationCap className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col items-center gap-4">
            <div className="text-sm text-muted-foreground">
                <Link href="#" className="underline hover:text-primary">
                    Forgot your password?
                </Link>
            </div>
            <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/auth/signup" className="font-semibold text-primary hover:underline">
                    Sign Up
                </Link>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
