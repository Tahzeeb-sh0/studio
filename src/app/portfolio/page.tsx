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
import { student, academicRecord, activities, activityCategories } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Share2, Download, Bot } from 'lucide-react';
import { Activity, ActivityCategory } from '@/lib/types';
import CoverLetterGenerator from './cover-letter-generator';
import { format } from 'date-fns';

const approvedActivities = activities.filter(
  (act) => act.status === 'Approved' && act.studentId === student.id
);

const groupedActivities = activityCategories.reduce((acc, category) => {
    const categoryActivities = approvedActivities.filter(act => act.category === category);
    if (categoryActivities.length > 0) {
        acc[category] = categoryActivities;
    }
    return acc;
}, {} as Record<ActivityCategory, Activity[]>);

const skills = [
  'JavaScript', 'React', 'Node.js', 'Python', 'Data Analysis', 
  'Project Management', 'Public Speaking', 'Team Leadership'
];

export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            My Digital Portfolio
          </h1>
          <p className="text-muted-foreground">
            A verified record of your academic and co-curricular journey.
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

      <Card className="overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
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
            <div>
              <h2 className="font-headline text-4xl font-bold text-primary">
                {student.name}
              </h2>
              <p className="text-lg font-medium">{student.major}</p>
              <p className="text-muted-foreground">{student.email}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="font-headline text-2xl font-semibold mb-4 border-b pb-2">Verified Achievements</h3>
              <Accordion type="multiple" defaultValue={Object.keys(groupedActivities)}>
                {Object.entries(groupedActivities).map(([category, acts]) => (
                  <AccordionItem key={category} value={category}>
                    <AccordionTrigger className="font-headline text-lg">{category}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-4 pl-2">
                        {acts.map(act => (
                          <li key={act.id} className="border-l-2 border-primary pl-4">
                            <p className="font-semibold">{act.title}</p>
                            <p className="text-sm text-muted-foreground">{act.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Completed on: {format(act.date, 'PPP')}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
             <section>
              <h3 className="flex items-center gap-2 font-headline text-2xl font-semibold mb-4 border-b pb-2">
                <Bot />
                AI Cover Letter Generator
              </h3>
              <CoverLetterGenerator />
            </section>
          </div>
          <aside className="space-y-8">
            <Card className="transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
                <CardHeader>
                    <CardTitle className="font-headline">Education</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold">University Name</p>
                    <p>Bachelor of Science in {student.major}</p>
                    <p className="text-sm text-muted-foreground">Expected Graduation: 2025</p>
                    <p className="text-sm mt-2">Current GPA: {academicRecord.gpa.toFixed(2)}</p>
                </CardContent>
            </Card>
             <Card className="transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
                <CardHeader>
                    <CardTitle className="font-headline">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
          </aside>
        </div>
      </Card>
    </div>
  );
}
