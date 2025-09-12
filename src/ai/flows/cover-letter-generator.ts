// src/ai/flows/cover-letter-generator.ts
'use server';

/**
 * @fileOverview A Genkit flow for generating cover letters.
 *
 * - generateCoverLetter - A function that generates a cover letter based on achievements and a job description.
 * - GenerateCoverLetterInput - The input type for the generateCoverLetter function.
 * - GenerateCoverLetterOutput - The return type for the generateCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoverLetterInputSchema = z.object({
  achievements: z
    .string()
    .describe('A list of the student\'s achievements.'),
  jobDescription: z
    .string()
    .describe(
      'The job description for which the cover letter is being generated.'
    ),
    studentName: z.string().describe("The student's name."),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  coverLetter: z
    .string()
    .describe('The generated cover letter.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

export async function generateCoverLetter(
  input: GenerateCoverLetterInput
): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'coverLetterGeneratorPrompt',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  prompt: `You are an expert career coach and resume writer.

  Given the following student achievements and a job description, write a compelling and professional cover letter. The tone should be enthusiastic but professional.

  The student's name is {{{studentName}}}.

  Student's Achievements:
  {{{achievements}}}

  Job Description:
  {{{jobDescription}}}

  Generate a cover letter that is tailored to the job description, highlighting the most relevant skills and experiences from the student's achievements.
  `,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
