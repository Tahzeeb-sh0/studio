'use server';

import { summarizeAchievements, SummarizeAchievementsInput } from "@/ai/flows/achievement-summarizer";
import { z } from "zod";

const SummarizerSchema = z.object({
  achievements: z.string().min(20, "Please provide more details about your achievements."),
  requirements: z.string().min(10, "Please provide some requirements for the summary."),
});

export async function generateSummaryAction(prevState: any, formData: FormData) {
  const validatedFields = SummarizerSchema.safeParse({
    achievements: formData.get('achievements'),
    requirements: formData.get('requirements'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed",
      errors: validatedFields.error.flatten().fieldErrors,
      summary: "",
    };
  }

  try {
    const result = await summarizeAchievements(validatedFields.data as SummarizeAchievementsInput);
    return {
      message: "success",
      summary: result.summary,
      errors: {},
    };
  } catch (error) {
    console.error("Error generating summary:", error);
    return {
      message: "An unexpected error occurred while generating the summary.",
      summary: "",
      errors: {},
    };
  }
}
