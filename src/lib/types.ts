export type UserRole = 'student' | 'faculty';

export type Student = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  major: string;
  year: number;
  role: UserRole;
};

export type AcademicRecord = {
  gpa: number;
  attendance: number;
  totalCredits: number;
  creditsEarned: number;
};

export type ActivityStatus = 'Pending' | 'Approved' | 'Rejected';

export type ActivityCategory = 
  | 'Conference' 
  | 'Workshop' 
  | 'Certification' 
  | 'Club Activity' 
  | 'Competition' 
  | 'Internship' 
  | 'Community Service' 
  | 'Other';

export type Activity = {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  category: ActivityCategory;
  date: Date;
  description: string;
  status: ActivityStatus;
  credits: number;
};
