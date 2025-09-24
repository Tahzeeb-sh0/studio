'use client';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function PortfolioRedirectPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // If user is logged in, redirect to their own portfolio
      router.replace(`/portfolio/${user.id}`);
    } else {
      // If user is not logged in, they probably tried to access /portfolio directly.
      // Redirect them to the main discovery page.
      router.replace('/');
    }
  }, [user, router]);

  return (
    <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4">Redirecting...</p>
    </div>
  );
}
