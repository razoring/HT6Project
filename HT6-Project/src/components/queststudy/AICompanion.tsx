import React, { useState, useRef, useEffect } from "react";
import { Mic, Send } from "lucide-react";

const MOODS = {
  happy: { emoji: "😊", color: "from-emerald-300 to-emerald-400" },
  thinking: { emoji: "🤔", color: "from-sky-300 to-sky-400" },
  waiting: { emoji: "😴", color: "from-slate-300 to-slate-400" },
  celebrating: { emoji: "🎉", color: "from-amber-300 to-orange-400" },
  speaking: { emoji: "💬", color: "from-violet-300 to-violet-400" },
};

const ENCOURAGEMENTS = [
  "You're making real progress — keep going! 🌿",
  "Great focus! One more concept and you'll level up. 🔥",
  "Take a breath — you've got this. 💪",
  "Nice! That topic looked tough but you nailed it.",
  "Stay with it — small steps compound into mastery.",
  "Want me to walk you through this section?",
];

function aiReply() {
  return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
}

export default function AICompanion({ mood = "happy" }) {
  const m = MOODS[mood] || MOODS.happy;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);

  const asked = messages.length > 0;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => () => recognitionRef.current?.stop(), []);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "ai", text: aiReply() }]);
    }, 600);
  };

  const toggleMic = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Speech recognition isn't supported in this browser.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " : "") + transcript);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.start();
    recognitionRef.current = rec;
    setListening(true);
  };

  return (
    <div className="bg-card rounded-3xl border border-border/70 qs-card-shadow p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-primary qs-pulse-ring" />
          <h3 className="font-semibold text-foreground">AI Companion</h3>
        </div>
        <span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
          {listening ? "Listening…" : "Tap mic to speak"}
        </span>
      </div>

      <div className="flex gap-3 sm:gap-4 items-end">
        {/* Small digital avatar — bottom left */}
        <div className="shrink-0 self-end">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${m.color} blur-xl opacity-40 scale-110`} />
            <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center qs-float ring-4 ring-white qs-card-shadow`}>
              <span className="text-2xl leading-none drop-shadow-sm">{m.emoji === "💬" ? "✨" : m.emoji}</span>
            </div>
          </div>
        </div>

        {/* Right: response + input */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          {/* Response box — pops up only when the avatar is asked */}
          {asked && (
            <div
              ref={scrollRef}
              className="scrollbar-thin max-h-48 overflow-y-auto space-y-2 pr-1 animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              {messages.map((msg, i) => (
                <div key={i} className={msg.from === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Chat input — write or speech-to-text */}
          <div className="flex items-center gap-2 bg-secondary/60 border border-border rounded-full pl-4 pr-1.5 py-1.5 focus-within:ring-2 focus-within:ring-primary/40 transition">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
              placeholder="Ask your companion…"
              className="flex-1 min-w-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              onClick={toggleMic}
              className={`p-2 rounded-full transition ${listening ? "bg-accent text-white" : "hover:bg-secondary text-muted-foreground"}`}
              aria-label="Voice input"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={send}
              disabled={!input.trim()}
              className="p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}