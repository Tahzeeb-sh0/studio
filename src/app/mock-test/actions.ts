
'use server';

import { generateMockTestQuestions as generateQuestionsFlow, GenerateMockTestOutput } from "@/ai/flows/mock-test-generator";

export type Question = GenerateMockTestOutput['questions'][0] & { isCorrect?: boolean };

export async function generateMockTestQuestions(topic: string): Promise<{ questions: Question[] | null, error: string | null }> {
  if (!process.env.GEMINI_API_KEY) {
    return {
      questions: null,
      error: 'The Mock Test feature is currently offline. An API key is required.',
    };
  }

  try {
    const result = await generateQuestionsFlow({ topic });
    return {
      questions: result.questions.map(q => ({...q})),
      error: null,
    };
  } catch (error) {
    console.error('Error generating mock test questions:', error);
    return {
      questions: null,
      error: 'An unexpected error occurred while generating the quiz.',
    };
  }
}
