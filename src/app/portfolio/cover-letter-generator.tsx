'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateCoverLetterAction } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
  errors: {},
  coverLetter: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      Generate Cover Letter
    </Button>
  );
}

export default function CoverLetterGenerator() {
  const [state, formAction] = useFormState(generateCoverLetterAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message === 'success' && state.coverLetter) {
        toast({
            title: "Cover Letter Generated!",
            description: "Your new cover letter is ready.",
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
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium mb-2">
            Paste Job Description
          </label>
          <Textarea
            id="jobDescription"
            name="jobDescription"
            rows={8}
            placeholder="Paste the full job description here to generate a tailored cover letter..."
            className="text-sm"
          />
          {state?.errors?.jobDescription && (
              <p className="text-sm font-medium text-destructive mt-2">{state.errors.jobDescription[0]}</p>
          )}
        </div>
        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>
      
      {state.coverLetter && (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="text-accent" />
                    Generated Cover Letter
                </CardTitle>
                 <CardDescription>
                    Review and copy your generated cover letter below.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 p-4 rounded-md whitespace-pre-wrap">
                    {state.coverLetter}
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
