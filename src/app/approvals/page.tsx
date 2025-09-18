
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
import { Button } from '@/components/ui/button';
import { activities } from '@/lib/mock-data';
import { Check, X, ListChecks, CheckCircle2, Clock, Activity, ShieldAlert } from 'lucide-react';
import { format, isToday } from 'date-fns';
import { useAuth } from '@/context/auth-context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ApprovalsPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== 'faculty') {
      router.push('/auth/login');
    }
  }, [user, router]);


  if (user?.role !== 'faculty') {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <ShieldAlert className="h-16 w-16 text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You do not have permission to view this page. Please log in as a faculty member.</p>
             <Button onClick={() => router.push('/auth/login')} className="mt-6">
                Go to Login
            </Button>
        </div>
    );
  }

  const pendingActivities = activities.filter(
    (act) => act.status === 'Pending'
  );
  const processedActivities = activities.filter(
    (act) => act.status === 'Approved' || act.status === 'Rejected'
  );
  const approvedToday = activities.filter(
    (act) => act.status === 'Approved' && isToday(act.date)
  );

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Faculty Dashboard
        </h1>
        <p className="text-muted-foreground">
          Review student submissions and track activity trends.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingActivities.length}</div>
            <p className="text-xs text-muted-foreground">Activities awaiting your review.</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Processed</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processedActivities.length}</div>
            <p className="text-xs text-muted-foreground">Total activities reviewed.</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20">
           <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedToday.length}</div>
            <p className="text-xs text-muted-foreground">Activities approved today.</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20">
          <CardHeader>
            <CardTitle>Pending Submissions</CardTitle>
            <CardDescription>
              {pendingActivities.length > 0
                ? `There are ${pendingActivities.length} activities awaiting your approval.`
                : 'There are no pending submissions at this time.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Activity Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">
                      {activity.studentName}
                    </TableCell>
                    <TableCell>{activity.title}</TableCell>
                    <TableCell>{activity.category}</TableCell>
                    <TableCell>{format(activity.date, 'PPP')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 text-green-600 hover:text-green-600">
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-red-600 hover:text-red-600">
                          <X className="h-4 w-4" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20">
          <CardHeader>
            <CardTitle>Recently Processed</CardTitle>
            <CardDescription>
              Your most recent approvals and rejections.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {processedActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-center">
                <div className="mr-4 rounded-full bg-muted p-2">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">{activity.studentName}</p>
                  <p className="text-sm text-muted-foreground">{activity.title}</p>
                </div>
                <Badge variant={activity.status === 'Approved' ? 'default' : 'destructive'}>{activity.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
