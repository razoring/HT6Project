import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, Paperclip, Sparkles } from "lucide-react";

const SEED = [
  { from: "ai", text: "Hi Jordan! I've analyzed your uploaded notes. Ready to tackle Binary Trees? 🌳" },
  { from: "user", text: "Can you explain what an AVL tree is?" },
  { from: "ai", text: "Sure! An AVL tree is a self-balancing binary search tree where the heights of two child subtrees differ by at most one. Want me to show a rotation example?" },
];

export default function ChatPanel() {
  const [messages, setMessages] = useState(SEED);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "ai", text: "Great question! Based on your notes, here's the key idea — want me to break it down further? 🌿" }]);
    }, 1400);
  };

  return (
    <div className="bg-card rounded-3xl border border-border/70 qs-card-shadow flex flex-col h-[340px]">
      <div className="px-5 py-3.5 flex items-center justify-between border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4.5 h-4.5 text-primary" />
          <h3 className="font-semibold text-foreground">Ask Your AI Tutor</h3>
        </div>
        <span className="text-xs text-muted-foreground">Powered by your notes</span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            {msg.from === "ai" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-sm mr-2 shrink-0">✨</div>
            )}
            <div className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed
              ${msg.from === "user"
                ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md"
                : "bg-secondary text-foreground rounded-2xl rounded-bl-md"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-sm">✨</div>
            <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
              {[0, 1, 2].map((d) => (
                <span key={d} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-3 border-t border-border/60">
        <div className="flex items-end gap-2 bg-secondary/60 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-primary/30 transition">
          <button className="p-2 rounded-xl text-muted-foreground hover:bg-card hover:text-primary transition" aria-label="Attach">
            <Paperclip className="w-4.5 h-4.5" />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            rows={1}
            placeholder="Ask anything about your uploaded notes..."
            className="flex-1 bg-transparent resize-none text-sm py-2 max-h-24 focus:outline-none placeholder:text-muted-foreground"
          />
          <button className="p-2 rounded-xl text-muted-foreground hover:bg-card hover:text-primary transition" aria-label="Voice input">
            <Mic className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={send}
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 disabled:opacity-40 disabled:cursor-not-allowed transition"
            aria-label="Send"
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}