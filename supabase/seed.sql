-- SEED DATA FOR MENTORA VRCF PLATFORM
BEGIN;
-- 1. PROFILES FOR ADMIN, MENTORS, TRUSTEES

insert into public.profiles (id, role, full_name, email, phone, photo_url) values
  ('00000000-0000-0000-0000-000000000001', 'admin', 'Suhail Akthar', 'suhailmobina95@gmail.com', '+91 9876543210', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'),
  ('00000000-0000-0000-0000-000000000002', 'mentor', 'Ramkumar SKR', 'ramkumar.skr01@gmail.com', '+91 9443210987', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'),
  ('00000000-0000-0000-0000-000000000003', 'mentor', 'Dr. Ananya Subramanian', 'ananya.mentor@vrcf.org.in', '+91 9443210988', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'),
  ('00000000-0000-0000-0000-000000000004', 'mentor', 'Karthik Narayanan', 'karthik.vrcf@gmail.com', '+91 9443210989', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80'),
  ('00000000-0000-0000-0000-000000000005', 'trustee', 'Smt. Shanthi Ramaswami', 'trustee1@vrcf.org.in', '+91 9884012345', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80'),
  ('00000000-0000-0000-0000-000000000006', 'trustee', 'Shri. R. Venkatraman', 'trustee2@vrcf.org.in', '+91 9884012346', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80')
on conflict (id) do update set
  full_name = excluded.full_name,
  role = excluded.role;

-- 2. MENTORS & TRUSTEES TABLE ENTRIES

insert into public.mentors (id, profile_id, organization, designation) values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'VRCF & Tech Industry', 'Lead Mentor & Technical Program Manager'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'VRCF Leadership Academy', 'Dean of Academic Development & Life Coach'),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', 'VRCF Career Cell', 'Industry Mentorship & Readiness Lead')
on conflict (id) do nothing;

insert into public.trustees (id, profile_id) values
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000005'),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000006')
on conflict (id) do nothing;

-- 3. CURATED RESOURCES
insert into public.resources (title, url, type, competency_tags, goal_tags, added_by) values ('First Principles Thinking in Problem Solving', 'https://fs.blog/first-principles/', 'article', ARRAY['critical_thinking', 'problem_solving'], ARRAY['Build analytical reasoning for college projects'], '00000000-0000-0000-0000-000000000002');
insert into public.resources (title, url, type, competency_tags, goal_tags, added_by) values ('Leadership Without Authority: Influencing Others', 'https://hbr.org/2020/02/how-to-lead-when-youre-not-in-charge', 'article', ARRAY['leadership', 'communication'], ARRAY['Become an active college team lead'], '00000000-0000-0000-0000-000000000002');
insert into public.resources (title, url, type, competency_tags, goal_tags, added_by) values ('Structured Data Analysis and Hypothesis Testing', 'https://www.coursera.org/learn/data-driven-decision-making', 'course', ARRAY['analytical_thinking', 'domain_academic_competency'], ARRAY['Excel in academic research'], '00000000-0000-0000-0000-000000000002');
insert into public.resources (title, url, type, competency_tags, goal_tags, added_by) values ('Effective Written & Spoken Business Communication', 'https://youtube.com/watch?v=HAnw168huqA', 'youtube', ARRAY['communication', 'career_readiness'], ARRAY['Ace technical interviews and presentations'], '00000000-0000-0000-0000-000000000002');
insert into public.resources (title, url, type, competency_tags, goal_tags, added_by) values ('Prompt Engineering & AI Tools for Productive College Students', 'https://learnprompting.org/', 'tool', ARRAY['digital_ai_literacy', 'innovative_thinking'], ARRAY['Master AI workflows in computer science and research'], '00000000-0000-0000-0000-000000000002');
insert into public.resources (title, url, type, competency_tags, goal_tags, added_by) values ('Framework for Decision Making Under Uncertainty', 'https://fs.blog/mental-models/', 'article', ARRAY['logical_reasoning', 'critical_thinking'], ARRAY['Develop strong mental models for career growth'], '00000000-0000-0000-0000-000000000002');
insert into public.resources (title, url, type, competency_tags, goal_tags, added_by) values ('Building a Professional LinkedIn Presence & Portfolio', 'https://linkedin.com/learning', 'linkedin', ARRAY['career_readiness', 'communication'], ARRAY['Secure internships in target domain'], '00000000-0000-0000-0000-000000000002');
insert into public.resources (title, url, type, competency_tags, goal_tags, added_by) values ('Creative Ideation: Lateral Thinking & Brainstorming', 'https://ed.ted.com', 'youtube', ARRAY['innovative_thinking', 'problem_solving'], ARRAY['Design novel solutions for social impact'], '00000000-0000-0000-0000-000000000002');
-- 4. DAILY ACTIVITIES
insert into public.activities (title, type, competency, prompt, xp) values ('The Broken Bridge Dilemma', 'scenario', 'critical_thinking', 'A rural village cooperative loses road access right before harvest season. They have limited emergency funds and two competing proposals: an expensive temporary metal bridge or a locally fabricated timber raft system. Which would you advise and why?', 60);
insert into public.activities (title, type, competency, prompt, xp) values ('Evaluating Campus Carbon Footprint', 'analysis', 'analytical_thinking', 'Your college administration wants to reduce single-use plastic waste by 80% in 90 days. What metrics and baseline indicators would you track first to ensure real impact rather than performative compliance?', 75);
insert into public.activities (title, type, competency, prompt, xp) values ('The Conflicting Team Deadline', 'roleplay', 'leadership', 'Two members of your team are refusing to collaborate because each feels their technical approach is superior, and the project is due in 48 hours. How do you resolve this impasse without alienating either member?', 80);
insert into public.activities (title, type, competency, prompt, xp) values ('Automating Monotonous Study Routines', 'ideation', 'innovative_thinking', 'Describe how you would design a personal AI study assistant workflow using ethical prompt engineering to turn lengthy textbook chapters into active-recall quizzes without losing conceptual depth.', 70);
-- 5. STUDENTS, GOALS, VISION BOARDS, TASKS, REVIEWS & GAMIFICATION

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000001', 'VRCF-C1-001', 'LAKSHANA R', 'lakshana042006@gmail.com', 1,
  'B.COM', '3rd year', 'Government Arts College   Coimbatore', 'Cbe',
  'day_scholar', '9344796724', '9790489140', 'Karuparayanpalayam  cbe',
  'Cbe', '3.0', 'Per semester',
  'Per semester', 'No', '10000000-0000-0000-0000-000000000001', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000001', 120, 1, 1, 4, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000001', 'aim', 'Master core B.COM fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000001', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000001', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000001', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000001', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-001-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-001-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000001', 'critical_thinking', 4.2, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000001', 'analytical_thinking', 4.0, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000001', 'logical_reasoning', 3.8, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000001', 'problem_solving', 4.3, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000001', 'innovative_thinking', 3.9, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000001', 'communication', 4.1, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000001', 'leadership', 3.7, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000001', 'digital_ai_literacy', 4.5, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000001', 'career_readiness', 3.8, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000001', 'domain_academic_competency', 4.4, 'mentor', 'Top academic standing in B.COM');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000002', 'VRCF-C2-001', 'Jasmiya J', 'jasmiya495@gmail.com', 2,
  'B.COM Accounting and Finance', 'II', 'ETHIRAJ COLLEGE FOR WOMEN, CHENNAI', 'CHENNAI',
  'hosteller', '8608842584', '8220522741', 'THADALAN SANNATHI ST SIRKALI',
  'MAYILADUTHURAI', '3.0', 'Per semester',
  '48000-50000', '40000.0', '10000000-0000-0000-0000-000000000002', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000002', 155, 1, 2, 5, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000002', 'aim', 'Master core B.COM Accounting and Finance fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000002', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000002', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000002', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000002', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000005', '30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000006', '30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000004', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C2-001-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000002', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000005', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C2-001-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000002', 'critical_thinking', 4.4, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000002', 'analytical_thinking', 4.2, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000002', 'logical_reasoning', 3.9, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000002', 'problem_solving', 4.5, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000002', 'innovative_thinking', 4.1, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000002', 'communication', 4.2, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000002', 'leadership', 3.9, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000002', 'digital_ai_literacy', 4.7, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000002', 'career_readiness', 3.9, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000002', 'domain_academic_competency', 4.5, 'mentor', 'Top academic standing in B.COM Accounting and Finance');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000003', 'VRCF-C3-001', 'SUJA S', 'ssuja.it2025@citchennai.net', 3,
  'B.tech IT', '2.0', 'CHENNAI INSTITUTE OF TECHNOLOGY, KANCHIPURAM', 'KANCHIPURAM',
  'hosteller', '7448909910', '9786932337', 'VELLAIYAMPATTU, new colony, CSI church street',
  'VILLUPURAM', '4.0', 'Per year',
  '3,10,000', '2,40,000', '10000000-0000-0000-0000-000000000003', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000003', 190, 1, 3, 6, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000003', 'aim', 'Master core B.tech IT fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000003', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000003', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000003', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000003', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000007', '30000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000008', '30000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000009', '30000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000005', '40000000-0000-0000-0000-000000000007', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C3-001-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000003', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000006', '40000000-0000-0000-0000-000000000008', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C3-001-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000003', 'critical_thinking', 4.5, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000003', 'analytical_thinking', 4.4, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000003', 'logical_reasoning', 4.1, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000003', 'problem_solving', 4.6, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000003', 'innovative_thinking', 4.3, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000003', 'communication', 4.4, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000003', 'leadership', 4.0, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000003', 'digital_ai_literacy', 4.8, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000003', 'career_readiness', 4.1, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000003', 'domain_academic_competency', 4.7, 'mentor', 'Top academic standing in B.tech IT');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000004', 'VRCF-C3-002', 'AVP VARSHITH', 'avpvarshith1@gmail.com', 3,
  'bsc cs with cybersecurity', '2026.0', 'Kg college of arts and science, coimbatore', 'coimbatore',
  'day_scholar', '9677430517', '9944389882', '1/20-1 vallalar nagar press colony post santhimedu',
  'Coimbatore', '3 years', 'Per semester',
  '55000.0', 'None', '10000000-0000-0000-0000-000000000001', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000004', 225, 1, 4, 7, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000004', 'aim', 'Master core bsc cs with cybersecurity fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000004', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000004', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000004', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000004', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000010', '30000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000011', '30000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000012', '30000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000007', '40000000-0000-0000-0000-000000000010', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C3-002-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000001', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000008', '40000000-0000-0000-0000-000000000011', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C3-002-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000004', 'critical_thinking', 4.7, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000004', 'analytical_thinking', 4.6, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000004', 'logical_reasoning', 4.2, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000004', 'problem_solving', 4.8, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000004', 'innovative_thinking', 4.4, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000004', 'communication', 4.5, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000004', 'leadership', 4.2, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000004', 'digital_ai_literacy', 4.5, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000004', 'career_readiness', 4.2, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000004', 'domain_academic_competency', 4.8, 'mentor', 'Top academic standing in bsc cs with cybersecurity');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000005', 'VRCF-C2-002', 'Balabharathi A', 'balabharathiannadurai@gmail.com', 2,
  'Information technology', '2 nd year', 'Chennai institute of technology', 'Cuddalore',
  'hosteller', '7010969818', '9894161034', '7/12 THIMIREDDYPALAYAM Street,suthukuzhi , bhuvanagiri (taluk)',
  'Cuddalore', '4.0', 'Per year',
  '110000.0', '-', '10000000-0000-0000-0000-000000000002', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000005', 260, 2, 5, 8, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000005', 'aim', 'Master core Information technology fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000005', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000005', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000005', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000005', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000013', '30000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000014', '30000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000015', '30000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000009', '40000000-0000-0000-0000-000000000013', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C2-002-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000002', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000010', '40000000-0000-0000-0000-000000000014', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C2-002-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000005', 'critical_thinking', 4.8, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000005', 'analytical_thinking', 4.0, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000005', 'logical_reasoning', 4.4, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000005', 'problem_solving', 4.3, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000005', 'innovative_thinking', 4.6, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000005', 'communication', 4.7, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000005', 'leadership', 4.3, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000005', 'digital_ai_literacy', 4.7, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000005', 'career_readiness', 4.4, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000005', 'domain_academic_competency', 4.4, 'mentor', 'Top academic standing in Information technology');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000006', 'VRCF-C3-003', 'Bhavani M', 'bhavanim3092006@gmail.com', 3,
  'BE CSE', '2.0', 'Chennai institute of technology, kundrathur,chennai', 'chennai',
  'day_scholar', '9444372885', '9600119651', '4/2 ,East Krishnappa garden 1st Street old Washermenpet chennai 21',
  'chennai', '4.0', 'Per year',
  '60000.0', '0.0', '10000000-0000-0000-0000-000000000003', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000006', 295, 2, 6, 9, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000006', 'aim', 'Master core BE CSE fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000006', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000006', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000006', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000006', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000016', '30000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000017', '30000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000018', '30000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000011', '40000000-0000-0000-0000-000000000016', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C3-003-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000003', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000012', '40000000-0000-0000-0000-000000000017', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C3-003-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000006', 'critical_thinking', 4.2, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000006', 'analytical_thinking', 4.2, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000006', 'logical_reasoning', 4.5, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000006', 'problem_solving', 4.5, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000006', 'innovative_thinking', 3.9, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000006', 'communication', 4.1, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000006', 'leadership', 4.5, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000006', 'digital_ai_literacy', 4.8, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000006', 'career_readiness', 4.5, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000006', 'domain_academic_competency', 4.5, 'mentor', 'Top academic standing in BE CSE');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000007', 'VRCF-C2-003', 'KOMUGI S', 'swissgi08@gmail.com', 2,
  'BE CSE', '2nd year', 'Chennai institute of technology, Chennai', 'Chennai',
  'hosteller', '8807278803', '9976219998', 'No.1/184,East street,Andhur village, Perambalur - 621212.',
  'Perambalur', '4.0', 'Per year',
  '75000.0', '-', '10000000-0000-0000-0000-000000000001', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000007', 330, 2, 7, 10, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000007', 'aim', 'Master core BE CSE fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000007', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000007', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000007', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000007', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000019', '30000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000020', '30000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000021', '30000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000013', '40000000-0000-0000-0000-000000000019', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C2-003-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000013', '10000000-0000-0000-0000-000000000001', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000014', '40000000-0000-0000-0000-000000000020', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C2-003-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000007', 'critical_thinking', 4.4, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000007', 'analytical_thinking', 4.4, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000007', 'logical_reasoning', 3.8, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000007', 'problem_solving', 4.6, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000007', 'innovative_thinking', 4.1, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000007', 'communication', 4.2, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000007', 'leadership', 4.7, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000007', 'digital_ai_literacy', 4.5, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000007', 'career_readiness', 3.8, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000007', 'domain_academic_competency', 4.7, 'mentor', 'Top academic standing in BE CSE');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000008', 'VRCF-C1-002', 'Kalaivani S', 'kalaivanigokul55@gmail.com', 1,
  'CSE', '3rd', 'CIT Chennai', 'Trichy',
  'hosteller', '8668189032', '9047375003', '363A,Easy street palaiyurmedu, Pettavaithalai',
  'Trichy', '4.0', 'Per year',
  '100000.0', '0.0', '10000000-0000-0000-0000-000000000002', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000008', 365, 2, 1, 4, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000008', 'aim', 'Master core CSE fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000008', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000008', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000008', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000008', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000022', '30000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000023', '30000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000024', '30000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000015', '40000000-0000-0000-0000-000000000022', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-002-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000015', '10000000-0000-0000-0000-000000000002', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000016', '40000000-0000-0000-0000-000000000023', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-002-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000008', 'critical_thinking', 4.5, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000008', 'analytical_thinking', 4.6, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000008', 'logical_reasoning', 3.9, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000008', 'problem_solving', 4.8, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000008', 'innovative_thinking', 4.3, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000008', 'communication', 4.4, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000008', 'leadership', 3.7, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000008', 'digital_ai_literacy', 4.7, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000008', 'career_readiness', 3.9, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000008', 'domain_academic_competency', 4.8, 'mentor', 'Top academic standing in CSE');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000009', 'VRCF-C1-003', 'Kaviya M', 'murugankaviya007@gmail.com', 1,
  'Artificial intelligence and data science', '3.0', 'Chennai Institute of technology, chennai', 'chennai',
  'day_scholar', '7812886770', '6374489716', 'No.147 sowbakiya nagar,thiruvamuthur road, Villupuram',
  'Villupuram', '4.0', 'Per year',
  '185000.0', 'No', '10000000-0000-0000-0000-000000000003', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000009', 400, 2, 2, 5, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000009', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000009', 'aim', 'Master core Artificial intelligence and data science fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000009', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000009', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000009', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000009', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000025', '30000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000026', '30000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000027', '30000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000017', '40000000-0000-0000-0000-000000000025', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-003-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000017', '10000000-0000-0000-0000-000000000003', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000018', '40000000-0000-0000-0000-000000000026', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-003-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000009', 'critical_thinking', 4.7, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000009', 'analytical_thinking', 4.0, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000009', 'logical_reasoning', 4.1, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000009', 'problem_solving', 4.3, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000009', 'innovative_thinking', 4.4, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000009', 'communication', 4.5, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000009', 'leadership', 3.9, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000009', 'digital_ai_literacy', 4.8, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000009', 'career_readiness', 4.1, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000009', 'domain_academic_competency', 4.4, 'mentor', 'Top academic standing in Artificial intelligence and data science');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000010', 'VRCF-C2-004', 'KAVIN G S', 'kavings2007@gmail.com', 2,
  'B.E- CSE', 'll Year', 'Chennai institute of technology, chennai', 'chennai',
  'hosteller', '9345507876', '6374837818', '247/Thathampettai ,Rice Mill Street,Keerapalayam',
  'Cuddalore', 'lV Year', 'Per year',
  '65000.0', 'Nil', '10000000-0000-0000-0000-000000000001', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000010', 435, 2, 3, 6, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000010', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000010', 'aim', 'Master core B.E- CSE fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000010', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000010', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000010', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000010', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000028', '30000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000029', '30000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000030', '30000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000019', '40000000-0000-0000-0000-000000000028', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C2-004-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000019', '10000000-0000-0000-0000-000000000001', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000020', '40000000-0000-0000-0000-000000000029', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C2-004-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000010', 'critical_thinking', 4.8, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000010', 'analytical_thinking', 4.2, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000010', 'logical_reasoning', 4.2, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000010', 'problem_solving', 4.5, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000010', 'innovative_thinking', 4.6, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000010', 'communication', 4.7, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000010', 'leadership', 4.0, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000010', 'digital_ai_literacy', 4.5, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000010', 'career_readiness', 4.2, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000010', 'domain_academic_competency', 4.5, 'mentor', 'Top academic standing in B.E- CSE');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000011', 'VRCF-C2-005', 'SUPRITHA R', 'supritha21122007@gmail.com', 2,
  'CSE', 'II', 'CHENNAI INSTITUTE OF TECHNOLOGY, CHENNAI', 'CHENNAI',
  'day_scholar', '8056380199', '6381075938', 'No.3,malligai street, thazhanguda,gundu uppalavadi post,cuddalore, Tamil Nadu',
  'CUDDALORE', '4.0', 'Per year',
  '110000.0', '-', '10000000-0000-0000-0000-000000000002', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000011', 470, 2, 4, 7, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000011', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000011', 'aim', 'Master core CSE fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000011', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000011', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000011', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000011', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000031', '30000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000032', '30000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000033', '30000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000021', '40000000-0000-0000-0000-000000000031', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C2-005-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000021', '10000000-0000-0000-0000-000000000002', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000022', '40000000-0000-0000-0000-000000000032', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C2-005-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000011', 'critical_thinking', 4.2, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000011', 'analytical_thinking', 4.4, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000011', 'logical_reasoning', 4.4, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000011', 'problem_solving', 4.6, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000011', 'innovative_thinking', 3.9, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000011', 'communication', 4.1, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000011', 'leadership', 4.2, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000011', 'digital_ai_literacy', 4.7, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000011', 'career_readiness', 4.4, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000011', 'domain_academic_competency', 4.7, 'mentor', 'Top academic standing in CSE');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000012', 'VRCF-C1-004', 'Pavithra.p', 'pavithra.212123@gmail.com', 1,
  'Bachelor of Siddha medicine and surgery', '5 and 1/2 yrs', 'Sir Isaac Newton siddha medical College and Hospital', 'Nagapattinam',
  'day_scholar', '9042581807', '85239345277448440135', 'Dr no 12, vedhanayaga chetti street fourth lane old beach road Nagapattinam',
  'Nagapattinam', '4 and 1/2 yr with one yr internship', 'Per year',
  'Tuition fee -1 lak 25 ,000 and some other expenses ( exam fee,lab fees, record note fee,book fee)', 'No', '10000000-0000-0000-0000-000000000003', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000012', 505, 3, 5, 8, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000012', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000012', 'aim', 'Master core Bachelor of Siddha medicine and surgery fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000012', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000012', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000012', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000012', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000034', '30000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000035', '30000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000036', '30000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000023', '40000000-0000-0000-0000-000000000034', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-004-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000023', '10000000-0000-0000-0000-000000000003', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000024', '40000000-0000-0000-0000-000000000035', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-004-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000012', 'critical_thinking', 4.4, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000012', 'analytical_thinking', 4.6, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000012', 'logical_reasoning', 4.5, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000012', 'problem_solving', 4.8, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000012', 'innovative_thinking', 4.1, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000012', 'communication', 4.2, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000012', 'leadership', 4.3, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000012', 'digital_ai_literacy', 4.8, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000012', 'career_readiness', 4.5, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000012', 'domain_academic_competency', 4.8, 'mentor', 'Top academic standing in Bachelor of Siddha medicine and surgery');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000013', 'VRCF-C3-004', 'Najiya nasrin', 'najiyanasrin674@gmail.com', 3,
  'Btech CSE AIML', '1st year', 'Chennai institute of technology, Chennai', 'Chennai',
  'hosteller', '6379637674', '9585879771', 'Niligiri Gudalur',
  'Niligiri', '4.0', 'Per year',
  '325000.0', '175000.0', '10000000-0000-0000-0000-000000000001', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000013', 540, 3, 6, 9, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000013', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000013', 'aim', 'Master core Btech CSE AIML fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000013', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000013', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000013', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000013', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000037', '30000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000038', '30000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000039', '30000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000025', '40000000-0000-0000-0000-000000000037', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C3-004-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000025', '10000000-0000-0000-0000-000000000001', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000026', '40000000-0000-0000-0000-000000000038', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C3-004-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000013', 'critical_thinking', 4.5, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000013', 'analytical_thinking', 4.0, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000013', 'logical_reasoning', 3.8, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000013', 'problem_solving', 4.3, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000013', 'innovative_thinking', 4.3, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000013', 'communication', 4.4, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000013', 'leadership', 4.5, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000013', 'digital_ai_literacy', 4.5, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000013', 'career_readiness', 3.8, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000013', 'domain_academic_competency', 4.4, 'mentor', 'Top academic standing in Btech CSE AIML');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000014', 'VRCF-C1-005', 'Sivachitrakumar R V', 'dr.sivaofficial3161@gmail.com', 1,
  'BSMS [ BACHELOR OF SIDDHA MEDICINE AND SURGERY ]', '2 nd proffesional', 'Sir Issac Newton siddha medical College and hospital Nagapattinam', 'Nagapattinam',
  'day_scholar', '9080573386', '9600641495', '5 A vaikkangarai street velippalayam Nagapattinam',
  'Nagapattinam', '5.5 years', 'Per year',
  '1.25 lakh', 'No', '10000000-0000-0000-0000-000000000002', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000014', 575, 3, 7, 10, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000014', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000014', 'aim', 'Master core BSMS [ BACHELOR OF SIDDHA MEDICINE AND SURGERY ] fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000014', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000014', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000014', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000014', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000040', '30000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000041', '30000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000042', '30000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000027', '40000000-0000-0000-0000-000000000040', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-005-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000027', '10000000-0000-0000-0000-000000000002', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000028', '40000000-0000-0000-0000-000000000041', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-005-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000014', 'critical_thinking', 4.7, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000014', 'analytical_thinking', 4.2, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000014', 'logical_reasoning', 3.9, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000014', 'problem_solving', 4.5, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000014', 'innovative_thinking', 4.4, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000014', 'communication', 4.5, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000014', 'leadership', 4.7, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000014', 'digital_ai_literacy', 4.7, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000014', 'career_readiness', 3.9, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000014', 'domain_academic_competency', 4.5, 'mentor', 'Top academic standing in BSMS [ BACHELOR OF SIDDHA MEDICINE AND SURGERY ]');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000015', 'VRCF-C2-006', 'Kaviya S', 'sankarmageshwari2021@gmail.com', 2,
  'Bsc in Biotechnology', '2 nd year', 'SRM Arts and Science college, Kattankulathur, Chengalpattu.', 'Chengalpattu.',
  'day_scholar', '9629400615', '9952244851', 'No.389,Mariamman kovil street, sirunkozhi,  kattiyampandhal x road, Uthiramerur.',
  'Kanchipuram', '3.0', 'Per year',
  'Per year', 'No', '10000000-0000-0000-0000-000000000003', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000015', 610, 3, 1, 4, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000015', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000015', 'aim', 'Master core Bsc in Biotechnology fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000015', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000015', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000015', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000015', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000043', '30000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000044', '30000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000045', '30000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000029', '40000000-0000-0000-0000-000000000043', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C2-006-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000029', '10000000-0000-0000-0000-000000000003', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000030', '40000000-0000-0000-0000-000000000044', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C2-006-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000015', 'critical_thinking', 4.8, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000015', 'analytical_thinking', 4.4, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000015', 'logical_reasoning', 4.1, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000015', 'problem_solving', 4.6, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000015', 'innovative_thinking', 4.6, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000015', 'communication', 4.7, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000015', 'leadership', 3.7, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000015', 'digital_ai_literacy', 4.8, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000015', 'career_readiness', 4.1, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000015', 'domain_academic_competency', 4.7, 'mentor', 'Top academic standing in Bsc in Biotechnology');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000016', 'VRCF-C1-006', 'B. Muthulakshmi', 'mlakshmi2860@gmail.com', 1,
  'B. Com', 'Final year', 'Jayaraj Annapackiam college for women (Autonomous ), periyakulam', 'periyakulam',
  'day_scholar', '9865741346', '7094594036', '325/perumal kovil street, nagalapuram theni',
  'Theni district', '3years', 'Per semester',
  'Per semester', 'No', '10000000-0000-0000-0000-000000000001', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000016', 645, 3, 2, 5, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000016', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000016', 'aim', 'Master core B. Com fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000016', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000016', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000016', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000016', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000046', '30000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000047', '30000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000048', '30000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000031', '40000000-0000-0000-0000-000000000046', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-006-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000031', '10000000-0000-0000-0000-000000000001', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000032', '40000000-0000-0000-0000-000000000047', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-006-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000016', 'critical_thinking', 4.2, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000016', 'analytical_thinking', 4.6, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000016', 'logical_reasoning', 4.2, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000016', 'problem_solving', 4.8, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000016', 'innovative_thinking', 3.9, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000016', 'communication', 4.1, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000016', 'leadership', 3.9, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000016', 'digital_ai_literacy', 4.5, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000016', 'career_readiness', 4.2, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000016', 'domain_academic_competency', 4.8, 'mentor', 'Top academic standing in B. Com');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000017', 'VRCF-C1-007', 'Varsha', 'varsha17813@gmail.com', 1,
  'BBA', '3 year', 'Government arts college, karur', 'karur',
  'hosteller', '9342057007', '9344631438', 'Karpaga nagar, valkattuputhur, karur',
  'Karur', '3 year', 'Per semester',
  '650.0', 'No', '10000000-0000-0000-0000-000000000002', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000017', 680, 3, 3, 6, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000017', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000017', 'aim', 'Master core BBA fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000017', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000017', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000017', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000017', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000049', '30000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000050', '30000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000051', '30000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000033', '40000000-0000-0000-0000-000000000049', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-007-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000033', '10000000-0000-0000-0000-000000000002', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000034', '40000000-0000-0000-0000-000000000050', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-007-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000017', 'critical_thinking', 4.4, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000017', 'analytical_thinking', 4.0, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000017', 'logical_reasoning', 4.4, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000017', 'problem_solving', 4.3, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000017', 'innovative_thinking', 4.1, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000017', 'communication', 4.2, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000017', 'leadership', 4.0, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000017', 'digital_ai_literacy', 4.7, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000017', 'career_readiness', 4.4, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000017', 'domain_academic_competency', 4.4, 'mentor', 'Top academic standing in BBA');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000018', 'VRCF-C1-008', 'Nilashini S', 'nilashini2007@gmail.com', 1,
  'Computer science engineering', '3.0', 'Chennai institute of technology - Chennai', 'Chennai',
  'day_scholar', '9344390121', '9080228875', 'No. 25, Ram Nagar 1st main road peravallur chennai 600082',
  'Chennai', '4.0', 'Per year',
  '85000.0', 'Nil', '10000000-0000-0000-0000-000000000003', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000018', 715, 3, 4, 7, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000018', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000018', 'aim', 'Master core Computer science engineering fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000018', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000018', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000018', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000018', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000052', '30000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000053', '30000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000054', '30000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000035', '40000000-0000-0000-0000-000000000052', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-008-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000035', '10000000-0000-0000-0000-000000000003', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000036', '40000000-0000-0000-0000-000000000053', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-008-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000018', 'critical_thinking', 4.5, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000018', 'analytical_thinking', 4.2, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000018', 'logical_reasoning', 4.5, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000018', 'problem_solving', 4.5, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000018', 'innovative_thinking', 4.3, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000018', 'communication', 4.4, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000018', 'leadership', 4.2, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000018', 'digital_ai_literacy', 4.8, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000018', 'career_readiness', 4.5, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000018', 'domain_academic_competency', 4.5, 'mentor', 'Top academic standing in Computer science engineering');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000019', 'VRCF-C3-005', 'Arthardan muthu G', 'arthuarthu230@gmail.com', 3,
  'B.E CSE', '2nd year', 'Chennai institute of technology and kanchipuram', 'Thiruvarur',
  'day_scholar', '8825759076', '8825515635', 'Vanchiyur, Veppanagudi, mavoor (post)-Thiruvarur',
  'Thiruvarur', '4.0', 'Per year',
  'Per year', 'NA', '10000000-0000-0000-0000-000000000001', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000019', 750, 4, 5, 8, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000019', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000019', 'aim', 'Master core B.E CSE fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000019', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000019', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000019', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000019', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000055', '30000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000056', '30000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000057', '30000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000037', '40000000-0000-0000-0000-000000000055', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C3-005-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000037', '10000000-0000-0000-0000-000000000001', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000038', '40000000-0000-0000-0000-000000000056', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C3-005-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000019', 'critical_thinking', 4.7, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000019', 'analytical_thinking', 4.4, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000019', 'logical_reasoning', 3.8, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000019', 'problem_solving', 4.6, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000019', 'innovative_thinking', 4.4, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000019', 'communication', 4.5, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000019', 'leadership', 4.3, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000019', 'digital_ai_literacy', 4.5, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000019', 'career_readiness', 3.8, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000019', 'domain_academic_competency', 4.7, 'mentor', 'Top academic standing in B.E CSE');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000020', 'VRCF-C3-006', 'ASHWINI A', 'ashwiniannamalai27@gmail.com', 3,
  'B.E Computer Science', '(currently:2nd year)', 'Chennai Institute Of Technology, Kanchipuram', 'Kanchipuram',
  'day_scholar', '6381513450', '80728501308939091968', 'No 32/16 Welcome Colony Anna Nagar West EXTN Chennai -101',
  'Chennai', '4 years', 'Per year',
  '1,75,000', '-', '10000000-0000-0000-0000-000000000002', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000020', 785, 4, 6, 9, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000020', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000020', 'aim', 'Master core B.E Computer Science fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000020', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000020', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000020', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000020', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000058', '30000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000059', '30000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000060', '30000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000039', '40000000-0000-0000-0000-000000000058', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C3-006-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000039', '10000000-0000-0000-0000-000000000002', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000040', '40000000-0000-0000-0000-000000000059', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C3-006-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000020', 'critical_thinking', 4.8, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000020', 'analytical_thinking', 4.6, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000020', 'logical_reasoning', 3.9, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000020', 'problem_solving', 4.8, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000020', 'innovative_thinking', 4.6, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000020', 'communication', 4.7, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000020', 'leadership', 4.5, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000020', 'digital_ai_literacy', 4.7, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000020', 'career_readiness', 3.9, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000020', 'domain_academic_competency', 4.8, 'mentor', 'Top academic standing in B.E Computer Science');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000021', 'VRCF-C2-007', 'MEENA', 'amuthameena580@gmail.com', 2,
  'B.pharm', '2 years (3 sem)', 'Sir Issac Newton college of pharmacy,Nagapattinam', 'Nagapattinam',
  'day_scholar', '9786357183', '9786357183', '1/87 west street, adalaiyur, enangudi, Nagapattinam',
  'Nagapattinam', '4 years', 'Per year',
  '1,20,000 college fee+ otherfees', 'No', '10000000-0000-0000-0000-000000000003', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000021', 820, 4, 7, 10, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000021', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000021', 'aim', 'Master core B.pharm fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000021', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000021', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000021', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000021', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000061', '30000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000062', '30000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000063', '30000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000041', '40000000-0000-0000-0000-000000000061', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C2-007-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000041', '10000000-0000-0000-0000-000000000003', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000042', '40000000-0000-0000-0000-000000000062', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C2-007-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000021', 'critical_thinking', 4.2, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000021', 'analytical_thinking', 4.0, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000021', 'logical_reasoning', 4.1, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000021', 'problem_solving', 4.3, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000021', 'innovative_thinking', 3.9, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000021', 'communication', 4.1, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000021', 'leadership', 4.7, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000021', 'digital_ai_literacy', 4.8, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000021', 'career_readiness', 4.1, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000021', 'domain_academic_competency', 4.4, 'mentor', 'Top academic standing in B.pharm');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000022', 'VRCF-C2-008', 'Vijayaragavan k', 'vijayragavan6578@gmail.com', 2,
  'Artificial intelligence and data science', '2nd year', 'Chennai institute of technology, kanchipuram', 'kanchipuram',
  'hosteller', '9788230914', '9688006909', 'Sathapadi, bhuvanagiri, Chidambaram',
  'Cuddalore', '4 years', 'Per year',
  '110000 per year', '50000.0', '10000000-0000-0000-0000-000000000001', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000022', 855, 4, 1, 4, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000022', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000022', 'aim', 'Master core Artificial intelligence and data science fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000022', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000022', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000022', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000022', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000064', '30000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000065', '30000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000066', '30000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000043', '40000000-0000-0000-0000-000000000064', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C2-008-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000043', '10000000-0000-0000-0000-000000000001', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000044', '40000000-0000-0000-0000-000000000065', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C2-008-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000022', 'critical_thinking', 4.4, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000022', 'analytical_thinking', 4.2, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000022', 'logical_reasoning', 4.2, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000022', 'problem_solving', 4.5, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000022', 'innovative_thinking', 4.1, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000022', 'communication', 4.2, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000022', 'leadership', 3.7, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000022', 'digital_ai_literacy', 4.5, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000022', 'career_readiness', 4.2, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000022', 'domain_academic_competency', 4.5, 'mentor', 'Top academic standing in Artificial intelligence and data science');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000023', 'VRCF-C3-007', 'Shakilan R', 'shakilanr16@gmail.com', 3,
  'Artificial intelligence and Data Science', '2nd', 'Chennai Institute of Technology, Kanchipuram', 'Kanchipuram',
  'hosteller', '6385710907', '9047281762', 'South street, Chandrapadi',
  'Mayiladuthurai', '4 years', 'Per year',
  '3,10,000/ year', '2,35,000', '10000000-0000-0000-0000-000000000002', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000023', 890, 4, 2, 5, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000023', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000023', 'aim', 'Master core Artificial intelligence and Data Science fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000023', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000023', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000023', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000023', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000067', '30000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000068', '30000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000069', '30000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000045', '40000000-0000-0000-0000-000000000067', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C3-007-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000045', '10000000-0000-0000-0000-000000000002', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000046', '40000000-0000-0000-0000-000000000068', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C3-007-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000023', 'critical_thinking', 4.5, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000023', 'analytical_thinking', 4.4, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000023', 'logical_reasoning', 4.4, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000023', 'problem_solving', 4.6, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000023', 'innovative_thinking', 4.3, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000023', 'communication', 4.4, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000023', 'leadership', 3.9, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000023', 'digital_ai_literacy', 4.7, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000023', 'career_readiness', 4.4, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000023', 'domain_academic_competency', 4.7, 'mentor', 'Top academic standing in Artificial intelligence and Data Science');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000024', 'VRCF-C1-009', 'Surendhar v', 'surendharv2108@gmail.com', 1,
  'Cse', '2.0', 'Chennai Institute of Technology,kanchipuram', 'kanchipuram',
  'hosteller', '6379496300', '7824919707', 'Cuddalore,kattumanar koil',
  'Cuddalore', '4.0', 'Per year',
  '30,0000per year', '235000.0', '10000000-0000-0000-0000-000000000003', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000024', 125, 1, 3, 6, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000024', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000024', 'aim', 'Master core Cse fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000024', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000024', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000024', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000024', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000070', '30000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000071', '30000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000072', '30000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000047', '40000000-0000-0000-0000-000000000070', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-009-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000047', '10000000-0000-0000-0000-000000000003', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000048', '40000000-0000-0000-0000-000000000071', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-009-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000024', 'critical_thinking', 4.7, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000024', 'analytical_thinking', 4.6, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000024', 'logical_reasoning', 4.5, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000024', 'problem_solving', 4.8, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000024', 'innovative_thinking', 4.4, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000024', 'communication', 4.5, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000024', 'leadership', 4.0, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000024', 'digital_ai_literacy', 4.8, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000024', 'career_readiness', 4.5, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000024', 'domain_academic_competency', 4.8, 'mentor', 'Top academic standing in Cse');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000025', 'VRCF-C2-009', 'Raghul M', 'raghulmurugadoss6013@gmail.com', 2,
  'B.E Electronics and Communication Engineering', '2nd year', 'Chennai Institute of Technology, Kanchipuram', 'Kanchipuram',
  'hosteller', '9486037000', '9003786830', '5/33B, Pillaiyar Kovil Street, Periyathallapadi, Uthangarai, Krishnagiri - 635307.',
  'Krishnagiri', 'Four', 'Per year',
  'Per year(College fee + Hostel fee - 1,00,000), Per semester(Exam fee - around 7,000)', '-', '10000000-0000-0000-0000-000000000001', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000025', 160, 1, 4, 7, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000025', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000025', 'aim', 'Master core B.E Electronics and Communication Engineering fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000025', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000025', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000025', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000025', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000073', '30000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000074', '30000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000075', '30000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000049', '40000000-0000-0000-0000-000000000073', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C2-009-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000049', '10000000-0000-0000-0000-000000000001', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000050', '40000000-0000-0000-0000-000000000074', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C2-009-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000025', 'critical_thinking', 4.8, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000025', 'analytical_thinking', 4.0, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000025', 'logical_reasoning', 3.8, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000025', 'problem_solving', 4.3, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000025', 'innovative_thinking', 4.6, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000025', 'communication', 4.7, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000025', 'leadership', 4.2, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000025', 'digital_ai_literacy', 4.5, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000025', 'career_readiness', 3.8, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000025', 'domain_academic_competency', 4.4, 'mentor', 'Top academic standing in B.E Electronics and Communication Engineering');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000026', 'VRCF-C1-010', 'Ramya R', 'ramyaramasamy2006@gmail.com', 1,
  'BSMS (BACHELOR OF SIDDHA MEDICINE AND SURGERY)', '2nd profession', 'Sir Isaac Newton siddha medicle college and hospital, Nagapattinam', 'Nagapattinam',
  'hosteller', '8056642433', '9384372833', 'Throwpathi Amman Kovil Street vazhamangalam',
  'Nagapattinam', '5 and off years course', 'Per year',
  '2.5 lakh..per year', '35000.0', '10000000-0000-0000-0000-000000000002', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000026', 195, 1, 5, 8, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000026', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000026', 'aim', 'Master core BSMS (BACHELOR OF SIDDHA MEDICINE AND SURGERY) fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000026', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000026', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000026', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000026', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000076', '30000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000077', '30000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000078', '30000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000051', '40000000-0000-0000-0000-000000000076', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-010-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000051', '10000000-0000-0000-0000-000000000002', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000052', '40000000-0000-0000-0000-000000000077', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-010-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000026', 'critical_thinking', 4.2, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000026', 'analytical_thinking', 4.2, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000026', 'logical_reasoning', 3.9, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000026', 'problem_solving', 4.5, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000026', 'innovative_thinking', 3.9, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000026', 'communication', 4.1, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000026', 'leadership', 4.3, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000026', 'digital_ai_literacy', 4.7, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000026', 'career_readiness', 3.9, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000026', 'domain_academic_competency', 4.5, 'mentor', 'Top academic standing in BSMS (BACHELOR OF SIDDHA MEDICINE AND SURGERY)');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000027', 'VRCF-C2-010', 'Saruthi .S', 'saruthis0@gmail.com', 2,
  'BA LLB ( Hons)', '2 year', 'Tamil Nadu Dr.Ambedkar law University, Perungudi campus, Chennai - 600113', 'Chennai - 600113',
  'hosteller', '6385940273', '9943686968', '140, Attrangarai street, Aathur , VTC: serunallur, PO:Kuthuru,sub district:Kilvelur,District:Nagapattinam - 600115',
  'Nagapattinam', '5 years', 'Per semester',
  'My college semester fee is not paid by the Foundation. I receive a scholarship from my college, and I use the scholarship amount to pay my college fee. The Foundation pays only my hostel fee. I selected an option for this question only because it was marked as a mandatory question.', 'My monthly hostel fee will be within ₹5,500. For 11 months in an academic year, the total hostel fee will be ₹60,000.', '10000000-0000-0000-0000-000000000003', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000027', 230, 1, 6, 9, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000027', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000027', 'aim', 'Master core BA LLB ( Hons) fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000027', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000027', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000027', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000027', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000079', '30000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000080', '30000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000081', '30000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000053', '40000000-0000-0000-0000-000000000079', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C2-010-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000053', '10000000-0000-0000-0000-000000000003', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000054', '40000000-0000-0000-0000-000000000080', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C2-010-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000027', 'critical_thinking', 4.4, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000027', 'analytical_thinking', 4.4, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000027', 'logical_reasoning', 4.1, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000027', 'problem_solving', 4.6, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000027', 'innovative_thinking', 4.1, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000027', 'communication', 4.2, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000027', 'leadership', 4.5, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000027', 'digital_ai_literacy', 4.8, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000027', 'career_readiness', 4.1, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000027', 'domain_academic_competency', 4.7, 'mentor', 'Top academic standing in BA LLB ( Hons)');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000028', 'VRCF-C2-011', 'Aakash B', 'tsbaakash232008@gmail.com', 2,
  'B.E.CSE', '2.0', 'SSN college of engineering,chengalpattu', 'chengalpattu',
  'hosteller', '9159005008', '9943978597', '4/344,west street,thalaikkadu &post,thiruthuraipoondi tk,thiruvarur dt',
  'Thiruvarur', '4.0', 'Per year',
  '145000.0', '100000.0', '10000000-0000-0000-0000-000000000001', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000028', 265, 2, 7, 10, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000028', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000028', 'aim', 'Master core B.E.CSE fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000028', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000028', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000028', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000028', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000082', '30000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000083', '30000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000084', '30000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000055', '40000000-0000-0000-0000-000000000082', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C2-011-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000055', '10000000-0000-0000-0000-000000000001', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000056', '40000000-0000-0000-0000-000000000083', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C2-011-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000028', 'critical_thinking', 4.5, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000028', 'analytical_thinking', 4.6, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000028', 'logical_reasoning', 4.2, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000028', 'problem_solving', 4.8, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000028', 'innovative_thinking', 4.3, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000028', 'communication', 4.4, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000028', 'leadership', 4.7, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000028', 'digital_ai_literacy', 4.5, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000028', 'career_readiness', 4.2, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000028', 'domain_academic_competency', 4.8, 'mentor', 'Top academic standing in B.E.CSE');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000029', 'VRCF-C2-012', 'Janardhanan B', 'janardhananbalasubramani@gmail.com', 2,
  'B. Tech Rubber and Plastics Technology', '4.0', 'Madras Institute of Technology, Chrompet, Chengalpattu', 'Chengalpattu',
  'day_scholar', '7708364788', '8015775286', 'H132, Jubilee Residences, Moolakazhani, Guduvancheri, Chengalpattu - 603202',
  'Chengalpattu', '4.0', 'Per semester',
  '9200 / sem + Exam fees (varies)', '.', '10000000-0000-0000-0000-000000000002', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000029', 300, 2, 1, 4, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000029', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000029', 'aim', 'Master core B. Tech Rubber and Plastics Technology fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000029', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000029', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000029', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000029', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000085', '30000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000086', '30000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000087', '30000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000057', '40000000-0000-0000-0000-000000000085', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C2-012-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000057', '10000000-0000-0000-0000-000000000002', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000058', '40000000-0000-0000-0000-000000000086', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C2-012-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000029', 'critical_thinking', 4.7, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000029', 'analytical_thinking', 4.0, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000029', 'logical_reasoning', 4.4, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000029', 'problem_solving', 4.3, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000029', 'innovative_thinking', 4.4, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000029', 'communication', 4.5, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000029', 'leadership', 3.7, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000029', 'digital_ai_literacy', 4.7, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000029', 'career_readiness', 4.4, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000029', 'domain_academic_competency', 4.4, 'mentor', 'Top academic standing in B. Tech Rubber and Plastics Technology');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000030', 'VRCF-C1-011', 'Madhu', 'madhumadhu80041@gmail.com', 1,
  'B.E. Electronics and Communication Engineering', '3rd', 'University College of Engineering,(BIT) Campus,Anna University, Tiruchirapalli.', 'Tiruchirapalli.',
  'hosteller', '8072349097', '9791422919', '1/232-1 Neeravi meetu street, Puthiamputhur.',
  'Thoothukudi', '4.0', 'Per semester',
  '33850 per year', '47000.0', '10000000-0000-0000-0000-000000000003', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000030', 335, 2, 2, 5, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000030', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000030', 'aim', 'Master core B.E. Electronics and Communication Engineering fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000030', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000030', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000030', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000030', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000088', '30000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000089', '30000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000090', '30000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000059', '40000000-0000-0000-0000-000000000088', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-011-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000059', '10000000-0000-0000-0000-000000000003', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000060', '40000000-0000-0000-0000-000000000089', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-011-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000030', 'critical_thinking', 4.8, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000030', 'analytical_thinking', 4.2, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000030', 'logical_reasoning', 4.5, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000030', 'problem_solving', 4.5, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000030', 'innovative_thinking', 4.6, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000030', 'communication', 4.7, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000030', 'leadership', 3.9, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000030', 'digital_ai_literacy', 4.8, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000030', 'career_readiness', 4.5, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000030', 'domain_academic_competency', 4.5, 'mentor', 'Top academic standing in B.E. Electronics and Communication Engineering');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000031', 'VRCF-C1-012', 'Vijay', 'vijayv@student.tce.edu', 1,
  'B.Tech Computer Science and Business Systems', '3rd yr', 'Thiagarajar College of Engineering, Madurai', 'Madurai',
  'hosteller', '9025705291', '7904462232', 'Prathabaramapuram',
  'Nagapattinam', '4.0', 'Per year',
  '45675.0', '91000.0', '10000000-0000-0000-0000-000000000001', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000031', 370, 2, 3, 6, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000031', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000031', 'aim', 'Master core B.Tech Computer Science and Business Systems fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000031', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000031', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000031', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000031', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000091', '30000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000092', '30000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000093', '30000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000061', '40000000-0000-0000-0000-000000000091', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-012-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000061', '10000000-0000-0000-0000-000000000001', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000062', '40000000-0000-0000-0000-000000000092', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-012-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000031', 'critical_thinking', 4.2, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000031', 'analytical_thinking', 4.4, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000031', 'logical_reasoning', 3.8, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000031', 'problem_solving', 4.6, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000031', 'innovative_thinking', 3.9, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000031', 'communication', 4.1, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000031', 'leadership', 4.0, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000031', 'digital_ai_literacy', 4.5, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000031', 'career_readiness', 3.8, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000031', 'domain_academic_competency', 4.7, 'mentor', 'Top academic standing in B.Tech Computer Science and Business Systems');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000032', 'VRCF-C3-008', 'Keshavarthan K', 'kdkeshav0223@gmail.com', 3,
  'Computer Science and Engineering', 'II', 'Chennai Institute of Technology, Chennai', 'Chennai',
  'day_scholar', '9025318665', '8072413521', '17 D/7 Chetty Kulam NGO Nagar Pookadaichathiram',
  'Kanchipuram', '4.0', 'Per year',
  '70000.0', '-', '10000000-0000-0000-0000-000000000002', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000032', 405, 2, 4, 7, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000032', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000032', 'aim', 'Master core Computer Science and Engineering fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000032', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000032', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000032', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000032', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000094', '30000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000095', '30000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000096', '30000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000063', '40000000-0000-0000-0000-000000000094', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C3-008-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000063', '10000000-0000-0000-0000-000000000002', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000064', '40000000-0000-0000-0000-000000000095', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C3-008-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000032', 'critical_thinking', 4.4, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000032', 'analytical_thinking', 4.6, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000032', 'logical_reasoning', 3.9, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000032', 'problem_solving', 4.8, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000032', 'innovative_thinking', 4.1, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000032', 'communication', 4.2, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000032', 'leadership', 4.2, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000032', 'digital_ai_literacy', 4.7, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000032', 'career_readiness', 3.9, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000032', 'domain_academic_competency', 4.8, 'mentor', 'Top academic standing in Computer Science and Engineering');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000033', 'VRCF-C3-009', 'Monisha E', 'emonisha.cse2025@citchennai.net', 3,
  'CSE', '2.0', 'Chennai institute of technology -kancheepuram', 'Tiruvallur',
  'day_scholar', '9176868183', '9940135938', 'No 2/116 pudhunagar 4 th Street Redhills Chennai-52',
  'Tiruvallur', '4.0', 'Per year',
  '1,72,500', '-', '10000000-0000-0000-0000-000000000003', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000033', 440, 2, 5, 8, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000033', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000033', 'aim', 'Master core CSE fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000033', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000033', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000033', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000033', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000097', '30000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000098', '30000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000099', '30000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000065', '40000000-0000-0000-0000-000000000097', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C3-009-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000065', '10000000-0000-0000-0000-000000000003', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000066', '40000000-0000-0000-0000-000000000098', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C3-009-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000033', 'critical_thinking', 4.5, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000033', 'analytical_thinking', 4.0, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000033', 'logical_reasoning', 4.1, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000033', 'problem_solving', 4.3, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000033', 'innovative_thinking', 4.3, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000033', 'communication', 4.4, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000033', 'leadership', 4.3, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000033', 'digital_ai_literacy', 4.8, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000033', 'career_readiness', 4.1, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000033', 'domain_academic_competency', 4.4, 'mentor', 'Top academic standing in CSE');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000034', 'VRCF-C1-013', 'S.SELVALEKA', 'selvalekapandiyan16@gmail.com', 1,
  'Bsc.,(Hons) agriculture', '3rd', 'Dr.MSS AC&RI and thanjavur', 'Thanjavur',
  'hosteller', '8940846916', '9443972483', '556,west street, Okkanadu keelaiyur, Orathanadu, Thanjavur-614625',
  'Thanjavur', '4.0', 'Per semester',
  '23000.0', 'Approximately 4500 per month', '10000000-0000-0000-0000-000000000001', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000034', 475, 2, 6, 9, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000034', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000034', 'aim', 'Master core Bsc.,(Hons) agriculture fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000034', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000034', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000034', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000034', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000100', '30000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000101', '30000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000102', '30000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000067', '40000000-0000-0000-0000-000000000100', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-013-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000067', '10000000-0000-0000-0000-000000000001', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000068', '40000000-0000-0000-0000-000000000101', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-013-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000034', 'critical_thinking', 4.7, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000034', 'analytical_thinking', 4.2, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000034', 'logical_reasoning', 4.2, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000034', 'problem_solving', 4.5, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000034', 'innovative_thinking', 4.4, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000034', 'communication', 4.5, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000034', 'leadership', 4.5, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000034', 'digital_ai_literacy', 4.5, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000034', 'career_readiness', 4.2, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000034', 'domain_academic_competency', 4.5, 'mentor', 'Top academic standing in Bsc.,(Hons) agriculture');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000035', 'VRCF-C2-013', 'Suhail Akthar S M', 'suhailmobina95@gmail.com', 2,
  'B.Tech Information Technology & B.S in DS', '2nd year', 'Chennai Institute of Technology, Chennai', 'Chennai',
  'hosteller', '6374674139', '9344915680', 'No:4 Prasanthi nagar, Koothapakkam, Cuddalore - 2',
  'Cuddalore - 607002', '4.0', 'Per year',
  '110000.0', '110000 (tuition + hostel)', '10000000-0000-0000-0000-000000000002', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000035', 510, 3, 7, 10, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000035', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000035', 'aim', 'Master core B.Tech Information Technology & B.S in DS fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000035', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000035', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000035', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000035', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000103', '30000000-0000-0000-0000-000000000035', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000104', '30000000-0000-0000-0000-000000000035', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000105', '30000000-0000-0000-0000-000000000035', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000069', '40000000-0000-0000-0000-000000000103', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C2-013-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000069', '10000000-0000-0000-0000-000000000002', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000070', '40000000-0000-0000-0000-000000000104', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C2-013-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000035', 'critical_thinking', 4.8, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000035', 'analytical_thinking', 4.4, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000035', 'logical_reasoning', 4.4, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000035', 'problem_solving', 4.6, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000035', 'innovative_thinking', 4.6, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000035', 'communication', 4.7, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000035', 'leadership', 4.7, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000035', 'digital_ai_literacy', 4.7, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000035', 'career_readiness', 4.4, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000035', 'domain_academic_competency', 4.7, 'mentor', 'Top academic standing in B.Tech Information Technology & B.S in DS');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000036', 'VRCF-C3-010', 'NITHIYA SRI G', '25ad105@rmkcet.ac.in', 3,
  'BE CSE(AI)', 'II', 'R.M.K COLLEGE OF ENGINEERING AND TECHNOLOGY THIRUVALLUR', 'Theni',
  'hosteller', '6369256080', '8124643933', '45/3, Mela street, Nagalapuram, Theni district - 625534',
  'Theni', '4 years', 'Per year',
  'NA', 'NA', '10000000-0000-0000-0000-000000000003', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000036', 545, 3, 1, 4, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000036', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000036', 'aim', 'Master core BE CSE(AI) fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000036', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000036', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000036', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000036', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000106', '30000000-0000-0000-0000-000000000036', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000107', '30000000-0000-0000-0000-000000000036', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000108', '30000000-0000-0000-0000-000000000036', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000071', '40000000-0000-0000-0000-000000000106', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C3-010-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000071', '10000000-0000-0000-0000-000000000003', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000072', '40000000-0000-0000-0000-000000000107', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C3-010-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000036', 'critical_thinking', 4.2, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000036', 'analytical_thinking', 4.6, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000036', 'logical_reasoning', 4.5, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000036', 'problem_solving', 4.8, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000036', 'innovative_thinking', 3.9, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000036', 'communication', 4.1, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000036', 'leadership', 3.7, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000036', 'digital_ai_literacy', 4.8, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000036', 'career_readiness', 4.5, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000036', 'domain_academic_competency', 4.8, 'mentor', 'Top academic standing in BE CSE(AI)');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000037', 'VRCF-C1-014', 'Ashvini', 'ashvini16102005@gmail.com', 1,
  'MBBS', '2nd year', 'Kilpauk medical College Chennai', 'Namakkal',
  'hosteller', '8190049510', '7402449510', '2/24 Aramathapalayam, Rasipuram - 637505',
  'Namakkal', '5.5 years', 'Per year',
  '3510.0', 'Mess fees per month', '10000000-0000-0000-0000-000000000001', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000037', 580, 3, 2, 5, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000037', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000037', 'aim', 'Master core MBBS fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000037', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000037', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000037', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000037', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000109', '30000000-0000-0000-0000-000000000037', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000110', '30000000-0000-0000-0000-000000000037', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000111', '30000000-0000-0000-0000-000000000037', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000073', '40000000-0000-0000-0000-000000000109', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-014-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000073', '10000000-0000-0000-0000-000000000001', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000074', '40000000-0000-0000-0000-000000000110', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-014-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000037', 'critical_thinking', 4.4, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000037', 'analytical_thinking', 4.0, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000037', 'logical_reasoning', 3.8, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000037', 'problem_solving', 4.3, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000037', 'innovative_thinking', 4.1, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000037', 'communication', 4.2, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000037', 'leadership', 3.9, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000037', 'digital_ai_literacy', 4.5, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000037', 'career_readiness', 3.8, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000037', 'domain_academic_competency', 4.4, 'mentor', 'Top academic standing in MBBS');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000038', 'VRCF-C2-014', 'Johnveshlin', 'johnvesleen1010@gmail.com', 2,
  'Bsc.Operation Theatre and Anesthesia Technology', '2025-2029', 'Government Thiruvarur medical college. Thiruvarur', 'Nagapattinam',
  'day_scholar', '7550340776', '9786873331', '160,perumal mela veethi velipalayam  nagapattinam.',
  'Nagapattinam', '3year+1year internship', 'Per year',
  'Per year- ₹10000', 'Bus fee per year- ₹18000', '10000000-0000-0000-0000-000000000002', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000038', 615, 3, 3, 6, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000038', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000038', 'aim', 'Master core Bsc.Operation Theatre and Anesthesia Technology fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000038', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000038', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000038', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000038', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000112', '30000000-0000-0000-0000-000000000038', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000113', '30000000-0000-0000-0000-000000000038', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000114', '30000000-0000-0000-0000-000000000038', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000075', '40000000-0000-0000-0000-000000000112', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C2-014-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000075', '10000000-0000-0000-0000-000000000002', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000076', '40000000-0000-0000-0000-000000000113', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C2-014-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000038', 'critical_thinking', 4.5, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000038', 'analytical_thinking', 4.2, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000038', 'logical_reasoning', 3.9, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000038', 'problem_solving', 4.5, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000038', 'innovative_thinking', 4.3, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000038', 'communication', 4.4, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000038', 'leadership', 4.0, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000038', 'digital_ai_literacy', 4.7, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000038', 'career_readiness', 3.9, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000038', 'domain_academic_competency', 4.5, 'mentor', 'Top academic standing in Bsc.Operation Theatre and Anesthesia Technology');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000039', 'VRCF-C1-015', 'Dhineshkumar R', 'dhineshrp2007@gmail.com', 1,
  'B. Com', '3 yeae (Final year )', 'Sri Amaraavathi college of arts and science, Karur', 'Karur',
  'day_scholar', '9677305679', '9751875679', 'Palvarpatty, Jagadhabi post, Karur District',
  'Karur', '3 years', 'Per semester',
  'Per Semester 12000', 'NO', '10000000-0000-0000-0000-000000000003', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000039', 650, 3, 4, 7, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000039', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000039', 'aim', 'Master core B. Com fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000039', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000039', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000039', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000039', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000115', '30000000-0000-0000-0000-000000000039', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000116', '30000000-0000-0000-0000-000000000039', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000117', '30000000-0000-0000-0000-000000000039', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000077', '40000000-0000-0000-0000-000000000115', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-015-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000077', '10000000-0000-0000-0000-000000000003', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000078', '40000000-0000-0000-0000-000000000116', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-015-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000039', 'critical_thinking', 4.7, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000039', 'analytical_thinking', 4.4, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000039', 'logical_reasoning', 4.1, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000039', 'problem_solving', 4.6, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000039', 'innovative_thinking', 4.4, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000039', 'communication', 4.5, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000039', 'leadership', 4.2, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000039', 'digital_ai_literacy', 4.8, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000039', 'career_readiness', 4.1, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000039', 'domain_academic_competency', 4.7, 'mentor', 'Top academic standing in B. Com');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000040', 'VRCF-C3-011', 'Ramprasath B', 'ramprasathb99@gmail.com', 3,
  'Electronics and Instrumentation Engineering', '2.0', 'Madras Institute of Technology, Chrompet, Chengalpattu district', 'Chengalpattu district',
  'day_scholar', '8682851050', '9841376122', '54/72, Rani Homes, Good Shed Road 2nd street, Adambakkam, Chennai - 600088',
  'Kancheepuram', '4.0', 'Per semester',
  '0.0', '0.0', '10000000-0000-0000-0000-000000000001', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000040', 685, 3, 5, 8, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000040', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000040', 'aim', 'Master core Electronics and Instrumentation Engineering fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000040', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000040', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000040', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000040', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000118', '30000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000119', '30000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000120', '30000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000079', '40000000-0000-0000-0000-000000000118', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C3-011-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000079', '10000000-0000-0000-0000-000000000001', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000080', '40000000-0000-0000-0000-000000000119', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C3-011-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000040', 'critical_thinking', 4.8, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000040', 'analytical_thinking', 4.6, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000040', 'logical_reasoning', 4.2, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000040', 'problem_solving', 4.8, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000040', 'innovative_thinking', 4.6, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000040', 'communication', 4.7, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000040', 'leadership', 4.3, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000040', 'digital_ai_literacy', 4.5, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000040', 'career_readiness', 4.2, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000040', 'domain_academic_competency', 4.8, 'mentor', 'Top academic standing in Electronics and Instrumentation Engineering');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000041', 'VRCF-C3-012', 'Jannathur Raabiya', 'jannathurraabiya311007@gmail.com', 3,
  'Computer science and engineering', 'second', 'Chennai Institute of Technology, chennai', 'chennai',
  'day_scholar', '7358474563', '8248239287', '26, Purasaiwalkam High road Purasaiwalkam Chennai 600007',
  'Chennai', '4.0', 'Per year',
  '1,40,000', '-', '10000000-0000-0000-0000-000000000002', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000041', 720, 3, 6, 9, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000041', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000041', 'aim', 'Master core Computer science and engineering fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000041', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000041', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000041', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000041', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000121', '30000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000122', '30000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000123', '30000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000081', '40000000-0000-0000-0000-000000000121', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C3-012-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000081', '10000000-0000-0000-0000-000000000002', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000082', '40000000-0000-0000-0000-000000000122', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C3-012-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000041', 'critical_thinking', 4.2, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000041', 'analytical_thinking', 4.0, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000041', 'logical_reasoning', 4.4, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000041', 'problem_solving', 4.3, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000041', 'innovative_thinking', 3.9, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000041', 'communication', 4.1, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000041', 'leadership', 4.5, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000041', 'digital_ai_literacy', 4.7, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000041', 'career_readiness', 4.4, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000041', 'domain_academic_competency', 4.4, 'mentor', 'Top academic standing in Computer science and engineering');

insert into public.students (
  id, vrcf_id, name, email, cohort, course_name, year_of_study, college, college_district,
  residence_type, phone, parent_phone, home_address, home_district, total_academic_years,
  tuition_fee_term, tuition_fee_amount, hostel_fee, primary_mentor_id, status
) values (
  '30000000-0000-0000-0000-000000000042', 'VRCF-C1-016', 'Mukilvendan P', 'mukilvendan7@gmail.com', 1,
  'BE-CSE', '3rd year', 'Government College of Technology, Coimbatore', 'Coimbatore',
  'hosteller', '7598257430', '9751766493', '3/182,Arunthathiyar Street, Palayapalayam, Namakkal -637405',
  'Namakkal', '4.0', 'Per year',
  'Year', '7500.0', '10000000-0000-0000-0000-000000000003', 'active'
) on conflict (vrcf_id) do update set
  name = excluded.name,
  email = excluded.email;


insert into public.gamification (student_id, xp, level, current_streak, longest_streak, badges)
values ('30000000-0000-0000-0000-000000000042', 755, 4, 7, 10, '["first_goal", "deep_thinker", "task_champion"]'::jsonb)
on conflict (student_id) do nothing;


insert into public.vision_boards (student_id, image_url)
values ('30000000-0000-0000-0000-000000000042', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')
on conflict (student_id) do nothing;

insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000042', 'aim', 'Master core BE-CSE fundamentals and graduate in top 5%', 'Focus on solid conceptual foundations and applied laboratory work.', '2026-06-30', 65);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000042', 'vision_statement', 'Become a visionary leader contributing technological and social innovation in Tamil Nadu', 'Empower local community through education and sustainable entrepreneurship.', '2028-12-31', 40);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000042', 'short_term', 'Complete advanced certifications in AI and data analysis', 'Finish 2 Coursera/NPTEL courses before end of semester.', '2026-11-30', 80);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000042', 'long_term', 'Secure a top tier software engineer or financial analyst placement', 'Prepare resume, conduct mock interviews with VRCF mentors.', '2027-05-15', 50);
insert into public.goals (student_id, kind, title, description, target_date, progress) values ('30000000-0000-0000-0000-000000000042', 'career_goal', 'Lead technical and operational projects in top companies', 'Gain deep industry experience then mentor junior students.', '2029-01-01', 30);

insert into public.tasks (id, student_id, created_by, created_by_role, title, details, due_date, focus_competencies, status) values
  ('40000000-0000-0000-0000-000000000124', '30000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000002', 'mentor', 'First Principles Analysis of College Curriculum', 'Deconstruct one complex chapter in your main subject into its irreducible truths and synthesize real-life case applications.', now() - interval '5 days', ARRAY['critical_thinking', 'analytical_thinking'], 'reviewed'),
  ('40000000-0000-0000-0000-000000000125', '30000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000002', 'mentor', 'Design Community Problem-Solving Proposal', 'Identify one pressing logistics or sustainability issue on your campus or hometown and outline a 3-step action plan.', now() + interval '3 days', ARRAY['problem_solving', 'innovative_thinking'], 'submitted'),
  ('40000000-0000-0000-0000-000000000126', '30000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000002', 'mentor', 'Professional Communication & Elevator Pitch', 'Record or write a concise 90-second introduction highlighting your strengths, career vision, and leadership contribution.', now() + interval '10 days', ARRAY['communication', 'career_readiness'], 'assigned');


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000083', '40000000-0000-0000-0000-000000000124', 'Completed rigorous breakdown of the subject fundamentals with diagrammatic notes.', 'This assignment helped me understand why assumptions must be challenged rather than blindly memorized.', 'https://example.com/vrcf-assignments/VRCF-C1-016-first-principles.pdf', now() - interval '4 days');

insert into public.reviews (submission_id, mentor_id, feedback, grade, rating, competency_ratings) values
  ('50000000-0000-0000-0000-000000000083', '10000000-0000-0000-0000-000000000003', 'Outstanding depth of analysis and very clear articulation of fundamental principles. Keep up this disciplined inquiry!', 'A+', 5, '{"critical_thinking": 4.8, "analytical_thinking": 4.7}'::jsonb);


insert into public.submissions (id, task_id, remarks, reflection, attachment_url, submitted_at) values
  ('50000000-0000-0000-0000-000000000084', '40000000-0000-0000-0000-000000000125', 'Detailed 4-page proposal addressing campus water distribution inefficiencies during peak college hours.', 'I surveyed 35 fellow students to gather empirical data before writing the recommendation.', 'https://example.com/vrcf-assignments/VRCF-C1-016-problem-solving.pdf', now() - interval '1 day');

insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000042', 'critical_thinking', 4.4, 'mentor', 'Demonstrated structured reasoning in first-principles course assignment');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000042', 'analytical_thinking', 4.2, 'mentor', 'Solid breakdown of curriculum modules and empirical student survey data');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000042', 'logical_reasoning', 4.5, 'ai', 'Evaluated based on consistent deduction and logic in AI mentor sessions');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000042', 'problem_solving', 4.5, 'mentor', 'Action-oriented proposal tackling real campus infrastructure problems');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000042', 'innovative_thinking', 4.1, 'ai', 'Creative synthesis of technological and social intervention models');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000042', 'communication', 4.2, 'mentor', 'Articulate, respectful, and transparent communication across tasks');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000042', 'leadership', 4.7, 'mentor', 'Initiative in coordinating student group input and campus survey');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000042', 'digital_ai_literacy', 4.8, 'ai', 'Proficient utilization of computational tools and prompt techniques');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000042', 'career_readiness', 4.5, 'mentor', 'Strong career clarity with documented resume and interview preparation roadmap');
insert into public.competency_scores (student_id, competency, score, source, evidence) values ('30000000-0000-0000-0000-000000000042', 'domain_academic_competency', 4.5, 'mentor', 'Top academic standing in BE-CSE');
COMMIT;