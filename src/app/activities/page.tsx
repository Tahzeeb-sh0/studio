
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
import { activities, student } from '@/lib/mock-data';
import { Activity } from '@/lib/types';
import NewActivityForm from './new-activity-form';
import { format } from 'date-fns';

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

export default function ActivitiesPage() {
  const studentActivities = activities.filter(
    (act) => act.studentId === student.id
  );

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Activity Tracker
        </h1>
        <p className="text-muted-foreground">
          Upload and manage your co-curricular and extra-curricular activities.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Add New Activity</CardTitle>
              <CardDescription>
                Fill in the details of your achievement to add it to your
                record.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NewActivityForm />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>My Submitted Activities</CardTitle>
              <CardDescription>
                A record of all your submitted achievements and their approval status.
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
                  {studentActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">
                        {activity.title}
                      </TableCell>
                      <TableCell>{activity.category}</TableCell>
                      <TableCell>
                        {format(activity.date, 'PPP')}
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
        </div>
      </div>
    </div>
  );
}
