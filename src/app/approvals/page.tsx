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
import { Check, X } from 'lucide-react';
import { format } from 'date-fns';

export default function ApprovalsPage() {
  const pendingActivities = activities.filter(
    (act) => act.status === 'Pending'
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Faculty Approval Panel
        </h1>
        <p className="text-muted-foreground">
          Review and validate student-submitted activities.
        </p>
      </div>

      <Card className="transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
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
    </div>
  );
}
