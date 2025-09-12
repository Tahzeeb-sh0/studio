import SummarizerForm from "./summarizer-form";

export default function SummarizerPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Achievement Summarizer
        </h1>
        <p className="text-muted-foreground">
          Use AI to craft the perfect summary of your achievements for resumes and applications.
        </p>
      </div>
      <SummarizerForm />
    </div>
  );
}
