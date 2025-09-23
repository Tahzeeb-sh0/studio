
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Student } from '@/lib/types';
import { allSkills, users, allMajors } from '@/lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { verifyGithubUsername } from '@/ai/flows/github-verifier';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileEditFormProps {
  student: Student;
  onSave: (updatedStudent: Student) => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  major: z.string({ required_error: 'Please select a major.' }),
  year: z.coerce.number().min(1).max(5),
  githubUsername: z.string().optional(),
});

export default function ProfileEditForm({ student, onSave }: ProfileEditFormProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: student.name,
      major: student.major,
      year: student.year,
      githubUsername: student.githubUsername || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let updatedStudent = { ...student, ...values };

    if (values.githubUsername && values.githubUsername !== student.githubUsername) {
      setIsVerifying(true);
      try {
        const result = await verifyGithubUsername({
            studentName: values.name,
            githubUsername: values.githubUsername,
        });

        if (!result.isLikelyOwner) {
            toast({
                variant: 'destructive',
                title: 'GitHub Verification Failed',
                description: result.reasoning,
            });
            form.setError('githubUsername', { message: result.reasoning });
            setIsVerifying(false);
            return;
        }
         toast({
            title: 'GitHub Verification Successful',
            description: result.reasoning,
        });
      } catch (error) {
        console.error('GitHub verification error:', error);
        toast({
            variant: 'destructive',
            title: 'Verification Error',
            description: 'Could not verify GitHub username at this time.',
        });
        setIsVerifying(false);
        return;
      }
      setIsVerifying(false);
    }
    
    // In a real app, you'd save this to a database.
    // For now, we'll just update the mock data in memory for this session.
    const userIndex = users.findIndex(u => u.id === student.id);
    if(userIndex !== -1) {
        users[userIndex] = updatedStudent;
    }

    onSave(updatedStudent);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="major"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Major</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your major" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {allMajors.map((major) => (
                    <SelectItem key={major} value={major}>
                      {major}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Your current year" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Username</FormLabel>
              <FormControl>
                <Input placeholder="Your GitHub handle" {...field} />
              </FormControl>
               <p className="text-xs text-muted-foreground pt-1">
                Your username will be verified by AI to ensure it plausibly matches your name.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isVerifying}>
          {isVerifying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Save changes
        </Button>
      </form>
    </Form>
  );
}
