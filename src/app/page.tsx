
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
import { academicRecord, activities, student } from '@/lib/mock-data';
import {
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
  Bar,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Activity } from '@/lib/types';
import { Award, BookOpen, CalendarClock, GraduationCap, Target, Bot, MessageSquareHeart } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import { student as defaultStudent } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const getStatusVariant = (status: Activity['status']) => {
  switch (status) {
    case 'Approved':
      return 'default';
    case 'Pending':
      return 'secondary';
    case 'Rejected':
      return 'destructive';
    default:
      return 'outline';
  }
};

const activityData = activities.reduce((acc, activity) => {
  const existing = acc.find((item) => item.category === activity.category);
  if (existing) {
    existing.count += 1;
  } else {
    acc.push({ category: activity.category, count: 1 });
  }
  return acc;
}, [] as { category: string; count: number }[]);

const totalActivityCredits = activities
  .filter((act) => act.status === 'Approved')
  .reduce((sum, act) => sum + act.credits, 0);

const chartConfig = {
  count: {
    label: "Activities",
  },
};

const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default async function DashboardPage() {

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Welcome back, {student.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here's a snapshot of your achievements and progress.
        </p>
      </div>

       <Card className="w-full transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <Image
            src={defaultStudent.avatarUrl}
            alt="AI Twin"
            width={80}
            height={80}
            className="rounded-full border-4 border-primary/50 shadow-lg"
            data-ai-hint="futuristic avatar"
          />
          <div className="text-center sm:text-left flex-grow">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Bot className="h-6 w-6 text-primary"/>
              <h3 className="text-xl font-headline font-semibold text-primary">Your AI Twin</h3>
            </div>
            <p className="text-muted-foreground mt-2 italic">
              Ready to chat? I can offer personalized insights and encouragement based on your progress.
            </p>
          </div>
            <Button asChild>
                <Link href="/ai-twin">
                    <MessageSquareHeart className="mr-2 h-4 w-4" />
                    Chat with your Twin
                </Link>
            </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">GPA</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{academicRecord.gpa.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Your current Grade Point Average.</p>
          </CardContent>
        </Card>
        <Card className="transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{academicRecord.attendance}%</div>
            <p className="text-xs text-muted-foreground">Your overall attendance rate.</p>
          </CardContent>
        </Card>
        <Card className="transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
           <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Activity Credits</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActivityCredits}</div>
            <p className="text-xs text-muted-foreground">Credits from approved activities.</p>
          </CardContent>
        </Card>
        <Card className="transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
           <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Degree Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
                {academicRecord.creditsEarned} / {academicRecord.totalCredits}
            </div>
            <p className="text-xs text-muted-foreground">
                {((academicRecord.creditsEarned / academicRecord.totalCredits) * 100).toFixed(0)}% towards your degree.
            </p>
          </CardContent>
        </Card>
      </div>

       <Card className="lg:col-span-3 transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen />
                  Top GitHub Projects
                </CardTitle>
                <CardDescription>
                  A snapshot of your top public repositories on GitHub.
                </CardDescription>
              </div>
               <Button asChild size="sm" className="mt-4 sm:mt-0">
                  <Link href="/github">
                    View Details
                  </Link>
                </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Connect your GitHub account on the GitHub page to see your projects here.
            </p>
          </CardContent>
        </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3 transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              A log of your most recently submitted activities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.slice(0, 5).map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">
                      {activity.title}
                    </TableCell>
                    <TableCell>{activity.category}</TableCell>
                    <TableCell>
                      {format(new Date(activity.date), 'PPP')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={getStatusVariant(activity.status)}>
                        {activity.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
          <CardHeader>
            <CardTitle>Activity Breakdown</CardTitle>
            <CardDescription>
              Your involvement across different activity types.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activityData}
                  layout="vertical"
                  margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
                >
                   <defs>
                     {chartColors.map((color, index) => (
                        <linearGradient key={`3d-gradient-${index}`} id={`3d-gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={color} stopOpacity={0.7}/>
                          <stop offset="100%" stopColor={color} stopOpacity={1}/>
                        </linearGradient>
                      ))}
                  </defs>
                  <YAxis
                    dataKey="category"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    width={110}
                  />
                  <XAxis dataKey="count" type="number" hide />
                  <ChartTooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey="count"
                    radius={[0, 4, 4, 0]}
                    animationDuration={800}
                  >
                    {activityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#3d-gradient-${index % chartColors.length})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
