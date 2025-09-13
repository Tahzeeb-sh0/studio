'use server';

import { careerCounselor, CareerCounselorInput } from "@/ai/flows/career-counselor";
import { activities, student } from "@/lib/mock-data";
import { format } from "date-fns";

const approvedActivities = activities
    .filter(act => act.status === 'Approved' && act.studentId === student.id)
    .map(act => `- ${act.title}: ${act.description} (Completed: ${format(act.date, 'PPP')})`)
    .join('\n');


export async function askCareerCounselorAction(history: CareerCounselorInput['history']) {
  try {
    const result = await careerCounselor({
        achievements: approvedActivities,
        studentName: student.name,
        history,
    });

    return {
      message: result.message,
      error: null,
    };
  } catch (error) {
    console.error("Error asking career counselor:", error);
    return {
      message: null,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
