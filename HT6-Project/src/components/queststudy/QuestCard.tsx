import React from "react";
import { Clock, ArrowRight, CheckCircle2, Zap } from "lucide-react";

export default function QuestCard({ title, progress, estTime, xp, status, completionDate }) {
  const completed = status === "completed";
  return (
    <div className={`group bg-card rounded-2xl border p-5 qs-card-shadow hover:qs-card-shadow-hover hover:-translate-y-0.5 transition-all duration-200
      ${completed ? "border-emerald-200/70" : "border-border/70"}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
          ${completed ? "bg-success/15 text-emerald-600" : "bg-accent/15 text-amber-600"}`}>
          {completed ? <CheckCircle2 className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-foreground leading-tight truncate">{title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            {completed ? `Completed · ${completionDate}` : `Est. ${estTime}`}
          </p>
        </div>
        {completed && (
          <span className="text-xs font-bold text-emerald-600 bg-success/10 px-2 py-1 rounded-full">+{xp} XP</span>
        )}
      </div>

      {!completed && (
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-foreground">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-accent to-amber-400 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        {!completed && (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            {estTime}
          </span>
        )}
        <button className={`ml-auto inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all
          ${completed
            ? "text-emerald-600 bg-success/10 hover:bg-success/20"
            : "text-primary-foreground bg-primary hover:shadow-lg hover:shadow-primary/25"}`}>
          {completed ? "Review" : "Continue"}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}