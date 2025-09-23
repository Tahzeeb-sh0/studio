
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
import { Trophy, Award, Crown } from 'lucide-react';
import { Student } from '@/lib/types';
import { cn } from '@/lib/utils';

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

export default function LeaderboardPage() {
  const leaderboard = calculateLeaderboard();
  const topThree = leaderboard.slice(0, 3);
  const runnersUp = leaderboard.slice(3);

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Student Leaderboard
        </h1>
        <p className="text-muted-foreground">
          Top students ranked by total approved activity credits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        {/* Rank 2 */}
        {topThree[1] && (
          <Card key={topThree[1].student.id} className="border-2 border-gray-400 relative overflow-hidden">
            <CardContent className="relative flex flex-col items-center justify-center p-6 text-center">
              <div className={`absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 text-lg font-bold ${getRankColor(topThree[1].rank)}`}>
                {topThree[1].rank}
              </div>
              <Avatar className="w-24 h-24 mb-4 border-4 border-muted">
                <AvatarImage src={topThree[1].student.avatarUrl} alt={topThree[1].student.name} />
                <AvatarFallback>{topThree[1].student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{topThree[1].student.name}</h3>
              <p className="text-sm text-muted-foreground">{topThree[1].student.major}</p>
              <div className="mt-4 flex items-center gap-2 text-2xl font-bold text-primary">
                <Award className="h-6 w-6"/>
                <span>{topThree[1].totalCredits}</span>
              </div>
              <p className="text-xs text-muted-foreground">Total Credits</p>
            </CardContent>
          </Card>
        )}

        {/* Rank 1 */}
        {topThree[0] && (
          <Card key={topThree[0].student.id} className="border-2 border-yellow-400 relative overflow-hidden transform md:scale-110 bg-gradient-to-br from-card to-yellow-400/10">
            <CardContent className="relative flex flex-col items-center justify-center p-6 text-center">
                <Crown className="absolute -top-1 left-1/2 -translate-x-1/2 h-10 w-10 text-yellow-400 -rotate-12" />
              <div className={`absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 text-lg font-bold ${getRankColor(topThree[0].rank)}`}>
                {topThree[0].rank}
              </div>
              <Avatar className="w-28 h-28 mb-4 border-4 border-yellow-400/50">
                <AvatarImage src={topThree[0].student.avatarUrl} alt={topThree[0].student.name} />
                <AvatarFallback>{topThree[0].student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-2xl font-bold">{topThree[0].student.name}</h3>
              <p className="text-sm text-muted-foreground">{topThree[0].student.major}</p>
              <div className="mt-4 flex items-center gap-2 text-3xl font-bold text-primary">
                <Award className="h-7 w-7"/>
                <span>{topThree[0].totalCredits}</span>
              </div>
              <p className="text-xs text-muted-foreground">Total Credits</p>
            </CardContent>
          </Card>
        )}

        {/* Rank 3 */}
        {topThree[2] && (
          <Card key={topThree[2].student.id} className="border-2 border-yellow-600 relative overflow-hidden">
            <CardContent className="relative flex flex-col items-center justify-center p-6 text-center">
              <div className={`absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 text-lg font-bold ${getRankColor(topThree[2].rank)}`}>
                {topThree[2].rank}
              </div>
              <Avatar className="w-24 h-24 mb-4 border-4 border-muted">
                <AvatarImage src={topThree[2].student.avatarUrl} alt={topThree[2].student.name} />
                <AvatarFallback>{topThree[2].student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{topThree[2].student.name}</h3>
              <p className="text-sm text-muted-foreground">{topThree[2].student.major}</p>
              <div className="mt-4 flex items-center gap-2 text-2xl font-bold text-primary">
                <Award className="h-6 w-6"/>
                <span>{topThree[2].totalCredits}</span>
              </div>
              <p className="text-xs text-muted-foreground">Total Credits</p>
            </CardContent>
          </Card>
        )}
      </div>


      <Card>
        <CardHeader>
          <CardTitle>All Rankings</CardTitle>
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
                  <TableCell className="text-right font-bold text-primary">{entry.totalCredits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

    