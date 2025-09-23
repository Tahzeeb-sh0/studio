
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
  Star,
  GitFork,
  Code,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { githubStats, student, githubProjects } from '@/lib/mock-data';

export default function GithubPage() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          GitHub Insights
        </h1>
        <p className="text-muted-foreground">
          A snapshot of your coding activity based on your connected profile.
        </p>
      </div>

      <Card className="lg:col-span-3">
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

      <div>
        <h2 className="font-headline text-2xl font-bold tracking-tight mb-4">
          Top Projects
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {githubProjects.map((project) => (
                <Card key={project.id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          {project.name.replace('achieveme', 'stuverse')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                    </CardContent>
                    <div className="p-6 pt-0 flex flex-col gap-4">
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4" />
                                {project.stars} Stars
                            </div>
                            <div className="flex items-center gap-1">
                                <GitFork className="h-4 w-4" />
                                {project.forks} Forks
                            </div>
                            <div className="flex items-center gap-1">
                                <Code className="h-4 w-4" />
                                {project.language}
                            </div>
                        </div>
                        <Button asChild variant="outline">
                            <Link href={project.url} target="_blank">
                                View on GitHub
                            </Link>
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
