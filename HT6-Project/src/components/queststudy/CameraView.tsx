import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Video } from "lucide-react";

export default function CameraView({ focusStatus = "focused" }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [active, setActive] = useState(false);
  const [denied, setDenied] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setActive(true);
      setDenied(false);
    } catch (err) {
      setDenied(true);
      setActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setActive(false);
  };

  useEffect(() => () => stopCamera(), []);

  const statusMap = {
    focused: { label: "Focused", emoji: "😊", color: "text-emerald-600 bg-success/10", dot: "bg-emerald-500" },
    distracted: { label: "Distracted", emoji: "😐", color: "text-amber-600 bg-accent/10", dot: "bg-amber-500" },
    break: { label: "Needs Break", emoji: "😴", color: "text-orange-600 bg-orange-100", dot: "bg-orange-500" },
  };
  const status = statusMap[focusStatus] || statusMap.focused;

  return (
    <div className="bg-card rounded-3xl border border-border/70 qs-card-shadow overflow-hidden">
      <div className="px-5 py-3.5 flex items-center justify-between border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <Video className="w-4.5 h-4.5 text-primary" />
          <h3 className="font-semibold text-foreground">Live Camera</h3>
        </div>
        {active && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-success/10 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 qs-pulse-ring" />
            Camera Active
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${active ? "opacity-100" : "opacity-0"}`}
          />

          {!active && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                {denied ? <CameraOff className="w-7 h-7 text-white/70" /> : <Camera className="w-7 h-7 text-white/70" />}
              </div>
              <p className="text-white font-medium text-sm">
                {denied ? "Camera access denied" : "Camera is off"}
              </p>
              <p className="text-white/50 text-xs mt-1 max-w-xs">
                {denied ? "Enable camera permissions in your browser to use focus tracking." : "Turn on your camera so the AI companion can keep you on track."}
              </p>
              <button
                onClick={startCamera}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-900 text-sm font-semibold hover:bg-white/90 transition"
              >
                <Camera className="w-4 h-4" />
                Enable Camera
              </button>
            </div>
          )}

          {active && (
            <>
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 qs-pulse-ring" />
                REC
              </div>
              <button
                onClick={stopCamera}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur text-white hover:bg-black/60 transition"
                aria-label="Stop camera"
              >
                <CameraOff className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Focus tracking on
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">
                  {status.emoji} {status.label}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-secondary/50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{status.emoji}</span>
            <div>
              <p className="text-xs text-muted-foreground">Focus Status</p>
              <p className="font-semibold text-foreground">{status.label}</p>
            </div>
          </div>
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${status.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {focusStatus === "focused" ? "Looking great!" : focusStatus === "distracted" ? "Refocus" : "Take a pause"}
          </span>
        </div>
      </div>
    </div>
  );
}