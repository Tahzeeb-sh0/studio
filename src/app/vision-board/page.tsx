
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Bot,
  MessageSquare,
  Users,
  Lightbulb,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { getVisionBoardSuggestionsAction } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';


type GoalCategory = 'Communication' | 'Leadership' | 'Problem Solving';

type Suggestion = {
  title: string;
  description: string;
};

const goals = [
  {
    category: 'Communication' as GoalCategory,
    title: 'Mastering Communication',
    description:
      'Excel in public speaking, networking, and articulating ideas clearly.',
    icon: MessageSquare,
    imageClass: 'bg-[url("https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800")]',
    prompt:
      'Suggest 3-4 specific activities or events available at a university to improve communication skills, such as debates, public speaking workshops, or networking sessions.',
  },
  {
    category: 'Leadership' as GoalCategory,
    title: 'Developing Leadership',
    description:
      'Take initiative, inspire others, and lead projects to success.',
    icon: Users,
    imageClass: 'bg-[url("https://images.unsplash.com/photo-1579567761406-461487c3c3a2?w=800")]',
    prompt:
      'Suggest 3-4 specific leadership opportunities at a university, like student club roles, hackathon team lead positions, or project management workshops.',
  },
  {
    category: 'Problem Solving' as GoalCategory,
    title: 'Enhancing Problem-Solving',
    description:
      'Analyze complex challenges and devise innovative solutions.',
    icon: Lightbulb,
    imageClass: 'bg-[url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800")]',
    prompt:
      'Suggest 3-4 specific activities at a university for improving problem-solving skills, such as coding challenges, innovation contests, or case study competitions.',
  },
];

export default function VisionBoardPage() {
  const [loadingStates, setLoadingStates] = useState<Record<GoalCategory, boolean>>({
    Communication: false,
    Leadership: false,
    'Problem Solving': false,
  });
  
  const [suggestions, setSuggestions] = useState<Record<GoalCategory, Suggestion[] | null>>({
    Communication: null,
    Leadership: null,
    'Problem Solving': null,
  });

  const { toast } = useToast();

  const handleGetSuggestions = async (category: GoalCategory, prompt: string) => {
    setLoadingStates((prev) => ({ ...prev, [category]: true }));
    const result = await getVisionBoardSuggestionsAction(prompt);
    setLoadingStates((prev) => ({ ...prev, [category]: false }));

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: result.error,
      });
    } else {
        setSuggestions(prev => ({...prev, [category]: result.suggestions}));
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Your Interactive Vision Board
        </h1>
        <p className="text-muted-foreground">
          Visual inspiration meets actionable, AI-powered recommendations to
          help you grow.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {goals.map((goal) => (
          <Card
            key={goal.category}
            className="flex flex-col overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
          >
            <div
              className={`relative h-48 bg-cover bg-center ${goal.imageClass}`}
            >
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/80 p-2 rounded-full border-2 border-white/50">
                    <goal.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="font-headline text-2xl text-white">
                    {goal.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-primary-foreground/80 mt-2">
                  {goal.description}
                </CardDescription>
              </div>
            </div>
            <CardContent className="p-6 flex-grow flex flex-col">
              <div className="flex-grow">
                 {suggestions[goal.category] ? (
                    <div className="space-y-4">
                        <h4 className="flex items-center text-sm font-semibold text-primary">
                            <Sparkles className="mr-2 h-4 w-4" />
                            AI-Suggested Activities
                        </h4>
                        <ul className="space-y-3 list-disc pl-5 text-sm text-muted-foreground">
                            {suggestions[goal.category]?.map((s, i) => (
                                <li key={i}>
                                    <span className="font-semibold text-foreground">{s.title}:</span> {s.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground py-8">
                        <p>Click the button below to get personalized suggestions from your AI Twin.</p>
                    </div>
                )}
              </div>
              <Button
                onClick={() => handleGetSuggestions(goal.category, goal.prompt)}
                disabled={loadingStates[goal.category]}
                className="w-full mt-6"
              >
                {loadingStates[goal.category] ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Bot className="mr-2 h-4 w-4" />
                )}
                Ask AI Twin
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
