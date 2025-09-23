
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
  Code,
  Network,
  PiggyBank,
  HeartPulse,
  Paintbrush,
  Rocket,
  Globe,
  Clock,
  UserCheck,
  Brain,
  Vote,
  FlaskConical,
} from 'lucide-react';
import { useState } from 'react';
import { getVisionBoardSuggestionsAction } from './actions';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type GoalCategory =
  | 'Communication'
  | 'Leadership'
  | 'Problem Solving'
  | 'Technical'
  | 'Networking'
  | 'FinancialLiteracy'
  | 'HealthWellness'
  | 'CreativeExpression'
  | 'Entrepreneurship'
  | 'GlobalCitizenship'
  | 'TimeManagement'
  | 'PersonalBranding'
  | 'EmotionalIntelligence'
  | 'CivicEngagement'
  | 'ResearchSkills';

type Suggestion = {
  title: string;
  description: string;
};

const communicationImage = PlaceHolderImages.find(p => p.id === 'vision-communication');
const leadershipImage = PlaceHolderImages.find(p => p.id === 'vision-leadership');
const problemSolvingImage = PlaceHolderImages.find(p => p.id === 'vision-problem-solving');
const technicalImage = PlaceHolderImages.find(p => p.id === 'vision-technical');
const networkingImage = PlaceHolderImages.find(p => p.id === 'vision-networking');
const financialImage = PlaceHolderImages.find(p => p.id === 'vision-financial');
const wellnessImage = PlaceHolderImages.find(p => p.id === 'vision-wellness');
const creativeImage = PlaceHolderImages.find(p => p.id === 'vision-creative');
const entrepreneurImage = PlaceHolderImages.find(p => p.id === 'vision-entrepreneur');
const globalImage = PlaceHolderImages.find(p => p.id === 'vision-global');
const timeImage = PlaceHolderImages.find(p => p.id === 'vision-time');
const brandingImage = PlaceHolderImages.find(p => p.id === 'vision-branding');
const emotionalImage = PlaceHolderImages.find(p => p.id === 'vision-emotional');
const civicImage = PlaceHolderImages.find(p => p.id === 'vision-civic');
const researchImage = PlaceHolderImages.find(p => p.id === 'vision-research');


const goals = [
  {
    category: 'Communication' as GoalCategory,
    title: 'Mastering Communication',
    description:
      'Excel in public speaking, networking, and articulating ideas clearly.',
    icon: MessageSquare,
    imageUrl: communicationImage?.imageUrl,
    imageHint: communicationImage?.imageHint,
    prompt:
      'Suggest 3-4 specific activities or events available at a university to improve communication skills, such as debates, public speaking workshops, or networking sessions.',
  },
  {
    category: 'Leadership' as GoalCategory,
    title: 'Developing Leadership',
    description:
      'Take initiative, inspire others, and lead projects to success.',
    icon: Users,
    imageUrl: leadershipImage?.imageUrl,
    imageHint: leadershipImage?.imageHint,
    prompt:
      'Suggest 3-4 specific leadership opportunities at a university, like student club roles, hackathon team lead positions, or project management workshops.',
  },
  {
    category: 'Problem Solving' as GoalCategory,
    title: 'Enhancing Problem-Solving',
    description:
      'Analyze complex challenges and devise innovative solutions.',
    icon: Lightbulb,
    imageUrl: problemSolvingImage?.imageUrl,
    imageHint: problemSolvingImage?.imageHint,
    prompt:
      'Suggest 3-4 specific activities at a university for improving problem-solving skills, such as coding challenges, innovation contests, or case study competitions.',
  },
  {
    category: 'Technical' as GoalCategory,
    title: 'Technical Proficiency',
    description:
      'Deepen your expertise in cutting-edge technologies and programming languages.',
    icon: Code,
    imageUrl: technicalImage?.imageUrl,
    imageHint: technicalImage?.imageHint,
    prompt:
      'Suggest 3-4 university-related activities to improve technical skills, such as joining a specialized tech club, contributing to open-source projects, or attending advanced workshops.',
  },
  {
    category: 'Networking' as GoalCategory,
    title: 'Professional Networking',
    description:
      'Build meaningful professional connections with peers, faculty, and industry experts.',
    icon: Network,
    imageUrl: networkingImage?.imageUrl,
    imageHint: networkingImage?.imageHint,
    prompt:
      'Suggest 3-4 ways to build a professional network at a university, like attending career fairs, joining alumni mentorship programs, or participating in industry-specific seminars.',
  },
  {
    category: 'FinancialLiteracy' as GoalCategory,
    title: 'Building Financial Wellness',
    description: 'Learn budgeting, saving, and investing for a secure future.',
    icon: PiggyBank,
    imageUrl: financialImage?.imageUrl,
    imageHint: financialImage?.imageHint,
    prompt: 'Suggest 3-4 university workshops or resources for improving personal finance skills, like budgeting seminars, investment club meetings, or financial aid workshops.'
  },
  {
    category: 'HealthWellness' as GoalCategory,
    title: 'Prioritizing Health & Wellness',
    description: 'Develop healthy habits for mental and physical well-being.',
    icon: HeartPulse,
    imageUrl: wellnessImage?.imageUrl,
    imageHint: wellnessImage?.imageHint,
    prompt: 'Suggest 3-4 campus activities that promote mental and physical health, such as joining a sports club, attending mindfulness sessions, or using university counseling services.'
  },
  {
    category: 'CreativeExpression' as GoalCategory,
    title: 'Exploring Creative Expression',
    description: 'Unleash your creativity through arts, music, or writing.',
    icon: Paintbrush,
    imageUrl: creativeImage?.imageUrl,
    imageHint: creativeImage?.imageHint,
    prompt: 'Suggest 3-4 creative outlets at a university, like joining a theater group, contributing to a student magazine, or taking a pottery class.'
  },
{
    category: 'Entrepreneurship' as GoalCategory,
    title: 'Cultivating an Entrepreneurial Mindset',
    description: 'Learn to innovate, take risks, and turn ideas into ventures.',
    icon: Rocket,
    imageUrl: entrepreneurImage?.imageUrl,
    imageHint: entrepreneurImage?.imageHint,
    prompt: 'Suggest 3-4 entrepreneurial activities at a university, such as joining a startup incubator, participating in a business plan competition, or attending a pitch night.'
  },
  {
    category: 'GlobalCitizenship' as GoalCategory,
    title: 'Becoming a Global Citizen',
    description: 'Understand diverse cultures and engage with global issues.',
    icon: Globe,
    imageUrl: globalImage?.imageUrl,
    imageHint: globalImage?.imageHint,
    prompt: 'Suggest 3-4 activities to develop a global perspective at a university, like joining a cultural exchange program, taking a foreign language, or participating in a Model UN.'
  },
  {
    category: 'TimeManagement' as GoalCategory,
    title: 'Mastering Time Management',
    description: 'Organize your tasks, prioritize effectively, and beat procrastination.',
    icon: Clock,
    imageUrl: timeImage?.imageUrl,
    imageHint: timeImage?.imageHint,
    prompt: 'Suggest 3-4 resources or workshops at a university for improving time management, such as academic success center coaching, productivity app tutorials, or workshops on study techniques.'
  },
  {
    category: 'PersonalBranding' as GoalCategory,
    title: 'Building Your Personal Brand',
    description: 'Craft a professional identity that showcases your unique skills.',
    icon: UserCheck,
    imageUrl: brandingImage?.imageUrl,
    imageHint: brandingImage?.imageHint,
    prompt: 'Suggest 3-4 ways to build a personal brand at a university, like creating a professional portfolio, optimizing a LinkedIn profile, or starting a blog related to your field of study.'
  },
  {
    category: 'EmotionalIntelligence' as GoalCategory,
    title: 'Developing Emotional Intelligence',
    description: 'Enhance self-awareness, empathy, and interpersonal skills.',
    icon: Brain,
    imageUrl: emotionalImage?.imageUrl,
    imageHint: emotionalImage?.imageHint,
    prompt: 'Suggest 3-4 activities for developing emotional intelligence, like peer mediation training, group therapy sessions, or workshops on active listening and empathy.'
  },
  {
    category: 'CivicEngagement' as GoalCategory,
    title: 'Fostering Civic Engagement',
    description: 'Participate in your community and contribute to democratic processes.',
    icon: Vote,
    imageUrl: civicImage?.imageUrl,
    imageHint: civicImage?.imageHint,
    prompt: 'Suggest 3-4 ways to get involved in civic life at a university, such as joining student government, volunteering for a political campaign, or participating in community advocacy projects.'
  },
  {
    category: 'ResearchSkills' as GoalCategory,
    title: 'Advancing Research Skills',
    description: 'Learn to conduct research, analyze data, and contribute to knowledge.',
    icon: FlaskConical,
    imageUrl: researchImage?.imageUrl,
    imageHint: researchImage?.imageHint,
    prompt: 'Suggest 3-4 opportunities to develop research skills, like assisting a professor with their research, completing an undergraduate thesis, or attending a research methodology workshop.'
  },
];

export default function VisionBoardPage() {
  const [loadingStates, setLoadingStates] = useState<Record<GoalCategory, boolean>>({
    Communication: false,
    Leadership: false,
    'Problem Solving': false,
    'Technical': false,
    'Networking': false,
    'FinancialLiteracy': false,
    'HealthWellness': false,
    'CreativeExpression': false,
    'Entrepreneurship': false,
    'GlobalCitizenship': false,
    'TimeManagement': false,
    'PersonalBranding': false,
    'EmotionalIntelligence': false,
    'CivicEngagement': false,
    'ResearchSkills': false,
  });
  
  const [suggestions, setSuggestions] = useState<Record<GoalCategory, Suggestion[] | null>>({
    Communication: null,
    Leadership: null,
    'Problem Solving': null,
    'Technical': null,
    'Networking': null,
    FinancialLiteracy: null,
    HealthWellness: null,
    CreativeExpression: null,
    Entrepreneurship: null,
    GlobalCitizenship: null,
    TimeManagement: null,
    PersonalBranding: null,
    EmotionalIntelligence: null,
    CivicEngagement: null,
    ResearchSkills: null,
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {goals.map((goal) => (
          <Card
            key={goal.category}
            className="flex flex-col overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
          >
            <div
              className="relative h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${goal.imageUrl})` }}
              data-ai-hint={goal.imageHint}
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
