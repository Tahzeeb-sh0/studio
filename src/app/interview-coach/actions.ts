'use server';

import {
  generateInterviewQuestions,
  GenerateInterviewQuestionsInput,
} from '@/ai/flows/interview-question-generator';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { activities, student } from '@/lib/mock-data';
import { z } from 'zod';
import { format } from 'date-fns';

const InterviewCoachSchema = z.object({
  jobDescription: z
    .string()
    .min(50, 'Please provide a more detailed job description.'),
});

const approvedActivities = activities
  .filter((act) => act.status === 'Approved' && act.studentId === student.id)
  .map(
    (act) =>
      `- ${act.title}: ${act.description} (Completed: ${format(
        act.date,
        'PPP'
      )})`
  )
  .join('\n');

export async function generateQuestionsAction(prevState: any, formData: FormData) {
  const validatedFields = InterviewCoachSchema.safeParse({
    jobDescription: formData.get('jobDescription'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed',
      errors: validatedFields.error.flatten().fieldErrors,
      questions: [],
    };
  }

  try {
    const result = await generateInterviewQuestions({
      jobDescription: validatedFields.data.jobDescription,
      achievements: approvedActivities,
    });

    return {
      message: 'success',
      questions: result.questions,
      errors: {},
    };
  } catch (error) {
    console.error('Error generating questions:', error);
    return {
      message: 'An unexpected error occurred while generating the questions.',
      questions: [],
      errors: {},
    };
  }
}


export async function getQuestionAudioAction(question: string) {
    try {
        const result = await textToSpeech(question);
        return {
            audio: result.audio,
            error: null,
        };
    } catch(e) {
        console.error("Error generating audio:", e);
        return {
            audio: null,
            error: "Failed to generate audio for the question."
        }
    }
}
