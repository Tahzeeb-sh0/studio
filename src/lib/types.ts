
export type UserRole = 'student' | 'faculty';

export type Student = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  major: string;
  year: number;
  role: UserRole;
  githubUsername?: string;
  skills?: string[];
  skillRank?: number;
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

export type GithubStats = {
  repositories: number;
  commits: number;
  pullRequests: number;
  gists: number;
};

export type GithubProject = {
  id: string;
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
};

export type Job = {
    id: string;
    title: string;
    company: string;
    companyLogoUrl?: string;
    location: string;
    type: 'Full-time' | 'Internship' | 'Part-time';
    tags: string[];
    description: string;
    responsibilities?: string[];
    datePosted: Date;
};
