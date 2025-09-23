
'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import { Button } from '@/components/ui/button';
import { Bot, Award, Share2, Download, Github, Edit } from 'lucide-react';
import { Activity, Student } from '@/lib/types';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import { useAuth } from '@/context/auth-context';
import { academicRecord } from '@/lib/mock-data';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const CoverLetterGenerator = dynamic(() => import('../cover-letter-generator'), {
    loading: () => <Skeleton className="h-64 w-full" />,
});

const ProfileEditForm = dynamic(() => import('./profile-edit-form'), {
    loading: () => <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
    </div>
});

interface PortfolioClientContentProps {
    student: Student;
    approvedActivities: Activity[];
    totalActivityCredits: number;
    groupedActivities: Record<string, Activity[]>;
}

export default function PortfolioClientContent({ 
    student: initialStudent,
    approvedActivities,
    totalActivityCredits,
    groupedActivities,
}: PortfolioClientContentProps) {
  const { user: loggedInUser, login } = useAuth();
  const { toast } = useToast();
  const [student, setStudent] = useState(initialStudent);
  const isOwner = loggedInUser && loggedInUser.id === student.id;
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${student.name}'s Digital Portfolio`,
      text: `Check out ${student.name}'s verified achievements and portfolio.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({
          title: 'Portfolio Shared!',
          description: 'The portfolio was successfully shared.',
        });
      } catch (err) {
        console.error('Failed to share:', err);
        // Silently fail if user cancels share dialog
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: 'Link Copied!',
          description: 'The portfolio link has been copied to your clipboard.',
        });
      }).catch(err => {
          console.error('Failed to copy link: ', err);
          toast({
              variant: 'destructive',
              title: 'Failed to Copy',
              description: 'Could not copy the link to your clipboard.',
          });
      });
    }
  };

  const handleDownloadPdf = () => {
    const input = portfolioRef.current;
    if (!input) return;

    // Temporarily remove owner-only elements for PDF generation
    const elementsToHide = input.querySelectorAll('[data-pdf-hide="true"]');
    elementsToHide.forEach(el => (el as HTMLElement).style.display = 'none');

    html2canvas(input, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      onclone: (document) => {
        // Ensure fonts are loaded in the cloned document
        const head = document.head;
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        fontLinks.forEach(link => head.appendChild(link.cloneNode(true)));
      }
    }).then((canvas) => {
      // Restore hidden elements
      elementsToHide.forEach(el => (el as HTMLElement).style.display = '');

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const width = pdfWidth;
      const height = width / ratio;

      // If the content is taller than one page, split it.
      let position = 0;
      let remainingHeight = canvasHeight;

      while(remainingHeight > 0) {
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        // Calculate the height of the slice to fit one PDF page
        const pageCanvasHeight = (canvasWidth * pdfHeight) / pdfWidth;
        pageCanvas.height = Math.min(pageCanvasHeight, remainingHeight);
        
        const pageCtx = pageCanvas.getContext('2d');
        pageCtx?.drawImage(canvas, 0, position, canvasWidth, pageCanvas.height, 0, 0, canvasWidth, pageCanvas.height);
        
        const pageImgData = pageCanvas.toDataURL('image/png');
        if (position > 0) {
          pdf.addPage();
        }
        pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, (pdfWidth * pageCanvas.height) / canvasWidth);
        
        remainingHeight -= pageCanvas.height;
        position += pageCanvas.height;
      }
      
      pdf.save(`${student.name.replace(' ', '_')}_Portfolio.pdf`);
    });
  };
  
  const handleProfileUpdate = (updatedStudent: Student) => {
    setStudent(updatedStudent);
    // Also update the user in the auth context if they are the one being edited
    if (loggedInUser && loggedInUser.id === updatedStudent.id) {
        // This is a bit of a hack, in a real app you'd have a proper updateUser method in your context
        // For demo purposes, we can re-trigger a "login" to update the context state
        // This assumes your login function can update the user without password check if already logged in
        if(loggedInUser.email) {
            login(loggedInUser.email, '123456'); // Pass dummy password, logic is in auth-context
        }
    }
    setIsEditDialogOpen(false);
    toast({
        title: 'Profile Updated',
        description: 'Your profile information has been successfully updated.',
    });
  };


  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            {student.name}'s Digital Portfolio
          </h1>
          <p className="text-muted-foreground">
            A verified record of academic and co-curricular journey.
          </p>
        </div>
        <div className='flex gap-2' data-pdf-hide="true">
            {isOwner && (
                 <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <ProfileEditForm student={student} onSave={handleProfileUpdate} />
                    </DialogContent>
                </Dialog>
            )}
            <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
            </Button>
            <Button onClick={handleDownloadPdf}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
            </Button>
        </div>
      </div>
      <Card ref={portfolioRef} className="overflow-hidden">
        <div className="bg-muted/30 p-8">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-md">
                <AvatarImage src={student.avatarUrl} alt={student.name} />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
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
              <section data-pdf-hide="true">
                <h3 className="flex items-center gap-2 font-headline text-2xl font-semibold mb-4 border-b pb-2">
                  <Bot />
                  AI Cover Letter Generator
                </h3>
                <CoverLetterGenerator studentId={student.id} studentName={student.name} />
              </section>
            )}
          </div>
          <aside className="space-y-8">
            <Card>
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
             <Card>
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
             <Card>
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
      </Card>
    </>
  )
}
