
'use client';

import { users, activities } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const PortfolioClientContent = dynamic(() => import('./portfolio-client-content'), {
    loading: () => <div className="space-y-8">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-[60vh] w-full" />
    </div>,
    ssr: false
});

export default function PortfolioPage({ params }: { params: { studentId: string } }) {
  const student = users.find(u => u.id === params.studentId);

  if (!student) {
    notFound();
  }

  const approvedActivities = activities.filter(
    (act) => act.status === 'Approved' && act.studentId === student.id
  );

  const totalActivityCredits = approvedActivities.reduce(
    (sum, act) => sum + act.credits,
    0
  );

  // Grouping logic remains on the server
  const groupedActivities = approvedActivities.reduce((acc, act) => {
    const category = act.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(act);
    return acc;
  }, {} as Record<string, any[]>);


  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <PortfolioClientContent
          student={student}
          approvedActivities={approvedActivities}
          totalActivityCredits={totalActivityCredits}
          groupedActivities={groupedActivities}
      />
    </div>
  );
}
