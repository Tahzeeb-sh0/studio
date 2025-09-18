import Chat from "./chat";

export default function AiTwinPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Your AI Twin
        </h1>
        <p className="text-muted-foreground">
          Chat with your AI Twin for personalized insights and encouragement.
        </p>
      </div>
      <Chat />
    </div>
  );
}
