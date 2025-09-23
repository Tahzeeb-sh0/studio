
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateContactEmail } from '@/ai/flows/contact-student-generator';
import { useState } from 'react';
import { Loader2, Send, Wand2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ContactFormProps {
  studentName: string;
  studentEmail: string;
  onSend: () => void;
}

const formSchema = z.object({
  companyName: z.string().min(2, 'Company name is required.'),
  recruiterName: z.string().min(2, 'Your name is required.'),
  recruiterEmail: z.string().email('Please enter a valid email.'),
  jobTitle: z.string().min(3, 'Job title is required.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export default function ContactForm({ studentName, studentEmail, onSend }: ContactFormProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      recruiterName: '',
      recruiterEmail: '',
      jobTitle: '',
      message: '',
    },
  });

  const handleGenerateEmail = async () => {
    const values = form.getValues();
    const validation = formSchema.safeParse(values);
    if (!validation.success) {
      form.trigger();
      return;
    }

    setIsGenerating(true);
    setGeneratedEmail('');
    try {
      const result = await generateContactEmail({
        studentName,
        ...values,
      });
      setGeneratedEmail(result.emailBody);
      toast({
        title: 'Email Draft Generated!',
        description: 'Review the AI-generated email below.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate email draft at this time.',
      });
    }
    setIsGenerating(false);
  };
  
  const onSubmit = () => {
    setIsSending(true);
    // In a real app, this would send an email.
    // For this demo, we'll simulate it.
    setTimeout(() => {
        setIsSending(false);
        toast({
            title: 'Message Sent!',
            description: `Your message has been sent to ${studentName}.`,
        });
        onSend(); // Close the dialog
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="recruiterName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="recruiterEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
         <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title / Opportunity</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer Intern" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief Message</FormLabel>
              <FormControl>
                <Textarea placeholder={`A short, personal message for ${studentName}...`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={handleGenerateEmail} disabled={isGenerating}>
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Generate Email Draft
            </Button>
        </div>

        {generatedEmail && (
            <Card>
                <CardHeader>
                    <CardTitle className='text-base'>AI-Generated Email Draft</CardTitle>
                    <CardDescription>To: {studentEmail}</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 p-4 rounded-md whitespace-pre-wrap">
                        {generatedEmail}
                    </div>
                </CardContent>
            </Card>
        )}

        <Button type="submit" className="w-full" disabled={!generatedEmail || isSending}>
          {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
          Send Message to {studentName}
        </Button>
      </form>
    </Form>
  );
}
