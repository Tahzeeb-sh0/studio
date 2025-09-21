
'use server';

import { generateCoverLetter } from "@/ai/flows/cover-letter-generator";
import { activities, users } from "@/lib/mock-data";
import { z } from "zod";
import { format } from "date-fns";

const CoverLetterSchema = z.object({
  jobDescription: z.string().min(50, "Please provide a more detailed job description."),
  studentId: z.string(),
  studentName: z.string(),
});

export async function generateCoverLetterAction(prevState: any, formData: FormData) {
  const validatedFields = CoverLetterSchema.safeParse({
    jobDescription: formData.get('jobDescription'),
    studentId: formData.get('studentId'),
    studentName: formData.get('studentName'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed",
      errors: validatedFields.error.flatten().fieldErrors,
      coverLetter: "",
    };
  }

  const { studentId, studentName, jobDescription } = validatedFields.data;

  const student = users.find(u => u.id === studentId);
  if (!student) {
    return {
      message: "Student not found.",
      coverLetter: "",
      errors: {},
    };
  }

  const approvedActivities = activities
    .filter(act => act.status === 'Approved' && act.studentId === studentId)
    .map(act => `- ${act.title}: ${act.description} (Completed: ${format(act.date, 'PPP')})`)
    .join('\n');

  try {
    const result = await generateCoverLetter({
        jobDescription: jobDescription,
        achievements: approvedActivities,
        studentName: studentName,
    });

    return {
      message: "success",
      coverLetter: result.coverLetter,
      errors: {},
    };
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return {
      message: "An unexpected error occurred while generating the cover letter.",
      coverLetter: "",
      errors: {},
    };
  }
}

    