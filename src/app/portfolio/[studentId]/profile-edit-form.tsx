
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Student } from '@/lib/types';
import { allMajors, users } from '@/lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { verifyGithubUsername } from '@/ai/flows/github-verifier';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileEditFormProps {
  student: Student;
  onSave: (updatedStudent: Student) => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  major: z.string({ required_error: 'Please select a major.' }),
  year: z.coerce.number().min(1).max(5),
  githubUsername: z.string().optional(),
  avatar: z.any().optional(),
});

export default function ProfileEditForm({ student, onSave }: ProfileEditFormProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(student.avatarUrl);
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

  const avatarFile = form.watch('avatar');
  useEffect(() => {
    if (avatarFile && avatarFile.length > 0) {
      const file = avatarFile[0];
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [avatarFile]);

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let updatedStudent: Student = { ...student, ...values };

    if (values.avatar && values.avatar.length > 0) {
        const file = values.avatar[0];
        const dataUrl = await fileToDataUrl(file);
        updatedStudent.avatarUrl = dataUrl;
    }


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
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Photo</FormLabel>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={avatarPreview || student.avatarUrl} alt={student.name} />
                   <AvatarFallback>
                      {student.name.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                </Avatar>
                <FormControl>
                    <Input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files)}
                    />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

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

