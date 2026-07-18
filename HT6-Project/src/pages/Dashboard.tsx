import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, CheckCircle2, Flame, Clock, Gauge, Play, ChevronRight } from "lucide-react";
import TopNav from "@/components/queststudy/TopNav";
import StatCard from "@/components/queststudy/StatCard";
import UploadArea from "@/components/queststudy/UploadArea";
import SessionCard from "@/components/queststudy/SessionCard";
import QuestCard from "@/components/queststudy/QuestCard";

const STATS = [
  { icon: Trophy, label: "Current Level", value: "12", sub: "320 XP to next", accent: "accent", trend: "+1" },
  { icon: CheckCircle2, label: "Quests Completed", value: "47", accent: "success", trend: "+3" },
  { icon: Flame, label: "Study Streak", value: "7", sub: "days in a row 🔥", accent: "accent" },
  { icon: Clock, label: "Hours Studied", value: "63h", accent: "primary", trend: "+4h" },
  { icon: Gauge, label: "Focus Score", value: "88%", sub: "Above average", accent: "success", trend: "+5%" },
];

const PREV_SESSIONS = [
  { subject: "Data Structures", date: "Jul 16, 2026", totalQuests: 5, progress: 80, timeStudied: "1h 24m" },
  { subject: "Linear Algebra", date: "Jul 14, 2026", totalQuests: 4, progress: 100, timeStudied: "2h 05m", variant: "completed" },
  { subject: "Organic Chem", date: "Jul 12, 2026", totalQuests: 6, progress: 45, timeStudied: "0h 52m" },
  { subject: "Macroeconomics", date: "Jul 10, 2026", totalQuests: 3, progress: 100, timeStudied: "1h 10m", variant: "completed" },
];

const IN_PROGRESS = [
  { title: "Binary Trees & Traversals", progress: 60, estTime: "25 min left", xp: 50 },
  { title: "AVL Rotations", progress: 30, estTime: "40 min left", xp: 60 },
  { title: "Hash Tables Deep Dive", progress: 75, estTime: "12 min left", xp: 45 },
];

const COMPLETED = [
  { title: "Intro to Big-O Notation", xp: 40, completionDate: "Jul 16" },
  { title: "Arrays & Linked Lists", xp: 55, completionDate: "Jul 15" },
  { title: "Stacks & Queues", xp: 35, completionDate: "Jul 13" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-primary to-emerald-600 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden qs-card-shadow">
            <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-white/10" />
            <div className="absolute right-16 bottom-0 w-24 h-24 rounded-full bg-white/10" />
            <div className="relative">
              <p className="text-emerald-50/80 text-sm font-medium">Saturday, July 18</p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">Welcome back, Jordan! 👋</h1>
              <p className="text-emerald-50/90 mt-2 text-lg">Ready to complete today's quests?</p>
              <button
                onClick={() => setShowUpload(true)}
                className="mt-5 inline-flex items-center gap-2 bg-white text-primary font-semibold px-5 py-2.5 rounded-full text-sm hover:shadow-lg hover:shadow-emerald-900/20 hover:-translate-y-0.5 transition-all"
              >
                <Play className="w-4 h-4" />
                Start New Study Session
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {STATS.map((s) => <StatCard key={s.label} {...s} />)}
        </section>

        {/* Upload */}
        {showUpload && (
          <section className="mb-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <UploadArea onSessionStart={() => navigate("/session")} />
          </section>
        )}

        {/* Previous sessions */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Previous Study Sessions</h2>
            <button className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PREV_SESSIONS.map((s, i) => <SessionCard key={i} {...s} />)}
          </div>
        </section>

        {/* Quests */}
        <section className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <h2 className="text-xl font-bold tracking-tight text-foreground">In Progress Quests</h2>
            </div>
            <div className="space-y-4">
              {IN_PROGRESS.map((q) => <QuestCard key={q.title} {...q} status="active" />)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-success" />
              <h2 className="text-xl font-bold tracking-tight text-foreground">Completed Quests</h2>
            </div>
            <div className="space-y-4">
              {COMPLETED.map((q) => <QuestCard key={q.title} {...q} status="completed" />)}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}