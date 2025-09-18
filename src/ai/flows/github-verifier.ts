'use server';

/**
 * @fileOverview A Genkit flow for verifying GitHub profiles.
 *
 * - verifyGithubProfile - A function that verifies a GitHub username and retrieves basic stats.
 * - GithubProfileInput - The input type for the verifyGithubProfile function.
 * - GithubProfileOutput - The return type for the verifyGithubProfile function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GithubProfileInputSchema = z.object({
  username: z.string().describe('The GitHub username to verify.'),
});
export type GithubProfileInput = z.infer<typeof GithubProfileInputSchema>;

export const GithubProfileOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the GitHub user exists.'),
  repositories: z.number().describe('The number of public repositories.'),
  commits: z.number().describe('A realistic but random number of total commits for the last year.'),
  pullRequests: z.number().describe('A realistic but random number of pull requests for the last year.'),
  gists: z.number().describe('A realistic but random number of public gists.'),
});
export type GithubProfileOutput = z.infer<typeof GithubProfileOutputSchema>;

// Mock tool to simulate fetching GitHub profile data.
const getGithubProfile = ai.defineTool(
  {
    name: 'getGithubProfile',
    description:
      'Gets profile information for a given GitHub username. Returns null if the user does not exist.',
    inputSchema: z.object({ username: z.string() }),
    outputSchema: z.object({
      repositories: z.number(),
      commits: z.number(),
      pullRequests: z.number(),
      gists: z.number(),
    }).nullable(),
  },
  async ({ username }) => {
    // In a real app, you would fetch this data from the GitHub API.
    // For this demo, we'll return mock data for a known user and null for others.
    if (username.toLowerCase() === 'tahzeeb-sh0') {
      return {
        repositories: 25,
        commits: 531,
        pullRequests: 42,
        gists: 5,
      };
    }
    return null;
  }
);

const prompt = ai.definePrompt({
  name: 'githubVerifierPrompt',
  input: { schema: GithubProfileInputSchema },
  output: { schema: GithubProfileOutputSchema },
  tools: [getGithubProfile],
  prompt: `Verify the GitHub user '{{{username}}}' using the getGithubProfile tool.

If the tool returns a user profile, set isValid to true and populate the repository, commit, pull request, and gist counts from the tool's output.

If the tool returns null, it means the user does not exist. In that case, set isValid to false and all other numeric fields to 0.
`,
});

export const verifyGithubProfileFlow = ai.defineFlow(
  {
    name: 'verifyGithubProfileFlow',
    inputSchema: GithubProfileInputSchema,
    outputSchema: GithubProfileOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

export async function verifyGithubProfile(
  input: GithubProfileInput
): Promise<GithubProfileOutput> {
  return verifyGithubProfileFlow(input);
}
