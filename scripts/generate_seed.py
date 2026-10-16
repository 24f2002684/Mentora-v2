import json
import uuid
import random

with open('Data/students_seed.json', encoding='utf-8') as f:
    students = json.load(f)

print(f"Generating seed SQL for {len(students)} students...")

COMPETENCIES = [
    'critical_thinking', 'analytical_thinking', 'logical_reasoning', 'problem_solving',
    'innovative_thinking', 'communication', 'leadership', 'digital_ai_literacy',
    'career_readiness', 'domain_academic_competency'
]

ADMIN_USER_ID = '00000000-0000-0000-0000-000000000001'
MENTOR1_USER_ID = '00000000-0000-0000-0000-000000000002'
MENTOR2_USER_ID = '00000000-0000-0000-0000-000000000003'
MENTOR3_USER_ID = '00000000-0000-0000-0000-000000000004'
TRUSTEE1_USER_ID = '00000000-0000-0000-0000-000000000005'
TRUSTEE2_USER_ID = '00000000-0000-0000-0000-000000000006'

MENTOR1_RECORD_ID = '10000000-0000-0000-0000-000000000001'
MENTOR2_RECORD_ID = '10000000-0000-0000-0000-000000000002'
MENTOR3_RECORD_ID = '10000000-0000-0000-0000-000000000003'
TRUSTEE1_RECORD_ID = '20000000-0000-0000-0000-000000000001'
TRUSTEE2_RECORD_ID = '20000000-0000-0000-0000-000000000002'

sql_lines = []
sql_lines.append('-- SEED DATA FOR MENTORA VRCF PLATFORM')
sql_lines.append('BEGIN;')

def esc(val):
    if val is None:
        return 'NULL'
    s = str(val).replace("'", "''")
    return f"'{s}'"

# Profiles
sql_lines.append('-- 1. PROFILES FOR ADMIN, MENTORS, TRUSTEES')
sql_lines.append(f"""
insert into public.profiles (id, role, full_name, email, phone, photo_url) values
  ('{ADMIN_USER_ID}', 'admin', 'Suhail Akthar', 'suhailmobina95@gmail.com', '+91 9876543210', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'),
  ('{MENTOR1_USER_ID}', 'mentor', 'Ramkumar SKR', 'ramkumar.skr01@gmail.com', '+91 9443210987', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'),
  ('{MENTOR2_USER_ID}', 'mentor', 'Dr. Ananya Subramanian', 'ananya.mentor@vrcf.org.in', '+91 9443210988', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'),
  ('{MENTOR3_USER_ID}', 'mentor', 'Karthik Narayanan', 'karthik.vrcf@gmail.com', '+91 9443210989', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80'),
  ('{TRUSTEE1_USER_ID}', 'trustee', 'Smt. Shanthi Ramaswami', 'trustee1@vrcf.org.in', '+91 9884012345', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80'),
  ('{TRUSTEE2_USER_ID}', 'trustee', 'Shri. R. Venkatraman', 'trustee2@vrcf.org.in', '+91 9884012346', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80')
on conflict (id) do update set
  full_name = excluded.full_name,
  role = excluded.role;
""")

# Mentors & Trustees
sql_lines.append('-- 2. MENTORS & TRUSTEES TABLE ENTRIES')
sql_lines.append(f"""
insert into public.mentors (id, profile_id, organization, designation) values
  ('{MENTOR1_RECORD_ID}', '{MENTOR1_USER_ID}', 'VRCF & Tech Industry', 'Lead Mentor & Technical Program Manager'),
  ('{MENTOR2_RECORD_ID}', '{MENTOR2_USER_ID}', 'VRCF Leadership Academy', 'Dean of Academic Development & Life Coach'),
  ('{MENTOR3_RECORD_ID}', '{MENTOR3_USER_ID}', 'VRCF Career Cell', 'Industry Mentorship & Readiness Lead')
on conflict (id) do nothing;

insert into public.trustees (id, profile_id) values
  ('{TRUSTEE1_RECORD_ID}', '{TRUSTEE1_USER_ID}'),
  ('{TRUSTEE2_RECORD_ID}', '{TRUSTEE2_USER_ID}')
on conflict (id) do nothing;
""")

# Resources
sql_lines.append('-- 3. CURATED RESOURCES')
RESOURCES = [
    ('First Principles Thinking in Problem Solving', 'https://fs.blog/first-principles/', 'article', ['critical_thinking', 'problem_solving'], ['Build analytical reasoning for college projects']),
    ('Leadership Without Authority: Influencing Others', 'https://hbr.org/2020/02/how-to-lead-when-youre-not-in-charge', 'article', ['leadership', 'communication'], ['Become an active college team lead']),
    ('Structured Data Analysis and Hypothesis Testing', 'https://www.coursera.org/learn/data-driven-decision-making', 'course', ['analytical_thinking', 'domain_academic_competency'], ['Excel in academic research']),
    ('Effective Written & Spoken Business Communication', 'https://youtube.com/watch?v=HAnw168huqA', 'youtube', ['communication', 'career_readiness'], ['Ace technical interviews and presentations']),
    ('Prompt Engineering & AI Tools for Productive College Students', 'https://learnprompting.org/', 'tool', ['digital_ai_literacy', 'innovative_thinking'], ['Master AI workflows in computer science and research']),
    ('Framework for Decision Making Under Uncertainty', 'https://fs.blog/mental-models/', 'article', ['logical_reasoning', 'critical_thinking'], ['Develop strong mental models for career growth']),
    ('Building a Professional LinkedIn Presence & Portfolio', 'https://linkedin.com/learning', 'linkedin', ['career_readiness', 'communication'], ['Secure internships in target domain']),
    ('Creative Ideation: Lateral Thinking & Brainstorming', 'https://ed.ted.com', 'youtube', ['innovative_thinking', 'problem_solving'], ['Design novel solutions for social impact'])
]

for title, url, rtype, ctags, gtags in RESOURCES:
    ctags_str = "ARRAY[" + ", ".join(f"'{c}'" for c in ctags) + "]"
    gtags_str = "ARRAY[" + ", ".join(f"'{g}'" for g in gtags) + "]"
    sql_lines.append(f"insert into public.resources (title, url, type, competency_tags, goal_tags, added_by) values ({esc(title)}, {esc(url)}, '{rtype}', {ctags_str}, {gtags_str}, '{MENTOR1_USER_ID}');")

# Activities
sql_lines.append('-- 4. DAILY ACTIVITIES')
ACTIVITIES = [
    ('The Broken Bridge Dilemma', 'scenario', 'critical_thinking', 'A rural village cooperative loses road access right before harvest season. They have limited emergency funds and two competing proposals: an expensive temporary metal bridge or a locally fabricated timber raft system. Which would you advise and why?', 60),
    ('Evaluating Campus Carbon Footprint', 'analysis', 'analytical_thinking', 'Your college administration wants to reduce single-use plastic waste by 80% in 90 days. What metrics and baseline indicators would you track first to ensure real impact rather than performative compliance?', 75),
    ('The Conflicting Team Deadline', 'roleplay', 'leadership', 'Two members of your team are refusing to collaborate because each feels their technical approach is superior, and the project is due in 48 hours. How do you resolve this impasse without alienating either member?', 80),
    ('Automating Monotonous Study Routines', 'ideation', 'innovative_thinking', 'Describe how you would design a personal AI study assistant workflow using ethical prompt engineering to turn lengthy textbook chapters into active-recall quizzes without losing conceptual depth.', 70)
]

for title, atype, comp, prompt, xp in ACTIVITIES:
    sql_lines.append(f"insert into public.activities (title, type, competency, prompt, xp) values ({esc(title)}, {esc(atype)}, '{comp}', {esc(prompt)}, {xp});")

# Students
sql_lines.append('-- 5. STUDENTS, GOALS, VISION BOARDS, TASKS, REVIEWS & GAMIFICATION')
mentor_ids = [MENTOR1_RECORD_ID, MENTOR2_RECORD_ID, MENTOR3_RECORD_ID]

for i, s in enumerate(students):
    stud_id = f"30000000-0000-0000-0000-{i+1:012d}"
    assigned_mentor = mentor_ids[i % len(mentor_ids)]
    sql_lines.append(f"""
insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '{stud_id}', {esc(s['vrcf_id'])}, {esc(s['name'])}, {esc(s['email'])}, {s['cohort']},
  {esc(s['course_name'])}, {esc(s['year_of_study'])}, {esc(s['college'])}, {esc(s['college_district'])},
  '{s['residence_type']}', {esc(s['phone'])}, {esc(s['parent_phone'])}, {esc(s['home_address'])},
  {esc(s['home_district'])}, {esc(s['total_academic_years'])}, {esc(s['tuition_fee_term'])},
  {esc(s['tuition_fee_amount'])}, {esc(s['hostel_fee'])}, '{assigned_mentor}', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;
""")

    # Gamification
    xp = 120 + (i * 35) % 800
    level = 1 + (xp // 250)
    streak = 1 + (i % 7)
    sql_lines.append(f"""
insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('{stud_id}', {xp}, {level}, {streak}, {streak + 3}, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;
""")

    # Vision board
    vb_images = [
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'
    ]
    sql_lines.append(f"""
insert into public.vision_boards (student_id, image_url)
values ('{stud_id}', '{vb_images[i % len(vb_images)]}')
on conflict (student_id) do nothing;
""")

    # Goals
    goals = [
        ('aim', f'Master core {s["course_name"]} fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65),
        ('vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40),
        ('short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80),
        ('long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50),
        ('career_goal', f'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30)
    ]
    for kind, title, desc, target_date, progress in goals:
        sql_lines.append(f"insert into public.goals (student_id, kind, title, description, target_date, progress) values ('{stud_id}', '{kind}', {esc(title)}, {esc(desc)}, '{target_date}', {progress});")

    # Tasks
    task1_id = f"40000000-0000-0000-0000-{i*3+1:012d}"
    task2_id = f"40000000-0000-0000-0000-{i*3+2:012d}"
    task3_id = f"40000000-0000-0000-0000-{i*3+3:012d}"

    sql_lines.append(f"""
insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('{task1_id}', '{stud_id}', '{MENTOR1_USER_ID}', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('{task2_id}', '{stud_id}', '{MENTOR1_USER_ID}', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('{task3_id}', '{stud_id}', '{MENTOR1_USER_ID}', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');
""")

    # Submission 1 (reviewed)
    sub1_id = f"50000000-0000-0000-0000-{i*2+1:012d}"
    sql_lines.append(f"""
insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('{sub1_id}', '{task1_id}', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/{s["vrcf_id"]}-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('{sub1_id}', '{assigned_mentor}', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{{"critical_thinking": 4.8, "analytical_thinking": 4.7}}'::jsonb);
""")

    # Submission 2 (to review)
    sub2_id = f"50000000-0000-0000-0000-{i*2+2:012d}"
    sql_lines.append(f"""
insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('{sub2_id}', '{task2_id}', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/{s["vrcf_id"]}-problem-solving.pdf', now() - interval '1 day');
""")

    # Competency Scores
    scores = [
        ('critical_thinking', 4.2 + (i % 5) * 0.15, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment'),
        ('analytical_thinking', 4.0 + (i % 4) * 0.2, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data'),
        ('logical_reasoning', 3.8 + (i % 6) * 0.15, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions'),
        ('problem_solving', 4.3 + (i % 4) * 0.15, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems'),
        ('innovative_thinking', 3.9 + (i % 5) * 0.18, 'ai', 'Creative synthesis of technological and social intervention models'),
        ('communication', 4.1 + (i % 5) * 0.14, 'mentor', 'Articulate, respectful, and transparent communication across tasks'),
        ('leadership', 3.7 + (i % 7) * 0.16, 'mentor', 'Initiative in coordinating student group input and campus survey'),
        ('digital_ai_literacy', 4.5 + (i % 3) * 0.15, 'ai', 'Proficient utilization of computational tools and prompt techniques'),
        ('career_readiness', 3.8 + (i % 6) * 0.15, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap'),
        ('domain_academic_competency', 4.4 + (i % 4) * 0.14, 'mentor', f'Top academic standing in {s["course_name"]}')
    ]
    for comp, sc, src, ev in scores:
        clamped_score = min(5.0, max(1.0, round(sc, 1)))
        sql_lines.append(f"insert into public.competency_scores (student_id, competency, score, source, evidence) values ('{stud_id}', '{comp}', {clamped_score}, '{src}', {esc(ev)});")

sql_lines.append('COMMIT;')

with open('supabase/seed.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_lines))

print('Successfully written supabase/seed.sql!')
