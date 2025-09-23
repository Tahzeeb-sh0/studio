
'use server';

/**
 * @fileOverview A Genkit flow for verifying GitHub usernames.
 *
 * - verifyGithubUsername - Verifies if a GitHub username is likely to be owned by the student.
 * - VerifyGithubUsernameInput - The input type for the verification function.
 * - VerifyGithubUsernameOutput - The return type for the verification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyGithubUsernameInputSchema = z.object({
  studentName: z.string().describe("The student's full name."),
  githubUsername: z
    .string()
    .describe('The GitHub username to be verified.'),
});
export type VerifyGithubUsernameInput = z.infer<typeof VerifyGithubUsernameInputSchema>;

const VerifyGithubUsernameOutputSchema = z.object({
  isLikelyOwner: z.boolean().describe('Whether the student is likely the owner of the GitHub account.'),
  reasoning: z.string().describe('A brief explanation for the decision.'),
});
export type VerifyGithubUsernameOutput = z.infer<typeof VerifyGithubUsernameOutputSchema>;

export async function verifyGithubUsername(
  input: VerifyGithubUsernameInput
): Promise<VerifyGithubUsernameOutput> {
  return verifyGithubUsernameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'githubVerifierPrompt',
  input: {schema: VerifyGithubUsernameInputSchema},
  output: {schema: VerifyGithubUsernameOutputSchema},
  prompt: `You are an AI assistant that verifies if a GitHub username likely belongs to a given student based on their name.

  The student's name is "{{{studentName}}}".
  The GitHub username to verify is "{{{githubUsername}}}".

  Your task is to determine if the username is a plausible match for the student's name. Consider common username patterns like:
  - firstnamelastname
  - firstname-lastname
  - f-lastname
  - flastname
  - firstname_l
  - etc., including variations with numbers.

  If the username seems like a plausible match for the student's name, set isLikelyOwner to true. Otherwise, set it to false.
  Provide a brief reasoning for your decision. For example, if the name is "Jane Doe" and the username is "j-doe", the reasoning could be "The username 'j-doe' follows a common pattern of using the first initial and last name."
  If the name is "Jane Doe" and the username is "awesome-dev-123", the reasoning could be "The username 'awesome-dev-123' does not appear to be related to the student's name."
  `,
});

const verifyGithubUsernameFlow = ai.defineFlow(
  {
    name: 'verifyGithubUsernameFlow',
    inputSchema: VerifyGithubUsernameInputSchema,
    outputSchema: VerifyGithubUsernameOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

