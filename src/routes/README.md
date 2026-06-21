

# Runam

**AI-Powered Task Management for Individuals and Teams**

*Web Version 1.0.0*

Runam is a structured task management platform built around a **Folder-First workflow system**, featuring **AI-powered meeting transcription** and **smart summaries** to help individuals and teams stay organized and focused on what matters.

Unlike traditional task management tools that focus only on creating tasks, Runam is designed around structured organization, intelligent collaboration, and automation.

---

## Overview

Managing work across teams often becomes chaotic when tasks, meetings, notes, and projects are scattered across multiple tools.

Runam solves this by combining:

* Structured, folder-first task management
* Team collaboration
* AI meeting transcription
* AI-generated meeting summaries
* Smart productivity workflows

The goal of Runam is simple: **help teams stay organized while letting AI handle repetitive cognitive work.**

---

## Core Structure (System Design)

Runam is built around a clear hierarchy:

**1. Folder** — the top-level unit of organization. Inside each folder:

* **Teams** — collaborators working within the folder
* **Notes** — supporting notes and context
* **Tasks / Subtasks** — the actual work items
* **Dashboard** — an overview of activity within the folder
* **Meetings** — recorded or uploaded meetings tied to the folder

This Folder-First approach keeps related teams, notes, tasks, and meetings together instead of scattering them across a flat task list.

---

## Core Features

### 1. Folder-First Workflow System

Instead of creating tasks in isolation, Runam organizes everything under folders — keeping teams, notes, tasks, meetings, and an overview dashboard in one structured place.

### 2. Task Management Engine

Users can:

* Create tasks and subtasks
* Update task status
* Set priorities
* Track progress and deadlines
* Organize team responsibilities

### 3. AI Meeting Assistant

Users can record or upload a voice note / meeting audio. The AI then:

* Transcribes audio to text
* Processes the transcript for context
* Extracts key discussion points

This removes the need for manual note-taking during meetings.

### 4. AI Smart Summaries

After transcription, AI automatically generates:

* Meeting summaries
* Key points
* Possible action items

Instead of reading long transcripts, users get structured summaries instantly.

Runam uses **Google AI Studio (Gemini API)** for transcription and summary generation.

### 5. Authentication System

Secure authentication flow including:

* Email/password sign-up
* Email verification
* User login sessions
* Protected routes
* Session persistence

Authentication is powered by **Supabase**.

### 6. Team Collaboration

* Shared workspaces
* Invite-link system for adding team members (via **Resend API** for email invites)
* Multi-user collaboration
* Team-based task management
* Generate invite Link 

### 7. Subscription / Upgrade System

Built-in upgrade logic for premium features, including an upgrade dialog and plan-based access control. *(Payment integration is not yet implemented.)*

---

## Plans & Limits (v1.0.0)

| Limit | Free | Premium |
|---|---|---|
| Folders | 10 | 30 |
| Teams | 2 | 5 |
| Tasks per folder | 5 | 10 |
| Subtasks per task | 3 | 8 |
| AI recordings per day | 3 | Unlimited |

> **Payments:** Runam does not yet have payment integration. Plan limits are enforced, but billing is not connected.

---

## Why Runam Uses AI

Runam is **not an AI-generated task manager.** The core application is built using traditional software engineering principles, and AI is introduced only where it adds real value:

* Meeting transcription
* Understanding meeting context
* Generating summaries
* Reducing manual cognitive work

Task creation, folder management, team collaboration, and backend logic are all built using traditional engineering.

**Build traditional software first. Add AI only where intelligence improves user experience.**

---

## Tech Stack

### Frontend (App)
* React
* TypeScript
* Tailwind CSS
* Vite

### Frontend (Landing Page)
* Next.js *(separate project/file)*

### Backend
* Node.js
* Supabase (PostgreSQL)

### Authentication
* Supabase Auth

### AI Integration
* Google AI Studio — Gemini API (meeting transcription & summarization)

### Email
* Resend API (team invite emails)

### Deployment
* Vercel

### Development Tools
* Git & GitHub
* Environment variable management
* Branch-based development workflow

---

## Architecture Philosophy

Runam follows a layered architecture:

**Traditional Software Layer** — handles authentication, database management, task/folder structure, user permissions, team collaboration, and subscription logic.

**AI Layer** — handles meeting transcription, natural language understanding, summarization, and extraction of action points.

**AI does not replace software engineering. AI enhances software systems.**

---

## Development Journey

Runam wasn't built by simply prompting an AI tool or using a no-code builder — real engineering problems had to be solved along the way.

**Frontend challenges:** building complex, reusable UI components, responsive layouts, and state management architecture.

**Backend challenges:** designing the database schema, managing Supabase authentication, protected routes, and relationships between users, folders, projects, and tasks.

**Authentication challenges:** customizing the email confirmation flow and branding Supabase's default auth emails.

**Deployment challenges:** understanding how Supabase operates independently from frontend hosting, deployment configuration, and environment variable management on Vercel.

**Git workflow challenges:** branch management, merging feature branches into main, preventing accidental `.env` exposure, and understanding commit/status states.

**Build tool challenges:** resolving Vite plugin conflicts and duplicate configuration issues.

---

## What Building Runam Taught Me

1. **AI does not replace traditional development** — a solid architecture has to exist before AI is layered on top.
2. **Backend engineering matters more than people think** — authentication, permissions, and data structure determine product quality.
3. **Building a SaaS is more than writing code** — it requires deployment, security, version control, database design, and API integration knowledge.
4. **AI should solve specific problems**, not be added everywhere — Runam uses AI only where it creates measurable value.
5. **Engineering is problem solving** — much of the work was debugging builds, resolving Git conflicts, and making architecture decisions, not just writing features.

---

## Tools/APIs Used in Building Runam

* **Lovable AI** — for generating a quick MVP
* **ChatGPT** — chat-based assistance
* **Claude** — chat-based assistance
* **Google AI Studio (Gemini API)** — AI meeting transcription & summarization
* **Resend API** — email invites for teams

---

## Roadmap

### Version 2.0.0
* Move toward a fully AI-automated Runam
* Upgrade AI provider from Google AI Studio to OpenAI

### Version 3.0.0
* Develop a mobile version of Runam

### Longer-term
* Real-time collaboration
* AI task generation from meetings
* Calendar integration
* Notification system
* Advanced analytics dashboard
* AI productivity recommendations
* Team performance insights
* Automated workflow suggestions

---

## Product Vision

Runam aims to become more than a task manager — an intelligent productivity operating system where AI helps teams organize, understand, and execute work faster.

The idea is not to replace human decision-making. The idea is to reduce repetitive work so people can focus on execution.

---

## Final Thought

Runam is a practical example of how modern AI products should be built — not by replacing engineering with AI, but by combining:

* Traditional software engineering
* Automation systems
* Intelligent AI capabilities

to build software that solves real problems.

**Runam is not just a task management app. It's a practical example of how modern AI products should be built.**

# Routes

TanStack Start uses **file-based routing**. Every `.tsx` file in this directory
is a route. Do **not** create `src/pages/`, `src/routes/_app/index.tsx`, or
`app/layout.tsx` — those are Next.js / Remix conventions. The only root layout
is `src/routes/__root.tsx`.

## Conventions

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `users/index.tsx` | `/users` |
| `users/$id.tsx` | `/users/:id` (dynamic — bare `$`, no curly braces) |
| `posts/{-$category}.tsx` | `/posts/:category?` (optional segment) |
| `files/$.tsx` | `/files/*` (splat — read via `_splat` param, never `*`) |
| `_layout.tsx` | layout route (renders children via `<Outlet />`) |
| `__root.tsx` | app shell — wraps every page; preserve `<Outlet />` |

`routeTree.gen.ts` is auto-generated. Don't edit it by hand.
