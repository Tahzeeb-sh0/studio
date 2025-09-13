'use server';

/**
 * @fileOverview A Genkit flow for providing career counseling.
 *
 * - careerCounselor - A function that acts as an AI career counselor.
 * - CareerCounselorInput - The input type for the careerCounselor function.
 * - CareerCounselorOutput - The return type for the careerCounselor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const CareerCounselorInputSchema = z.object({
  achievements: z
    .string()
    .describe("A list of the student's verified achievements."),
  studentName: z.string().describe("The student's name."),
  history: z.array(MessageSchema).describe('The conversation history.'),
});
export type CareerCounselorInput = z.infer<typeof CareerCounselorInputSchema>;

const CareerCounselorOutputSchema = z.object({
  message: z.string().describe('The AI counselor\'s response.'),
});
export type CareerCounselorOutput = z.infer<typeof CareerCounselorOutputSchema>;

export async function careerCounselor(
  input: CareerCounselorInput
): Promise<CareerCounselorOutput> {
  return careerCounselorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerCounselorPrompt',
  input: {schema: CareerCounselorInputSchema},
  output: {schema: CareerCounselorOutputSchema},
  prompt: `You are "AchieveMe AI," a friendly and expert career counselor for a university student named {{{studentName}}}. Your goal is to provide personalized career advice, suggest potential career paths, identify skill gaps, and recommend activities to help the student achieve their goals.

You have access to the student's verified list of achievements. Use this as the primary source of truth for their experience. Do not hallucinate achievements.

You will be given the conversation history. Engage in a natural, supportive, and encouraging conversation. Ask clarifying questions to better understand the student's aspirations.

Student's Achievements:
{{{achievements}}}

Conversation History:
{{#each history}}
{{role}}: {{content}}
{{/each}}
model:
  `,
});

const careerCounselorFlow = ai.defineFlow(
  {
    name: 'careerCounselorFlow',
    inputSchema: CareerCounselorInputSchema,
    outputSchema: CareerCounselorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      message: output!.message,
    };
  }
);
