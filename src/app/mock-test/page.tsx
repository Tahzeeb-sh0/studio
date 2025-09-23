
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const MockTest = dynamic(() => import('./mock-test'), {
    loading: () => <Skeleton className="h-96 w-full" />,
    ssr: false,
});


export default function MockTestPage() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          AI Mock Test Generator
        </h1>
        <p className="text-muted-foreground">
          Test your knowledge on any subject with a quick, AI-generated quiz.
        </p>
      </div>
      <MockTest />
    </div>
  );
}
