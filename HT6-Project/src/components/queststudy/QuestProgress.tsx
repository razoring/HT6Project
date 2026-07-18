import React from "react";
import { Check, Circle, Lock } from "lucide-react";

export default function QuestProgress({ quests = [], currentId }) {
  const done = quests.filter((q) => q.status === "done").length;
  const pct = quests.length ? Math.round((done / quests.length) * 100) : 0;

  return (
    <div className="bg-card rounded-3xl border border-border/70 qs-card-shadow p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-foreground">Quest Progress</h3>
        <span className="text-xs font-semibold text-muted-foreground">{done}/{quests.length}</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden mb-5">
        <div className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>

      <div className="relative flex-1">
        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-border" />
        <ul className="space-y-1.5">
          {quests.map((q, i) => {
            const isDone = q.status === "done";
            const isCurrent = q.id === currentId;
            const isLocked = q.status === "locked";
            return (
              <li key={q.id}>
                <div className={`relative flex items-center gap-3 p-2.5 rounded-xl transition group
                  ${isCurrent ? "bg-primary/8 ring-1 ring-primary/20" : "hover:bg-secondary/60"}`}>
                  <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition
                    ${isDone
                      ? "bg-success border-success text-white"
                      : isLocked
                        ? "bg-card border-border text-muted-foreground/50"
                        : "bg-card border-primary text-primary"}`}>
                    {isDone ? <Check className="w-4 h-4" strokeWidth={3} /> : isLocked ? <Lock className="w-3.5 h-3.5" /> : <span className="text-xs font-bold">{i + 1}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium leading-tight ${isLocked ? "text-muted-foreground/60" : "text-foreground"}`}>{q.title}</p>
                    {q.est && <p className="text-xs text-muted-foreground mt-0.5">{q.est}</p>}
                  </div>
                  {isCurrent && (
                    <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">In progress</span>
                  )}
                  {isDone && !isCurrent && (
                    <span className="text-xs font-semibold text-emerald-600">+{q.xp || 50} XP</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}