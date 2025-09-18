'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  username: z.string().min(1, {
    message: 'GitHub username is required.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

interface GithubConnectFormProps {
    onConnect: (username: string, email: string) => void;
}

export default function GithubConnectForm({ onConnect }: GithubConnectFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onConnect(values.username, values.email);
    toast({
      title: 'GitHub Account Connected!',
      description: `Now displaying stats for ${values.username}.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Username</FormLabel>
              <FormControl>
                <Input placeholder="e.g., octocat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <Github className="mr-2 h-4 w-4" />
          Connect Account
        </Button>
      </form>
    </Form>
  );
}
