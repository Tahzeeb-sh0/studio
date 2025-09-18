import { Student, AcademicRecord, Activity, ActivityCategory, GithubStats, GithubProject } from './types';
import { PlaceHolderImages } from './placeholder-images';

const studentAvatar = PlaceHolderImages.find(img => img.id === 'student-avatar')?.imageUrl || 'https://picsum.photos/seed/student-avatar/100/100';
const facultyAvatar = PlaceHolderImages.find(img => img.id === 'faculty-avatar')?.imageUrl || 'https://picsum.photos/seed/faculty-avatar/100/100';


export const users: Student[] = [
  {
    id: 'STU-001',
    name: 'Tahzeeb',
    email: 'student@gmail.com',
    avatarUrl: studentAvatar,
    major: 'Computer Science',
    year: 3,
    role: 'student',
    githubUsername: 'Tahzeeb-sh0',
  },
  {
    id: 'FAC-001',
    name: 'Shweta',
    email: 'faculty@gmail.com',
    avatarUrl: facultyAvatar,
    major: 'Computer Science',
    year: 0, 
    role: 'faculty',
  },
];

export const student = users[0]; // Default to Tahzeeb for existing components that rely on a single student
export const facultyUser = users[1];

export const academicRecord: AcademicRecord = {
  gpa: 3.8,
  attendance: 95,
  totalCredits: 120,
  creditsEarned: 85,
};

export const githubStats: GithubStats = {
  repositories: 25,
  commits: 531,
  pullRequests: 42,
  gists: 5,
};

export const activityCategories: ActivityCategory[] = [
    'Conference',
    'Workshop',
    'Certification',
    'Club Activity',
    'Competition',
    'Internship',
    'Community Service',
    'Other',
];

export const githubProjects: GithubProject[] = [
  {
    id: 'PROJ-001',
    name: 'achieveme-app',
    description: 'The very application you are using! A Next.js app for tracking student achievements.',
    url: 'https://github.com/Tahzeeb-sh0/achieveme-app',
    stars: 150,
    forks: 30,
    language: 'TypeScript',
  },
  {
    id: 'PROJ-002',
    name: 'portfolio-generator',
    description: 'A tool to generate a personal portfolio website from a JSON file, built with React.',
    url: 'https://github.com/Tahzeeb-sh0/portfolio-generator',
    stars: 75,
    forks: 12,
    language: 'JavaScript',
  },
  {
    id: 'PROJ-003',
    name: 'genkit-flow-visualizer',
    description: 'A developer tool to visualize and debug Genkit flows in real-time.',
    url: 'https://github.com/Tahzeeb-sh0/genkit-flow-visualizer',
    stars: 200,
    forks: 45,
    language: 'TypeScript',
  },
];

export const activities: Activity[] = [
  {
    id: 'ACT-001',
    studentId: 'STU-001',
    studentName: 'Tahzeeb',
    title: 'Web Development Workshop',
    category: 'Workshop',
    date: new Date('2023-10-15'),
    description: 'A week-long workshop on modern web development technologies.',
    status: 'Approved',
    credits: 2,
  },
  {
    id: 'ACT-002',
    studentId: 'STU-001',
    studentName: 'Tahzeeb',
    title: 'AI in Healthcare Conference',
    category: 'Conference',
    date: new Date('2023-11-05'),
    description: 'Attended the annual conference on Artificial Intelligence applications in the healthcare sector.',
    status: 'Approved',
    credits: 1,
  },
  {
    id: 'ACT-003',
    studentId: 'STU-001',
    studentName: 'Tahzeeb',
    title: 'Summer Internship at TechCorp',
    category: 'Internship',
    date: new Date('2023-08-30'),
    description: 'Completed a 3-month summer internship as a software engineering intern.',
    status: 'Approved',
    credits: 5,
  },
  {
    id: 'ACT-004',
    studentId: 'STU-001',
    studentName: 'Tahzeeb',
    title: 'Hackathon 2023',
    category: 'Competition',
    date: new Date('2023-09-20'),
    description: 'Participated in the university-level hackathon and won 2nd place.',
    status: 'Approved',
    credits: 3,
  },
  {
    id: 'ACT-005',
    studentId: 'STU-001',
    studentName: 'Tahzeeb',
    title: 'Google Cloud Certified',
    category: 'Certification',
    date: new Date('2024-01-10'),
    description: 'Earned the Associate Cloud Engineer certification from Google Cloud.',
    status: 'Pending',
    credits: 4,
  },
  {
    id: 'ACT-006',
    studentId: 'STU-002',
    studentName: 'Jane Smith',
    title: 'Data Science Bootcamp',
    category: 'Workshop',
    date: new Date('2024-02-01'),
    description: 'Intensive bootcamp on data analysis and machine learning.',
    status: 'Pending',
    credits: 3,
  },
    {
    id: 'ACT-007',
    studentId: 'STU-001',
    studentName: 'Tahzeeb',
    title: 'Leadership Role in Coding Club',
    category: 'Club Activity',
    date: new Date('2023-05-20'),
    description: 'Served as the president of the university coding club for the academic year 2022-2023.',
    status: 'Approved',
    credits: 3,
  },
  {
    id: 'ACT-008',
    studentId: 'STU-003',
    studentName: 'Sam Wilson',
    title: 'Community Tree Planting',
    category: 'Community Service',
    date: new Date('2023-04-22'),
    description: 'Volunteered for a local environmental group to plant 100 trees.',
    status: 'Pending',
    credits: 1,
  },
];
