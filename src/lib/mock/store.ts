import { SEED_STUDENTS } from './students-data';
import {
  Profile,
  Student,
  Mentor,
  Trustee,
  Goal,
  VisionBoard,
  Task,
  Submission,
  Review,
  CompetencyScore,
  Activity,
  ActivityAttempt,
  Resource,
  Gamification,
  ChatThread,
  ChatMessage,
  AIFlag,
  TrusteeFeedback,
  MentorNote,
  NotificationItem,
} from '../types/database';
import { CompetencyKey } from '../types/competencies';

export interface MockDataStore {
  profiles: Profile[];
  mentors: Mentor[];
  trustees: Trustee[];
  students: Student[];
  goals: Goal[];
  visionBoards: VisionBoard[];
  tasks: Task[];
  submissions: Submission[];
  reviews: Review[];
  competencyScores: CompetencyScore[];
  activities: Activity[];
  activityAttempts: ActivityAttempt[];
  resources: Resource[];
  bookmarkedResources: Record<string, string[]>;
  completedResources: Record<string, string[]>;
  gamification: Record<string, Gamification>;
  chatThreads: ChatThread[];
  chatMessages: ChatMessage[];
  aiFlags: AIFlag[];
  trusteeFeedback: TrusteeFeedback[];
  mentorNotes: MentorNote[];
  notifications: NotificationItem[];
}

function initializeStore(): MockDataStore {
  // Profiles
  const profiles: Profile[] = [
    {
      id: 'admin-suhail',
      role: 'admin',
      full_name: 'Suhail Akthar',
      email: 'suhailmobina95@gmail.com',
      phone: '+91 9876543210',
      photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      created_at: new Date().toISOString(),
    },
    {
      id: 'mentor-ramkumar',
      role: 'mentor',
      full_name: 'Ramkumar SKR',
      email: 'ramkumar.skr01@gmail.com',
      phone: '+91 9443210987',
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      created_at: new Date().toISOString(),
    },
    {
      id: 'mentor-ananya',
      role: 'mentor',
      full_name: 'Dr. Ananya Subramanian',
      email: 'ananya.mentor@vrcf.org.in',
      phone: '+91 9443210988',
      photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      created_at: new Date().toISOString(),
    },
    {
      id: 'mentor-karthik',
      role: 'mentor',
      full_name: 'Karthik Narayanan',
      email: 'karthik.vrcf@gmail.com',
      phone: '+91 9443210989',
      photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
      created_at: new Date().toISOString(),
    },
    {
      id: 'trustee-shanthi',
      role: 'trustee',
      full_name: 'Smt. Shanthi Ramaswami',
      email: 'trustee1@vrcf.org.in',
      phone: '+91 9884012345',
      photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
      created_at: new Date().toISOString(),
    },
    {
      id: 'trustee-venkatraman',
      role: 'trustee',
      full_name: 'Shri. R. Venkatraman',
      email: 'trustee2@vrcf.org.in',
      phone: '+91 9884012346',
      photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
      created_at: new Date().toISOString(),
    },
  ];

  const mentors: Mentor[] = [
    {
      id: 'mentor-rec-1',
      profile_id: 'mentor-ramkumar',
      organization: 'VRCF & Tech Industry',
      designation: 'Lead Mentor & Technical Program Manager',
      created_at: new Date().toISOString(),
      profile: profiles[1],
    },
    {
      id: 'mentor-rec-2',
      profile_id: 'mentor-ananya',
      organization: 'VRCF Leadership Academy',
      designation: 'Dean of Academic Development & Life Coach',
      created_at: new Date().toISOString(),
      profile: profiles[2],
    },
    {
      id: 'mentor-rec-3',
      profile_id: 'mentor-karthik',
      organization: 'VRCF Career Cell',
      designation: 'Director of Career Mentorship',
      created_at: new Date().toISOString(),
      profile: profiles[3],
    },
  ];

  const trustees: Trustee[] = [
    {
      id: 'trustee-rec-1',
      profile_id: 'trustee-shanthi',
      created_at: new Date().toISOString(),
      profile: profiles[4],
    },
    {
      id: 'trustee-rec-2',
      profile_id: 'trustee-venkatraman',
      created_at: new Date().toISOString(),
      profile: profiles[5],
    },
  ];

  // Students
  const students: Student[] = [];
  const goals: Goal[] = [];
  const visionBoards: VisionBoard[] = [];
  const tasks: Task[] = [];
  const submissions: Submission[] = [];
  const reviews: Review[] = [];
  const competencyScores: CompetencyScore[] = [];
  const gamification: Record<string, Gamification> = {};

  const vbImages = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
  ];

  SEED_STUDENTS.forEach((seed, idx) => {
    const studentId = `student-${idx + 1}`;
    const profileId = `profile-student-${idx + 1}`;
    const mentorIndex = idx % mentors.length;
    const assignedMentor = mentors[mentorIndex];

    const studentProfile: Profile = {
      id: profileId,
      role: 'student',
      full_name: seed.name,
      email: seed.email,
      phone: seed.phone,
      photo_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed.name)}`,
      created_at: new Date().toISOString(),
    };
    profiles.push(studentProfile);

    const student: Student = {
      id: studentId,
      profile_id: profileId,
      vrcf_id: seed.vrcf_id,
      name: seed.name,
      email: seed.email,
      cohort: seed.cohort as 1 | 2 | 3,
      course_name: seed.course_name,
      year_of_study: seed.year_of_study,
      college: seed.college,
      college_district: seed.college_district,
      residence_type: seed.residence_type as 'hosteller' | 'day_scholar',
      phone: seed.phone,
      parent_phone: seed.parent_phone,
      home_address: seed.home_address,
      home_district: seed.home_district,
      tuition_fee_term: seed.tuition_fee_term,
      tuition_fee_amount: seed.tuition_fee_amount,
      hostel_fee: seed.hostel_fee,
      total_academic_years: seed.total_academic_years,
      primary_mentor_id: assignedMentor.id,
      status: 'active',
      created_at: new Date().toISOString(),
      profile: studentProfile,
      primary_mentor: assignedMentor,
    };
    students.push(student);

    // Gamification
    const xp = 150 + (idx * 45) % 950;
    const streak = 1 + (idx % 7);
    gamification[studentId] = {
      student_id: studentId,
      xp,
      level: Math.floor(xp / 250) + 1,
      current_streak: streak,
      longest_streak: streak + 4,
      last_active_date: new Date().toISOString().split('T')[0],
      streak_freeze_available: true,
      badges: ['first_goal', 'deep_thinker', 'task_champion'],
    };

    // Vision Board
    visionBoards.push({
      id: `vb-${idx + 1}`,
      student_id: studentId,
      image_url: vbImages[idx % vbImages.length],
      updated_at: new Date().toISOString(),
    });

    // Goals
    goals.push(
      {
        id: `goal-${idx * 5 + 1}`,
        student_id: studentId,
        kind: 'aim',
        title: `Excel in ${seed.course_name} and graduate in top 5%`,
        description: 'Focus consistently on lab projects, deep domain foundations and semester grades.',
        target_date: '2026-06-30',
        status: 'in_progress',
        progress: 70,
        created_at: new Date().toISOString(),
      },
      {
        id: `goal-${idx * 5 + 2}`,
        student_id: studentId,
        kind: 'vision_statement',
        title: 'Become an ethical leader contributing technological and social progress',
        description: 'Empower my family and community through continuous self-improvement and mentorship.',
        target_date: '2028-12-31',
        status: 'in_progress',
        progress: 45,
        created_at: new Date().toISOString(),
      },
      {
        id: `goal-${idx * 5 + 3}`,
        student_id: studentId,
        kind: 'short_term',
        title: 'Complete 2 certification courses in Critical Problem Solving & AI Tools',
        description: 'Spend 5 hours weekly completing video lessons and hands-on exercises.',
        target_date: '2026-11-30',
        status: 'in_progress',
        progress: 80,
        created_at: new Date().toISOString(),
      },
      {
        id: `goal-${idx * 5 + 4}`,
        student_id: studentId,
        kind: 'long_term',
        title: 'Crack campus placements for a top software/consulting role',
        description: 'Solve 100 aptitude questions and conduct 3 mock interviews with VRCF mentors.',
        target_date: '2027-05-15',
        status: 'in_progress',
        progress: 55,
        created_at: new Date().toISOString(),
      },
      {
        id: `goal-${idx * 5 + 5}`,
        student_id: studentId,
        kind: 'career_goal',
        title: `Lead technological initiatives in ${seed.college_district || 'Tamil Nadu'}`,
        description: 'Combine field domain expertise with ethical leadership for community upliftment.',
        target_date: '2029-01-01',
        status: 'in_progress',
        progress: 35,
        created_at: new Date().toISOString(),
      }
    );

    // Tasks: 1 reviewed, 1 submitted, 1 in_progress, 1 assigned (self)
    const task1Id = `task-${idx * 4 + 1}`;
    const task2Id = `task-${idx * 4 + 2}`;
    const task3Id = `task-${idx * 4 + 3}`;
    const task4Id = `task-${idx * 4 + 4}`;

    // Submissions and reviews
    const sub1Id = `sub-${idx * 2 + 1}`;
    const sub2Id = `sub-${idx * 2 + 2}`;

    const review1: Review = {
      id: `rev-${idx + 1}`,
      submission_id: sub1Id,
      mentor_id: assignedMentor.id,
      feedback:
        'Outstanding breakdown of fundamental concepts. Your reflection shows clear ownership and disciplined thinking. Keep pushing deeper into edge cases!',
      grade: 'A+',
      rating: 5,
      competency_ratings: {
        critical_thinking: 4.8,
        analytical_thinking: 4.7,
      },
      reviewed_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      mentor: assignedMentor,
    };
    reviews.push(review1);

    const sub1: Submission = {
      id: sub1Id,
      task_id: task1Id,
      remarks: 'Completed rigorous module analysis with diagrammatic synthesis.',
      reflection:
        'Challenging my own assumptions forced me to reconsider standard textbook explanations. I realized the importance of first-principles thinking.',
      attachment_url: 'https://example.com/vrcf-assignments/module-analysis.pdf',
      submitted_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      review: review1,
    };
    submissions.push(sub1);

    const sub2: Submission = {
      id: sub2Id,
      task_id: task2Id,
      remarks: 'Surveyed 30 college peers to gather real ground data for our campus resource allocation proposal.',
      reflection:
        'Collaborating with classmates highlighted different viewpoints on resource bottlenecks. Proposed a phased implementation schedule.',
      attachment_url: 'https://example.com/vrcf-assignments/campus-proposal.pdf',
      submitted_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    };
    submissions.push(sub2);

    tasks.push(
      {
        id: task1Id,
        student_id: studentId,
        created_by: assignedMentor.profile_id,
        created_by_role: 'mentor',
        title: 'First Principles Analysis of Core Subject Syllabus',
        details: 'Deconstruct one foundational topic in your major curriculum into core truths and articulate real-world case applications.',
        due_date: new Date(Date.now() - 3 * 86400000).toISOString(),
        focus_competencies: ['critical_thinking', 'analytical_thinking'],
        status: 'reviewed',
        created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
        submission: sub1,
      },
      {
        id: task2Id,
        student_id: studentId,
        created_by: assignedMentor.profile_id,
        created_by_role: 'mentor',
        title: 'Design Campus Sustainability & Resource Proposal',
        details: 'Investigate one campus resource challenge, gather empirical data, and outline an actionable 3-stage recommendation.',
        due_date: new Date(Date.now() + 2 * 86400000).toISOString(),
        focus_competencies: ['problem_solving', 'innovative_thinking'],
        status: 'submitted',
        created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
        submission: sub2,
      },
      {
        id: task3Id,
        student_id: studentId,
        created_by: assignedMentor.profile_id,
        created_by_role: 'mentor',
        title: 'Professional Communication & 90-Second Video Pitch',
        details: 'Craft a structured pitch covering your background, core strengths, career aspiration, and leadership vision.',
        due_date: new Date(Date.now() + 8 * 86400000).toISOString(),
        focus_competencies: ['communication', 'career_readiness'],
        status: 'in_progress',
        created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
      },
      {
        id: task4Id,
        student_id: studentId,
        created_by: profileId,
        created_by_role: 'self',
        title: 'Daily Coding Practice & Technical Journaling',
        details: 'Self-directed to-do: Solve 2 algorithmic problems and document key insights in my learning notebook.',
        due_date: new Date(Date.now() + 5 * 86400000).toISOString(),
        focus_competencies: ['logical_reasoning', 'digital_ai_literacy'],
        status: 'assigned',
        created_at: new Date().toISOString(),
      }
    );

    // Competency Scores for the 10 competencies
    const compScoresList: Array<{ comp: CompetencyKey; sc: number; src: 'mentor' | 'ai'; ev: string }> = [
      { comp: 'critical_thinking', sc: 4.2 + (idx % 5) * 0.15, src: 'mentor', ev: 'Structured breakdown of first principles in assignment' },
      { comp: 'analytical_thinking', sc: 4.0 + (idx % 4) * 0.2, src: 'mentor', ev: 'Empirical survey analysis of 30 campus peers' },
      { comp: 'logical_reasoning', sc: 3.8 + (idx % 6) * 0.15, src: 'ai', ev: 'Consistent deductive validity evidenced in AI mentor sessions' },
      { comp: 'problem_solving', sc: 4.3 + (idx % 4) * 0.15, src: 'mentor', ev: 'Action-oriented multi-phase proposal on campus resources' },
      { comp: 'innovative_thinking', sc: 3.9 + (idx % 5) * 0.18, src: 'ai', ev: 'Creative synthesis of community-driven models' },
      { comp: 'communication', sc: 4.1 + (idx % 5) * 0.14, src: 'mentor', ev: 'Articulate written reflection and prompt response' },
      { comp: 'leadership', sc: 3.7 + (idx % 7) * 0.16, src: 'mentor', ev: 'Demonstrated initiative coordinating student survey responses' },
      { comp: 'digital_ai_literacy', sc: 4.5 + (idx % 3) * 0.15, src: 'ai', ev: 'Proficient tool utilization and structured prompt formulation' },
      { comp: 'career_readiness', sc: 3.8 + (idx % 6) * 0.15, src: 'mentor', ev: 'Well-structured goal roadmaps and milestone tracking' },
      { comp: 'domain_academic_competency', sc: 4.4 + (idx % 4) * 0.14, src: 'mentor', ev: `High academic consistency in ${seed.course_name}` },
    ];

    compScoresList.forEach(({ comp, sc, src, ev }, sIdx) => {
      competencyScores.push({
        id: `cs-${idx * 10 + sIdx + 1}`,
        student_id: studentId,
        competency: comp,
        score: Math.min(5.0, Math.max(1.0, Math.round(sc * 10) / 10)),
        source: src,
        evidence: ev,
        created_at: new Date().toISOString(),
      });
    });
  });

  // Activities (Daily Think It Through Challenges)
  const activities: Activity[] = [
    {
      id: 'act-1',
      title: 'The Broken Bridge Dilemma',
      type: 'scenario',
      competency: 'critical_thinking',
      prompt:
        'A rural agricultural cooperative loses bridge access right before the harvest season. With constrained emergency funds, they have two options: a temporary metal truss or a local timber raft. Which would you advise and why?',
      xp: 60,
      created_at: new Date().toISOString(),
    },
    {
      id: 'act-2',
      title: 'Auditing Campus Energy Inefficiencies',
      type: 'analysis',
      competency: 'analytical_thinking',
      prompt:
        'Your department wants to reduce daytime power consumption by 30% over 60 days. What empirical baseline indicators would you track first?',
      xp: 75,
      created_at: new Date().toISOString(),
    },
    {
      id: 'act-3',
      title: 'Resolving Team Impasse Under Tight Deadlines',
      type: 'roleplay',
      competency: 'leadership',
      prompt:
        'Two talented peers in your project group strongly disagree on the architecture, and the submission deadline is 48 hours away. How do you arbitrate constructively?',
      xp: 80,
      created_at: new Date().toISOString(),
    },
    {
      id: 'act-4',
      title: 'Ethical AI Study Workflows',
      type: 'ideation',
      competency: 'innovative_thinking',
      prompt:
        'Design an active-recall study system utilizing modern AI tools without sacrificing genuine deep reading comprehension.',
      xp: 70,
      created_at: new Date().toISOString(),
    },
  ];

  // Resources
  const resources: Resource[] = [
    {
      id: 'res-1',
      title: 'First Principles Thinking: The Foundation of Rigorous Analysis',
      url: 'https://fs.blog/first-principles/',
      type: 'article',
      competency_tags: ['critical_thinking', 'problem_solving'],
      goal_tags: ['Build analytical reasoning for college projects'],
      added_by: 'mentor-ramkumar',
      created_at: new Date().toISOString(),
    },
    {
      id: 'res-2',
      title: 'Leading When You Are Not in Charge: The Servant Leadership Mindset',
      url: 'https://hbr.org/2020/02/how-to-lead-when-youre-not-in-charge',
      type: 'article',
      competency_tags: ['leadership', 'communication'],
      goal_tags: ['Become an active college team lead'],
      added_by: 'mentor-ramkumar',
      created_at: new Date().toISOString(),
    },
    {
      id: 'res-3',
      title: 'Data-Driven Decision Making & Applied Hypothesis Testing',
      url: 'https://www.coursera.org/learn/data-driven-decision-making',
      type: 'course',
      competency_tags: ['analytical_thinking', 'domain_academic_competency'],
      goal_tags: ['Excel in academic research'],
      added_by: 'mentor-ananya',
      created_at: new Date().toISOString(),
    },
    {
      id: 'res-4',
      title: 'Structured Professional Communication for Engineers & Analysts',
      url: 'https://youtube.com/watch?v=HAnw168huqA',
      type: 'youtube',
      competency_tags: ['communication', 'career_readiness'],
      goal_tags: ['Ace technical interviews and presentations'],
      added_by: 'mentor-karthik',
      created_at: new Date().toISOString(),
    },
    {
      id: 'res-5',
      title: 'Ethical AI Workflows & Modern Prompt Engineering',
      url: 'https://learnprompting.org/',
      type: 'tool',
      competency_tags: ['digital_ai_literacy', 'innovative_thinking'],
      goal_tags: ['Master AI workflows in computer science and research'],
      added_by: 'mentor-ramkumar',
      created_at: new Date().toISOString(),
    },
  ];

  // AI Flags
  const aiFlags: AIFlag[] = [
    {
      id: 'flag-1',
      student_id: 'student-3',
      severity: 'medium',
      reason: 'Student noted feeling overwhelmed by multiple upcoming semester exams and family financial pressure.',
      status: 'open',
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    {
      id: 'flag-2',
      student_id: 'student-7',
      severity: 'low',
      reason: 'Student requested guidance on balancing hostel responsibilities with project submission deadlines.',
      status: 'acknowledged',
      handled_by: 'mentor-ramkumar',
      created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    },
  ];

  // Trustee feedback
  const trusteeFeedback: TrusteeFeedback[] = [
    {
      id: 'tf-1',
      student_id: 'student-1',
      trustee_id: 'trustee-rec-1',
      message: 'Lakshana, the trustees reviewed your recent progress report. Your dedication to your B.Com coursework and leadership reflection is truly admirable. Keep shining!',
      created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
  ];

  // Mentor notes
  const mentorNotes: MentorNote[] = [
    {
      id: 'mn-1',
      student_id: 'student-1',
      mentor_id: 'mentor-rec-1',
      meeting_date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
      notes: 'Monthly 1:1 check-in. Lakshana is highly engaged in college and preparing for upcoming semester tests. Discussed time management between study and family support.',
      action_items: 'Review first-principles assignment feedback and complete 2 mock aptitude tests before next check-in.',
      created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    },
  ];

  // Notifications
  const notifications: NotificationItem[] = [
    {
      id: 'notif-1',
      user_id: 'profile-student-1',
      title: 'Mentor Reviewed Your Submission',
      body: 'Ramkumar SKR reviewed your task "First Principles Analysis of Core Subject Syllabus" with Grade A+.',
      link: '/student/tasks',
      read: false,
      created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    },
    {
      id: 'notif-2',
      user_id: 'profile-student-1',
      title: 'Feedback from VRCF Trustee',
      body: 'Smt. Shanthi Ramaswami sent an encouraging note regarding your leadership progress.',
      link: '/student/progress',
      read: true,
      created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
  ];

  const chatThreads: ChatThread[] = [
    {
      id: 'thread-1',
      student_id: 'student-1',
      title: 'Analytical Frameworks for Semester Projects',
      summary: null,
      archived: false,
      created_at: new Date().toISOString(),
    },
    {
      id: 'thread-2',
      student_id: 'student-1',
      title: 'Balancing Placement Prep & Foundation Tasks',
      summary: null,
      archived: false,
      created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
    {
      id: 'thread-3',
      student_id: 'student-1',
      title: 'Public Speaking & Seminar Presentation Confidence',
      summary: null,
      archived: false,
      created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    },
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      thread_id: 'thread-1',
      role: 'user',
      content: 'I want to apply first-principles thinking to our database design assignment, but my team wants to copy an existing template. How should I convince them?',
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'msg-2',
      thread_id: 'thread-1',
      role: 'assistant',
      content: 'You are looking to lead your team toward first-principles rigor without creating group resistance.\n\nWhat is the single biggest performance or scalability bottleneck in their chosen template that you can demonstrate with a quick two-minute benchmark?',
      created_at: new Date(Date.now() - 3500000).toISOString(),
    },
    {
      id: 'msg-3',
      thread_id: 'thread-2',
      role: 'user',
      content: 'I have DSA practice every evening, but also foundation leadership tasks. I feel I am running out of energy by 9 PM.',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'msg-4',
      thread_id: 'thread-2',
      role: 'assistant',
      content: 'Balancing intensive technical problem-solving with leadership reflection is testing your cognitive stamina.\n\nIf you protected your sharpest 45 minutes in the morning for deep work, which of these two priorities would yield the highest compounding return for you today?',
      created_at: new Date(Date.now() - 86000000).toISOString(),
    },
    {
      id: 'msg-5',
      thread_id: 'thread-3',
      role: 'user',
      content: 'Next Tuesday is my first college seminar on Cloud Infrastructure. My voice trembles when looking at a large audience.',
      created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    },
    {
      id: 'msg-6',
      thread_id: 'thread-3',
      role: 'assistant',
      content: 'Stepping onto a public stage is bringing your physical adrenaline to the surface.\n\nRather than speaking to the whole auditorium, what happens if you identify three friendly faces across the room and speak only to one at a time for each key point?',
      created_at: new Date(Date.now() - 5 * 86400000 + 60000).toISOString(),
    },
  ];

  return {
    profiles,
    mentors,
    trustees,
    students,
    goals,
    visionBoards,
    tasks,
    submissions,
    reviews,
    competencyScores,
    activities,
    activityAttempts: [
      {
        id: 'att-1',
        student_id: 'student-1',
        activity_id: 'act-1',
        response: 'I would prioritize a hybrid timber raft for immediate harvest transit while commissioning community-sourced materials for a permanent bridge. This prevents harvest spoilage within 72 hours without taking on predatory debt.',
        ai_feedback: 'Superb first-principles reasoning. You decoupled the urgent temporal blocker (harvest expiration) from the long-term infrastructure investment.',
        score: 4.8,
        duration_seconds: 180,
        completed_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
    ],
    resources,
    bookmarkedResources: {
      'student-1': ['res-1', 'res-5'],
    },
    completedResources: {
      'student-1': ['res-1'],
    },
    gamification,
    chatThreads,
    chatMessages,
    aiFlags,
    trusteeFeedback,
    mentorNotes,
    notifications,
  };
}

// Global in-memory singleton for mock runtime
let storeInstance: MockDataStore | null = null;

export function getMockStore(): MockDataStore {
  if (!storeInstance) {
    storeInstance = initializeStore();
  }
  return storeInstance;
}

export function resetMockStore(): MockDataStore {
  storeInstance = initializeStore();
  return storeInstance;
}

// Store Mutation Operations
export function addGoal(goal: Omit<Goal, 'id' | 'created_at'>): Goal {
  const store = getMockStore();
  const newGoal: Goal = {
    ...goal,
    id: `goal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    created_at: new Date().toISOString(),
  };
  store.goals.unshift(newGoal);
  return newGoal;
}

export function updateGoal(id: string, updates: Partial<Goal>): Goal | null {
  const store = getMockStore();
  const index = store.goals.findIndex((g) => g.id === id);
  if (index === -1) return null;
  store.goals[index] = { ...store.goals[index], ...updates };
  return store.goals[index];
}

export function deleteGoal(id: string): boolean {
  const store = getMockStore();
  const index = store.goals.findIndex((g) => g.id === id);
  if (index === -1) return false;
  store.goals.splice(index, 1);
  return true;
}

export function updateVisionBoard(studentId: string, imageUrl: string): VisionBoard {
  const store = getMockStore();
  const index = store.visionBoards.findIndex((vb) => vb.student_id === studentId);
  if (index !== -1) {
    store.visionBoards[index].image_url = imageUrl;
    store.visionBoards[index].updated_at = new Date().toISOString();
    return store.visionBoards[index];
  }
  const newVb: VisionBoard = {
    id: `vb-${Date.now()}`,
    student_id: studentId,
    image_url: imageUrl,
    updated_at: new Date().toISOString(),
  };
  store.visionBoards.push(newVb);
  return newVb;
}

export function addTask(task: Omit<Task, 'id' | 'created_at'>): Task {
  const store = getMockStore();
  const newTask: Task = {
    ...task,
    id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    created_at: new Date().toISOString(),
  };
  store.tasks.unshift(newTask);
  return newTask;
}

export function submitTask(
  taskId: string,
  submissionData: { remarks?: string; reflection: string; attachment_url?: string }
): { task: Task; submission: Submission } | null {
  const store = getMockStore();
  const taskIndex = store.tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) return null;

  const subId = `sub-${Date.now()}`;
  const newSubmission: Submission = {
    id: subId,
    task_id: taskId,
    remarks: submissionData.remarks,
    reflection: submissionData.reflection,
    attachment_url: submissionData.attachment_url,
    submitted_at: new Date().toISOString(),
  };

  store.submissions.unshift(newSubmission);
  store.tasks[taskIndex].status = 'submitted';
  store.tasks[taskIndex].submission = newSubmission;

  // Award XP for submitting
  const studentId = store.tasks[taskIndex].student_id;
  if (store.gamification[studentId]) {
    store.gamification[studentId].xp += 50;
  }

  return { task: store.tasks[taskIndex], submission: newSubmission };
}

export function updateStudentProfile(
  studentId: string,
  updates: Partial<Student>
): Student | null {
  const store = getMockStore();
  const index = store.students.findIndex((s) => s.id === studentId);
  if (index === -1) return null;
  store.students[index] = { ...store.students[index], ...updates };
  return store.students[index];
}

export function reviewSubmission(
  submissionId: string,
  reviewData: {
    mentorId: string;
    feedback: string;
    grade?: string;
    rating?: number;
    competencyRatings?: Record<string, number>;
  }
): { submission: Submission; review: Review; task: Task } | null {
  const store = getMockStore();
  const subIndex = store.submissions.findIndex((s) => s.id === submissionId);
  if (subIndex === -1) return null;

  const sub = store.submissions[subIndex];
  const taskIndex = store.tasks.findIndex((t) => t.id === sub.task_id);
  if (taskIndex === -1) return null;

  const revId = `rev-${Date.now()}`;
  const mentor = store.mentors.find((m) => m.id === reviewData.mentorId) || store.mentors[0];

  const newReview: Review = {
    id: revId,
    submission_id: submissionId,
    mentor_id: reviewData.mentorId,
    feedback: reviewData.feedback,
    grade: reviewData.grade || 'A',
    rating: reviewData.rating || 5,
    competency_ratings: reviewData.competencyRatings || {},
    reviewed_at: new Date().toISOString(),
    mentor,
  };

  store.reviews.unshift(newReview);
  store.submissions[subIndex].review = newReview;
  store.tasks[taskIndex].status = 'reviewed';
  store.tasks[taskIndex].submission = store.submissions[subIndex];

  // Write/Update competency scores with source: 'mentor'
  const studentId = store.tasks[taskIndex].student_id;
  if (reviewData.competencyRatings) {
    Object.entries(reviewData.competencyRatings).forEach(([compKey, score]) => {
      const existingScore = store.competencyScores.find(
        (cs) => cs.student_id === studentId && cs.competency === compKey && cs.source === 'mentor'
      );
      if (existingScore) {
        existingScore.score = score;
        existingScore.evidence = reviewData.feedback.slice(0, 100);
      } else {
        store.competencyScores.push({
          id: `cs-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          student_id: studentId,
          competency: compKey as CompetencyKey,
          score,
          source: 'mentor',
          evidence: reviewData.feedback.slice(0, 100),
          created_at: new Date().toISOString(),
        });
      }
    });
  }

  // Award XP to student for receiving a review
  if (store.gamification[studentId]) {
    store.gamification[studentId].xp += 100;
  }

  return {
    submission: store.submissions[subIndex],
    review: newReview,
    task: store.tasks[taskIndex],
  };
}

export function addStudent(newStudentData: Omit<Student, 'id' | 'created_at'>): Student {
  const store = getMockStore();
  const studentId = `student-${store.students.length + 1}`;
  const profileId = `profile-${studentId}`;

  const newProfile: Profile = {
    id: profileId,
    role: 'student',
    full_name: newStudentData.name,
    email: newStudentData.email,
    phone: newStudentData.phone,
    photo_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(newStudentData.name)}`,
    created_at: new Date().toISOString(),
  };
  store.profiles.push(newProfile);

  const fullStudent: Student = {
    ...newStudentData,
    id: studentId,
    profile_id: profileId,
    status: 'active',
    created_at: new Date().toISOString(),
    profile: newProfile,
    primary_mentor: store.mentors.find((m) => m.id === newStudentData.primary_mentor_id) || store.mentors[0],
  };

  store.students.unshift(fullStudent);

  // Initialize gamification
  store.gamification[studentId] = {
    student_id: studentId,
    xp: 100,
    level: 1,
    current_streak: 1,
    longest_streak: 1,
    last_active_date: new Date().toISOString().split('T')[0],
    streak_freeze_available: true,
    badges: ['first_goal'],
  };

  // Initialize vision board
  store.visionBoards.push({
    id: `vb-${Date.now()}`,
    student_id: studentId,
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    updated_at: new Date().toISOString(),
  });

  return fullStudent;
}

export function addMentorNote(note: Omit<MentorNote, 'id' | 'created_at'>): MentorNote {
  const store = getMockStore();
  const newNote: MentorNote = {
    ...note,
    id: `mn-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  store.mentorNotes.unshift(newNote);
  return newNote;
}

export function updateAIFlag(
  flagId: string,
  status: 'open' | 'acknowledged' | 'resolved',
  handledBy?: string
): AIFlag | null {
  const store = getMockStore();
  const index = store.aiFlags.findIndex((f) => f.id === flagId);
  if (index === -1) return null;
  store.aiFlags[index].status = status;
  if (handledBy) {
    store.aiFlags[index].handled_by = handledBy;
  }
  return store.aiFlags[index];
}

export function updateMentorProfile(
  mentorId: string,
  updates: { full_name?: string; email?: string; phone?: string; designation?: string; organization?: string; photo_url?: string }
): Mentor | null {
  const store = getMockStore();
  const mentorIndex = store.mentors.findIndex((m) => m.id === mentorId);
  if (mentorIndex === -1) return null;

  if (updates.designation) store.mentors[mentorIndex].designation = updates.designation;
  if (updates.organization) store.mentors[mentorIndex].organization = updates.organization;

  const profileIndex = store.profiles.findIndex((p) => p.id === store.mentors[mentorIndex].profile_id);
  if (profileIndex !== -1) {
    if (updates.full_name) store.profiles[profileIndex].full_name = updates.full_name;
    if (updates.email) store.profiles[profileIndex].email = updates.email;
    if (updates.phone) store.profiles[profileIndex].phone = updates.phone;
    if (updates.photo_url) store.profiles[profileIndex].photo_url = updates.photo_url;
    store.mentors[mentorIndex].profile = store.profiles[profileIndex];
  }

  return store.mentors[mentorIndex];
}

// AI Chat Thread & Message Helpers
export function getStudentChatThreads(studentId: string): ChatThread[] {
  const store = getMockStore();
  return store.chatThreads.filter((t) => t.student_id === studentId && !t.archived);
}

export function getThreadMessages(threadId: string): ChatMessage[] {
  const store = getMockStore();
  return store.chatMessages
    .filter((m) => m.thread_id === threadId)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
}

export function createChatThread(studentId: string, title?: string): ChatThread {
  const store = getMockStore();
  const newThread: ChatThread = {
    id: `thread-${Date.now()}`,
    student_id: studentId,
    title: title || 'New Mentorship Dialogue',
    summary: null,
    archived: false,
    created_at: new Date().toISOString(),
  };
  store.chatThreads.unshift(newThread);
  return newThread;
}

export function renameChatThread(threadId: string, title: string): ChatThread | null {
  const store = getMockStore();
  const thread = store.chatThreads.find((t) => t.id === threadId);
  if (!thread) return null;
  thread.title = title.trim();
  return thread;
}

export function deleteChatThread(threadId: string): boolean {
  const store = getMockStore();
  const index = store.chatThreads.findIndex((t) => t.id === threadId);
  if (index === -1) return false;
  store.chatThreads.splice(index, 1);
  // Also remove associated messages
  store.chatMessages = store.chatMessages.filter((m) => m.thread_id !== threadId);
  return true;
}

export function clearChatThreadMessages(threadId: string): boolean {
  const store = getMockStore();
  store.chatMessages = store.chatMessages.filter((m) => m.thread_id !== threadId);
  return true;
}

export function addChatMessage(threadId: string, role: 'user' | 'assistant', content: string): ChatMessage {
  const store = getMockStore();
  const msg: ChatMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    thread_id: threadId,
    role,
    content,
    created_at: new Date().toISOString(),
  };
  store.chatMessages.push(msg);

  // Auto-generate thread title if it's the first user message on a default-titled thread
  if (role === 'user') {
    const thread = store.chatThreads.find((t) => t.id === threadId);
    if (thread && (thread.title === 'New Mentorship Dialogue' || thread.title === 'New Chat')) {
      const words = content.trim().split(/\s+/).slice(0, 5).join(' ');
      thread.title = words.length > 35 ? words.substring(0, 32) + '...' : words;
    }
  }

  return msg;
}

export function getDailyChatQuota(studentId: string): { used: number; remaining: number; max: number } {
  const store = getMockStore();
  const todayStr = new Date().toISOString().split('T')[0];
  const studentThreadIds = new Set(
    store.chatThreads.filter((t) => t.student_id === studentId).map((t) => t.id)
  );
  const usedToday = store.chatMessages.filter(
    (m) =>
      studentThreadIds.has(m.thread_id) &&
      m.role === 'user' &&
      m.created_at.startsWith(todayStr)
  ).length;

  const max = 30;
  return {
    used: usedToday,
    remaining: Math.max(0, max - usedToday),
    max,
  };
}

export function updateThreadSummary(threadId: string, summary: string): void {
  const store = getMockStore();
  const thread = store.chatThreads.find((t) => t.id === threadId);
  if (thread) {
    thread.summary = summary;
  }
}

// Activity & Gamification Store Operations
export function addActivity(activity: Omit<Activity, 'id' | 'created_at'>): Activity {
  const store = getMockStore();
  const newActivity: Activity = {
    ...activity,
    id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    created_at: new Date().toISOString(),
  };
  store.activities.unshift(newActivity);
  return newActivity;
}

export function recordActivityAttempt(
  studentId: string,
  activityId: string,
  response: string,
  aiFeedback: string,
  score: number
): { attempt: ActivityAttempt; xpAwarded: number; newTotalXp: number; newLevel: number; unlockedBadge?: string } {
  const store = getMockStore();
  const activity = store.activities.find((a) => a.id === activityId);
  const xpAwarded = activity?.xp || 75;

  const attempt: ActivityAttempt = {
    id: `att-${Date.now()}`,
    student_id: studentId,
    activity_id: activityId,
    response,
    ai_feedback: aiFeedback,
    score,
    duration_seconds: 120,
    completed_at: new Date().toISOString(),
  };

  store.activityAttempts.unshift(attempt);

  // Update Gamification
  const gam = store.gamification[studentId] || {
    student_id: studentId,
    xp: 350,
    level: 2,
    current_streak: 5,
    longest_streak: 7,
    streak_freeze_available: true,
    badges: ['first_goal'],
  };

  gam.xp += xpAwarded;

  // Level thresholds: L1: 0-250, L2: 251-500, L3: 501-800, L4: 801-1200, L5: 1201+
  let newLevel = 1;
  if (gam.xp >= 1201) newLevel = 5;
  else if (gam.xp >= 801) newLevel = 4;
  else if (gam.xp >= 501) newLevel = 3;
  else if (gam.xp >= 251) newLevel = 2;
  gam.level = newLevel;

  // Check badge unlock
  let unlockedBadge: string | undefined;
  if (store.activityAttempts.filter((a) => a.student_id === studentId).length >= 1 && !gam.badges.includes('first_activity')) {
    gam.badges.push('first_activity');
    unlockedBadge = 'first_activity';
  }

  // Update competency score
  if (activity) {
    const existingScore = store.competencyScores.find(
      (s) => s.student_id === studentId && s.competency === activity.competency
    );
    if (existingScore) {
      existingScore.score = Math.min(5.0, Number((existingScore.score * 0.7 + score * 0.3).toFixed(1)));
      existingScore.source = 'ai';
      existingScore.evidence = `Demonstrated in activity: ${activity.title}`;
    } else {
      store.competencyScores.push({
        id: `cs-${Date.now()}`,
        student_id: studentId,
        competency: activity.competency,
        score,
        source: 'ai',
        evidence: `Demonstrated in activity: ${activity.title}`,
        created_at: new Date().toISOString(),
      });
    }
  }

  return {
    attempt,
    xpAwarded,
    newTotalXp: gam.xp,
    newLevel: gam.level,
    unlockedBadge,
  };
}

export function toggleStreakFreeze(studentId: string): boolean {
  const store = getMockStore();
  const gam = store.gamification[studentId];
  if (!gam) return false;
  gam.streak_freeze_available = !gam.streak_freeze_available;
  return gam.streak_freeze_available;
}

export function toggleResourceBookmark(studentId: string, resourceId: string): boolean {
  const store = getMockStore();
  if (!store.bookmarkedResources[studentId]) {
    store.bookmarkedResources[studentId] = [];
  }
  const list = store.bookmarkedResources[studentId];
  const idx = list.indexOf(resourceId);
  if (idx !== -1) {
    list.splice(idx, 1);
    return false;
  } else {
    list.push(resourceId);
    return true;
  }
}

export function completeResource(studentId: string, resourceId: string): { success: boolean; xpEarned: number } {
  const store = getMockStore();
  if (!store.completedResources[studentId]) {
    store.completedResources[studentId] = [];
  }
  const list = store.completedResources[studentId];
  if (list.includes(resourceId)) {
    return { success: false, xpEarned: 0 };
  }

  list.push(resourceId);

  // Award +25 XP
  const gam = store.gamification[studentId];
  if (gam) {
    gam.xp += 25;
  }

  return { success: true, xpEarned: 25 };
}

export function addAIFlag(flag: Omit<AIFlag, 'id' | 'created_at'>): AIFlag {
  const store = getMockStore();
  const newFlag: AIFlag = {
    ...flag,
    id: `flag-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    created_at: new Date().toISOString(),
  };
  store.aiFlags.unshift(newFlag);
  return newFlag;
}




