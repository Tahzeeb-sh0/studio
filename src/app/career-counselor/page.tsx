import Chat from "./chat";

export default function CareerCounselorPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          AI Career Counselor
        </h1>
        <p className="text-muted-foreground">
          Get personalized career advice based on your verified achievements.
        </p>
      </div>
      <Chat />
    </div>
  );
}
