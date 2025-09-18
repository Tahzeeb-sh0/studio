import { z } from 'zod';

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
