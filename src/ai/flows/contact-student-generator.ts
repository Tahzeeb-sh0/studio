'use server';

/**
 * @fileOverview A Genkit flow for generating a professional contact email to a student.
 *
 * - generateContactEmail - A function that generates an email from a recruiter to a student.
 * - GenerateContactEmailInput - The input type for the function.
 * - GenerateContactEmailOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContactEmailInputSchema = z.object({
  studentName: z.string().describe("The student's name."),
  companyName: z.string().describe("The recruiter's company name."),
  recruiterName: z.string().describe("The recruiter's name."),
  jobTitle: z.string().describe('The job title or opportunity being presented.'),
  message: z.string().describe('A brief, personal message from the recruiter to the student.'),
});
export type GenerateContactEmailInput = z.infer<typeof GenerateContactEmailInputSchema>;

const GenerateContactEmailOutputSchema = z.object({
  emailBody: z.string().describe('The generated professional email body.'),
});
export type GenerateContactEmailOutput = z.infer<typeof GenerateContactEmailOutputSchema>;

export async function generateContactEmail(
  input: GenerateContactEmailInput
): Promise<GenerateContactEmailOutput> {
  return generateContactEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contactStudentPrompt',
  input: {schema: GenerateContactEmailInputSchema},
  output: {schema: GenerateContactEmailOutputSchema},
  prompt: `You are an assistant for a recruiter. Your task is to draft a professional and engaging email to a university student about a job opportunity.

Student's Name: {{{studentName}}}
Company: {{{companyName}}}
Recruiter's Name: {{{recruiterName}}}
Job Title/Opportunity: {{{jobTitle}}}
Personal Message from Recruiter:
{{{message}}}

Based on this information, generate a compelling email body. The email should:
1.  Start with a polite greeting to {{{studentName}}}.
2.  Introduce {{{recruiterName}}} from {{{companyName}}}.
3.  Mention that the recruiter was impressed with the student's portfolio.
4.  Incorporate the personal message naturally.
5.  Briefly mention the {{{jobTitle}}} opportunity.
6.  Suggest the next steps (e.g., a brief chat).
7.  End with a professional closing.

Do not include a subject line, just the email body.
  `,
});

const generateContactEmailFlow = ai.defineFlow(
  {
    name: 'generateContactEmailFlow',
    inputSchema: GenerateContactEmailInputSchema,
    outputSchema: GenerateContactEmailOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
