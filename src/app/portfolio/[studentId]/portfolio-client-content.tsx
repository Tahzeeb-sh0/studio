
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Bot, Award } from 'lucide-react';
import { Activity, ActivityCategory, Student } from '@/lib/types';
import CoverLetterGenerator from '../cover-letter-generator';
import { format } from 'date-fns';
import { useAuth } from '@/context/auth-context';
import { academicRecord } from '@/lib/mock-data';

interface PortfolioClientContentProps {
    student: Student;
    approvedActivities: Activity[];
    totalActivityCredits: number;
    groupedActivities: Record<ActivityCategory, Activity[]>;
}

export default function PortfolioClientContent({ 
    student,
    approvedActivities,
    totalActivityCredits,
    groupedActivities,
}: PortfolioClientContentProps) {
  const { user: loggedInUser } = useAuth();
  const isOwner = loggedInUser && loggedInUser.id === student.id;

  return (
    <div className="grid gap-8 p-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="font-headline text-2xl font-semibold mb-4 border-b pb-2">Verified Achievements</h3>
              {approvedActivities.length > 0 ? (
                <Accordion type="multiple" defaultValue={Object.keys(groupedActivities)} className="w-full">
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
              ) : (
                <p className="text-muted-foreground">No approved achievements yet.</p>
              )}
            </section>
             {isOwner && (
              <section>
                <h3 className="flex items-center gap-2 font-headline text-2xl font-semibold mb-4 border-b pb-2">
                  <Bot />
                  AI Cover Letter Generator
                </h3>
                <CoverLetterGenerator studentId={student.id} studentName={student.name} />
              </section>
            )}
          </div>
          <aside className="space-y-8">
            <Card className="transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20">
                <CardHeader>
                    <CardTitle className="font-headline">Education</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold">University Name</p>
                    <p>Bachelor of Science in {student.major}</p>
                    <p className="text-sm text-muted-foreground">Expected Graduation: 2025</p>
                    {/* Note: GPA is currently mock and not student-specific */}
                    <p className="text-sm mt-2">Current GPA: {academicRecord.gpa.toFixed(2)}</p>
                </CardContent>
            </Card>
             <Card className="transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20">
                <CardHeader>
                    <CardTitle className="font-headline">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {student.skills?.map(skill => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
             <Card className="transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Activity Credits</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalActivityCredits}</div>
                <p className="text-xs text-muted-foreground">Credits from approved activities.</p>
              </CardContent>
            </Card>
          </aside>
        </div>
  )
}
