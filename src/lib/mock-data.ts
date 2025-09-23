
import { Student, AcademicRecord, Activity, ActivityCategory, GithubStats, GithubProject, Job } from './types';
import { PlaceHolderImages } from './placeholder-images';

const studentAvatar = PlaceHolderImages.find(img => img.id === 'student-avatar')?.imageUrl || 'https://picsum.photos/seed/student-avatar/100/100';
const facultyAvatar = PlaceHolderImages.find(img => img.id === 'faculty-avatar')?.imageUrl || 'https://picsum.photos/seed/faculty-avatar/100/100';

export const allSkills = [
  'JavaScript', 'React', 'Node.js', 'Python', 'Data Analysis', 
  'Project Management', 'Public Speaking', 'Team Leadership',
  'TypeScript', 'Java', 'C++', 'AWS', 'Red Hat', 'Linux', 'Marketing', 'UI/UX Design'
];

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

export const allMajors = [
    'Computer Science', 'Data Science', 'Electrical Engineering', 'Business Administration', 
    'Mechanical Engineering', 'Marketing', 'Physics', 'Biology'
];

const firstNames = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy", "Mallory", "Niaj", "Olivia", "Peggy", "Quentin", "Rupert", "Sybil", "Trent", "Ulysses", "Victor", "Walter", "Xavier", "Yvonne", "Zelda"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];


const skillsByMajor: { [key: string]: string[] } = {
    'Computer Science': ['TypeScript', 'React', 'Node.js', 'AWS', 'Java', 'Python', 'Linux'],
    'Data Science': ['Python', 'Data Analysis', 'AWS', 'React', 'Machine Learning', 'SQL'],
    'Electrical Engineering': ['C++', 'Java', 'Linux', 'Circuit Design', 'VHDL'],
    'Business Administration': ['Project Management', 'Public Speaking', 'Marketing', 'Finance'],
    'Mechanical Engineering': ['CAD', 'Thermodynamics', 'Project Management', 'Matlab'],
    'Marketing': ['Marketing', 'Public Speaking', 'UI/UX Design', 'Social Media'],
    'Physics': ['Python', 'Data Analysis', 'Matlab', 'Quantum Mechanics'],
    'Biology': ['Data Analysis', 'Genetics', 'Lab Techniques', 'Python']
};

const createMockData = () => {
  const generatedUsers: Student[] = [];
  let studentIdCounter = 10;

  for (const major of allMajors) {
    for (let i = 0; i < 100; i++) {
      const firstName = firstNames[(studentIdCounter + i) % firstNames.length];
      const lastName = lastNames[(studentIdCounter + i) % lastNames.length];
      const name = `${firstName} ${lastName}`;
      const id = `STU-${String(studentIdCounter).padStart(3, '0')}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
      const avatarIndex = (studentIdCounter % 20);
      const avatarId = `student-avatar-${avatarIndex + 2}`;
      const avatarUrl = PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl;
      const studentSkills = skillsByMajor[major] || [];
      const numSkills = (((studentIdCounter + i) % 3) + 2); // 2 to 4 skills
      
      const shuffledSkills = [...studentSkills]
          .sort((a, b) => (a+b).charCodeAt(0) % 2 - 0.5) // Deterministic shuffle
          .slice(0, numSkills);

      generatedUsers.push({
        id,
        name,
        email,
        avatarUrl: avatarUrl || `https://picsum.photos/seed/${id}/100/100`,
        major,
        year: ((i % 4) + 1),
        role: 'student',
        skills: shuffledSkills,
        skillRank: i + 1,
      });
      studentIdCounter++;
    }
  }

  const generatedActivities: Activity[] = [];
  generatedUsers.forEach((user, userIdx) => {
    const numActivities = (userIdx % 5) + 1; // 1 to 5 activities
    for (let i = 0; i < numActivities; i++) {
      const category = activityCategories[(userIdx + i) % activityCategories.length];
      generatedActivities.push({
        id: `ACT-${user.id}-${i}`,
        studentId: user.id,
        studentName: user.name,
        title: `${category} by ${user.name}`,
        category: category,
        date: new Date(2023, ((userIdx + i) % 12), ((userIdx + i) % 28) + 1),
        description: `Generated activity for ${user.name} in ${category}.`,
        status: 'Approved',
        credits: ((userIdx + i) % 5) + 1, // 1 to 5 credits
      });
    }
  });

  return { generatedUsers, generatedActivities };
}

// Memoize the generated data
const getGeneratedData = (() => {
  let cache: { generatedUsers: Student[], generatedActivities: Activity[] } | null = null;
  return () => {
    if (cache === null) {
      cache = createMockData();
    }
    return cache;
  };
})();

const { generatedUsers, generatedActivities } = getGeneratedData();


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
    skills: ['TypeScript', 'React', 'Node.js', 'Project Management', 'AWS'],
    skillRank: 1,
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
   {
    id: 'STU-002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'student-avatar-2')?.imageUrl,
    major: 'Data Science',
    year: 4,
    role: 'student',
    githubUsername: 'janesmith',
    skills: ['Python', 'Data Analysis', 'React', 'Red Hat', 'Linux'],
    skillRank: 1, // Rank 1 in Data Science
  },
  {
    id: 'STU-003',
    name: 'Sam Wilson',
    email: 'sam.wilson@example.com',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'student-avatar-3')?.imageUrl,
    major: 'Electrical Engineering',
    year: 2,
    role: 'student',
    skills: ['C++', 'Java', 'AWS', 'Linux'],
    skillRank: 1, // Rank 1 in EE
  },
   {
    id: 'STU-004',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'student-avatar-4')?.imageUrl,
    major: 'Business Administration',
    year: 3,
    role: 'student',
    skills: ['Marketing', 'Project Management', 'Public Speaking'],
    skillRank: 1,
  },
  {
    id: 'STU-005',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'student-avatar-5')?.imageUrl,
    major: 'Mechanical Engineering',
    year: 4,
    role: 'student',
    skills: ['Project Management', 'Team Leadership'],
    skillRank: 1,
  },
  {
    id: 'STU-006',
    name: 'Jessica Garcia',
    email: 'jessica.garcia@example.com',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'student-avatar-6')?.imageUrl,
    major: 'Marketing',
    year: 2,
    role: 'student',
    githubUsername: 'jessgarcia',
    skills: ['Marketing', 'Public Speaking', 'UI/UX Design'],
    skillRank: 1,
  },
  {
    id: 'STU-007',
    name: 'David Lee',
    email: 'david.lee@example.com',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'student-avatar-7')?.imageUrl,
    major: 'Physics',
    year: 3,
    role: 'student',
    skills: ['Python', 'Data Analysis'],
    skillRank: 1,
  },
  {
    id: 'STU-008',
    name: 'Sarah Martinez',
    email: 'sarah.martinez@example.com',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'student-avatar-8')?.imageUrl,
    major: 'Biology',
    year: 4,
    role: 'student',
    skills: ['Team Leadership'],
    skillRank: 1,
  },
  ...generatedUsers,
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

export const githubProjects: GithubProject[] = [
  {
    id: 'PROJ-001',
    name: 'stuverse-app',
    description: 'The very application you are using! A Next.js app for tracking student achievements.',
    url: 'https://github.com/Tahzeeb-sh0/stuverse-app',
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
    status: 'Approved',
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
    status: 'Approved',
    credits: 1,
  },
  {
    id: 'ACT-009',
    studentId: 'STU-002',
    studentName: 'Jane Smith',
    title: 'National Design Competition',
    category: 'Competition',
    date: new Date('2024-03-15'),
    description: 'Won first place in the national product design competition.',
    status: 'Approved',
    credits: 5,
  },
  {
    id: 'ACT-010',
    studentId: 'STU-003',
    studentName: 'Sam Wilson',
    title: 'Robotics Club Project Lead',
    category: 'Club Activity',
    date: new Date('2024-04-05'),
    description: 'Led a team to build an autonomous rover for a university showcase.',
    status: 'Approved',
    credits: 3,
  },
   {
    id: 'ACT-011',
    studentId: 'STU-004',
    studentName: 'Emily Davis',
    title: 'Marketing Internship at Adify',
    category: 'Internship',
    date: new Date('2023-12-15'),
    description: 'Managed social media campaigns and analyzed market trends for a startup.',
    status: 'Approved',
    credits: 5,
  },
  {
    id: 'ACT-012',
    studentId: 'STU-002',
    studentName: 'Jane Smith',
    title: 'Published Research Paper',
    category: 'Other',
    date: new Date('2024-05-01'),
    description: 'Co-authored a paper on machine learning models for financial forecasting.',
    status: 'Approved',
    credits: 6,
  },
   {
    id: 'ACT-013',
    studentId: 'STU-004',
    studentName: 'Emily Davis',
    title: 'Business Case Competition',
    category: 'Competition',
    date: new Date('2024-02-20'),
    description: 'Finalist in the inter-university business case competition.',
    status: 'Pending',
    credits: 3,
  },
  {
    id: 'ACT-014',
    studentId: 'STU-002',
    studentName: 'Jane Smith',
    title: 'Red Hat Certified System Administrator (RHCSA)',
    category: 'Certification',
    date: new Date('2024-03-20'),
    description: 'Earned the RHCSA certification, demonstrating core system administration skills for Red Hat Enterprise Linux environments.',
    status: 'Approved',
    credits: 4,
  },
  {
    id: 'ACT-015',
    studentId: 'STU-003',
    studentName: 'Sam Wilson',
    title: 'AWS Certified Solutions Architect - Associate',
    category: 'Certification',
    date: new Date('2024-04-10'),
    description: 'Validated technical expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.',
    status: 'Approved',
    credits: 5,
  },
  {
    id: 'ACT-016',
    studentId: 'STU-005',
    studentName: 'Michael Brown',
    title: 'ASME Design Competition',
    category: 'Competition',
    date: new Date('2023-11-20'),
    description: 'Team lead for a project that won "Most Innovative Design" award.',
    status: 'Approved',
    credits: 4,
  },
  {
    id: 'ACT-017',
    studentId: 'STU-006',
    studentName: 'Jessica Garcia',
    title: 'DECA Chapter President',
    category: 'Club Activity',
    date: new Date('2024-01-15'),
    description: 'Led the university DECA chapter, organizing events and competitions.',
    status: 'Approved',
    credits: 3,
  },
  {
    id: 'ACT-018',
    studentId: 'STU-007',
    studentName: 'David Lee',
    title: 'Undergraduate Research Symposium',
    category: 'Conference',
    date: new Date('2024-04-25'),
    description: 'Presented research on quantum state simulations.',
    status: 'Approved',
    credits: 3,
  },
  {
    id: 'ACT-019',
    studentId: 'STU-008',
    studentName: 'Sarah Martinez',
    title: 'Volunteering at Local Hospital',
    category: 'Community Service',
    date: new Date('2023-12-01'),
    description: 'Completed 100+ hours of volunteer work in the pediatric ward.',
    status: 'Approved',
    credits: 2,
  },
  {
    id: 'ACT-020',
    studentId: 'STU-005',
    studentName: 'Michael Brown',
    title: 'Internship at General Motors',
    category: 'Internship',
    date: new Date('2024-05-10'),
    description: 'Six-month co-op focused on electric vehicle battery design.',
    status: 'Pending',
    credits: 6,
  },
  ...generatedActivities,
];

export const jobs: Job[] = [
    {
        id: 'JOB-001',
        title: 'Frontend Developer Intern',
        company: 'Innovate Inc.',
        location: 'Remote',
        type: 'Internship',
        tags: ['React', 'TypeScript', 'CSS'],
        description: 'Join our team to build and improve our user-facing features. Ideal for students passionate about UI/UX.',
        datePosted: new Date('2024-05-20'),
    },
    {
        id: 'JOB-002',
        title: 'Software Engineer (New Grad)',
        company: 'Tech Solutions LLC',
        location: 'New York, NY',
        type: 'Full-time',
        tags: ['Java', 'Python', 'AWS'],
        description: 'Looking for recent graduates to join our backend engineering team. You will work on scalable, cloud-based services.',
        datePosted: new Date('2024-05-18'),
    },
    {
        id: 'JOB-003',
        title: 'Data Science Intern',
        company: 'Data Insights Co.',
        location: 'San Francisco, CA',
        type: 'Internship',
        tags: ['Python', 'SQL', 'Machine Learning'],
        description: 'Analyze large datasets to extract meaningful insights and contribute to our predictive modeling projects.',
        datePosted: new Date('2024-05-15'),
    },
    {
        id: 'JOB-004',
        title: 'Cloud Engineer',
        company: 'Cloudways',
        location: 'Austin, TX',
        type: 'Full-time',
        tags: ['AWS', 'Linux', 'Node.js'],
        description: 'Manage and scale our cloud infrastructure. Experience with containerization (Docker, Kubernetes) is a plus.',
        datePosted: new Date('2024-05-12'),
    },
     {
        id: 'JOB-005',
        title: 'UI/UX Design Intern',
        company: 'Creative Minds',
        location: 'Remote',
        type: 'Internship',
        tags: ['Figma', 'UI/UX Design', 'User Research'],
        description: 'Work alongside our design team to create wireframes, prototypes, and high-fidelity mockups for our mobile app.',
        datePosted: new Date('2024-05-10'),
    },
     {
        id: 'JOB-006',
        title: 'Marketing Associate',
        company: 'Growth Gurus',
        location: 'Boston, MA',
        type: 'Full-time',
        tags: ['Marketing', 'Social Media', 'SEO'],
        description: 'Develop and execute marketing campaigns across multiple channels to drive user acquisition and engagement.',
        datePosted: new Date('2024-05-08'),
    }
];
    

    



    



    


