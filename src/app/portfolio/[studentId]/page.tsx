
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
      <PortfolioClientContent
          student={student}
          approvedActivities={approvedActivities}
          totalActivityCredits={totalActivityCredits}
          groupedActivities={groupedActivities}
      />
    </div>
  );
}
