
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { jobs } from '@/lib/mock-data';
import { Search, MapPin, Briefcase, Clock, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');

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
                  <Card key={job.id} className="flex flex-col">
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
                          <p className="text-sm text-muted-foreground pt-2 line-clamp-3">
                              {job.description}
                          </p>
                      </CardContent>
                      <CardFooter className="flex-col items-start gap-4">
                           <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>Posted {formatDistanceToNow(job.datePosted, { addSuffix: true })}</span>
                          </div>
                          <Button className="w-full">Apply Now</Button>
                      </CardFooter>
                  </Card>
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
