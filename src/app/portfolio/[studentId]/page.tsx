
import { users, activities } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import PortfolioClientContent from './portfolio-client-content';

export default async function PortfolioPage({ params }: { params: { studentId: string } }) {
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
