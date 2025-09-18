'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BookOpen,
  Github,
  GitPullRequest,
  GitCommit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { githubStats, student } from '@/lib/mock-data';

export default function GithubPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          GitHub Insights
        </h1>
        <p className="text-muted-foreground">
          A snapshot of your coding activity based on your connected profile.
        </p>
      </div>

      <Card className="lg:col-span-3 transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Github />
                GitHub Activity for{' '}
                <span className="text-primary">{student.githubUsername}</span>
              </CardTitle>
              <CardDescription>
                A summary of your coding contributions on GitHub.
              </CardDescription>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button asChild size="sm">
                <Link
                  href={`https://github.com/${student.githubUsername}`}
                  target="_blank"
                >
                  View Profile
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-lg bg-muted p-4">
            <div className="rounded-full bg-background p-3">
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Repositories</p>
              <p className="text-2xl font-bold">{githubStats.repositories}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg bg-muted p-4">
            <div className="rounded-full bg-background p-3">
              <GitCommit className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Commits</p>
              <p className="text-2xl font-bold">{githubStats.commits}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg bg-muted p-4">
            <div className="rounded-full bg-background p-3">
              <GitPullRequest className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pull Requests</p>
              <p className="text-2xl font-bold">{githubStats.pullRequests}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
