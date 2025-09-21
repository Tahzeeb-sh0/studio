
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { users, activities, allSkills } from '@/lib/mock-data';
import { Search, X as XIcon } from 'lucide-react';
import { Student } from '@/lib/types';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

interface LeaderboardEntry {
  student: Student;
  totalCredits: number;
  rank: number;
}

const calculateLeaderboard = (): LeaderboardEntry[] => {
  const studentCredits: { [key: string]: number } = {};

  activities.forEach((activity) => {
    if (activity.status === 'Approved') {
      if (!studentCredits[activity.studentId]) {
        studentCredits[activity.studentId] = 0;
      }
      studentCredits[activity.studentId] += activity.credits;
    }
  });

  const sortedStudents = users
    .filter((user) => user.role === 'student')
    .map((student) => ({
      student,
      totalCredits: studentCredits[student.id] || 0,
    }))
    .sort((a, b) => b.totalCredits - a.totalCredits);

  return sortedStudents.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));
};

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-yellow-400 text-yellow-900 border-yellow-500';
    case 2:
      return 'bg-gray-300 text-gray-800 border-gray-400';
    case 3:
      return 'bg-yellow-600 text-yellow-100 border-yellow-700';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const MAX_SKILLS_DISPLAY = 3;

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const leaderboard = useMemo(() => calculateLeaderboard(), []);

  const filteredLeaderboard = useMemo(() => {
    return leaderboard.filter((entry) => {
      const matchesSearch = entry.student.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.every((skill) =>
          entry.student.skills?.includes(skill)
        );
      return matchesSearch && matchesSkills;
    });
  }, [leaderboard, searchQuery, selectedSkills]);

  const topThree = filteredLeaderboard.slice(0, 3);
  const runnersUp = filteredLeaderboard.slice(3);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSkills([]);
  };
  
  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Find Your Next Top Talent
        </h1>
      </div>

      <Card className="transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by student name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Filter by Skills ({selectedSkills.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by Skills</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {allSkills.map((skill) => (
                    <DropdownMenuCheckboxItem
                      key={skill}
                      checked={selectedSkills.includes(skill)}
                      onSelect={(e) => e.preventDefault()}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    >
                      {skill}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {(searchQuery || selectedSkills.length > 0) && (
                <Button variant="ghost" onClick={clearFilters}>
                  <XIcon className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

       <div>
        <h2 className="font-headline text-2xl font-bold tracking-tight mb-4">
          Featured Students
        </h2>
        {topThree.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topThree.map((entry, index) => (
              <Link key={entry.student.id} href={`/portfolio/${entry.student.id}`} className="block">
                <Card
                  className={`transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border-2 h-full ${
                    index === 0
                      ? 'border-yellow-400'
                      : index === 1
                      ? 'border-gray-400'
                      : 'border-yellow-600'
                  }`}
                >
                  <CardContent className="relative flex flex-col items-center justify-center p-6 text-center">
                    <div
                      className={`absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 text-lg font-bold ${getRankColor(
                        entry.rank
                      )}`}
                    >
                      {entry.rank}
                    </div>
                    <Avatar className="w-24 h-24 mb-4 border-4 border-muted">
                      <AvatarImage
                        src={entry.student.avatarUrl}
                        alt={entry.student.name}
                      />
                      <AvatarFallback>
                        {entry.student.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="text-xl font-bold">{entry.student.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {entry.student.major}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No students match the current filters.
          </p>
        )}
      </div>

      <Card className="transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20">
        <CardHeader>
          <CardTitle>All Rankings</CardTitle>
          <CardDescription>
            A complete list of students ranked by their approved activity credits.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Major</TableHead>
                <TableHead>Skills</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {runnersUp.map((entry) => (
                <TableRow key={entry.student.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                     <Link href={`/portfolio/${entry.student.id}`} className="block w-full h-full">
                      <Badge variant="secondary" className="text-lg">
                        {entry.rank}
                      </Badge>
                     </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/portfolio/${entry.student.id}`} className="block w-full h-full">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={entry.student.avatarUrl}
                            alt={entry.student.name}
                          />
                          <AvatarFallback>
                            {entry.student.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{entry.student.name}</span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <Link href={`/portfolio/${entry.student.id}`} className="block w-full h-full">
                      {entry.student.major}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/portfolio/${entry.student.id}`} className="block w-full h-full">
                      <div className="flex flex-wrap gap-1">
                        {entry.student.skills
                          ?.slice(0, MAX_SKILLS_DISPLAY)
                          .map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        {entry.student.skills &&
                          entry.student.skills.length > MAX_SKILLS_DISPLAY && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge variant="secondary">
                                    +
                                    {entry.student.skills.length -
                                      MAX_SKILLS_DISPLAY}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {entry.student.skills
                                      .slice(MAX_SKILLS_DISPLAY)
                                      .join(', ')}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                      </div>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

    

    