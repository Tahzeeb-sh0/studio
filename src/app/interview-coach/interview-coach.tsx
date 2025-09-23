
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateQuestionsAction, getQuestionAudioAction } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Wand2, Lightbulb, Volume2, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

const initialState = {
  message: '',
  errors: {},
  questions: [],
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      Generate Questions
    </Button>
  );
}

function PlayAudioButton({ question }: { question: string }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePlay = async () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      return;
    }

    setIsGenerating(true);
    const result = await getQuestionAudioAction(question);
    setIsGenerating(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Audio Generation Failed',
        description: result.error,
      });
    } else if (result.audio) {
      setAudioUrl(result.audio);
      const audio = new Audio(result.audio);
      audio.play();
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handlePlay} disabled={isGenerating}>
      {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
      <span className="sr-only">Play audio</span>
    </Button>
  );
}

export default function InterviewCoach() {
  const [state, formAction] = useFormState(generateQuestionsAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message === 'success' && state.questions?.length > 0) {
        toast({
            title: "Questions Generated!",
            description: "Your mock interview questions are ready.",
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
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Generate Your Questions</CardTitle>
          <CardDescription>Paste a job description below to get a list of tailored interview questions.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="jobDescription" className="block text-sm font-medium mb-2">
                Paste Job Description
              </label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                rows={8}
                placeholder="Paste the full job description here..."
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
        </CardContent>
      </Card>
      
      {state.questions && state.questions.length > 0 && (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="text-primary" />
                    Generated Interview Questions
                </CardTitle>
                 <CardDescription>
                    Here are some questions to help you prepare. Click the play button to hear the question.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {state.questions.map((q, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-4 text-left">
                                <span className="font-semibold">{index + 1}. {q.question}</span>
                                <Badge variant="secondary">{q.category}</Badge>
                            </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex items-start gap-4 p-2 bg-muted/50 rounded-md">
                            <div className="flex-grow">
                                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Lightbulb className="h-4 w-4 mt-1 flex-shrink-0" />
                                    <p><span className="font-semibold">Reasoning:</span> {q.reasoning}</p>
                                </div>
                            </div>
                            <PlayAudioButton question={q.question} />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
