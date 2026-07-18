import React, { useState } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import QuestLogo from "./QuestLogo";

export default function TopNav() {
  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-40 qs-glass border-b border-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-2 sm:gap-4">
        <div className="shrink-0"><QuestLogo size="sm" /></div>

        <div className="hidden lg:flex flex-1 max-w-xl min-w-0 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search quests, subjects, notes..."
            className="w-full h-10 pl-10 pr-4 rounded-full bg-secondary/70 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-card transition"
          />
        </div>

        <div className="flex-1 lg:hidden" />

        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button onClick={() => setMobileSearch(!mobileSearch)} className="lg:hidden p-2.5 rounded-full hover:bg-secondary transition" aria-label="Search">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="relative">
            <button
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
              className="relative p-2.5 rounded-full hover:bg-secondary transition"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-accent border border-card" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-card border border-border qs-card-shadow p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Notifications</p>
                {[
                  { t: "Streak milestone!", d: "You hit a 7-day study streak 🔥", c: "bg-accent/15 text-amber-700" },
                  { t: "Quest completed", d: "Binary Trees quest earned +50 XP", c: "bg-primary/15 text-emerald-700" },
                  { t: "Break reminder", d: "You've studied 45 min straight", c: "bg-secondary text-muted-foreground" },
                ].map((n, i) => (
                  <div key={i} className="flex gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary/60 cursor-pointer transition">
                    <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.c.replace("text-", "bg-").split(" ")[0]}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{n.t}</p>
                      <p className="text-xs text-muted-foreground">{n.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-secondary transition"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                JM
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-card border border-border qs-card-shadow p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-border mb-1">
                  <p className="text-sm font-semibold text-foreground">Jordan Miles</p>
                  <p className="text-xs text-muted-foreground">jordan@university.edu</p>
                </div>
                {["Profile", "Settings", "Help center"].map((item) => (
                  <button key={item} className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-secondary transition">
                    {item}
                  </button>
                ))}
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition">
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileSearch && (
        <div className="lg:hidden border-t border-border/60 px-4 py-3 bg-card/80 backdrop-blur animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search quests, subjects, notes..."
              className="w-full h-10 pl-10 pr-4 rounded-full bg-secondary/70 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-card transition"
            />
          </div>
        </div>
      )}
    </header>
  );
}