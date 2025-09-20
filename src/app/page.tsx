
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
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
import { Student } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ListFilter } from 'lucide-react';

interface LeaderboardEntry {
  student: Student;
  totalCredits: number;
  rank: number;
}

const calculateLeaderboard = (): LeaderboardEntry[] => {
  const studentCredits: { [key: string]: number } = {};

  activities.forEach(activity => {
    if (activity.status === 'Approved') {
      if (!studentCredits[activity.studentId]) {
        studentCredits[activity.studentId] = 0;
      }
      studentCredits[activity.studentId] += activity.credits;
    }
  });

  const sortedStudents = users
    .filter(user => user.role === 'student')
    .map(student => ({
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

export default function CompaniesPage() {
  const [leaderboard, setLeaderboard] = React.useState<LeaderboardEntry[]>([]);
  const [selectedSkills, setSelectedSkills] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    const allStudents = calculateLeaderboard();
    if (selectedSkills.size === 0) {
      setLeaderboard(allStudents);
    } else {
      const filteredStudents = allStudents.filter(entry => 
        entry.student.skills && Array.from(selectedSkills).every(skill => entry.student.skills?.includes(skill))
      );
      setLeaderboard(filteredStudents);
    }
  }, [selectedSkills]);

  const handleSkillToggle = (skill: string) => {
    const newSkills = new Set(selectedSkills);
    if (newSkills.has(skill)) {
      newSkills.delete(skill);
    } else {
      newSkills.add(skill);
    }
    setSelectedSkills(newSkills);
  };


  const topThree = leaderboard.slice(0, 3);
  const runnersUp = leaderboard.slice(3);

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
       <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <ListFilter className="mr-2 h-4 w-4" />
              Filter by Skills
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>Select Skills</DropdownMenuLabel>
            <DropdownMenuSeparator />
             <div className="max-h-60 overflow-y-auto">
              {allSkills.map((skill) => (
                <DropdownMenuCheckboxItem
                  key={skill}
                  checked={selectedSkills.has(skill)}
                  onCheckedChange={() => handleSkillToggle(skill)}
                  onSelect={(e) => e.preventDefault()} // Prevent menu from closing
                >
                  {skill}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topThree.map((entry, index) => (
          <Card key={entry.student.id} className={`transition-all duration-300 ease-in-out hover:scale-[1.05] hover:shadow-2xl hover:shadow-primary/20 border-2 ${
              index === 0 ? 'border-yellow-400' : index === 1 ? 'border-gray-400' : 'border-yellow-600'
          }`}>
            <CardContent className="relative flex flex-row items-center gap-4 p-4">
              <div className={`absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border-2 text-base font-bold ${getRankColor(entry.rank)}`}>
                  {entry.rank}
              </div>
              <Avatar className="w-20 h-20 border-4 border-muted">
                <AvatarImage src={entry.student.avatarUrl} alt={entry.student.name} />
                <AvatarFallback>{entry.student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold">{entry.student.name}</h3>
                <p className="text-sm text-muted-foreground">{entry.student.major}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>


      <Card className="transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20">
        <CardContent className="p-6">
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
                <TableRow key={entry.student.id}>
                  <TableCell>
                     <Badge variant="secondary" className="text-lg">
                      {entry.rank}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                       <Avatar className="h-9 w-9">
                        <AvatarImage src={entry.student.avatarUrl} alt={entry.student.name} />
                        <AvatarFallback>
                            {entry.student.name.split(' ').map((n) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{entry.student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{entry.student.major}</TableCell>
                   <TableCell>
                     <div className="flex flex-wrap gap-1">
                      {entry.student.skills?.slice(0,3).map(skill => (
                        <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                      {entry.student.skills && entry.student.skills.length > 3 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                               <Badge variant="outline" className="text-xs">+{entry.student.skills.length - 3}</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{entry.student.skills.slice(3).join(', ')}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      </div>
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
