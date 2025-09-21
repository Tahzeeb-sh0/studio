
'use client';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function PortfolioPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace(`/portfolio/${user.id}`);
    } else {
      // If user is not logged in, you might want to redirect to login
      // or show a public version of the portfolio if that's a feature.
      router.replace('/auth/login');
    }
  }, [user, router]);

  return (
    <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

    