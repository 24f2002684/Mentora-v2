import { CompetencyKey } from './competencies';

export type UserRole = 'student' | 'mentor' | 'trustee' | 'admin';
export type ResidenceType = 'hosteller' | 'day_scholar';
export type GoalKind = 'aim' | 'vision_statement' | 'short_term' | 'long_term' | 'interest' | 'career_goal';
export type TaskStatus = 'assigned' | 'in_progress' | 'submitted' | 'reviewed';
export type TaskCreatorRole = 'mentor' | 'self';
export type ScoreSource = 'mentor' | 'ai' | 'self';
export type FlagSeverity = 'low' | 'medium' | 'high';
export type FlagStatus = 'open' | 'acknowledged' | 'resolved';
export type ResourceType = 'youtube' | 'article' | 'course' | 'linkedin' | 'tool';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  email: string;
  phone?: string | null;
  photo_url?: string | null;
  theme_preference?: string | null;
  created_at: string;
}

export interface Mentor {
  id: string;
  profile_id: string;
  organization?: string | null;
  designation?: string | null;
  created_at: string;
  profile?: Profile;
}

export interface Trustee {
  id: string;
  profile_id: string;
  created_at: string;
  profile?: Profile;
}

export interface Student {
  id: string;
  profile_id?: string | null;
  vrcf_id: string;
  name: string;
  email: string;
  cohort: 1 | 2 | 3;
  course_name: string;
  year_of_study: string;
  college: string;
  college_district?: string | null;
  residence_type: ResidenceType;
  phone?: string | null;
  parent_phone?: string | null;
  home_address?: string | null;
  home_district?: string | null;
  tuition_fee_term?: string | null;
  tuition_fee_amount?: string | null;
  hostel_fee?: string | null;
  total_academic_years?: string | null;
  primary_mentor_id?: string | null;
  status: 'active' | 'graduated' | 'inactive';
  created_at: string;
  profile?: Profile | null;
  primary_mentor?: Mentor | null;
}

export interface Goal {
  id: string;
  student_id: string;
  kind: GoalKind;
  title: string;
  description?: string | null;
  target_date?: string | null;
  status: 'in_progress' | 'completed' | 'paused';
  progress: number;
  created_at: string;
}

export interface VisionBoard {
  id: string;
  student_id: string;
  image_url: string;
  updated_at: string;
}

export interface Task {
  id: string;
  student_id: string;
  created_by?: string | null;
  created_by_role: TaskCreatorRole;
  title: string;
  details?: string | null;
  due_date?: string | null;
  focus_competencies: CompetencyKey[];
  status: TaskStatus;
  created_at: string;
  submission?: Submission | null;
}

export interface Submission {
  id: string;
  task_id: string;
  remarks?: string | null;
  reflection?: string | null;
  attachment_url?: string | null;
  submitted_at: string;
  review?: Review | null;
}

export interface Review {
  id: string;
  submission_id: string;
  mentor_id?: string | null;
  feedback: string;
  grade?: string | null;
  rating?: number | null;
  competency_ratings?: Record<string, number> | null;
  reviewed_at: string;
  mentor?: Mentor | null;
}

export interface CompetencyScore {
  id: string;
  student_id: string;
  competency: CompetencyKey;
  score: number;
  source: ScoreSource;
  evidence?: string | null;
  created_at: string;
}

export interface ChatThread {
  id: string;
  student_id: string;
  title: string;
  summary?: string | null;
  archived: boolean;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  thread_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface AIFlag {
  id: string;
  student_id: string;
  thread_id?: string | null;
  severity: FlagSeverity;
  reason: string;
  status: FlagStatus;
  handled_by?: string | null;
  created_at: string;
}

export interface Activity {
  id: string;
  title: string;
  type: string;
  competency: CompetencyKey;
  prompt: string;
  payload?: Record<string, unknown>;
  xp: number;
  created_at: string;
}

export interface ActivityAttempt {
  id: string;
  student_id: string;
  activity_id: string;
  response: string;
  ai_feedback?: string | null;
  score?: number | null;
  duration_seconds: number;
  completed_at: string;
}

export interface EngagementEvent {
  id: string;
  student_id: string;
  kind: string;
  duration_seconds: number;
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: ResourceType;
  competency_tags: CompetencyKey[];
  goal_tags: string[];
  added_by?: string | null;
  created_at: string;
}

export interface TrusteeFeedback {
  id: string;
  student_id: string;
  trustee_id?: string | null;
  message: string;
  created_at: string;
  trustee?: Trustee | null;
}

export interface MentorNote {
  id: string;
  student_id: string;
  mentor_id?: string | null;
  meeting_date: string;
  notes: string;
  action_items?: string | null;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  body: string;
  link?: string | null;
  read: boolean;
  created_at: string;
}

export interface Gamification {
  student_id: string;
  xp: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  last_active_date?: string | null;
  streak_freeze_available: boolean;
  badges: string[];
}

export interface AuditLogItem {
  id: string;
  actor_name: string;
  actor_role: UserRole | 'system';
  action: string;
  entity: string;
  entity_id?: string | null;
  details?: string | null;
  created_at: string;
}
