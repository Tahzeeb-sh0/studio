'use server';

import { generateAiTwinMessage, AiTwinInput } from "@/ai/flows/ai-twin";
import { activities, student, academicRecord } from "@/lib/mock-data";
import { format } from "date-fns";

const approvedActivities = activities
    .filter(act => act.status === 'Approved' && act.studentId === student.id)
    .map(act => `- ${act.title}: ${act.description} (Completed: ${format(act.date, 'PPP')})`)
    .join('\n');


export async function askAiTwinAction(history: AiTwinInput['history']) {
  if (!process.env.GEMINI_API_KEY) {
    return {
      message: "Hi! Your AI Twin is currently offline. Please add your Gemini API key to the .env file to enable this feature.",
      error: "API key not configured.",
    };
  }

  try {
    const result = await generateAiTwinMessage({
        achievements: approvedActivities,
        studentName: student.name,
        gpa: academicRecord.gpa,
        degreeProgress: (academicRecord.creditsEarned / academicRecord.totalCredits) * 100,
        history,
    });

    return {
      message: result.message,
      error: null,
    };
  } catch (error) {
    console.error("Error asking AI Twin:", error);
    return {
      message: null,
      error: "I'm having a little trouble gathering my thoughts right now. Please check back in a bit!",
    };
  }
}
