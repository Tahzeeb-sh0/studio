
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

export default function LoginPage() {
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
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
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
