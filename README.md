# Runam — AI-Powered Task Management

**Organize First. Execute Faster.**

Runam is a production-deployed SaaS platform built around a **Folder-First** workflow — combining structured task management, team collaboration, and AI-powered meeting transcription into one system.

🔗 **[Live App](https://runam-app-kappa.vercel.app)** · **[Landing Page](https://runam-effortless.vercel.app)**

---

## What It Does

Most task apps let you dump tasks anywhere. Runam forces structure first — you must create a folder before you can create a task, so work is always organised before it starts.

The workspace has a global dashboard giving you an overview of all activity and progress across the app. Folders are the core unit — each folder holds its own tasks and subtasks. Notes live separately in the sidebar as a standalone space for documentation and ideas. Meetings work differently: you schedule a meeting and Runam automatically creates a dedicated folder for it, then transcribes, summarises, and extracts action items from the recording — keeping meeting output tied to the work it belongs to.

The result is organised work that scales without becoming chaos.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend (App) | React · TypeScript · Tailwind CSS · Vite |
| Frontend (Landing) | Next.js |
| Backend | Node.js · Supabase (PostgreSQL) |
| Auth | Supabase Auth (Email + Google OAuth) |
| AI | Google AI Studio — Gemini API |
| Email | Resend API |
| Deployment | Vercel |
| Version Control | Git · GitHub |

---

## Core Features

### Folder-First System
Every task belongs to a folder. Every folder contains teams, tasks, subtasks, notes, meetings, and a progress dashboard — keeping all related work in one place instead of scattered across a flat list.

### Task Management
- Create tasks and subtasks with priorities, start dates, and due dates
- Auto-completion: parent tasks complete when all subtasks finish
- Visual progress tracking per folder
- Status updates and deadline tracking

### AI Meeting Assistant
1. Schedule a meeting — Runam automatically creates a dedicated folder for it
2. Record the meeting audio directly in the app
3. Gemini API transcribes the audio to text
4. AI generates a structured summary with key points and action items
5. Export the meeting summary as a PDF
6. Share the meeting summary directly to a team

> AI is used only where it adds measurable value. All task management, auth, collaboration, and data logic is built with traditional software engineering.

### Notes
- Standalone notes space accessible from the sidebar — not tied to individual folders
- Rich text editor for documentation, research, and ideas
- Export any note as a PDF

### Authentication
- Email/password signup with email verification
- Google OAuth
- Protected routes and persistent sessions
- Powered by Supabase Auth

### Team Collaboration
- Personal and Team workspaces
- Role-based access control: Owner · Editor · Viewer
- Shared folders with multi-user collaboration

**Two invite systems:**

1. **Invite Link** — the team owner or admin generates a shareable link. When someone uses the link to request access, the owner receives a notification on the notifications page to approve or decline them before they join the team
2. **Email Invite (Resend API)** — the owner sends a direct invite to a specific email address. The recipient gets an email notification and chooses to accept or decline the invitation

### Subscription System
- Free and Premium tiers with enforced plan limits
- Upgrade flow and plan-based access control built in
- Payment integration not yet connected (coming in v2.0)

| Limit | Free | Premium |
|---|---|---|
| Folders | 10 | 30 |
| Teams | 2 | 5 |
| Tasks per folder | 5 | 10 |
| Subtasks per task | 3 | 8 |
| AI recordings/day | 3 | Unlimited |

---

## System Architecture

```
Workspace
├── Dashboard (global progress overview)
├── Notes (sidebar — standalone, not tied to folders)
│   └── Export as PDF
├── Folder
│   ├── Tasks
│   │   └── Subtasks
├── Team (members + roles)
│   └── Folder
│       ├── Tasks
│       │   └── Subtasks
└── Meeting (scheduled)
    └── Auto-created Folder
        ├── Transcript (AI-generated)
        ├── Summary (AI-generated)
        │   ├── Export as PDF
        │   └── Share to Team
        └── Action Items (AI-extracted)
```

Runam uses a two-layer architecture:

- **Traditional software layer** — auth, database, task/folder structure, permissions, team collaboration, subscription logic
- **AI layer** — meeting transcription, summarization, action item extraction

---

## What I Built and Learned

Runam is my first solo SaaS project, built entirely independently. Real engineering problems I had to solve:

- **State management** — designing a scalable Context API + hooks architecture across deeply nested components
- **Database schema** — modelling relationships between users, folders, teams, tasks, subtasks, and meetings in PostgreSQL
- **Auth flow** — customising Supabase's email confirmation flow including branded emails
- **Deployment** — managing environment variables across Vercel and Supabase, understanding how backend and frontend hosting operate independently
- **Git workflow** — branch management, feature merging, preventing `.env` exposure
- **Build tooling** — resolving Vite plugin conflicts and configuration issues

> Runam was not built with a no-code tool or by prompting AI to write all the code. AI tools (ChatGPT, Claude, Lovable) were used for assistance — the architecture, decisions, debugging, and implementation are my own work.

---

## Roadmap

**v2.0** — Upgrade AI provider to OpenAI · Move toward AI-automated task creation from meetings

**v3.0** — Mobile app (React Native)

**Longer term** — Calendar integration · Advanced analytics · AI productivity recommendations · Real-time collaboration · Automated workflow suggestions

---
## Local Setup

```bash
# Clone the repo
git clone https://github.com/Sisobyte/daily-flow.git
cd runam

# Install dependencies
npm install

# Add environment variables
cp .env
# Only two variables needed:
# VITE_SUPABASE_URL
# VITE_SUPABASE_ANON_KEY
```
 
> **Security note:** Gemini API and Resend API keys are never exposed to the frontend. They are stored as Supabase secrets and called exclusively through Supabase Edge Functions server-side. The only client-side environment variables are the Supabase URL and anon key, which are safe for frontend use by design.
 
```bash
# Start dev server
npm run dev
```

---

## Contact

Built by **Kosisochukwu Clinton Ejiogu**
📧 ejiogukosisochukwu@gmail.com
🌐 [Portfolio](https://sisobytewebdev.netlify.app)
