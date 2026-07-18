import React from "react";
import { Clock, CheckCircle2, Play } from "lucide-react";

export default function SessionCard({ subject, date, totalQuests, progress, timeStudied, variant = "previous" }) {
  return (
    <div className="group bg-card rounded-2xl border border-border/70 p-5 qs-card-shadow hover:qs-card-shadow-hover hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-amber-600 bg-accent/15 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {subject}
          </span>
          <p className="text-xs text-muted-foreground mt-2">{date}</p>
        </div>
        <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md">{totalQuests} quests</span>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-semibold text-foreground">{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          {timeStudied}
        </span>
        {variant === "completed" ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
            Completed
          </span>
        ) : (
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all">
            <Play className="w-3.5 h-3.5" />
            Resume
          </button>
        )}
      </div>
    </div>
  );
}