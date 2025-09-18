import InterviewCoach from "./interview-coach";

export default function InterviewCoachPage() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          AI Interview Coach
        </h1>
        <p className="text-muted-foreground">
          Generate mock interview questions based on a job description to practice and prepare.
        </p>
      </div>
      <InterviewCoach />
    </div>
  );
}
