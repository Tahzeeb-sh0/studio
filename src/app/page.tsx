
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
import { users, activities } from '@/lib/mock-data';
import { Trophy, Award, GraduationCap } from 'lucide-react';
import { Student } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
  const leaderboard = calculateLeaderboard();
  const topThree = leaderboard.slice(0, 3);
  const runnersUp = leaderboard.slice(3);

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {topThree.map((entry, index) => (
          <Card key={entry.student.id} className={`transition-all duration-300 ease-in-out hover:scale-[1.05] hover:shadow-2xl hover:shadow-primary/20 border-2 ${
              index === 0 ? 'border-yellow-400' : index === 1 ? 'border-gray-400' : 'border-yellow-600'
          }`}>
            <CardContent className="relative flex flex-col items-center justify-center p-6 text-center">
              <div className={`absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border-2 text-base font-bold ${getRankColor(entry.rank)}`}>
                  {entry.rank}
              </div>
              <Avatar className="w-20 h-20 mb-4 border-4 border-muted">
                <AvatarImage src={entry.student.avatarUrl} alt={entry.student.name} />
                <AvatarFallback>{entry.student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-bold">{entry.student.name}</h3>
              <p className="text-sm text-muted-foreground">{entry.student.major}</p>
              <div className="mt-3 flex items-center gap-2 text-xl font-bold text-primary">
                <Award className="h-5 w-5"/>
                <span>{entry.totalCredits}</span>
              </div>
               <p className="text-xs text-muted-foreground">Total Credits</p>
            </CardContent>
          </Card>
        ))}
      </div>


      <Card className="transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20">
        <CardHeader>
          <CardTitle>All Rankings</CardTitle>
          <CardDescription>A complete list of students ranked by their approved activity credits.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Major</TableHead>
                <TableHead className="text-right">Credits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {runnersUp.map((entry) => (
                <TableRow key={entry.id}>
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
                  <TableCell className="text-right font-bold text-primary">{entry.totalCredits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
