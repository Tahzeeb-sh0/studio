'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
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
  Link2Off,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import GithubConnectForm from './github-connect-form';
import { verifyGithubAction } from './actions';

const initialState = {
  message: '',
  user: null,
  errors: null,
};

interface GithubStats {
  username: string;
  repositories: number;
  commits: number;
  pullRequests: number;
}

export default function GithubPage() {
  const [state, formAction] = useFormState(verifyGithubAction, initialState);
  const [githubStats, setGithubStats] = useState<GithubStats | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message === 'success' && state.user) {
      setGithubStats(state.user);
      toast({
        title: 'GitHub Account Connected!',
        description: `Now displaying stats for ${state.user.username}.`,
      });
    } else if (state.message && state.message !== 'success') {
      toast({
        variant: 'destructive',
        title: 'Verification Failed',
        description: state.errors?.username?.[0] || 'An unknown error occurred.',
      });
    }
  }, [state, toast]);

  const handleDisconnect = () => {
    setGithubStats(null);
    // In a real app, you'd also clear this from the user's database record.
    toast({
      title: 'GitHub Account Disconnected',
    });
  };

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

      {!githubStats ? (
        <Card className="max-w-lg mx-auto w-full transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
          <CardHeader>
            <CardTitle>Connect Your GitHub</CardTitle>
            <CardDescription>
              Enter your GitHub username and email to see your activity
              insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction}>
              <GithubConnectForm errors={state.errors} />
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="lg:col-span-3 transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Github />
                  GitHub Activity for{' '}
                  <span className="text-primary">{githubStats.username}</span>
                </CardTitle>
                <CardDescription>
                  A summary of your coding contributions on GitHub.
                </CardDescription>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button
                  onClick={handleDisconnect}
                  variant="outline"
                  size="sm"
                >
                  <Link2Off className="mr-2" />
                  Disconnect
                </Button>
                <Button asChild size="sm">
                  <Link
                    href={`https://github.com/${githubStats.username}`}
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
      )}
    </div>
  );
}
