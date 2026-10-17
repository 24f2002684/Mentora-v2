# Mentora — VRCF Mentorship & Leadership Development Platform

<div align="center">
  <img src="public/brand/mentora-logo.png" alt="Mentora Logo" width="100" />
  <p><strong>Mobile-First Progressive Web Application for the Vasumathi Ramaswami Centenary Foundation (VRCF)</strong></p>
  <p>Empowering 50–100 college scholars with personalized mentorship, first-principles leadership development, and foundation governance.</p>
</div>

---

## 🌟 Overview & Purpose

**Mentora** is the official leadership and mentorship platform built for the **Vasumathi Ramaswami Centenary Foundation (VRCF)**. It bridges funded college scholars across Tamil Nadu with seasoned mentors and foundation trustees to track academic progression, cultivate first-principles critical reasoning, evaluate developmental submissions, and provide executive governance oversight.

### Key Pillars
1. **Student Core**: Goal setting, 5-year vision boards, reflective milestone submissions (+50 XP), gamification streaks, and offline study access.
2. **Socratic AI Mentor**: 24/7 guided reasoning powered by the official **Google Gemini 3.8 Flash** (`@google/genai`) SDK with streaming dialogues, daily token quotas, and non-diagnostic welfare safety screening.
3. **Mentor Review Workspace**: Dual-pane assignment review, rubric grading (`A+`), 1–5 star ratings, and 1-click **"Analyze with AI"** rubric pre-evaluation.
4. **Foundation Governance & Analytics**: Real-time Recharts dashboards for trustees, cohort competency heatmaps, mentor turnaround tracking (1.2 days avg), and direct scholar encouragement dispatches.
5. **Admin Management Suite**: 42 scholar roster loaded from `Student_DB.xlsx`, 1-click CSV export, team workload capacity management, 10 core competencies rubric manager, and an immutable DPDP Act 2023 audit log.

---

## 🎯 The 10 Core VRCF Competencies

Every task, evaluation, AI challenge, and report in Mentora evaluates scholars across 10 foundational competencies:

| # | Competency Key | Description |
|---|---|---|
| 1 | `critical_thinking` | Questioning assumptions, identifying biases, and evaluating arguments objectively. |
| 2 | `analytical_thinking` | Breaking down complex information, analyzing patterns, and data-driven evaluation. |
| 3 | `logical_reasoning` | Structured deductive and inductive reasoning to draw sound conclusions. |
| 4 | `problem_solving` | Identifying core issues, designing pragmatic interventions, and executing solutions. |
| 5 | `innovative_thinking` | Creative lateral ideation, synthesizing novel approaches, and challenging orthodoxies. |
| 6 | `communication` | Clear written, verbal, and visual articulation of ideas to diverse audiences. |
| 7 | `leadership` | Inspiring teams, demonstrating personal integrity, and driving collaborative impact. |
| 8 | `digital_ai_literacy` | Effective and ethical use of modern digital tools, software, and AI technologies. |
| 9 | `career_readiness` | Professionalism, resume depth, interview readiness, and workplace adaptability. |
| 10 | `domain_academic_competency` | Mastery of core undergraduate curriculum, technical subjects, and applied projects. |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router, Turbopack, and TypeScript Strict Mode.
- **Styling**: Tailwind CSS v4 with bespoke Mentora Design Tokens (Deep Teal `#0D9488`, Slate Dark `#0B1416`, Mint Light `#F6FAF9`, 20px card radii, pill buttons, touch targets $\ge 44$px).
- **AI Engine**: Official Google GenAI SDK (`@google/genai`) configured for `gemini-3.8-flash` via server route handlers with automatic exponential backoff retries.
- **Database & Security**: Supabase PostgreSQL schema with **Row Level Security (RLS)** active on all 22 tables.
- **Dossier & Reports**: `@react-pdf/renderer` server-rendered branded scholar progress dossier (`/api/reports/student/[id]`).
- **Data Visualizations**: [Recharts](https://recharts.org) (Grouped Bar Charts, Area Charts, Donut Turnaround SLA distributions).
- **Gamification**: Interactive Level 2 progression, 5-day learning streak with Streak Freeze toggle, and Milestone Badges.
- **PWA & Offline**: Installable Web App Manifest (`manifest.json`), service worker caching (`public/sw.js`), and dedicated offline fallback toolkit (`/offline`).

---

## 👥 Personas & Demo Accounts

Mentora includes a floating **Demo Role Switcher** (bottom-right) enabling instant preview of all four roles:

### 1. Student Scholar (`Lakshana S`)
- **Route**: `/student`
- **Features**: Academic fee overview, 5-year vision board, self-task creation with Gemini next-step generator, reflective milestone submission, Socratic AI Mentor streaming chat, gamification center, and offline toolkit.

### 2. Lead Mentor (`Ramkumar SKR` — `ramkumar.skr01@gmail.com`)
- **Route**: `/mentor`
- **Features**: Directory of all 42 scholars, scholar detail dossier with downloadable PDF, assignment review queue with "Analyze with AI" rubric pre-population, non-diagnostic welfare alerts, and mentor profile editing.

### 3. Managing Trustee (`Smt. Shanthi Ramaswami`)
- **Route**: `/trustee`
- **Features**: Foundation governance overview, Recharts analytics (cohort comparisons, review turnaround SLA), and direct scholar encouragement dispatch modal that delivers in-app notifications.

### 4. Admin Owner (`Suhail Akthar` — `suhailmobina95@gmail.com`)
- **Route**: `/admin`
- **Features**: Complete scholar roster management with 1-click CSV export, inline record editor, mentor capacity & workload bars, 10 competencies rubric editor, and DPDP Act 2023 compliance audit log.

---

## 📱 Progressive Web Application (PWA) & Offline Mode

Mentora is designed mobile-first and installs natively on iOS, Android, and Desktop:
- **Web App Manifest**: Configured at [`public/manifest.json`](public/manifest.json) with standalone display mode, orientation lock, and brand icon assets.
- **Service Worker**: Configured at [`public/sw.js`](public/sw.js) with cache-first strategy for static assets and network-first strategy for dynamic pages.
- **Offline Fallback ([`/offline`](src/app/offline/page.tsx))**: Automatically activates when internet connection drops:
  - First-Principles Socratic Checklist (Deconstruct, Rebuild, Test Under Scarcity).
  - 10 Core Competencies quick memory revision cards.
  - Emergency VRCF Student Welfare Helpline (+91 94432 10987).

---

## 🔒 Security & Data Privacy (DPDP Act 2023)

- **Row Level Security (RLS)**: Enforced across all 22 database tables in PostgreSQL.
- **Student Privacy & Consent**: Explicit parental and scholar data consent modal compliant with India's *Digital Personal Data Protection (DPDP) Act 2023*.
- **Welfare Safeguards**: Non-diagnostic early support triage for academic fatigue and stress without formal stigmatization.
- **Tamper-Evident Audit Trail**: Every sensitive record change, status update, and trustee dispatch is logged to [`public.audit_log`](src/app/admin/audit/page.tsx).

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### 1. Clone & Install
```bash
git clone https://github.com/24f2002684/Mentora-v2.git
cd Mentora-v2
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```bash
GEMINI_API_KEY=your_google_gemini_api_key_here
GEMINI_MODEL=gemini-3.8-flash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build Production Bundle
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
Mentora-v2/
├── Data/
│   ├── Student_DB.xlsx             # Source Excel database (42 scholars)
│   └── students_seed.json          # Normalized JSON seed dataset
├── public/
│   ├── brand/                      # Mentora logos and emblems
│   ├── manifest.json               # PWA Web App Manifest
│   └── sw.js                       # PWA Service Worker caching script
├── src/
│   ├── app/
│   │   ├── admin/                  # Admin overview, students, team, content, audit
│   │   ├── api/                    # Server route handlers (Gemini AI, PDF, etc.)
│   │   ├── mentor/                 # Mentor directory, review, alerts, profile
│   │   ├── offline/                # PWA offline fallback & study toolkit
│   │   ├── student/                # Scholar dashboard, goals, tasks, AI chat, progress
│   │   ├── trustee/                # Trustee governance, analytics, scholar feedback
│   │   ├── globals.css             # Tailwind v4 theme tokens & styles
│   │   └── layout.tsx              # Root shell with PWA banner & ThemeProvider
│   ├── components/
│   │   ├── demo-role-switcher.tsx  # Persona preview switcher
│   │   ├── notification-dropdown.tsx # Universal notification bell
│   │   ├── pwa-banner.tsx          # Install prompt & offline detector
│   │   └── theme-toggle.tsx        # Dark / Light mode toggle
│   └── lib/
│       ├── ai/                     # Google GenAI provider & Socratic prompts
│       ├── auth/                   # Mock auth context & role persistence
│       ├── mock/                   # In-memory reactive singleton store (42 scholars)
│       └── types/                  # TypeScript database & competency definitions
└── supabase/
    ├── migrations/                 # PostgreSQL migration (22 tables with RLS)
    └── seed.sql                    # SQL seed script
```

---

## 🏛️ Foundation Governance & Contact

**Vasumathi Ramaswami Centenary Foundation (VRCF)**  
- **Lead Mentor**: Ramkumar SKR (`ramkumar.skr01@gmail.com`)  
- **Managing Trustee**: Smt. Shanthi Ramaswami  
- **Platform Owner**: Suhail Akthar (`suhailmobina95@gmail.com`)  

*Mentora is engineered for scalable student empowerment, academic rigor, and compassionate leadership.*
