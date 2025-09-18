'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { student as defaultStudent, githubStats } from '@/lib/mock-data';
import { BookOpen, Github, GitPullRequest, GitCommit, Link2Off } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import GithubConnectForm from './github-connect-form';

export default function GithubPage() {
  const { user } = useAuth();
  const [githubUsername, setGithubUsername] = useState(user?.githubUsername || '');

  const handleConnect = (username: string, email: string) => {
    // In a real app, you'd save this to your database.
    // For now, we'll just update the state.
    setGithubUsername(username);
    console.log('Connected with email:', email);
  };
  
  const student = user || defaultStudent;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          GitHub Insights
        </h1>
        <p className="text-muted-foreground">
          A snapshot of your coding activity on GitHub.
        </p>
      </div>

      {!githubUsername ? (
        <Card className="max-w-lg mx-auto w-full transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
          <CardHeader>
            <CardTitle>Connect Your GitHub</CardTitle>
            <CardDescription>
              Enter your GitHub username and email to see your activity insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GithubConnectForm onConnect={handleConnect} />
          </CardContent>
        </Card>
      ) : (
        <Card className="lg:col-span-3 transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Github />
                  GitHub Activity for <span className="text-primary">{githubUsername}</span>
                </CardTitle>
                <CardDescription>
                  A summary of your coding contributions on GitHub.
                </CardDescription>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button onClick={() => setGithubUsername('')} variant="outline" size="sm">
                  <Link2Off className="mr-2"/>
                  Disconnect
                </Button>
                <Button asChild size="sm">
                  <Link href={`https://github.com/${githubUsername}`} target="_blank">
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
      )}
    </div>
  );
}
