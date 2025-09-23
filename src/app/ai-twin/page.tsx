
'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const Chat = dynamic(() => import('./chat'), {
    loading: () => <Skeleton className="h-[75vh] w-full max-w-3xl mx-auto" />,
    ssr: false,
});

export default function AiTwinPage() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Your AI Twin
        </h1>
        <p className="text-muted-foreground">
          Chat with your AI Twin for personalized insights and encouragement.
        </p>
      </div>
      <Chat />
    </div>
  );
}
