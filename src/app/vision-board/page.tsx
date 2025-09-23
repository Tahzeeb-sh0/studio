
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type VisionBoardItem = {
  id: string;
  gridClass: string;
  imageKey: string;
  text?: string;
  textClass?: string;
  dataAiHint: string;
};

const visionBoardItems: VisionBoardItem[] = [
  { id: '1', gridClass: 'col-span-2 row-span-2', imageKey: 'vision-success', text: 'Success', textClass: 'text-6xl', dataAiHint: 'mountain peak' },
  { id: '2', gridClass: 'col-span-2 row-span-1', imageKey: 'vision-growth', text: 'Growth', textClass: 'text-5xl', dataAiHint: 'sprouting plant' },
  { id: '3', gridClass: 'col-span-1 row-span-2', imageKey: 'vision-travel', text: 'Freedom', textClass: 'text-4xl', dataAiHint: 'world map' },
  { id: '4', gridClass: 'col-span-1 row-span-1 flex items-center justify-center bg-card', imageKey: '', text: 'Balance', textClass: 'text-5xl text-primary font-headline', dataAiHint: '' },
  { id: '5', gridClass: 'col-span-2 row-span-1', imageKey: 'vision-career', text: 'Impact', textClass: 'text-5xl', dataAiHint: 'modern office' },
  { id: '6', gridClass: 'col-span-1 row-span-1', imageKey: 'vision-health', text: 'Health', textClass: 'text-4xl', dataAiHint: 'fresh food' },
  { id: '7', gridClass: 'col-span-1 row-span-1', imageKey: 'vision-wealth', text: 'Abundance', textClass: 'text-3xl', dataAiHint: 'gold coins' },
  { id: '8', gridClass: 'col-span-1 row-span-1', imageKey: 'vision-education', text: 'Creativity', textClass: 'text-3xl', dataAiHint: 'books library' },
  { id: '9', gridClass: 'col-span-1 row-span-2', imageKey: 'vision-mindfulness', text: 'Mindfulness', textClass: 'text-4xl', dataAiHint: 'meditation sunset' },
  { id: '10', gridClass: 'col-span-2 row-span-1', imageKey: 'vision-relationships', text: 'Love', textClass: 'text-6xl', dataAiHint: 'friends laughing' },
];

export default function VisionBoardPage() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Your Vision Board
        </h1>
        <p className="text-muted-foreground">
          A modern and inspiring canvas for your goals and dreams.
        </p>
      </div>
      <div className="grid grid-cols-4 auto-rows-[200px] gap-4">
        {visionBoardItems.map((item) => {
          const image = PlaceHolderImages.find((img) => img.id === item.imageKey);
          return (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-lg shadow-lg group ${item.gridClass}`}
            >
              {image && (
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={item.dataAiHint}
                />
              )}
              {item.text && (
                <div className={`absolute inset-0 flex items-center justify-center p-4 ${!item.imageKey ? '' : 'bg-black/40'}`}>
                  <span
                    className={`font-headline font-bold text-white text-center drop-shadow-lg ${item.textClass}`}
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                  >
                    {item.text}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
