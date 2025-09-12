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
import { Progress } from '@/components/ui/progress';
import { academicRecord, activities, student } from '@/lib/mock-data';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Activity } from '@/lib/types';

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

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Welcome back, {student.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here's a snapshot of your achievements and progress.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle>GPA</CardTitle>
            <CardDescription>Your current Grade Point Average.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-headline text-4xl font-bold text-primary">
              {academicRecord.gpa.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle>Attendance</CardTitle>
            <CardDescription>Your overall attendance rate.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-headline text-4xl font-bold text-primary">
              {academicRecord.attendance}%
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle>Total Activity Credits</CardTitle>
            <CardDescription>Credits from approved activities.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-headline text-4xl font-bold text-primary">
              {totalActivityCredits}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle>Degree Credits</CardTitle>
            <CardDescription>
              Progress towards your degree.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Progress
                value={
                  (academicRecord.creditsEarned / academicRecord.totalCredits) *
                  100
                }
                className="h-3"
              />
              <p className="font-headline text-lg font-semibold text-primary">
                {academicRecord.creditsEarned} / {academicRecord.totalCredits}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
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
                      {activity.date.toLocaleDateString()}
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
        <Card className="lg:col-span-2 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle>Activity Breakdown</CardTitle>
            <CardDescription>
              Your involvement across different activity types.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activityData}
                  layout="vertical"
                  margin={{ left: 20, right: 20, top: 10, bottom: 10 }}
                >
                  <CartesianGrid horizontal={false} />
                  <YAxis
                    dataKey="category"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    width={100}
                  />
                  <XAxis dataKey="count" type="number" hide />
                  <ChartTooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--primary))"
                    radius={5}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
