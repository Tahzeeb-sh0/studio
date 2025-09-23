
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { users, academicRecord, activities, activityCategories } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Share2, Download, Github, Award } from 'lucide-react';
import { Activity, ActivityCategory } from '@/lib/types';
import { format } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PortfolioClientContent from './portfolio-client-content';

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

  const groupedActivities = activityCategories.reduce((acc, category) => {
      const categoryActivities = approvedActivities.filter(act => act.category === category);
      if (categoryActivities.length > 0) {
          acc[category] = categoryActivities;
      }
      return acc;
  }, {} as Record<ActivityCategory, Activity[]>);

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            {student.name}'s Digital Portfolio
          </h1>
          <p className="text-muted-foreground">
            A verified record of academic and co-curricular journey.
          </p>
        </div>
        <div className='flex gap-2'>
            <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share Link
            </Button>
            <Button>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
            </Button>
        </div>
      </div>

      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20">
        <div className="bg-muted/30 p-8">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <Image
              src={student.avatarUrl}
              alt={student.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-background shadow-md"
              data-ai-hint="portrait person"
            />
            <div className='flex-1'>
              <h2 className="font-headline text-4xl font-bold text-primary">
                {student.name}
              </h2>
              <p className="text-lg font-medium">{student.major}</p>
              <p className="text-muted-foreground">{student.email}</p>
            </div>
             {student.githubUsername && (
              <Button asChild variant="outline">
                <Link href={`https://github.com/${student.githubUsername}`} target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  View GitHub
                </Link>
              </Button>
            )}
          </div>
        </div>
        
        <PortfolioClientContent
            student={student}
            approvedActivities={approvedActivities}
            totalActivityCredits={totalActivityCredits}
            groupedActivities={groupedActivities}
        />
      </Card>
    </div>
  );
}
