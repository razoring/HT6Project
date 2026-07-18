import React, { useState, useRef } from "react";
import { UploadCloud, FileText, File, Presentation, StickyNote, X } from "lucide-react";

const ACCEPTED = [
  { ext: "PDF", icon: FileText, color: "text-red-500 bg-red-50" },
  { ext: "PPT", icon: Presentation, color: "text-orange-500 bg-orange-50" },
  { ext: "DOCX", icon: File, color: "text-blue-500 bg-blue-50" },
  { ext: "Notes", icon: StickyNote, color: "text-emerald-500 bg-emerald-50" },
];

export default function UploadArea({ onSessionStart }) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const handleFiles = (newFiles) => {
    const arr = Array.from(newFiles).map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random()}`,
      name: f.name,
      size: f.size,
      type: f.type,
    }));
    setFiles((prev) => [...prev, ...arr]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="bg-card rounded-3xl border border-border/70 qs-card-shadow overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-5">
          <div>
            <h2 className="text-xl font-bold text-foreground tracking-tight">Start a New Study Session</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Upload materials — AI will turn them into quests.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-primary qs-pulse-ring" />
            AI Quest Generator
          </span>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer p-8 sm:p-12 text-center
            ${dragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border hover:border-primary/50 hover:bg-secondary/40 bg-secondary/20"}`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.ppt,.pptx,.docx,.txt,.md"
            className="hidden"
            onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
          />
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center mb-4 qs-float">
            <UploadCloud className="w-8 h-8 text-white" />
          </div>
          <p className="font-semibold text-foreground">
            {dragging ? "Drop to upload" : "Drag & drop your study materials"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">or click to browse from your device</p>

          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {ACCEPTED.map((a) => (
              <span key={a.ext} className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-card border border-border">
                <a.icon className={`w-3.5 h-3.5 ${a.color.split(" ")[0]} ${a.color.split(" ")[1]}`} />
                {a.ext}
              </span>
            ))}
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((f) => {
              const match = ACCEPTED.find((a) => f.name.toLowerCase().includes(a.ext.toLowerCase())) || ACCEPTED[0];
              return (
                <div key={f.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border">
                  <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${match.color.split(" ")[1]} ${match.color.split(" ")[0]}`}>
                    <match.icon className="w-4.5 h-4.5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(0)} KB · Ready to analyze</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFiles(files.filter((x) => x.id !== f.id)); }}
                    className="p-1.5 rounded-lg hover:bg-card text-muted-foreground hover:text-destructive transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="px-6 sm:px-8 py-4 bg-secondary/30 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {files.length > 0 ? `${files.length} file${files.length > 1 ? "s" : ""} ready · AI will break them into study quests` : "Upload at least one file to begin"}
        </p>
        <button
          onClick={() => onSessionStart?.(files)}
          disabled={files.length === 0}
          className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full font-semibold text-sm text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-primary/25"
        >
          Generate Quests & Start
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}