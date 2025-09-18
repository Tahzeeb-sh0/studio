'use server';

import { verifyGithubProfile } from '@/ai/flows/github-verifier';
import { z } from 'zod';

const GithubConnectSchema = z.object({
  username: z.string().min(1, 'GitHub username is required.'),
});

interface VerifyGithubState {
  message: string;
  user?: {
    username: string;
    repositories: number;
    commits: number;
    pullRequests: number;
  } | null;
  errors?: {
    username?: string[];
  } | null;
}

export async function verifyGithubAction(
  prevState: VerifyGithubState,
  formData: FormData
): Promise<VerifyGithubState> {
  const validatedFields = GithubConnectSchema.safeParse({
    username: formData.get('username'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await verifyGithubProfile({
      username: validatedFields.data.username,
    });

    if (!result.isValid) {
      return {
        message: 'User not found.',
        errors: {
          username: ['Could not find a GitHub user with that name. Please check the spelling.'],
        }
      };
    }

    return {
      message: 'success',
      user: {
        username: validatedFields.data.username,
        repositories: result.repositories,
        commits: result.commits,
        pullRequests: result.pullRequests,
      },
      errors: null,
    };
  } catch (error) {
    console.error('Error verifying GitHub profile:', error);
    return {
      message: 'An unexpected error occurred.',
      errors: {
        username: ['Something went wrong on our end. Please try again later.'],
      },
    };
  }
}
