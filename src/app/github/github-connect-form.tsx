'use client';

import { useFormStatus } from 'react-dom';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Github, Loader2 } from 'lucide-react';

interface GithubConnectFormProps {
  errors?: {
    username?: string[];
    email?: string[];
  } | null;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Github className="mr-2 h-4 w-4" />
      )}
      Connect Account
    </Button>
  );
}

export default function GithubConnectForm({ errors }: GithubConnectFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">GitHub Username</Label>
        <Input
          id="username"
          name="username"
          placeholder="e.g., octocat"
          required
        />
        {errors?.username && (
          <p className="text-sm font-medium text-destructive">
            {errors.username[0]}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
        />
        {errors?.email && (
          <p className="text-sm font-medium text-destructive">
            {errors.email[0]}
          </p>
        )}
      </div>
      <SubmitButton />
    </div>
  );
}
