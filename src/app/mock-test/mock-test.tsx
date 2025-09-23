
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateMockTestQuestions, Question } from './actions';
import { Loader2, Sparkles, Wand2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  topic: z.string().min(2, { message: 'Please enter a topic.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function MockTest() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setQuestions([]);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);

    const result = await generateMockTestQuestions(data.topic);
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    } else if (result.questions) {
      setQuestions(result.questions);
      toast({
        title: 'Quiz Ready!',
        description: `Your quiz on "${data.topic}" has been generated.`,
      });
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    setIsAnswerSubmitted(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuestions([]);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    form.reset();
  };

  if (quizFinished) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Quiz Results</CardTitle>
                <CardDescription>You scored {score} out of {questions.length}!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <p className="text-lg font-bold">Your Score: {((score / questions.length) * 100).toFixed(0)}%</p>
                    <Progress value={(score / questions.length) * 100} className="w-[60%]" />
                </div>
                 <div className="space-y-2">
                    {questions.map((q, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                            {q.isCorrect ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-destructive" />}
                            <span className={cn(!q.isCorrect && "line-through")}>Question {index + 1}</span>
                            {!q.isCorrect && <span className="text-muted-foreground">(Correct: {q.answer})</span>}
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                 <Button onClick={restartQuiz}>Take Another Quiz</Button>
            </CardFooter>
        </Card>
    )
  }

  if (questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz: {form.getValues('topic')}</CardTitle>
          <CardDescription>Question {currentQuestionIndex + 1} of {questions.length}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <Progress value={progress} />
            <p className="font-semibold text-lg">{currentQuestion.question}</p>
            <RadioGroup
                value={selectedAnswer || undefined}
                onValueChange={setSelectedAnswer}
                disabled={isAnswerSubmitted}
            >
                {currentQuestion.options.map((option, index) => {
                    const isCorrect = option === currentQuestion.answer;
                    const isSelected = option === selectedAnswer;
                    
                    return (
                        <div key={index} className={cn(
                            "flex items-center space-x-2 p-3 rounded-md border transition-all",
                            isAnswerSubmitted && isCorrect && "border-green-500 bg-green-500/10",
                            isAnswerSubmitted && !isCorrect && isSelected && "border-destructive bg-destructive/10"
                        )}>
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                            {isAnswerSubmitted && isCorrect && <CheckCircle className="h-5 w-5 text-green-500" />}
                            {isAnswerSubmitted && !isCorrect && isSelected && <XCircle className="h-5 w-5 text-destructive" />}
                        </div>
                    );
                })}
            </RadioGroup>
        </CardContent>
         <CardFooter>
            {isAnswerSubmitted ? (
                <Button onClick={handleNextQuestion} className="w-full">
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
            ) : (
                <Button onClick={handleAnswerSubmit} className="w-full" disabled={selectedAnswer === null}>
                    Submit Answer
                </Button>
            )}
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Start a New Quiz</CardTitle>
        <CardDescription>Enter a topic, and our AI will generate a short multiple-choice quiz for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React Hooks, Python Data Structures, World History" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Generate Quiz
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
