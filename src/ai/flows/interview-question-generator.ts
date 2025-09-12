// src/ai/flows/interview-question-generator.ts
'use server';

/**
 * @fileOverview A Genkit flow for generating interview questions.
 *
 * - generateInterviewQuestions - Generates interview questions based on achievements and a job description.
 * - GenerateInterviewQuestionsInput - The input type for the generateInterviewQuestions function.
 * - GenerateInterviewQuestionsOutput - The return type for the generateInterviewQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInterviewQuestionsInputSchema = z.object({
  achievements: z
    .string()
    .describe("A list of the student's achievements."),
  jobDescription: z
    .string()
    .describe(
      'The job description for which the interview questions are being generated.'
    ),
});
export type GenerateInterviewQuestionsInput = z.infer<typeof GenerateInterviewQuestionsInputSchema>;

const InterviewQuestionSchema = z.object({
    question: z.string().describe("The interview question."),
    reasoning: z.string().describe("The reasoning behind why this question is being asked."),
    category: z.string().describe("The category of the question (e.g., Behavioral, Technical, Situational).")
});

const GenerateInterviewQuestionsOutputSchema = z.object({
  questions: z.array(InterviewQuestionSchema).describe('A list of exactly 10 generated interview questions.'),
});
export type GenerateInterviewQuestionsOutput = z.infer<typeof GenerateInterviewQuestionsOutputSchema>;

export async function generateInterviewQuestions(
  input: GenerateInterviewQuestionsInput
): Promise<GenerateInterviewQuestionsOutput> {
  return generateInterviewQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interviewQuestionGeneratorPrompt',
  input: {schema: GenerateInterviewQuestionsInputSchema},
  output: {schema: GenerateInterviewQuestionsOutputSchema},
  prompt: `You are an expert career coach and hiring manager.

  Given the following student achievements and a job description, generate a list of 10 relevant interview questions. The questions should cover a mix of behavioral, technical, and situational categories. For each question, provide a brief reasoning for why it's being asked in relation to the job description and the student's background.

  Student's Achievements:
  {{{achievements}}}

  Job Description:
  {{{jobDescription}}}
  `,
});

const generateInterviewQuestionsFlow = ai.defineFlow(
  {
    name: 'generateInterviewQuestionsFlow',
    inputSchema: GenerateInterviewQuestionsInputSchema,
    outputSchema: GenerateInterviewQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
