import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Play, Check, X, Folder, FolderTree, User, Users, Calendar,
  CheckCircle2, BarChart3, Search, Smartphone, Mic, FileText, Sparkles,
  Share2, Activity, Shield, Sun, Moon, ChevronRight, Star, Zap, Brain,
  ListChecks, Inbox, Clock, TrendingUp, MousePointerClick, Apple, Chrome,
  Twitter, Github, Linkedin,
} from "lucide-react";
import dashboardAsset from "@/assets/app/dashboard.png.asset.json";
import tasksAsset from "@/assets/app/tasks.png.asset.json";
import tasksLightAsset from "@/assets/app/tasks-light.png.asset.json";
import meetingsAsset from "@/assets/app/meetings.png.asset.json";
import meetingLiveAsset from "@/assets/app/meeting-live.png.asset.json";
import meetingRecordingAsset from "@/assets/app/meeting-recording.png.asset.json";
import notesAsset from "@/assets/app/notes.png.asset.json";
import teamsAsset from "@/assets/app/teams.png.asset.json";
import teamDetailAsset from "@/assets/app/team-detail.png.asset.json";
import notificationsAsset from "@/assets/app/notifications.png.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Runam — Organize First. Execute Faster." },
      { name: "description", content: "Runam is the AI-powered, Folder-First task management platform built for individuals and teams. Stay organized, collaborate, and never miss what matters." },
      { property: "og:title", content: "Runam — Organize First. Execute Faster." },
      { property: "og:description", content: "AI-powered task management with a Folder-First workflow." },
    ],
  }),
  component: RunamLanding,
});

/* ---------- helpers ---------- */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.12 });
    el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n) => {
      n.style.opacity = "0";
      n.style.transform = "translateY(24px)";
      n.style.transition = "opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)";
      io.observe(n);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

function useCounter(target: number, start: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

/* ---------- Theme toggle ---------- */
function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

/* ---------- Mouse-responsive mesh ---------- */
function MeshBackground() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div ref={ref} className="absolute -inset-32 bg-mesh transition-transform duration-300 ease-out" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,var(--background)_85%)]" />
    </div>
  );
}

/* ---------- Floating dashboard mockup ---------- */
function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-6xl" data-reveal>
      <div className="absolute -inset-10 bg-gradient-brand opacity-30 blur-3xl animate-blob" />
      <div className="relative glass rounded-3xl p-2 shadow-elegant ring-1 ring-black/5 dark:ring-white/10">
        <div className="rounded-[1.4rem] bg-card overflow-hidden border border-border">
          {/* Top bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
            <div className="flex gap-1.5">
              <span className="size-3 rounded-full bg-[oklch(0.7_0.18_25)]" />
              <span className="size-3 rounded-full bg-[oklch(0.82_0.15_85)]" />
              <span className="size-3 rounded-full bg-[oklch(0.75_0.17_145)]" />
            </div>
            <div className="ml-3 text-xs text-muted-foreground">runam.app / dashboard</div>
          </div>
          <img
            src={dashboardAsset.url}
            alt="Runam dashboard showing productivity overview, folders, tasks and meeting stats"
            className="w-full h-auto block"
            loading="eager"
          />
        </div>

      </div>

      {/* floating cards */}
      <div className="hidden lg:block absolute -left-10 top-24 glass rounded-2xl p-4 w-64 shadow-card animate-float">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground"><Sparkles className="size-4 text-purple"/> AI Meeting Summary</div>
        <div className="mt-2 text-sm font-semibold">Product Sync — 32 min</div>
        <div className="mt-2 text-xs text-muted-foreground">3 action items captured · 2 assigned</div>
        <div className="mt-3 flex gap-1">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald/15 text-emerald">Saved</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-electric/15 text-electric">Shared</span>
        </div>
      </div>

      <div className="hidden lg:block absolute -right-8 top-40 glass rounded-2xl p-4 w-60 shadow-card animate-float-slow">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground"><TrendingUp className="size-4 text-emerald"/> Folder Progress</div>
        <div className="mt-2 text-2xl font-bold">68%</div>
        <div className="h-2 mt-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald to-cyan" style={{width:"68%"}} />
        </div>
      </div>

      <div className="hidden lg:block absolute -right-6 -bottom-6 glass rounded-2xl p-3 w-56 shadow-card animate-float">
        <div className="flex items-center gap-2 text-xs"><Inbox className="size-4 text-indigo"/> Notes</div>
        <div className="mt-1.5 text-sm font-semibold">Research: User onboarding</div>
        <div className="text-[11px] text-muted-foreground mt-1">12 highlights · 3 action tasks</div>
      </div>
    </div>
  );
}

/* ---------- Sections ---------- */
function Nav({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className={`mx-auto max-w-6xl px-4 ${scrolled ? "glass rounded-2xl shadow-card" : ""} transition-all`}>
        <nav className="flex items-center justify-between py-2">
          <a href="#top" className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-gradient-brand shadow-glow" />
            <span className="font-bold text-lg tracking-tight">Runam</span>
          </a>
          <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {[["Product","#features"],["Folders","#folders"],["AI","#ai"],["Pricing","#pricing"]].map(([l,h])=>(
              <li key={l}><a href={h} className="hover:text-foreground transition">{l}</a></li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button onClick={toggle} aria-label="Toggle theme" className="size-9 grid place-items-center rounded-lg border border-border hover:bg-accent transition">
              {dark ? <Sun className="size-4"/> : <Moon className="size-4"/>}
            </button>
            <a href="#cta" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-gradient-brand text-white shadow-glow hover:opacity-95 transition">
              Start free <ArrowRight className="size-4"/>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <MeshBackground />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center" data-reveal>
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
            <span className="size-1.5 rounded-full bg-emerald animate-pulse" />
            New · AI Meeting Assistant is live
            <ChevronRight className="size-3" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Organize First.<br/>
            <span className="text-gradient">Execute Faster.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Runam is the AI-powered task management platform built around a <strong className="text-foreground font-semibold">Folder-First</strong> workflow — helping individuals and teams stay organized, collaborate effortlessly, and never lose track of what matters.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#cta" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-white font-medium shadow-elegant hover:-translate-y-0.5 transition">
              Start Free <ArrowRight className="size-4 group-hover:translate-x-0.5 transition"/>
            </a>
            <a href="#features" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass font-medium hover:bg-accent/40 transition">
              <Play className="size-4"/> Watch Demo
            </a>
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Chrome className="size-3.5"/> Google Sign-In</span>
            <span className="inline-flex items-center gap-1.5"><Apple className="size-3.5"/> Apple Sign-In</span>
            <span className="inline-flex items-center gap-1.5"><Shield className="size-3.5"/> No Credit Card</span>
            <span className="inline-flex items-center gap-1.5"><Users className="size-3.5"/> Used by Pros & Teams</span>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <DashboardMockup />
        </div>

        <div className="mt-20 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground" data-reveal>Trusted by teams at</div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60" data-reveal>
          {["acme","northwind","helios","quanta","atlas","monolith"].map((b)=>(
            <span key={b} className="text-lg font-bold tracking-tight">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const bad = ["Loose tasks everywhere","Poor organization","Mixed personal and work tasks","Weak collaboration","Difficult navigation","Missed deadlines"];
  const good = ["Folder-First organization","Structured workflows","Separate Personal & Team spaces","Shared collaboration","Fast navigation","Smart scheduling"];
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-14" data-reveal>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Most task apps let <span className="text-gradient">chaos happen.</span></h2>
          <p className="mt-4 text-muted-foreground text-lg">Runam puts structure first, so execution becomes inevitable.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-border p-8 bg-muted/30" data-reveal>
            <div className="flex items-center gap-2 mb-5">
              <div className="size-9 rounded-xl bg-destructive/10 grid place-items-center text-destructive"><X className="size-5"/></div>
              <h3 className="text-lg font-semibold">Traditional Task Apps</h3>
            </div>
            <ul className="space-y-3">
              {bad.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-muted-foreground">
                  <X className="size-4 mt-0.5 text-destructive/80"/> {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-3xl p-[1.5px] bg-gradient-brand shadow-elegant" data-reveal>
            <div className="rounded-[calc(1.5rem-1px)] bg-card p-8 h-full">
              <div className="flex items-center gap-2 mb-5">
                <div className="size-9 rounded-xl bg-gradient-brand grid place-items-center text-white"><Check className="size-5"/></div>
                <h3 className="text-lg font-semibold">Runam</h3>
              </div>
              <ul className="space-y-3">
                {good.map((g) => (
                  <li key={g} className="flex items-start gap-2.5">
                    <Check className="size-4 mt-0.5 text-emerald"/> {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FolderFirst() {
  const steps = [
    { l: "Workspace", icon: Users, c: "from-indigo to-electric" },
    { l: "Folder",    icon: Folder, c: "from-electric to-cyan" },
    { l: "Task",      icon: ListChecks, c: "from-cyan to-emerald" },
    { l: "Subtask",   icon: CheckCircle2, c: "from-emerald to-soft-orange" },
  ];
  return (
    <section id="folders" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-60" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-16" data-reveal>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground glass px-3 py-1 rounded-full mb-4"><FolderTree className="size-3.5"/> Folder-First</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Every task belongs <span className="text-gradient">somewhere.</span></h2>
          <p className="mt-4 text-muted-foreground text-lg">Runam forces organization before action.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4" data-reveal>
          {steps.map((s, i) => (
            <div key={s.l} className="relative">
              <div className="glass rounded-2xl p-6 text-center shadow-card hover:-translate-y-1 transition">
                <div className={`mx-auto size-12 rounded-xl bg-gradient-to-br ${s.c} grid place-items-center text-white shadow-glow`}>
                  <s.icon className="size-6"/>
                </div>
                <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Level {i+1}</div>
                <div className="text-lg font-semibold">{s.l}</div>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 size-5 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm" data-reveal>
          {["No loose tasks","Better project visibility","Cleaner workflows","Scalable organization"].map((h)=>(
            <div key={h} className="flex items-center gap-2 glass rounded-xl px-4 py-3"><Check className="size-4 text-emerald"/> {h}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBento() {
  const Card = ({ className = "", children }: any) => (
    <div className={`glass rounded-3xl p-6 md:p-7 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 ${className}`} data-reveal>{children}</div>
  );
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl mb-12" data-reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-electric font-semibold">Features</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">An entire productivity stack, <span className="text-gradient">beautifully organized.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
          {/* Big card */}
          <Card className="md:col-span-4 md:row-span-2 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
            <div className="relative">
              <div className="size-11 rounded-xl bg-gradient-brand grid place-items-center text-white shadow-glow"><FolderTree className="size-5"/></div>
              <h3 className="mt-4 text-2xl md:text-3xl font-semibold">Folder-First System</h3>
              <p className="mt-2 text-muted-foreground max-w-md">Every task lives inside a folder — no orphaned to-dos, no chaos. Just clear, scalable structure.</p>

              <div className="mt-6 grid gap-2 max-w-md">
                {[["Q4 Launch", 12], ["Marketing", 7], ["Engineering", 23]].map(([n,c])=>(
                  <div key={n as string} className="flex items-center gap-2 p-2.5 rounded-xl bg-background/50 border border-border">
                    <Folder className="size-4 text-electric"/> <span className="text-sm font-medium">{n}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{c} tasks</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="md:col-span-2">
            <div className="size-10 rounded-xl bg-indigo/15 text-indigo grid place-items-center"><User className="size-5"/></div>
            <h3 className="mt-4 text-lg font-semibold">Personal Workspace</h3>
            <p className="mt-1 text-sm text-muted-foreground">Keep personal goals and projects organized.</p>
          </Card>

          <Card className="md:col-span-2">
            <div className="size-10 rounded-xl bg-electric/15 text-electric grid place-items-center"><Users className="size-5"/></div>
            <h3 className="mt-4 text-lg font-semibold">Team Workspace</h3>
            <p className="mt-1 text-sm text-muted-foreground">Collaborate with your entire team.</p>
            <div className="mt-3 flex -space-x-2">
              {["#6366f1","#06b6d4","#10b981","#f59e0b","#a855f7"].map((c,i)=>(
                <div key={i} className="size-7 rounded-full border-2 border-card" style={{background:c}}/>
              ))}
            </div>
          </Card>

          <Card className="md:col-span-2">
            <div className="size-10 rounded-xl bg-purple/15 text-purple grid place-items-center"><Calendar className="size-5"/></div>
            <h3 className="mt-4 text-lg font-semibold">Smart Scheduling</h3>
            <p className="mt-1 text-sm text-muted-foreground">Start dates and due dates for tasks and subtasks.</p>
          </Card>

          <Card className="md:col-span-2">
            <div className="size-10 rounded-xl bg-emerald/15 text-emerald grid place-items-center"><CheckCircle2 className="size-5"/></div>
            <h3 className="mt-4 text-lg font-semibold">Auto-Completion</h3>
            <p className="mt-1 text-sm text-muted-foreground">Parent tasks complete automatically when subtasks finish.</p>
          </Card>

          <Card className="md:col-span-2">
            <div className="size-10 rounded-xl bg-cyan/20 text-cyan grid place-items-center"><BarChart3 className="size-5"/></div>
            <h3 className="mt-4 text-lg font-semibold">Progress Tracking</h3>
            <p className="mt-1 text-sm text-muted-foreground">Visual progress for every project and folder.</p>
            <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-gradient-brand" style={{width:"72%"}}/>
            </div>
          </Card>

          <Card className="md:col-span-3">
            <div className="size-10 rounded-xl bg-soft-orange/20 text-soft-orange grid place-items-center"><Search className="size-5"/></div>
            <h3 className="mt-4 text-lg font-semibold">Search Everything</h3>
            <p className="mt-1 text-sm text-muted-foreground">Find folders, teams, tasks, and notes in milliseconds.</p>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 text-sm">
              <Search className="size-4 text-muted-foreground"/> <span className="text-muted-foreground">Search Runam…</span>
              <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-muted">⌘K</span>
            </div>
          </Card>

          <Card className="md:col-span-3">
            <div className="size-10 rounded-xl bg-indigo/15 text-indigo grid place-items-center"><Smartphone className="size-5"/></div>
            <h3 className="mt-4 text-lg font-semibold">Fully Responsive</h3>
            <p className="mt-1 text-sm text-muted-foreground">Desktop, tablet, and mobile — optimized end-to-end.</p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function AIMeetingSection() {
  return (
    <section id="ai" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-70"/>
      <div className="relative mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div data-reveal>
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs font-medium text-muted-foreground mb-4"><Brain className="size-3.5 text-purple"/> AI Meeting Assistant</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Meetings that <span className="text-gradient">document themselves.</span></h2>
          <p className="mt-4 text-muted-foreground text-lg">Record, transcribe, and convert every conversation into action — saved directly into the right folder.</p>
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {[
              [Mic,"Meeting Recording"],
              [FileText,"Real-Time Transcription"],
              [Sparkles,"AI Summaries"],
              [ListChecks,"Action Item Extraction"],
              [Folder,"Save to Folders"],
              [Share2,"Share with Team"],
            ].map(([I,l]:any) => (
              <li key={l} className="flex items-center gap-2 glass rounded-xl px-3 py-2"><I className="size-4 text-electric"/> {l}</li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {["Meeting","Transcript","AI Summary","Action Tasks","Team Workspace"].map((s,i,a)=>(
              <span key={s} className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg glass">{s}</span>
                {i<a.length-1 && <ArrowRight className="size-3.5"/>}
              </span>
            ))}
          </div>
        </div>

        <div className="relative" data-reveal>
          <div className="absolute -inset-8 bg-gradient-brand opacity-25 blur-3xl"/>
          <div className="relative glass rounded-3xl p-2 shadow-elegant overflow-hidden">
            <img
              src={meetingsAsset.url}
              alt="Runam meetings view with AI recording summary and take details"
              className="rounded-2xl w-full h-auto block border border-border"
              loading="lazy"
            />
          </div>
          <div className="hidden md:block absolute -bottom-8 -left-6 w-64 glass rounded-2xl p-2 shadow-card animate-float-slow">
            <img
              src={meetingRecordingAsset.url}
              alt="Live AI recording panel"
              className="rounded-xl w-full h-auto block border border-border"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

function NotesSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-2" data-reveal>
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs font-medium text-muted-foreground mb-4"><FileText className="size-3.5 text-emerald"/> Notes</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Capture ideas before they <span className="text-gradient">disappear.</span></h2>
          <p className="mt-4 text-muted-foreground text-lg">A premium editor with AI assistance, folder-based organization, and zero friction.</p>
          <ul className="mt-6 space-y-2 text-sm">
            {["Rich text editing","Meeting notes","Research notes","Project documentation","AI-assisted organization","Folder-based notes"].map(t=>(
              <li key={t} className="flex items-center gap-2"><Check className="size-4 text-emerald"/> {t}</li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3 relative" data-reveal>
          <div className="absolute -inset-6 bg-gradient-to-br from-emerald/20 to-cyan/20 blur-3xl"/>
          <div className="relative glass rounded-3xl shadow-elegant overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-glass-border">
              <Folder className="size-4 text-electric"/>
              <span className="text-xs text-muted-foreground">Research / Onboarding</span>
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-purple/15 text-purple inline-flex items-center gap-1"><Sparkles className="size-3"/> AI</span>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold tracking-tight">User Onboarding — Research Notes</h3>
              <p className="text-xs text-muted-foreground mt-1">Updated 2h ago · 4 collaborators</p>
              <div className="mt-5 space-y-3 text-sm leading-relaxed">
                <p><span className="bg-soft-orange/30 rounded px-1">Users drop off</span> when the first folder is empty. We should pre-seed templates.</p>
                <p className="text-muted-foreground">Interviews highlight that <strong className="text-foreground">folder clarity</strong> is the #1 predictor of week-2 retention.</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-electric"/> Add quick-start folder gallery</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-electric"/> Tooltip pointing at "+ New Folder"</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-electric"/> AI suggestion: "Want help creating your first folder?"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamCollab() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-50"/>
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-14" data-reveal>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built for teams <span className="text-gradient">without the complexity.</span></h2>
          <p className="mt-4 text-muted-foreground text-lg">Shared folders, role-based access, and dashboards that keep everyone aligned.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { t: "Shared Folders", d: "Real-time collaboration with granular permissions.", icon: Folder, c: "indigo" },
            { t: "Role-Based Access", d: "Owner, Editor, Viewer — control at every level.", icon: Shield, c: "purple" },
            { t: "Team Dashboards", d: "See progress, velocity, and bottlenecks at a glance.", icon: BarChart3, c: "electric" },
            { t: "Activity Tracking", d: "Audit every change, comment, and completion.", icon: Activity, c: "cyan" },
            { t: "Shared Projects", d: "Coordinate across folders without duplicating work.", icon: Users, c: "emerald" },
            { t: "Progress Visibility", d: "Folder-level visibility into what's shipping.", icon: TrendingUp, c: "soft-orange" },
          ].map((f) => (
            <div key={f.t} className="glass rounded-2xl p-6 hover:-translate-y-1 transition shadow-card" data-reveal>
              <div className={`size-10 rounded-xl bg-${f.c}/15 text-${f.c} grid place-items-center`}><f.icon className="size-5"/></div>
              <h3 className="mt-4 font-semibold">{f.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 glass rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-card" data-reveal>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#6366f1","#06b6d4","#10b981","#f59e0b","#a855f7","#ec4899"].map((c,i)=>(
                <div key={i} className="size-9 rounded-full border-2 border-card text-xs grid place-items-center text-white font-semibold" style={{background:c}}>{["S","M","K","J","R","E"][i]}</div>
              ))}
              <div className="size-9 rounded-full border-2 border-card bg-muted text-xs grid place-items-center font-semibold">+8</div>
            </div>
            <div>
              <div className="text-sm font-semibold">14 teammates collaborating</div>
              <div className="text-xs text-muted-foreground">Across 5 folders · 38 active tasks</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-emerald"/> 12 online</div>
            <div className="text-muted-foreground">·</div>
            <div className="flex items-center gap-1.5"><Activity className="size-4 text-electric"/> 24 updates today</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardStats() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.3 });
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);
  const stats = [
    { l: "Total Tasks", v: useCounter(248, vis), c: "indigo" },
    { l: "Completed", v: useCounter(187, vis), c: "emerald" },
    { l: "Upcoming", v: useCounter(42, vis), c: "electric" },
    { l: "Overdue", v: useCounter(3, vis), c: "soft-orange" },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4" ref={wrapRef}>
        <div className="text-center max-w-2xl mx-auto mb-14" data-reveal>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Everything at a <span className="text-gradient">glance.</span></h2>
          <p className="mt-4 text-muted-foreground text-lg">Beautiful analytics keep momentum visible across every folder and team.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.l} className="glass rounded-2xl p-5 shadow-card" data-reveal>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              <div className={`mt-1 text-4xl font-bold text-${s.c} tabular-nums`}>{s.v}</div>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="glass rounded-2xl p-6 lg:col-span-2 shadow-card" data-reveal>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Team Progress · Last 14 days</h3>
              <span className="text-xs text-emerald flex items-center gap-1"><TrendingUp className="size-3.5"/> +24%</span>
            </div>
            <div className="mt-5 h-44 flex items-end gap-1.5">
              {Array.from({length:24}).map((_,i)=>{
                const h = 20 + Math.abs(Math.sin(i/2))*80 + (i*1.2);
                return <div key={i} className="flex-1 rounded-md bg-gradient-to-t from-indigo/70 to-electric" style={{height: `${Math.min(h,100)}%`, transition: "height .6s", transitionDelay: `${i*30}ms`}} />;
              })}
            </div>
          </div>
          <div className="glass rounded-2xl p-6 shadow-card" data-reveal>
            <h3 className="font-semibold">Folder Progress</h3>
            <div className="mt-4 space-y-4">
              {[["Q4 Launch",72,"indigo"],["Marketing",54,"electric"],["Engineering",88,"emerald"],["Design",41,"purple"]].map(([n,p,c]:any)=>(
                <div key={n}>
                  <div className="flex justify-between text-xs mb-1.5"><span>{n}</span><span className="text-muted-foreground">{p}%</span></div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-${c} to-electric`} style={{width:`${p}%`}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Create Workspace", d: "Personal or Team — pick your context.", icon: Users },
    { n: "02", t: "Create Folder", d: "Group related work for instant clarity.", icon: Folder },
    { n: "03", t: "Add Tasks & Subtasks", d: "Plan with start and due dates.", icon: ListChecks },
    { n: "04", t: "Track Progress", d: "Auto-completion keeps things honest.", icon: BarChart3 },
    { n: "05", t: "Collaborate & Deliver", d: "Share, comment, and ship together.", icon: Zap },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-14" data-reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-electric font-semibold">How it works</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">From idea to <span className="text-gradient">delivered.</span></h2>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="grid md:grid-cols-5 gap-5">
            {steps.map((s) => (
              <div key={s.n} className="text-center" data-reveal>
                <div className="mx-auto size-24 rounded-2xl glass grid place-items-center relative shadow-card">
                  <s.icon className="size-7 text-electric"/>
                  <span className="absolute -top-2 -right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-brand text-white">{s.n}</span>
                </div>
                <h3 className="mt-4 font-semibold">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "Runam's folder-first model finally killed our scattered to-do chaos. We ship faster and miss nothing.", n: "Sara Chen", r: "Head of Operations, Helios", a: "#6366f1" },
    { q: "The AI meeting summaries alone save our team 8 hours every week — and they actually become tasks.", n: "Marc Alvarez", r: "Product Lead, Quanta", a: "#06b6d4" },
    { q: "It's the first tool where my personal and team work coexist without ever bleeding into each other.", n: "Kira Iwasaki", r: "Founder, Atlas Studio", a: "#10b981" },
    { q: "Our missed-deadline rate dropped 70% in the first month. Pure organizational compounding.", n: "Jordan Reed", r: "Engineering Manager, Northwind", a: "#a855f7" },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-14" data-reveal>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Loved by people who <span className="text-gradient">get things done.</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((t) => (
            <div key={t.n} className="glass rounded-3xl p-7 shadow-card hover:shadow-elegant transition" data-reveal>
              <div className="flex gap-0.5 text-soft-orange">
                {Array.from({length:5}).map((_,i)=>(<Star key={i} className="size-4 fill-current"/>))}
              </div>
              <p className="mt-4 text-lg leading-relaxed">"{t.q}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="size-10 rounded-full grid place-items-center text-white font-semibold" style={{background:t.a}}>{t.n[0]}</div>
                <div>
                  <div className="text-sm font-semibold">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { n: "Free", p: "$0", d: "For individuals getting organized.", f: ["1 workspace","Up to 3 folders","Unlimited tasks","Personal notes","Mobile + desktop"], cta: "Start Free" },
    { n: "Pro", p: "$9", d: "For professionals shipping serious work.", f: ["Unlimited folders","AI meeting assistant","Advanced search","Templates","Priority support"], cta: "Go Pro", featured: true },
    { n: "Team", p: "$19", d: "For growing teams that collaborate.", f: ["Everything in Pro","Team workspace","Role-based access","Team dashboards","Activity tracking"], cta: "Start Team" },
  ];
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-14" data-reveal>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Simple, <span className="text-gradient">scalable pricing.</span></h2>
          <p className="mt-4 text-muted-foreground text-lg">Start free. Upgrade when your work demands more.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((p) => (
            <div key={p.n} className={`relative rounded-3xl p-[1.5px] ${p.featured ? "bg-gradient-brand shadow-elegant" : "bg-border"}`} data-reveal>
              <div className="rounded-[calc(1.5rem-1px)] bg-card p-7 h-full flex flex-col">
                {p.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-semibold px-3 py-1 rounded-full bg-gradient-brand text-white shadow-glow">Most Popular</span>}
                <h3 className="text-lg font-semibold">{p.n}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight">{p.p}</span>
                  <span className="text-muted-foreground text-sm">/mo</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                <ul className="mt-6 space-y-2.5 text-sm flex-1">
                  {p.f.map((x)=>(<li key={x} className="flex items-start gap-2"><Check className="size-4 text-emerald mt-0.5"/> {x}</li>))}
                </ul>
                <button className={`mt-7 w-full py-3 rounded-xl font-medium transition ${p.featured ? "bg-gradient-brand text-white shadow-glow hover:-translate-y-0.5" : "border border-border hover:bg-accent"}`}>{p.cta}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="cta" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative rounded-[2.5rem] p-[1.5px] bg-gradient-brand shadow-elegant overflow-hidden" data-reveal>
          <div className="rounded-[calc(2.5rem-1px)] p-10 md:p-16 text-center relative overflow-hidden bg-card">
            <div className="absolute inset-0 bg-mesh opacity-70"/>
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">The most organized way<br/><span className="text-gradient">to get work done.</span></h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">Stop managing chaos. Start building momentum.</p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-white font-medium shadow-glow hover:-translate-y-0.5 transition">Start Free Today <ArrowRight className="size-4"/></a>
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass font-medium hover:bg-accent/40 transition"><MousePointerClick className="size-4"/> Book Demo</a>
              </div>
              <div className="mt-6 text-xs text-muted-foreground">No credit card · Free forever plan · Cancel anytime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    ["Product", ["Features","Pricing","Roadmap","Changelog"]],
    ["Company", ["Blog","Help Center","Careers","Contact"]],
    ["Legal", ["Privacy","Terms","Security","DPA"]],
  ] as const;
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-gradient-brand"/>
            <span className="font-bold text-lg">Runam</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">The AI-powered task platform built around a Folder-First workflow.</p>
          <div className="mt-4 flex gap-2">
            {[Twitter,Github,Linkedin].map((I,i)=>(
              <a key={i} href="#" className="size-9 rounded-lg border border-border grid place-items-center hover:bg-accent transition"><I className="size-4"/></a>
            ))}
          </div>
        </div>
        {cols.map(([h,items]) => (
          <div key={h}>
            <div className="text-sm font-semibold mb-3">{h}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {items.map((l)=>(<li key={l}><a href="#" className="hover:text-foreground transition">{l}</a></li>))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Runam, Inc. All rights reserved.</div>
          <div className="flex items-center gap-1.5"><Clock className="size-3.5"/> Built for people who ship.</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
function RunamLanding() {
  const { dark, toggle } = useTheme();
  const ref = useReveal();
  return (
    <div ref={ref} className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav dark={dark} toggle={toggle} />
      <main>
        <Hero />
        <ProblemSection />
        <FolderFirst />
        <FeatureBento />
        <AIMeetingSection />
        <NotesSection />
        <TeamCollab />
        <DashboardStats />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
