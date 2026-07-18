import React from "react";

export default function StatCard({ icon: Icon, label, value, sub, accent = "primary", trend }) {
  const accentMap = {
    primary: { ring: "ring-primary/15", bg: "bg-primary/10", text: "text-primary" },
    accent: { ring: "ring-amber-300/30", bg: "bg-accent/15", text: "text-amber-600" },
    success: { ring: "ring-emerald-300/30", bg: "bg-success/15", text: "text-emerald-600" },
    muted: { ring: "ring-border", bg: "bg-secondary", text: "text-muted-foreground" },
  }[accent];

  return (
    <div className="group relative bg-card rounded-2xl border border-border/70 p-4 sm:p-5 qs-card-shadow hover:qs-card-shadow-hover hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${accentMap.bg} ${accentMap.text} flex items-center justify-center ring-4 ${accentMap.ring}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${accentMap.bg} ${accentMap.text}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{value}</p>
      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{label}</p>
      {sub && <p className="text-[11px] text-muted-foreground/80 mt-1">{sub}</p>}
    </div>
  );
}