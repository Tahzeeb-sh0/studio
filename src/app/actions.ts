'use server';

import { generateAiTwinMessage } from "@/ai/flows/ai-twin";
import { activities, student, academicRecord } from "@/lib/mock-data";
import { format } from "date-fns";

const approvedActivities = activities
    .filter(act => act.status === 'Approved' && act.studentId === student.id)
    .map(act => `- ${act.title}: ${act.description} (Completed: ${format(act.date, 'PPP')})`)
    .join('\n');

export async function getAiTwinMessageAction() {
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
    } catch (error) {
        console.error("Error getting AI Twin message:", error);
        return {
            message: `Hi ${student.name.split(' ')[0]}! I'm having a little trouble gathering my thoughts right now. Please check back in a bit!`,
            error: "An unexpected error occurred.",
        };
    }
}
