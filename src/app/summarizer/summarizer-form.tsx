'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateSummaryAction } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { activities, student } from '@/lib/mock-data';
import { format } from 'date-fns';

const approvedActivities = activities
    .filter(act => act.status === 'Approved' && act.studentId === student.id)
    .map(act => `- ${act.title}: ${act.description} (Completed: ${format(act.date, 'PPP')})`)
    .join('\n');

const initialState = {
  message: '',
  errors: {},
  summary: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      Generate Summary
    </Button>
  );
}

export default function SummarizerForm() {
  const [state, formAction] = useFormState(generateSummaryAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'success' && state.summary) {
        toast({
            title: "Summary Generated!",
            description: "Your new achievement summary is ready.",
        });
    } else if (state.message && state.message !== 'success') {
         toast({
            variant: "destructive",
            title: "An error occurred",
            description: state.message,
        });
    }
  }, [state, toast]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
        <CardHeader>
          <CardTitle>Your Achievements</CardTitle>
          <CardDescription>
            Input your achievements and the requirements for the summary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-6">
            <div>
              <label htmlFor="achievements" className="block text-sm font-medium mb-2">
                Your Achievements
              </label>
              <Textarea
                id="achievements"
                name="achievements"
                rows={10}
                placeholder="List your accomplishments, awards, projects, and roles..."
                defaultValue={approvedActivities}
                className="text-sm"
              />
              {state?.errors?.achievements && (
                  <p className="text-sm font-medium text-destructive mt-2">{state.errors.achievements[0]}</p>
              )}
            </div>
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium mb-2">
                Summary Requirements
              </label>
              <Textarea
                id="requirements"
                name="requirements"
                rows={5}
                placeholder="e.g., 'A 2-3 sentence summary for a software engineering resume', or 'A paragraph for a grad school application in AI.'"
                className="text-sm"
              />
              {state?.errors?.requirements && (
                  <p className="text-sm font-medium text-destructive mt-2">{state.errors.requirements[0]}</p>
              )}
            </div>
            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-accent" />
            Generated Summary
          </CardTitle>
          <CardDescription>
            Your AI-powered summary will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {state.summary ? (
            <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 p-4 rounded-md h-full">
              <p>{state.summary}</p>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed text-center p-8">
              <p className="text-muted-foreground">Waiting for your input to generate a summary...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
