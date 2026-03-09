"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

/* ── Fake event data ── */
const events = [
  { day: "WED", date: "12", items: [
    { title: "Weekly 1:1 (Maksym & Seti)", time: "11 – 11:30", url: "https://meet.sangoma.com/9", avatars: [5, 12], more: null, highlight: false },
    { title: "CPO Terry Microsoft Company", time: "12 – 13:30", url: "https://meet.sangoma.com/4", avatars: [33, 53], more: null, highlight: false },
  ]},
  { day: "THU", date: "13", items: [
    { title: "Weekly Design Team Meeting", time: "11 – 11:30", url: "https://meet.sangoma.com/2", avatars: [9, 32], more: null, highlight: false },
    { title: "Daniel / Maksym status update", time: "9:15 – 9:45", url: "https://meet.sangoma.com/22321", avatars: [11, 12, 68], more: "+ 17 more", highlight: true },
    { title: "Daniel / Maksym status update", time: "9:15 – 9:45", url: "https://meet.sangoma.com/22321", avatars: [], more: null, highlight: false },
  ]},
  { day: "FRI", date: "14", items: [
    { title: "Meet POST meet notes", time: "11 – 11:30", url: "https://meet.sangoma.com/2", avatars: [5], more: null, highlight: false },
    { title: "Sync up: Control Panel Project", time: "9:15 – 9:45", url: "https://meet.sangoma.com/45553", avatars: [], more: null, highlight: false },
  ]},
  { day: "SAT", date: "15", items: [
    { title: "Weekly 1:1 (Maksym & Seti)", time: "11 – 11:30", url: "https://meet.sangoma.com/9", avatars: [5, 12], more: null, highlight: false },
    { title: "CPO Terry Microsoft Company", time: "12 – 13:30", url: "https://meet.sangoma.com/4", avatars: [33, 53], more: null, highlight: false },
  ]},
];

const recordings = [
  { title: "Sprint Review Recording", date: "Mar 3, 2026", duration: "47:12", size: "128 MB" },
  { title: "Design Sync — Feb 28", date: "Feb 28, 2026", duration: "31:05", size: "84 MB" },
  { title: "All-Hands Q1 Wrap-up", date: "Feb 25, 2026", duration: "1:02:30", size: "256 MB" },
  { title: "Client Demo — Acme Corp", date: "Feb 20, 2026", duration: "22:18", size: "62 MB" },
  { title: "Product Roadmap Discussion", date: "Feb 18, 2026", duration: "55:40", size: "148 MB" },
];

export default function MeetPage() {
  const [sideTab, setSideTab] = useState<"events" | "recordings">("events");
  const [eventsTab, setEventsTab] = useState<"upcoming" | "past">("upcoming");
  const [meetingActive, setMeetingActive] = useState(false);
  const [meetingMinimized, setMeetingMinimized] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);

  const handleJoinMeeting = (title?: string) => {
    setMeetingTitle(title || "New Meeting");
    setMeetingActive(true);
  };

  const handleEndMeeting = () => {
    setMeetingActive(false);
    setMeetingMinimized(false);
    setMeetingTitle("");
  };

  if (meetingActive && !meetingMinimized) {
    return <MeetingView title={meetingTitle} onEnd={handleEndMeeting} onMinimize={() => setMeetingMinimized(true)} />;
  }

  return (
    <div className="flex h-full relative">
      {/* Minimized meeting floating card */}
      {meetingActive && meetingMinimized && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1a0a2e] rounded-2xl shadow-2xl shadow-black/30 overflow-hidden transition-all duration-300" style={{ width: 320, animation: "slideIn 0.25s ease-out" }}>
          {/* Camera preview / avatar strip */}
          <div className="relative h-[100px] bg-gradient-to-br from-[#2E1055] to-[#1a0a2e] flex items-center justify-center">
            <div className="flex items-center gap-2">
              {[5, 12, 33].map((id) => (
                <Image key={id} src={`https://i.pravatar.cc/128?img=${id}`} alt="" width={48} height={48} className="w-12 h-12 rounded-full border-2 border-white/20 object-cover" unoptimized />
              ))}
            </div>
            <div className="absolute top-2 left-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
              <span className="text-white/60 text-[11px] font-medium">LIVE</span>
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-white text-[14px] font-medium">{meetingTitle}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-white/50 text-[12px]">3 participants</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMeetingMinimized(false)}
                className="flex-1 py-2 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors active:scale-95"
              >
                Expand
              </button>
              <button
                onClick={handleEndMeeting}
                className="flex-1 py-2 rounded-lg bg-[#EF4444] text-white text-xs font-medium hover:bg-[#DC2626] transition-colors active:scale-95"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left sidebar */}
      <div className="w-[220px] shrink-0 border-r border-[#E5E6E8] bg-white flex flex-col">
        <div className="px-4 pt-5 pb-3">
          <button
            onClick={() => setSideTab("events")}
            className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
              sideTab === "events" ? "bg-[#F2F0F5] text-[#2E1055]" : "text-[#4C5863] hover:bg-[#F9F9FA]"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke={sideTab === "events" ? "#2E1055" : "#7F888F"} strokeWidth="1.3"/>
              <path d="M2 6h12" stroke={sideTab === "events" ? "#2E1055" : "#7F888F"} strokeWidth="1.3"/>
              <circle cx="5" cy="9.5" r="1" fill={sideTab === "events" ? "#2E1055" : "#7F888F"}/>
              <circle cx="8" cy="9.5" r="1" fill={sideTab === "events" ? "#2E1055" : "#7F888F"}/>
            </svg>
            Events
          </button>
          <button
            onClick={() => setSideTab("recordings")}
            className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all mt-1 ${
              sideTab === "recordings" ? "bg-[#F2F0F5] text-[#2E1055]" : "text-[#4C5863] hover:bg-[#F9F9FA]"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke={sideTab === "recordings" ? "#2E1055" : "#7F888F"} strokeWidth="1.3"/>
              <circle cx="8" cy="8" r="2.5" stroke={sideTab === "recordings" ? "#2E1055" : "#7F888F"} strokeWidth="1.3"/>
            </svg>
            My recordings
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {sideTab === "events" ? (
          <EventsContent eventsTab={eventsTab} setEventsTab={setEventsTab} onJoinMeeting={handleJoinMeeting} showSchedule={showSchedule} setShowSchedule={setShowSchedule} />
        ) : (
          <RecordingsContent />
        )}
      </div>
    </div>
  );
}

/* ── Video Meeting with REAL camera ── */
function MeetingView({ title, onEnd, onMinimize }: { title: string; onEnd: () => void; onMinimize?: () => void }) {
  const [timer, setTimer] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenShare, setScreenShare] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const formatTime = useCallback((s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`, []);

  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  /* Request camera */
  useEffect(() => {
    let cancelled = false;
    async function startCam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) { videoRef.current.srcObject = stream; }
      } catch { /* camera denied — show fallback */ }
    }
    if (camOn) startCam();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    };
  }, [camOn]);

  return (
    <div className="flex flex-col h-full bg-[#0d0518]" style={{ animation: "fadeIn 0.4s ease-out" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#1a0a2e]/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
          <span className="text-white/70 text-xs font-medium">{formatTime(timer)}</span>
          <span className="text-white text-sm font-semibold">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-xs">3 participants</span>
          <div className="flex -space-x-1.5">
            {[5, 12, 33].map((id) => (
              <Image key={id} src={`https://i.pravatar.cc/64?img=${id}`} alt="" width={24} height={24} className="w-6 h-6 rounded-full border-2 border-[#1a0a2e] object-cover" unoptimized />
            ))}
          </div>
          {onMinimize && (
            <button onClick={onMinimize} className="ml-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors active:scale-90" title="Minimize">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7"/></svg>
            </button>
          )}
        </div>
      </div>

      {/* Video grid */}
      <div className="flex-1 flex items-center justify-center p-6 gap-4">
        {/* Main video (self — real camera, primary active view) */}
        <div className="flex-1 aspect-video bg-gradient-to-br from-[#2E1055] to-[#1a0a2e] rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
          {camOn ? (
            <>
              <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover rounded-2xl" style={{ transform: "scaleX(-1)" }} />
              {/* Fallback if camera didn't start yet */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {!streamRef.current && (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2E1055] flex items-center justify-center">
                    <span className="text-white text-2xl font-semibold">You</span>
                  </div>
                )}
              </div>
              <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm rounded-lg px-2.5 py-1 text-white text-xs font-medium flex items-center gap-1.5 z-10">
                {!micOn && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6"/></svg>}
                You
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><path d="M16 16v1a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h2m5.66 0H14a2 2 0 012 2v3.34l1 1L23 7v10"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </div>
              <span className="text-white/40 text-xs">Camera off</span>
            </div>
          )}
        </div>

        {/* Participants */}
        <div className="flex flex-col gap-3 w-48">
          {[{ name: "Maksym O.", img: 12 }, { name: "Seti K.", img: 5 }, { name: "Terry C.", img: 33 }].map((p, i) => (
            <div key={i} className="aspect-video bg-gradient-to-br from-[#1D2B3E] to-[#0d1520] rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{ animation: `fadeIn 0.3s ease-out ${0.1 * i}s both` }}>
              <Image src={`https://i.pravatar.cc/128?img=${p.img}`} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover" unoptimized />
              <div className="absolute bottom-1.5 left-2 text-white/70 text-[10px] font-medium">{p.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 py-4 bg-[#1a0a2e]/60 backdrop-blur-sm">
        <button onClick={() => setMicOn(!micOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${micOn ? "bg-white/10 hover:bg-white/20" : "bg-[#EF4444] hover:bg-[#DC2626]"}`} title={micOn ? "Mute" : "Unmute"}>
          {micOn ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6"/><path d="M17 16.95A7 7 0 015 12v-2m14 0v2c0 .76-.13 1.5-.35 2.18"/><line x1="12" y1="19" x2="12" y2="23"/></svg>
          )}
        </button>
        <button onClick={() => setCamOn(!camOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${camOn ? "bg-white/10 hover:bg-white/20" : "bg-[#EF4444] hover:bg-[#DC2626]"}`} title={camOn ? "Turn off camera" : "Turn on camera"}>
          {camOn ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M16 16v1a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h2m5.66 0H14a2 2 0 012 2v3.34l1 1L23 7v10"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          )}
        </button>
        <button onClick={() => setScreenShare(!screenShare)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${screenShare ? "bg-[#2CAD43]" : "bg-white/10 hover:bg-white/20"}`} title="Share screen">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </button>
        <div className="w-px h-8 bg-white/10 mx-1" />
        {/* Transcription */}
        <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90" title="Transcription">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M4 7h16M4 12h10M4 17h12"/><path d="M20 12v5a2 2 0 01-2 2h-1"/></svg>
        </button>
        {/* Add participant */}
        <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90" title="Add participant">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
        </button>
        {/* Reactions */}
        <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90" title="Reactions">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
        </button>
        {/* Raise hand */}
        <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90" title="Raise hand">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M18 11V6a1 1 0 00-2 0M14 10V4a1 1 0 00-2 0v6M10 9.5V5a1 1 0 00-2 0v9"/><path d="M18 11a4 4 0 014 4v1a8 8 0 01-8 8h-2c-2.5 0-4.5-1-6.2-2.7L2 17.5"/></svg>
        </button>
        {/* Chat */}
        <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90" title="Chat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        </button>
        {/* Settings */}
        <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90" title="Settings">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
        </button>
        <div className="w-px h-8 bg-white/10 mx-1" />
        <button onClick={onEnd} className="px-6 h-12 rounded-full bg-[#EF4444] hover:bg-[#DC2626] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-[#EF4444]/20">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M23.71 16.67C20.66 13.78 16.54 12 12 12 7.46 12 3.34 13.78.29 16.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1C8.69 14.25 10.32 14 12 14s3.31.25 4.9.72v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.27-.11-.52-.29-.7z"/></svg>
          <span className="text-white text-sm font-semibold">Leave</span>
        </button>
      </div>
    </div>
  );
}

/* ── Schedule Meeting Popup ── */
function SchedulePopup({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2026-03-10");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");
  const [description, setDescription] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose} style={{ animation: "fadeIn 0.2s ease-out" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-[480px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} style={{ animation: "slideIn 0.25s ease-out" }}>
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h2 className="text-[18px] font-semibold text-[#001221]">Schedule Meeting</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F2F2F3] transition-colors active:scale-90">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#7F888F" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="px-6 pb-6 space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#7F888F] uppercase tracking-wider mb-1.5">Meeting title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter meeting name" className="w-full px-3.5 py-2.5 text-[14px] text-[#001221] border border-[#E5E6E8] rounded-xl bg-white focus:outline-none focus:border-[#2E1055] focus:ring-1 focus:ring-[#2E1055]/20 transition-all placeholder:text-[#CCCFD2]" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="block text-[12px] font-semibold text-[#7F888F] uppercase tracking-wider mb-1.5">Date</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3.5 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-xl bg-white focus:outline-none focus:border-[#2E1055] transition-all" /></div>
            <div><label className="block text-[12px] font-semibold text-[#7F888F] uppercase tracking-wider mb-1.5">Start</label><input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full px-3.5 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-xl bg-white focus:outline-none focus:border-[#2E1055] transition-all" /></div>
            <div><label className="block text-[12px] font-semibold text-[#7F888F] uppercase tracking-wider mb-1.5">End</label><input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full px-3.5 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-xl bg-white focus:outline-none focus:border-[#2E1055] transition-all" /></div>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#7F888F] uppercase tracking-wider mb-1.5">Participants</label>
            <div className="flex items-center gap-2 px-3.5 py-2 border border-[#E5E6E8] rounded-xl">
              <div className="flex -space-x-1.5">{[5, 12].map((id) => (<Image key={id} src={`https://i.pravatar.cc/64?img=${id}`} alt="" width={24} height={24} className="w-6 h-6 rounded-full border-2 border-white object-cover" unoptimized />))}</div>
              <input type="text" placeholder="Add participants..." className="flex-1 outline-none text-[13px] text-[#001221] placeholder:text-[#CCCFD2]" />
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#7F888F] uppercase tracking-wider mb-1.5">Meeting link</label>
            <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#F9F9FA] border border-[#E5E6E8] rounded-xl">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="1.5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              <span className="text-[13px] text-[#7F888F] flex-1 truncate">https://meet.sangoma.com/new-{Math.random().toString(36).slice(2, 7)}</span>
              <button className="text-[12px] text-[#2E1055] font-medium hover:underline">Copy</button>
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#7F888F] uppercase tracking-wider mb-1.5">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add a description or agenda..." rows={3} className="w-full px-3.5 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-xl bg-white focus:outline-none focus:border-[#2E1055] focus:ring-1 focus:ring-[#2E1055]/20 transition-all placeholder:text-[#CCCFD2] resize-none" />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-5 py-2.5 text-[13px] text-[#4C5863] font-medium rounded-xl hover:bg-[#F2F2F3] transition-colors">Cancel</button>
            <button onClick={onClose} className="px-5 py-2.5 text-[13px] text-white font-semibold rounded-xl bg-[#2E1055] hover:bg-[#3d1670] transition-colors active:scale-95">Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Events content ── */
function EventsContent({ eventsTab, setEventsTab, onJoinMeeting, showSchedule, setShowSchedule }: {
  eventsTab: "upcoming" | "past"; setEventsTab: (t: "upcoming" | "past") => void;
  onJoinMeeting: (title?: string) => void; showSchedule: boolean; setShowSchedule: (v: boolean) => void;
}) {
  return (
    <>
      {showSchedule && <SchedulePopup onClose={() => setShowSchedule(false)} />}

      {/* Header — matches Figma 2466-16690 exactly */}
      <div className="px-4 pt-3 pb-4 border-b border-[#E5E6E8]">
        {/* Single row: left info | center toggle | right controls */}
        <div className="flex items-center gap-2">
          {/* Left: Title + status */}
          <div className="shrink-0">
            <h1 className="text-[18px] font-semibold text-[#18181B] leading-none mb-1">Events</h1>
            <div className="flex items-center gap-1 text-[12px]">
              <span className="flex items-center gap-1">
                <span className="w-[13px] h-[13px] rounded-full bg-[#099F24] flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M3 6l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <span className="text-[#18181B]">Today <b>2</b> events done</span>
              </span>
              <span className="text-[#E5E6E8] mx-0.5">|</span>
              <span className="flex items-center gap-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#7F888F" strokeWidth="1.5"/><path d="M12 7v5l3 3" stroke="#7F888F" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <span className="text-[#18181B]"><b>3</b> scheduled</span>
              </span>
            </div>
          </div>

          {/* Center: Upcoming/Past toggle — 28px height, rounded-lg, centered */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center">
              <button
                onClick={() => setEventsTab("upcoming")}
                className={`px-4 py-1 rounded-lg text-[14px] font-medium transition-all ${
                  eventsTab === "upcoming"
                    ? "bg-[#001221] text-white"
                    : "text-[#18181B] hover:text-[#4C5863]"
                }`}
                style={{ height: 28 }}
              >
                Upcoming
              </button>
              <button
                onClick={() => setEventsTab("past")}
                className={`px-4 py-1 rounded-lg text-[14px] font-medium transition-all ${
                  eventsTab === "past"
                    ? "bg-[#001221] text-white"
                    : "text-[#18181B] hover:text-[#4C5863]"
                }`}
                style={{ height: 28 }}
              >
                Past events
              </button>
            </div>
          </div>

          {/* Right: All events + Search */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-1 text-[12px] text-[#18181B] hover:text-[#001221] transition-colors">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              All events
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div className="relative">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="absolute left-2 top-1/2 -translate-y-1/2">
                <circle cx="7" cy="7" r="4.5" stroke="#7F888F" strokeWidth="1.3"/><path d="M10.5 10.5L13.5 13.5" stroke="#7F888F" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <input type="text" placeholder="Search" className="pl-7 pr-3 py-1 w-[184px] text-[12px] text-[#001221] bg-[#F4F4F5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E1055]/20 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons — Figma 2466-16738: 64x63px, rounded-[20px], 24px icons, gap 64px */}
      <div className="flex items-center justify-center gap-16 py-4">
        {/* New meeting */}
        <button onClick={() => onJoinMeeting("New Meeting")} className="flex flex-col items-center gap-2 group">
          <div className="w-16 h-[63px] rounded-[20px] flex items-center justify-center group-hover:shadow-lg group-active:scale-95 transition-all" style={{ background: "rgba(156,50,140,0.08)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M23.196 7.94925C22.8922 7.28475 22.1483 6.89175 21.4395 7.06875C20.9018 7.203 20.3257 7.515 19.7235 7.92075C19.452 8.10375 19.332 8.43675 19.4183 8.7525C20.007 10.9147 20.007 13.0852 19.4183 15.2475C19.332 15.5632 19.452 15.897 19.7235 16.0792C20.3265 16.485 20.9025 16.797 21.4402 16.9313C22.149 17.1083 22.893 16.7145 23.1968 16.05C24.2378 13.77 24.2377 10.23 23.196 7.94925ZM3.69975 5.92125C7.8525 4.3485 12.0053 4.3485 16.158 5.92125C16.5248 6.06 16.839 6.3405 17.0212 6.7005C18.804 10.2337 18.804 13.767 17.0212 17.2995C16.8397 17.6595 16.5255 17.94 16.158 18.0787C12.0053 19.6515 7.8525 19.6515 3.69975 18.0787C3.333 17.94 3.01875 17.6595 2.8365 17.2995C1.05375 13.7662 1.05375 10.2337 2.8365 6.7005C3.01875 6.3405 3.333 6.06 3.69975 5.92125Z" fill="#9C328C"/>
            </svg>
          </div>
          <span className="text-[13px] font-medium text-[#5b074e] tracking-[0.25px]">New meeting</span>
        </button>

        {/* Join — exact Figma filled icon */}
        <button onClick={() => onJoinMeeting("Meeting Room")} className="flex flex-col items-center gap-2 group">
          <div className="w-16 h-[63px] rounded-[20px] flex items-center justify-center group-hover:shadow-lg group-active:scale-95 transition-all" style={{ background: "rgba(36,76,145,0.04)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21.1332 19.2927C20.9191 20.1968 20.1966 20.9192 19.2926 21.1333C16.8728 21.7074 14.4364 21.9949 12 21.9949C9.56359 21.9949 7.12717 21.7074 4.70743 21.1333C3.80335 20.9192 3.08093 20.1968 2.86679 19.2918C1.71774 14.4532 1.71774 9.54703 2.86679 4.70753C3.08093 3.80346 3.80335 3.08103 4.70826 2.86689C9.54692 1.71784 14.4522 1.71784 19.2926 2.86689C20.1966 3.08103 20.9191 3.80346 21.1332 4.70836C22.2823 9.54703 22.2823 14.4532 21.1332 19.2927ZM16.1662 11.1669H12.8332V7.83387C12.8332 7.37308 12.4608 7.00062 12 7.00062C11.5392 7.00062 11.1668 7.37308 11.1668 7.83387V11.1669H7.83377C7.37298 11.1669 7.00052 11.5393 7.00052 12.0001C7.00052 12.4609 7.37298 12.8333 7.83377 12.8333H11.1668V16.1663C11.1668 16.6271 11.5392 16.9996 12 16.9996C12.4608 16.9996 12.8332 16.6271 12.8332 16.1663V12.8333H16.1662C16.627 12.8333 16.9995 12.4609 16.9995 12.0001C16.9995 11.5393 16.627 11.1669 16.1662 11.1669Z" fill="#244C91"/>
            </svg>
          </div>
          <span className="text-[13px] font-medium text-[#244c91] tracking-[0.25px]">Join</span>
        </button>

        {/* Schedule — exact Figma filled calendar icon */}
        <button onClick={() => setShowSchedule(true)} className="flex flex-col items-center gap-2 group">
          <div className="w-16 h-[63px] rounded-[20px] flex items-center justify-center group-hover:shadow-lg group-active:scale-95 transition-all" style={{ background: "rgba(36,76,145,0.04)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21.3534 6.44325C21.1674 5.8605 20.6844 5.409 20.0927 5.25375C19.4784 5.09325 18.8642 4.95525 18.2499 4.836V5.577C18.2499 5.991 17.9147 6.327 17.4999 6.327C17.0852 6.327 16.7499 5.991 16.7499 5.577V3.75C16.7499 3.336 16.4147 3 15.9999 3C15.5852 3 15.2499 3.336 15.2499 3.75V4.425C13.7499 4.302 12.2499 4.305 10.7499 4.4295V5.577C10.7499 5.991 10.4147 6.327 9.99993 6.327C9.58518 6.327 9.24993 5.991 9.24993 5.577V3.75C9.24993 3.336 8.91468 3 8.49993 3C8.08518 3 7.74993 3.336 7.74993 3.75V4.842C7.13568 4.95975 6.52143 5.09325 5.90718 5.2545C5.31543 5.409 4.83243 5.8605 4.64643 6.44325C3.30243 10.6477 3.30243 14.8523 4.64643 19.056C4.83243 19.6388 5.31543 20.0903 5.90718 20.2455C10.6359 21.4852 15.3647 21.4852 20.0934 20.2455C20.6852 20.0903 21.1674 19.6388 21.3542 19.056C22.6974 14.8523 22.6974 10.6477 21.3534 6.44325ZM8.49993 17.25C8.08593 17.25 7.74993 16.914 7.74993 16.5C7.74993 16.086 8.08593 15.75 8.49993 15.75C8.91393 15.75 9.24993 16.086 9.24993 16.5C9.24993 16.914 8.91393 17.25 8.49993 17.25ZM8.49993 14.25C8.08593 14.25 7.74993 13.914 7.74993 13.5C7.74993 13.086 8.08593 12.75 8.49993 12.75C8.91393 12.75 9.24993 13.086 9.24993 13.5C9.24993 13.914 8.91393 14.25 8.49993 14.25ZM11.4999 17.25C11.0859 17.25 10.7499 16.914 10.7499 16.5C10.7499 16.086 11.0859 15.75 11.4999 15.75C11.9139 15.75 12.2499 16.086 12.2499 16.5C12.2499 16.914 11.9139 17.25 11.4999 17.25ZM11.4999 14.25C11.0859 14.25 10.7499 13.914 10.7499 13.5C10.7499 13.086 11.0859 12.75 11.4999 12.75C11.9139 12.75 12.2499 13.086 12.2499 13.5C12.2499 13.914 11.9139 14.25 11.4999 14.25ZM11.4999 11.25C11.0859 11.25 10.7499 10.914 10.7499 10.5C10.7499 10.086 11.0859 9.75 11.4999 9.75C11.9139 9.75 12.2499 10.086 12.2499 10.5C12.2499 10.914 11.9139 11.25 11.4999 11.25ZM14.4999 17.625C13.8789 17.625 13.3749 17.121 13.3749 16.5C13.3749 15.879 13.8789 15.375 14.4999 15.375C15.1209 15.375 15.6249 15.879 15.6249 16.5C15.6249 17.121 15.1209 17.625 14.4999 17.625ZM14.4999 14.25C14.0859 14.25 13.7499 13.914 13.7499 13.5C13.7499 13.086 14.0859 12.75 14.4999 12.75C14.9139 12.75 15.2499 13.086 15.2499 13.5C15.2499 13.914 14.9139 14.25 14.4999 14.25ZM14.4999 11.25C14.0859 11.25 13.7499 10.914 13.7499 10.5C13.7499 10.086 14.0859 9.75 14.4999 9.75C14.9139 9.75 15.2499 10.086 15.2499 10.5C15.2499 10.914 14.9139 11.25 14.4999 11.25ZM17.4999 14.25C17.0859 14.25 16.7499 13.914 16.7499 13.5C16.7499 13.086 17.0859 12.75 17.4999 12.75C17.9139 12.75 18.2499 13.086 18.2499 13.5C18.2499 13.914 17.9139 14.25 17.4999 14.25ZM17.4999 11.25C17.0859 11.25 16.7499 10.914 16.7499 10.5C16.7499 10.086 17.0859 9.75 17.4999 9.75C17.9139 9.75 18.2499 10.086 18.2499 10.5C18.2499 10.914 17.9139 11.25 17.4999 11.25Z" fill="#244C91"/>
            </svg>
          </div>
          <span className="text-[13px] font-medium text-[#244c91] tracking-[0.25px]">Schedule</span>
        </button>
      </div>

      {/* Event list */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {events.map((group, gi) => (
          <div key={gi} className="mb-1">
            {group.items.map((event, ei) => (
              <div key={ei} onClick={() => onJoinMeeting(event.title)} className={`flex items-center gap-4 py-3 border-b border-[#F2F2F3] hover:bg-[#F9F9FA] transition-colors cursor-pointer group ${event.highlight ? "bg-[#FFF8E1] hover:bg-[#FFF3CD]" : ""}`} style={{ animation: `fadeIn 0.2s ease-out ${0.03 * (gi * 3 + ei)}s both` }}>
                <div className="w-12 shrink-0 text-center">
                  {ei === 0 && (<><div className="text-[11px] text-[#7F888F] uppercase tracking-wider font-medium">{group.day}</div><div className="text-[24px] font-semibold text-[#001221] leading-none mt-0.5">{group.date}</div></>)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-[#001221]">{event.title}</div>
                  <div className="text-[12px] text-[#7F888F] mt-0.5">{event.time} at {event.url}</div>
                </div>
                <div className="flex items-center -space-x-2 shrink-0">
                  {event.avatars.map((id) => (<Image key={id} src={`https://i.pravatar.cc/64?img=${id}`} alt="" width={28} height={28} className="w-7 h-7 rounded-full border-2 border-white object-cover" unoptimized />))}
                </div>
                {event.more && <span className="text-[12px] text-[#7F888F] shrink-0">{event.more}</span>}
                <button onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-lg hover:bg-[#F2F2F3] opacity-0 group-hover:opacity-100 transition-all active:scale-90 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.333 2a1.886 1.886 0 012.667 2.667l-8.167 8.166L2.5 13.5l.667-3.333L11.333 2z" stroke="#7F888F" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Recordings content ── */
function RecordingsContent() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="px-6 pt-5 pb-4">
        <h1 className="text-[22px] font-semibold text-[#001221] mb-4">My Recordings</h1>
        <div className="relative mb-4">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2"><circle cx="7" cy="7" r="4.5" stroke="#7F888F" strokeWidth="1.3"/><path d="M10.5 10.5L13.5 13.5" stroke="#7F888F" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <input type="text" placeholder="Search recordings..." className="pl-9 pr-3 py-2 w-full max-w-md text-[13px] text-[#001221] border border-[#E5E6E8] rounded-lg bg-white focus:outline-none focus:border-[#2E1055] transition-colors" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="flex flex-col">
          {recordings.map((rec, i) => (
            <div key={i} className="flex items-center gap-4 py-3.5 border-b border-[#F2F2F3] hover:bg-[#F9F9FA] transition-colors cursor-pointer group" style={{ animation: `fadeIn 0.2s ease-out ${0.05 * i}s both` }}>
              <button className="w-9 h-9 rounded-full bg-[#F2F0F5] flex items-center justify-center shrink-0 hover:bg-[#E8E0FF] active:scale-90 transition-all"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5 3v10l8-5-8-5z" fill="#2E1055"/></svg></button>
              <div className="flex-1 min-w-0"><div className="text-[14px] font-medium text-[#001221]">{rec.title}</div><div className="text-[12px] text-[#7F888F] mt-0.5">{rec.date} · {rec.duration}</div></div>
              <span className="text-[12px] text-[#7F888F] shrink-0">{rec.size}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-lg hover:bg-[#F2F2F3] active:scale-90 transition-all" title="Download"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10" stroke="#7F888F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                <button className="p-1.5 rounded-lg hover:bg-[#F2F2F3] active:scale-90 transition-all" title="Delete"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 5h8l-.667 8H4.667L4 5zM6 3h4M3 5h10" stroke="#7F888F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
