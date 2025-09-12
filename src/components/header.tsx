import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { student } from '@/lib/mock-data';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        {/* Placeholder for dynamic page titles */}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold">{student.name}</p>
          <p className="text-xs text-muted-foreground">{student.email}</p>
        </div>
        <Avatar>
          <AvatarImage src={student.avatarUrl} alt={student.name} />
          <AvatarFallback>
            {student.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
