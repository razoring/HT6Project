import React from "react";

export default function QuestLogo({ size = "md", withText = true }) {
  const dims = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-14 h-14" }[size];
  const text = { sm: "text-base", md: "text-lg", lg: "text-2xl" }[size];

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${dims} relative rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center qs-card-shadow`}>
        <svg viewBox="0 0 24 24" className="w-3/5 h-3/5 text-white" fill="none">
          <path d="M12 2L3 7v6c0 5 3.8 8.5 9 10 5.2-1.5 9-5 9-10V7l-9-5z" fill="currentColor" opacity="0.9" />
          <path d="M9 12.5l2 2 4-4.5" stroke="hsl(142 64% 30%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent border-2 border-white" />
      </div>
      {withText && (
        <span className={`font-bold ${text} tracking-tight text-foreground`}>
          Quest<span className="text-primary">Study</span>
        </span>
      )}
    </div>
  );
}