
'use server';

/**
 * @fileOverview A Genkit flow for generating mock test questions.
 *
 * - generateMockTestQuestions - Generates a multiple-choice quiz on a given topic.
 * - GenerateMockTestInput - The input type for the function.
 * - GenerateMockTestOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateMockTestInputSchema = z.object({
  topic: z.string().describe('The topic for the mock test.'),
});
export type GenerateMockTestInput = z.infer<typeof GenerateMockTestInputSchema>;

const QuestionSchema = z.object({
  question: z.string().describe('The question text.'),
  options: z.array(z.string()).length(4).describe('A list of exactly 4 possible answers.'),
  answer: z.string().describe('The correct answer. Must be one of the provided options.'),
});

const GenerateMockTestOutputSchema = z.object({
  questions: z.array(QuestionSchema).length(5).describe('A list of exactly 5 generated mock test questions.'),
});
export type GenerateMockTestOutput = z.infer<typeof GenerateMockTestOutputSchema>;

export async function generateMockTestQuestions(input: GenerateMockTestInput): Promise<GenerateMockTestOutput> {
  return generateMockTestQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mockTestGeneratorPrompt',
  input: { schema: GenerateMockTestInputSchema },
  output: { schema: GenerateMockTestOutputSchema },
  prompt: `You are an expert quizmaster. Your task is to generate a 5-question multiple-choice quiz based on the provided topic.

  For each question, you must provide:
  1. A clear and concise question.
  2. Exactly four distinct options.
  3. The single correct answer, which must exactly match one of the options.

  The questions should be relevant to the topic: {{{topic}}}
  `,
});

const generateMockTestQuestionsFlow = ai.defineFlow(
  {
    name: 'generateMockTestQuestionsFlow',
    inputSchema: GenerateMockTestInputSchema,
    outputSchema: GenerateMockTestOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
