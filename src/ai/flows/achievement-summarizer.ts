// src/ai/flows/achievement-summarizer.ts
'use server';

/**
 * @fileOverview A Genkit flow for summarizing student achievements.
 *
 * - summarizeAchievements - A function that generates concise, tailored summaries of achievements.
 * - SummarizeAchievementsInput - The input type for the summarizeAchievements function.
 * - SummarizeAchievementsOutput - The return type for the summarizeAchievements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAchievementsInputSchema = z.object({
  achievements: z
    .string()
    .describe('A detailed description of the student achievements.'),
  requirements: z
    .string()
    .describe(
      'Specific requirements or guidelines for the summary (e.g., resume, cover letter, specific job description).' 
    ),
});
export type SummarizeAchievementsInput = z.infer<typeof SummarizeAchievementsInputSchema>;

const SummarizeAchievementsOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise, tailored summary of the student achievements.'),
});
export type SummarizeAchievementsOutput = z.infer<typeof SummarizeAchievementsOutputSchema>;

export async function summarizeAchievements(
  input: SummarizeAchievementsInput
): Promise<SummarizeAchievementsOutput> {
  return summarizeAchievementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'achievementSummarizerPrompt',
  input: {schema: SummarizeAchievementsInputSchema},
  output: {schema: SummarizeAchievementsOutputSchema},
  prompt: `You are an expert resume writer.

  Given the following achievements and requirements, create a concise and tailored summary.

  Achievements: {{{achievements}}}
  Requirements: {{{requirements}}}
  Summary:
  `,
});

const summarizeAchievementsFlow = ai.defineFlow(
  {
    name: 'summarizeAchievementsFlow',
    inputSchema: SummarizeAchievementsInputSchema,
    outputSchema: SummarizeAchievementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
