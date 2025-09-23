
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { jobs } from '@/lib/mock-data';
import { Search, MapPin, Briefcase, Clock, X, Building, Calendar, ClipboardList } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Job } from '@/lib/types';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleApply = (jobTitle: string) => {
    toast({
        title: 'Application Submitted!',
        description: `Your application for ${jobTitle} has been sent.`,
    });
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Job & Internship Portal
        </h1>
        <p className="text-muted-foreground">
          Find your next opportunity. Explore roles from our network of partner companies.
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by title, company, or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
              {searchTerm && (
                  <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setSearchTerm('')}>
                      <X className="h-4 w-4" />
                  </Button>
              )}
            </div>
        </CardContent>
      </Card>

        {filteredJobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <Dialog key={job.id}>
                    <DialogTrigger asChild>
                        <Card className="flex flex-col cursor-pointer hover:border-primary transition-colors duration-200">
                            <CardHeader>
                                <CardTitle className="text-lg">{job.title}</CardTitle>
                                <CardDescription className="text-primary font-medium">{job.company}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Briefcase className="h-4 w-4" />
                                    <span>{job.type}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {job.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-4">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>Posted {formatDistanceToNow(job.datePosted, { addSuffix: true })}</span>
                                </div>
                                <Button variant="outline" className="w-full">View Details</Button>
                            </CardFooter>
                        </Card>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="font-headline text-2xl">{job.title}</DialogTitle>
                            <DialogDescription className="text-base">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-muted-foreground mt-2">
                                    <div className="flex items-center gap-2"><Building className="h-4 w-4 text-primary" />{job.company}</div>
                                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{job.location}</div>
                                    <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" />{job.type}</div>
                                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />Posted {formatDistanceToNow(job.datePosted, { addSuffix: true })}</div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                            <div className="flex flex-wrap gap-2">
                                {job.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><ClipboardList /> Description</h3>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.description}</p>
                            </div>
                            {job.responsibilities && job.responsibilities.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Responsibilities</h3>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                        {job.responsibilities.map((resp, index) => <li key={index}>{resp}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-2">
                             <DialogTrigger asChild>
                                <Button type="button" variant="secondary">Close</Button>
                            </DialogTrigger>
                             <DialogTrigger asChild>
                                <Button onClick={() => handleApply(job.title)}>Apply Now</Button>
                            </DialogTrigger>
                        </div>
                    </DialogContent>
                </Dialog>
              ))}
          </div>
        ) : (
            <div className="text-center py-16">
                <h3 className="text-xl font-semibold">No Jobs Found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search term. New opportunities are added daily!</p>
            </div>
        )}
    </div>
  );
}
