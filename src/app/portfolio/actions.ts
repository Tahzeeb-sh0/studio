'use server';

import { generateCoverLetter, GenerateCoverLetterInput } from "@/ai/flows/cover-letter-generator";
import { activities, student } from "@/lib/mock-data";
import { z } from "zod";
import { format } from "date-fns";

const CoverLetterSchema = z.object({
  jobDescription: z.string().min(50, "Please provide a more detailed job description."),
});

const approvedActivities = activities
    .filter(act => act.status === 'Approved' && act.studentId === student.id)
    .map(act => `- ${act.title}: ${act.description} (Completed: ${format(act.date, 'PPP')})`)
    .join('\n');

export async function generateCoverLetterAction(prevState: any, formData: FormData) {
  const validatedFields = CoverLetterSchema.safeParse({
    jobDescription: formData.get('jobDescription'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed",
      errors: validatedFields.error.flatten().fieldErrors,
      coverLetter: "",
    };
  }

  try {
    const result = await generateCoverLetter({
        jobDescription: validatedFields.data.jobDescription,
        achievements: approvedActivities,
        studentName: student.name,
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
