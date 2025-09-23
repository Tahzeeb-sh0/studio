
'use server';

/**
 * @fileOverview A Genkit flow for generating suggestions for the vision board.
 *
 * - generateVisionBoardSuggestions - Generates suggestions based on a goal prompt.
 * - GenerateSuggestionsInput - The input type for the function.
 * - GenerateSuggestionsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateSuggestionsInputSchema = z.object({
  prompt: z.string().describe('The prompt outlining the user\'s development goal.'),
});
export type GenerateSuggestionsInput = z.infer<typeof GenerateSuggestionsInputSchema>;

const SuggestionSchema = z.object({
  title: z.string().describe('The name of the suggested activity or event (e.g., "Debate Club").'),
  description: z.string().describe('A brief, one-sentence explanation of why this activity is relevant to the user\'s goal.'),
});

const GenerateSuggestionsOutputSchema = z.object({
  suggestions: z.array(SuggestionSchema).describe('A list of 3 to 4 suggested activities.'),
});
export type GenerateSuggestionsOutput = z.infer<typeof GenerateSuggestionsOutputSchema>;

export async function generateVisionBoardSuggestions(
  input: GenerateSuggestionsInput
): Promise<GenerateSuggestionsOutput> {
  return generateSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'visionBoardSuggestionPrompt',
  input: { schema: GenerateSuggestionsInputSchema },
  output: { schema: GenerateSuggestionsOutputSchema },
  prompt: `You are an AI Mentor for a university student. Your role is to provide actionable and inspiring suggestions to help them achieve their personal development goals.

  The user wants to improve a specific skill. Based on the following request, generate a list of 3-4 concrete activities, events, or roles typically available in a university setting that would help them.

  User's Goal:
  {{{prompt}}}
  `,
});

const generateSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateSuggestionsFlow',
    inputSchema: GenerateSuggestionsInputSchema,
    outputSchema: GenerateSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
