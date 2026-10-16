-- Mentora Database Schema for Supabase PostgreSQL
-- Vasumathi Ramaswami Centenary Foundation (VRCF)

-- Extensions
create extension if not exists "uuid-ossp";

-- Custom Types
create type public.user_role as enum ('student', 'mentor', 'trustee', 'admin');
create type public.residence_type as enum ('hosteller', 'day_scholar');
create type public.goal_kind as enum ('aim', 'vision_statement', 'short_term', 'long_term', 'interest', 'career_goal');
create type public.task_status as enum ('assigned', 'in_progress', 'submitted', 'reviewed');
create type public.task_creator_role as enum ('mentor', 'self');
create type public.score_source as enum ('mentor', 'ai', 'self');
create type public.flag_severity as enum ('low', 'medium', 'high');
create type public.flag_status as enum ('open', 'acknowledged', 'resolved');
create type public.resource_type as enum ('youtube', 'article', 'course', 'linkedin', 'tool');

-- 1. PROFILES
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  role public.user_role not null default 'student',
  full_name text not null,
  email text unique not null,
  phone text,
  photo_url text,
  theme_preference text default 'system',
  created_at timestamptz default now()
);

-- 2. MENTORS & TRUSTEES
create table public.mentors (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade unique not null,
  organization text,
  designation text,
  created_at timestamptz default now()
);

create table public.trustees (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade unique not null,
  created_at timestamptz default now()
);

-- 3. STUDENTS
create table public.students (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete set null unique,
  vrcf_id text unique not null,
  name text not null,
  email text unique not null,
  cohort int not null check (cohort in (1, 2, 3)),
  course_name text not null,
  year_of_study text not null,
  college text not null,
  college_district text,
  residence_type public.residence_type default 'day_scholar',
  phone text,
  parent_phone text,
  home_address text,
  home_district text,
  tuition_fee_term text,
  tuition_fee_amount text,
  hostel_fee text,
  total_academic_years text,
  primary_mentor_id uuid references public.mentors(id) on delete set null,
  status text not null default 'active',
  created_at timestamptz default now()
);

-- 4. GOALS & VISION BOARDS
create table public.goals (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.students(id) on delete cascade not null,
  kind public.goal_kind not null,
  title text not null,
  description text,
  target_date date,
  status text default 'in_progress',
  progress int default 0 check (progress >= 0 and progress <= 100),
  created_at timestamptz default now()
);

create table public.vision_boards (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.students(id) on delete cascade unique not null,
  image_url text not null,
  updated_at timestamptz default now()
);

-- 5. TASKS, SUBMISSIONS & REVIEWS
create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.students(id) on delete cascade not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_by_role public.task_creator_role not null default 'mentor',
  title text not null,
  details text,
  due_date timestamptz,
  focus_competencies text[] not null default '{}',
  status public.task_status not null default 'assigned',
  created_at timestamptz default now()
);

create table public.submissions (
  id uuid default gen_random_uuid() primary key,
  task_id uuid references public.tasks(id) on delete cascade unique not null,
  remarks text,
  reflection text,
  attachment_url text,
  submitted_at timestamptz default now()
);

create table public.reviews (
  id uuid default gen_random_uuid() primary key,
  submission_id uuid references public.submissions(id) on delete cascade unique not null,
  mentor_id uuid references public.mentors(id) on delete set null,
  feedback text not null,
  grade text,
  rating int check (rating between 1 and 5),
  competency_ratings jsonb default '{}'::jsonb,
  reviewed_at timestamptz default now()
);

-- 6. COMPETENCY SCORES
create table public.competency_scores (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.students(id) on delete cascade not null,
  competency text not null check (competency in (
    'critical_thinking', 'analytical_thinking', 'logical_reasoning', 'problem_solving',
    'innovative_thinking', 'communication', 'leadership', 'digital_ai_literacy',
    'career_readiness', 'domain_academic_competency'
  )),
  score numeric(3, 1) not null check (score >= 1.0 and score <= 5.0),
  source public.score_source not null,
  evidence text,
  created_at timestamptz default now()
);

-- 7. AI MENTOR CHAT & FLAGS
create table public.chat_threads (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.students(id) on delete cascade not null,
  title text not null default 'Mentorship Session',
  summary text,
  archived boolean default false,
  created_at timestamptz default now()
);

create table public.chat_messages (
  id uuid default gen_random_uuid() primary key,
  thread_id uuid references public.chat_threads(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now()
);

create table public.ai_flags (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.students(id) on delete cascade not null,
  thread_id uuid references public.chat_threads(id) on delete set null,
  severity public.flag_severity not null default 'medium',
  reason text not null,
  status public.flag_status not null default 'open',
  handled_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

-- 8. ACTIVITIES & ATTEMPTS
create table public.activities (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  type text not null,
  competency text not null,
  prompt text not null,
  payload jsonb default '{}'::jsonb,
  xp int default 50,
  created_at timestamptz default now()
);

create table public.activity_attempts (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.students(id) on delete cascade not null,
  activity_id uuid references public.activities(id) on delete cascade not null,
  response text not null,
  ai_feedback text,
  score numeric(3, 1),
  duration_seconds int default 0,
  completed_at timestamptz default now()
);

-- 9. ENGAGEMENT, RESOURCES & TRUSTEE FEEDBACK
create table public.engagement_events (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.students(id) on delete cascade not null,
  kind text not null,
  duration_seconds int not null default 0,
  created_at timestamptz default now()
);

create table public.resources (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  url text not null,
  type public.resource_type not null,
  competency_tags text[] default '{}',
  goal_tags text[] default '{}',
  added_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

create table public.trustee_feedback (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.students(id) on delete cascade not null,
  trustee_id uuid references public.trustees(id) on delete set null,
  message text not null,
  created_at timestamptz default now()
);

create table public.mentor_notes (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.students(id) on delete cascade not null,
  mentor_id uuid references public.mentors(id) on delete set null,
  meeting_date date not null default current_date,
  notes text not null,
  action_items text,
  created_at timestamptz default now()
);

-- 10. NOTIFICATIONS, GAMIFICATION & AUDIT
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  body text not null,
  link text,
  read boolean default false,
  created_at timestamptz default now()
);

create table public.gamification (
  student_id uuid references public.students(id) on delete cascade primary key,
  xp int default 0,
  level int default 1,
  current_streak int default 0,
  longest_streak int default 0,
  last_active_date date default current_date,
  streak_freeze_available boolean default true,
  badges jsonb default '[]'::jsonb
);

create table public.audit_log (
  id uuid default gen_random_uuid() primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity text not null,
  entity_id text,
  created_at timestamptz default now()
);

create table public.ai_token_logs (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.students(id) on delete set null,
  route text not null,
  model text not null,
  prompt_tokens int default 0,
  completion_tokens int default 0,
  created_at timestamptz default now()
);

-- INDEXES
create index idx_students_vrcf_id on public.students(vrcf_id);
create index idx_students_email on public.students(email);
create index idx_students_status on public.students(status);
create index idx_tasks_student_status on public.tasks(student_id, status);
create index idx_competency_student on public.competency_scores(student_id, competency);
create index idx_chat_messages_thread on public.chat_messages(thread_id, created_at);
create index idx_ai_flags_student_status on public.ai_flags(student_id, status);
create index idx_notifications_user_read on public.notifications(user_id, read);

-- HELPER FUNCTIONS FOR RLS
create or replace function public.current_user_role()
returns public.user_role as $$
  select role from public.profiles where id = auth.uid();
$$ language sql security definer stable;

create or replace function public.current_student_id()
returns uuid as $$
  select id from public.students where profile_id = auth.uid();
$$ language sql security definer stable;

-- ENABLE RLS ON ALL TABLES
alter table public.profiles enable row level security;
alter table public.mentors enable row level security;
alter table public.trustees enable row level security;
alter table public.students enable row level security;
alter table public.goals enable row level security;
alter table public.vision_boards enable row level security;
alter table public.tasks enable row level security;
alter table public.submissions enable row level security;
alter table public.reviews enable row level security;
alter table public.competency_scores enable row level security;
alter table public.chat_threads enable row level security;
alter table public.chat_messages enable row level security;
alter table public.ai_flags enable row level security;
alter table public.activities enable row level security;
alter table public.activity_attempts enable row level security;
alter table public.engagement_events enable row level security;
alter table public.resources enable row level security;
alter table public.trustee_feedback enable row level security;
alter table public.mentor_notes enable row level security;
alter table public.notifications enable row level security;
alter table public.gamification enable row level security;
alter table public.audit_log enable row level security;
alter table public.ai_token_logs enable row level security;

-- RLS POLICIES

-- PROFILES
create policy "profiles_select_own" on public.profiles for select using (
  auth.uid() = id or public.current_user_role() in ('mentor', 'trustee', 'admin')
);
create policy "profiles_update_own" on public.profiles for update using (
  auth.uid() = id or public.current_user_role() = 'admin'
);
create policy "profiles_insert_admin" on public.profiles for insert with check (
  auth.uid() = id or public.current_user_role() = 'admin'
);

-- MENTORS & TRUSTEES
create policy "mentors_select" on public.mentors for select using (true);
create policy "mentors_all_admin" on public.mentors for all using (public.current_user_role() = 'admin');

create policy "trustees_select" on public.trustees for select using (true);
create policy "trustees_all_admin" on public.trustees for all using (public.current_user_role() = 'admin');

-- STUDENTS
create policy "students_select" on public.students for select using (
  profile_id = auth.uid() or public.current_user_role() in ('mentor', 'trustee', 'admin')
);
create policy "students_update" on public.students for update using (
  (profile_id = auth.uid() and status = 'active') or public.current_user_role() in ('mentor', 'admin')
);
create policy "students_insert" on public.students for insert with check (
  public.current_user_role() in ('mentor', 'admin')
);

-- GOALS
create policy "goals_select" on public.goals for select using (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'trustee', 'admin')
);
create policy "goals_insert" on public.goals for insert with check (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'admin')
);
create policy "goals_update" on public.goals for update using (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'admin')
);
create policy "goals_delete" on public.goals for delete using (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'admin')
);

-- VISION BOARDS
create policy "vision_boards_select" on public.vision_boards for select using (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'trustee', 'admin')
);
create policy "vision_boards_modify" on public.vision_boards for all using (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'admin')
);

-- TASKS
create policy "tasks_select" on public.tasks for select using (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'trustee', 'admin')
);
create policy "tasks_insert" on public.tasks for insert with check (
  (student_id = public.current_student_id() and created_by_role = 'self') or public.current_user_role() in ('mentor', 'admin')
);
create policy "tasks_update" on public.tasks for update using (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'admin')
);

-- SUBMISSIONS
create policy "submissions_select" on public.submissions for select using (
  exists (select 1 from public.tasks t where t.id = submissions.task_id and (t.student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'trustee', 'admin')))
);
create policy "submissions_insert" on public.submissions for insert with check (
  exists (select 1 from public.tasks t where t.id = submissions.task_id and t.student_id = public.current_student_id())
);
create policy "submissions_update" on public.submissions for update using (
  exists (select 1 from public.tasks t where t.id = submissions.task_id and t.student_id = public.current_student_id())
);

-- REVIEWS
create policy "reviews_select" on public.reviews for select using (
  exists (
    select 1 from public.submissions s
    join public.tasks t on t.id = s.task_id
    where s.id = reviews.submission_id and (t.student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'trustee', 'admin'))
  )
);
create policy "reviews_write" on public.reviews for all using (
  public.current_user_role() in ('mentor', 'admin')
);

-- COMPETENCY SCORES
create policy "competency_scores_select" on public.competency_scores for select using (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'trustee', 'admin')
);
create policy "competency_scores_write" on public.competency_scores for all using (
  public.current_user_role() in ('mentor', 'admin')
);

-- CHAT THREADS
create policy "chat_threads_select" on public.chat_threads for select using (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'admin', 'trustee')
);
create policy "chat_threads_write" on public.chat_threads for all using (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'admin')
);

-- CHAT MESSAGES (TRUSTEE STRICTLY BLOCKED BY RLS)
create policy "chat_messages_select" on public.chat_messages for select using (
  exists (
    select 1 from public.chat_threads ct
    where ct.id = chat_messages.thread_id and (
      ct.student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'admin')
    )
  )
);
create policy "chat_messages_insert" on public.chat_messages for insert with check (
  exists (
    select 1 from public.chat_threads ct
    where ct.id = chat_messages.thread_id and (
      ct.student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'admin')
    )
  )
);

-- AI FLAGS (STUDENTS STRICTLY BLOCKED BY RLS)
create policy "ai_flags_select" on public.ai_flags for select using (
  public.current_user_role() in ('mentor', 'trustee', 'admin')
);
create policy "ai_flags_write" on public.ai_flags for all using (
  public.current_user_role() in ('mentor', 'admin')
);

-- ACTIVITIES & ATTEMPTS
create policy "activities_select" on public.activities for select using (true);
create policy "activities_write" on public.activities for all using (public.current_user_role() in ('mentor', 'admin'));

create policy "activity_attempts_select" on public.activity_attempts for select using (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'trustee', 'admin')
);
create policy "activity_attempts_insert" on public.activity_attempts for insert with check (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'admin')
);

-- ENGAGEMENT EVENTS
create policy "engagement_select" on public.engagement_events for select using (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'trustee', 'admin')
);
create policy "engagement_insert" on public.engagement_events for insert with check (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'admin')
);

-- RESOURCES
create policy "resources_select" on public.resources for select using (true);
create policy "resources_write" on public.resources for all using (public.current_user_role() in ('mentor', 'admin'));

-- TRUSTEE FEEDBACK
create policy "trustee_feedback_select" on public.trustee_feedback for select using (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'trustee', 'admin')
);
create policy "trustee_feedback_insert" on public.trustee_feedback for insert with check (
  public.current_user_role() in ('trustee', 'admin')
);

-- MENTOR NOTES / MEETING LOGS
create policy "mentor_notes_select" on public.mentor_notes for select using (
  public.current_user_role() in ('mentor', 'trustee', 'admin')
);
create policy "mentor_notes_write" on public.mentor_notes for all using (
  public.current_user_role() in ('mentor', 'admin')
);

-- NOTIFICATIONS
create policy "notifications_select" on public.notifications for select using (
  user_id = auth.uid() or public.current_user_role() = 'admin'
);
create policy "notifications_update" on public.notifications for update using (
  user_id = auth.uid() or public.current_user_role() = 'admin'
);
create policy "notifications_insert" on public.notifications for insert with check (
  true
);

-- GAMIFICATION
create policy "gamification_select" on public.gamification for select using (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'trustee', 'admin')
);
create policy "gamification_write" on public.gamification for all using (
  student_id = public.current_student_id() or public.current_user_role() in ('mentor', 'admin')
);

-- AUDIT LOG
create policy "audit_log_select" on public.audit_log for select using (
  public.current_user_role() = 'admin'
);
create policy "audit_log_insert" on public.audit_log for insert with check (
  true
);

-- AI TOKEN LOGS
create policy "ai_token_logs_select" on public.ai_token_logs for select using (
  public.current_user_role() = 'admin'
);
create policy "ai_token_logs_insert" on public.ai_token_logs for insert with check (
  true
);
