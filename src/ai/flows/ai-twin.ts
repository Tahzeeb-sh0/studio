
'use server';

/**
 * @fileOverview A Genkit flow for the AI Twin feature.
 *
 * - generateAiTwinMessage - A function that generates a personalized message for the student.
 * - AiTwinInput - The input type for the generateAiTwinMessage function.
 * - AiTwinOutput - The return type for the generateAiTwinMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const AiTwinInputSchema = z.object({
  studentName: z.string().describe("The student's name."),
  achievements: z
    .string()
    .describe("A list of the student's verified achievements."),
  gpa: z.number().describe("The student's current GPA."),
  degreeProgress: z.number().describe("The student's degree completion percentage."),
  history: z.array(MessageSchema).describe('The conversation history.'),
});
export type AiTwinInput = z.infer<typeof AiTwinInputSchema>;

const AiTwinOutputSchema = z.object({
  message: z.string().describe("The AI Twin's personalized, encouraging, and insightful message to the student. It should be 2-3 sentences long."),
});
export type AiTwinOutput = z.infer<typeof AiTwinOutputSchema>;

export async function generateAiTwinMessage(
  input: AiTwinInput
): Promise<AiTwinOutput> {
  return aiTwinFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTwinPrompt',
  input: {schema: AiTwinInputSchema},
  output: {schema: AiTwinOutputSchema},
  prompt: `You are an AI Twin for a university student named {{{studentName}}}. Your purpose is to provide short, personalized, and encouraging insight based on their current progress. Be positive and forward-looking. You engage in a natural, supportive, and encouraging conversation. Ask clarifying questions to better understand the student's aspirations.

Your first message should be a friendly greeting.

Here is the student's current status:
- Achievements:
{{{achievements}}}
- Current GPA: {{{gpa}}}
- Degree Progress: {{{degreeProgress}}}%

Conversation History:
{{#each history}}
{{#if content}}
{{role}}: {{content}}
{{/if}}
{{/each}}
model:
`,
});

const aiTwinFlow = ai.defineFlow(
  {
    name: 'aiTwinFlow',
    inputSchema: AiTwinInputSchema,
    outputSchema: AiTwinOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
