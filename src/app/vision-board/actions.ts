
'use server';

import { generateVisionBoardSuggestions } from '@/ai/flows/vision-board-suggestion-generator';

export async function getVisionBoardSuggestionsAction(prompt: string) {
  if (!process.env.GEMINI_API_KEY) {
    return {
      error: 'The AI Twin is currently offline. An API key is required.',
      suggestions: null,
    };
  }
  
  try {
    const result = await generateVisionBoardSuggestions({ prompt });
    return {
      suggestions: result.suggestions,
      error: null,
    };
  } catch (error) {
    console.error('Error getting suggestions:', error);
    return {
      error: 'An unexpected error occurred while fetching suggestions.',
      suggestions: null,
    };
  }
}
