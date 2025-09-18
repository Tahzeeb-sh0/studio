'use server';

import { generateAiTwinMessage } from "@/ai/flows/ai-twin";
import { activities, student, academicRecord } from "@/lib/mock-data";
import { format } from "date-fns";

const approvedActivities = activities
    .filter(act => act.status === 'Approved' && act.studentId === student.id)
    .map(act => `- ${act.title}: ${act.description} (Completed: ${format(act.date, 'PPP')})`)
    .join('\n');

export async function getAiTwinMessageAction() {
    // Check if the Gemini API key is missing.
    if (!process.env.GEMINI_API_KEY) {
        console.warn("GEMINI_API_KEY is not set. Using a fallback message for AI Twin.");
        return {
            message: `Hi ${student.name.split(' ')[0]}! Your AI Twin is currently offline. Please add your Gemini API key to the .env file to enable this feature.`,
            error: "API key not configured.",
        };
    }

    try {
        const result = await generateAiTwinMessage({
            studentName: student.name,
            achievements: approvedActivities,
            gpa: academicRecord.gpa,
            degreeProgress: (academicRecord.creditsEarned / academicRecord.totalCredits) * 100,
        });
        return {
            message: result.message,
            error: null,
        };
    } catch (error: any) {
        console.error("Error getting AI Twin message:", error);
        // Provide a more specific fallback if the API key is expired.
        if (error.message?.includes("API key expired")) {
            return {
                message: `Hi ${student.name.split(' ')[0]}! It looks like your API key has expired. Please renew it to get personalized insights.`,
                error: "API key expired.",
            };
        }
        return {
            message: `Hi ${student.name.split(' ')[0]}! I'm having a little trouble gathering my thoughts right now. Please check back in a bit!`,
            error: "An unexpected error occurred.",
        };
    }
}
