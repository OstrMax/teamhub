"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [meetingTitle, setMeetingTitle] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);

  const handleJoinMeeting = (title?: string) => {
    setMeetingTitle(title || "New Meeting");
    setMeetingActive(true);
  };

  const handleEndMeeting = () => {
    setMeetingActive(false);
    setMeetingTitle("");
  };

  /* ── Video meeting simulation overlay ── */
  if (meetingActive) {
    return <MeetingView title={meetingTitle} onEnd={handleEndMeeting} />;
  }

  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <div className="w-[220px] shrink-0 border-r border-[#E5E6E8] bg-white flex flex-col">
        <div className="px-4 pt-5 pb-3">
          <button
            onClick={() => setSideTab("events")}
            className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
              sideTab === "events"
                ? "bg-[#F2F0F5] text-[#2E1055]"
                : "text-[#4C5863] hover:bg-[#F9F9FA]"
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
              sideTab === "recordings"
                ? "bg-[#F2F0F5] text-[#2E1055]"
                : "text-[#4C5863] hover:bg-[#F9F9FA]"
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
          <EventsContent
            eventsTab={eventsTab}
            setEventsTab={setEventsTab}
            onJoinMeeting={handleJoinMeeting}
            showSchedule={showSchedule}
            setShowSchedule={setShowSchedule}
          />
        ) : (
          <RecordingsContent />
        )}
      </div>
    </div>
  );
}

/* ── Video Meeting Simulation ── */
function MeetingView({ title, onEnd }: { title: string; onEnd: () => void }) {
  const [timer, setTimer] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenShare, setScreenShare] = useState(false);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0d0518]" style={{ animation: "fadeIn 0.4s ease-out" }}>
      {/* Meeting top bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#1a0a2e]/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
            <span className="text-white/70 text-xs font-medium">{formatTime(timer)}</span>
          </div>
          <span className="text-white text-sm font-semibold">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-xs">3 participants</span>
          <div className="flex -space-x-1.5">
            {[5, 12, 33].map((id) => (
              <Image key={id} src={`https://i.pravatar.cc/64?img=${id}`} alt="" width={24} height={24} className="w-6 h-6 rounded-full border-2 border-[#1a0a2e] object-cover" unoptimized />
            ))}
          </div>
        </div>
      </div>

      {/* Video grid */}
      <div className="flex-1 flex items-center justify-center p-6 gap-4">
        {/* Main video (self) */}
        <div className="flex-1 max-w-[600px] aspect-video bg-gradient-to-br from-[#2E1055] to-[#1a0a2e] rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
          {camOn ? (
            <>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2E1055] flex items-center justify-center mb-3">
                <span className="text-white text-2xl font-semibold">You</span>
              </div>
              <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm rounded-lg px-2.5 py-1 text-white text-xs font-medium flex items-center gap-1.5">
                {!micOn && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6"/></svg>}
                You
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white/50" strokeWidth="1.5"><path d="M1 1l22 22M21 21H3a2 2 0 01-2-2V8a2 2 0 012-2h3m3-3h6l2 3h4a2 2 0 012 2v9.34"/></svg>
              </div>
              <span className="text-white/40 text-xs">Camera off</span>
            </div>
          )}
        </div>

        {/* Other participants */}
        <div className="flex flex-col gap-3 w-48">
          {[
            { name: "Maksym O.", img: 12 },
            { name: "Seti K.", img: 5 },
            { name: "Terry C.", img: 33 },
          ].map((p, i) => (
            <div key={i} className="aspect-video bg-gradient-to-br from-[#1D2B3E] to-[#0d1520] rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{ animation: `fadeIn 0.3s ease-out ${0.1 * i}s both` }}
            >
              <Image src={`https://i.pravatar.cc/128?img=${p.img}`} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover" unoptimized />
              <div className="absolute bottom-1.5 left-2 text-white/70 text-[10px] font-medium">{p.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Meeting controls */}
      <div className="flex items-center justify-center gap-3 py-4 bg-[#1a0a2e]/60 backdrop-blur-sm">
        <button
          onClick={() => setMicOn(!micOn)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${micOn ? "bg-white/10 hover:bg-white/20" : "bg-[#EF4444] hover:bg-[#DC2626]"}`}
        >
          {micOn ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6"/><path d="M17 16.95A7 7 0 015 12v-2m14 0v2c0 .76-.13 1.5-.35 2.18"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          )}
        </button>
        <button
          onClick={() => setCamOn(!camOn)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${camOn ? "bg-white/10 hover:bg-white/20" : "bg-[#EF4444] hover:bg-[#DC2626]"}`}
        >
          {camOn ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M16 16v1a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h2m5.66 0H14a2 2 0 012 2v3.34l1 1L23 7v10"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          )}
        </button>
        <button
          onClick={() => setScreenShare(!screenShare)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${screenShare ? "bg-[#2CAD43] hover:bg-[#259c3a]" : "bg-white/10 hover:bg-white/20"}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </button>
        <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        </button>
        <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
        <div className="w-px h-8 bg-white/10 mx-1" />
        <button
          onClick={onEnd}
          className="px-6 h-12 rounded-full bg-[#EF4444] hover:bg-[#DC2626] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-[#EF4444]/20"
        >
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
      <div
        className="bg-white rounded-2xl shadow-2xl w-[480px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideIn 0.25s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h2 className="text-[18px] font-semibold text-[#001221]">Schedule Meeting</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F2F2F3] transition-colors active:scale-90">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#7F888F" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Meeting title */}
          <div>
            <label className="block text-[12px] font-semibold text-[#7F888F] uppercase tracking-wider mb-1.5">Meeting title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter meeting name"
              className="w-full px-3.5 py-2.5 text-[14px] text-[#001221] border border-[#E5E6E8] rounded-xl bg-white focus:outline-none focus:border-[#2E1055] focus:ring-1 focus:ring-[#2E1055]/20 transition-all placeholder:text-[#CCCFD2]"
            />
          </div>

          {/* Date + Time row */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-[#7F888F] uppercase tracking-wider mb-1.5">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-xl bg-white focus:outline-none focus:border-[#2E1055] transition-all"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#7F888F] uppercase tracking-wider mb-1.5">Start</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3.5 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-xl bg-white focus:outline-none focus:border-[#2E1055] transition-all"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#7F888F] uppercase tracking-wider mb-1.5">End</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3.5 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-xl bg-white focus:outline-none focus:border-[#2E1055] transition-all"
              />
            </div>
          </div>

          {/* Participants */}
          <div>
            <label className="block text-[12px] font-semibold text-[#7F888F] uppercase tracking-wider mb-1.5">Participants</label>
            <div className="flex items-center gap-2 px-3.5 py-2 border border-[#E5E6E8] rounded-xl">
              <div className="flex -space-x-1.5">
                {[5, 12].map((id) => (
                  <Image key={id} src={`https://i.pravatar.cc/64?img=${id}`} alt="" width={24} height={24} className="w-6 h-6 rounded-full border-2 border-white object-cover" unoptimized />
                ))}
              </div>
              <input type="text" placeholder="Add participants..." className="flex-1 outline-none text-[13px] text-[#001221] placeholder:text-[#CCCFD2]" />
            </div>
          </div>

          {/* Meeting link */}
          <div>
            <label className="block text-[12px] font-semibold text-[#7F888F] uppercase tracking-wider mb-1.5">Meeting link</label>
            <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#F9F9FA] border border-[#E5E6E8] rounded-xl">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="1.5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              <span className="text-[13px] text-[#7F888F] flex-1 truncate">https://meet.sangoma.com/new-{Math.random().toString(36).slice(2, 7)}</span>
              <button className="text-[12px] text-[#2E1055] font-medium hover:underline">Copy</button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[12px] font-semibold text-[#7F888F] uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description or agenda..."
              rows={3}
              className="w-full px-3.5 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-xl bg-white focus:outline-none focus:border-[#2E1055] focus:ring-1 focus:ring-[#2E1055]/20 transition-all placeholder:text-[#CCCFD2] resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-5 py-2.5 text-[13px] text-[#4C5863] font-medium rounded-xl hover:bg-[#F2F2F3] transition-colors">
              Cancel
            </button>
            <button onClick={onClose} className="px-5 py-2.5 text-[13px] text-white font-semibold rounded-xl bg-[#2E1055] hover:bg-[#3d1670] transition-colors active:scale-95">
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Events content ── */
function EventsContent({
  eventsTab,
  setEventsTab,
  onJoinMeeting,
  showSchedule,
  setShowSchedule,
}: {
  eventsTab: "upcoming" | "past";
  setEventsTab: (t: "upcoming" | "past") => void;
  onJoinMeeting: (title?: string) => void;
  showSchedule: boolean;
  setShowSchedule: (v: boolean) => void;
}) {
  return (
    <>
      {showSchedule && <SchedulePopup onClose={() => setShowSchedule(false)} />}

      {/* Header — Title + Upcoming/Past centered together */}
      <div className="px-6 pt-5 pb-4">
        {/* Row 1: Title centered with Upcoming/Past toggle + right controls */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-4">
            <h1 className="text-[22px] font-semibold text-[#001221]">Events</h1>
            {/* Upcoming/Past toggle — dark navy capsule, in header */}
            <div className="flex items-center bg-[#F2F2F3] rounded-full p-0.5">
              <button
                onClick={() => setEventsTab("upcoming")}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all ${
                  eventsTab === "upcoming"
                    ? "bg-[#001221] text-white"
                    : "text-[#7F888F] hover:text-[#4C5863]"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setEventsTab("past")}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all ${
                  eventsTab === "past"
                    ? "bg-[#001221] text-white"
                    : "text-[#7F888F] hover:text-[#4C5863]"
                }`}
              >
                Past events
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* All events dropdown */}
            <button className="flex items-center gap-1.5 text-[13px] text-[#4C5863] hover:text-[#001221] transition-colors">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              All events
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>

            {/* Search */}
            <div className="relative">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="absolute left-2.5 top-1/2 -translate-y-1/2">
                <circle cx="7" cy="7" r="4.5" stroke="#7F888F" strokeWidth="1.3"/>
                <path d="M10.5 10.5L13.5 13.5" stroke="#7F888F" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-3 py-1.5 w-44 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-lg bg-white focus:outline-none focus:border-[#2E1055] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-3 text-[13px] mb-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2CAD43]" />
            <span className="text-[#4C5863]">Today 2 events done</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span className="text-[#4C5863]">3 scheduled</span>
          </span>
        </div>

        {/* Action buttons — outline icons */}
        <div className="flex items-center justify-center gap-8 mb-2">
          {/* New meeting */}
          <button onClick={() => onJoinMeeting("New Meeting")} className="flex flex-col items-center gap-2.5 group">
            <div className="w-[72px] h-[72px] rounded-[18px] bg-[#F2EBF5] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#9C328C]/10 group-active:scale-95 transition-all">
              <svg width="28" height="19" viewBox="0 0 23 15" fill="none">
                <path d="M21.6966 3.20756C21.3928 2.54306 20.6488 2.15006 19.9401 2.32706C19.4023 2.46131 18.8263 2.77331 18.2241 3.17906C17.9526 3.36206 17.8326 3.69506 17.9188 4.01081C18.5076 6.17306 18.5076 8.34356 17.9188 10.5058C17.8326 10.8216 17.9526 11.1553 18.2241 11.3376C18.8271 11.7433 19.4031 12.0553 19.9408 12.1896C20.6496 12.3666 21.3936 11.9728 21.6973 11.3083C22.7383 9.02831 22.7383 5.48831 21.6966 3.20756ZM2.20031 1.17956C6.35306 -0.393188 10.5058 -0.393188 14.6586 1.17956C15.0253 1.31831 15.3396 1.59881 15.5218 1.95881C17.3046 5.49206 17.3046 9.02531 15.5218 12.5578C15.3403 12.9178 15.0261 13.1983 14.6586 13.3371C10.5058 14.9098 6.35306 14.9098 2.20031 13.3371C1.83356 13.1983 1.51931 12.9178 1.33706 12.5578C-0.445687 9.02456 -0.445687 5.49206 1.33706 1.95881C1.51931 1.59881 1.83356 1.31831 2.20031 1.17956Z" fill="#9C328C"/>
              </svg>
            </div>
            <span className="text-[13px] font-medium text-[#9C328C]">New meeting</span>
          </button>

          {/* Join — outline icon */}
          <button onClick={() => onJoinMeeting("Meeting Room")} className="flex flex-col items-center gap-2.5 group">
            <div className="w-[72px] h-[72px] rounded-[18px] bg-[#F2F2F3] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#244C91]/10 group-active:scale-95 transition-all">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="#244C91" strokeWidth="1.8"/>
                <path d="M12 7v10M7 12h10" stroke="#244C91" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[13px] font-medium text-[#244C91]">Join</span>
          </button>

          {/* Schedule — outline icon */}
          <button onClick={() => setShowSchedule(true)} className="flex flex-col items-center gap-2.5 group">
            <div className="w-[72px] h-[72px] rounded-[18px] bg-[#F2F2F3] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#244C91]/10 group-active:scale-95 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="3" stroke="#244C91" strokeWidth="1.8"/>
                <path d="M3 10h18" stroke="#244C91" strokeWidth="1.8"/>
                <path d="M8 2v4M16 2v4" stroke="#244C91" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="8" cy="15" r="1" fill="#244C91"/>
                <circle cx="12" cy="15" r="1" fill="#244C91"/>
                <circle cx="16" cy="15" r="1" fill="#244C91"/>
              </svg>
            </div>
            <span className="text-[13px] font-medium text-[#244C91]">Schedule</span>
          </button>
        </div>
      </div>

      {/* Event list */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {events.map((group, gi) => (
          <div key={gi} className="mb-1">
            {group.items.map((event, ei) => (
              <div
                key={ei}
                onClick={() => onJoinMeeting(event.title)}
                className={`flex items-center gap-4 py-3 border-b border-[#F2F2F3] hover:bg-[#F9F9FA] transition-colors cursor-pointer group ${
                  event.highlight ? "bg-[#FFF8E1] hover:bg-[#FFF3CD]" : ""
                }`}
                style={{ animation: `fadeIn 0.2s ease-out ${0.03 * (gi * 3 + ei)}s both` }}
              >
                {/* Date column - only show for first item in group */}
                <div className="w-12 shrink-0 text-center">
                  {ei === 0 && (
                    <>
                      <div className="text-[11px] text-[#7F888F] uppercase tracking-wider font-medium">{group.day}</div>
                      <div className="text-[24px] font-semibold text-[#001221] leading-none mt-0.5">{group.date}</div>
                    </>
                  )}
                </div>

                {/* Event info */}
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-[#001221]">{event.title}</div>
                  <div className="text-[12px] text-[#7F888F] mt-0.5">
                    {event.time} at {event.url}
                  </div>
                </div>

                {/* Avatars */}
                <div className="flex items-center -space-x-2 shrink-0">
                  {event.avatars.map((id) => (
                    <Image
                      key={id}
                      src={`https://i.pravatar.cc/64?img=${id}`}
                      alt=""
                      width={28}
                      height={28}
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      unoptimized
                    />
                  ))}
                </div>

                {event.more && (
                  <span className="text-[12px] text-[#7F888F] shrink-0">{event.more}</span>
                )}

                {/* Edit button — outline icon */}
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg hover:bg-[#F2F2F3] opacity-0 group-hover:opacity-100 transition-all active:scale-90 shrink-0"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M11.333 2a1.886 1.886 0 012.667 2.667l-8.167 8.166L2.5 13.5l.667-3.333L11.333 2z" stroke="#7F888F" strokeWidth="1.2" strokeLinejoin="round"/>
                  </svg>
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
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2">
            <circle cx="7" cy="7" r="4.5" stroke="#7F888F" strokeWidth="1.3"/>
            <path d="M10.5 10.5L13.5 13.5" stroke="#7F888F" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search recordings..."
            className="pl-9 pr-3 py-2 w-full max-w-md text-[13px] text-[#001221] border border-[#E5E6E8] rounded-lg bg-white focus:outline-none focus:border-[#2E1055] transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="flex flex-col">
          {recordings.map((rec, i) => (
            <div
              key={i}
              className="flex items-center gap-4 py-3.5 border-b border-[#F2F2F3] hover:bg-[#F9F9FA] transition-colors cursor-pointer group"
              style={{ animation: `fadeIn 0.2s ease-out ${0.05 * i}s both` }}
            >
              {/* Play button */}
              <button className="w-9 h-9 rounded-full bg-[#F2F0F5] flex items-center justify-center shrink-0 hover:bg-[#E8E0FF] active:scale-90 transition-all">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M5 3v10l8-5-8-5z" fill="#2E1055"/>
                </svg>
              </button>

              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium text-[#001221]">{rec.title}</div>
                <div className="text-[12px] text-[#7F888F] mt-0.5">{rec.date} · {rec.duration}</div>
              </div>

              <span className="text-[12px] text-[#7F888F] shrink-0">{rec.size}</span>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-lg hover:bg-[#F2F2F3] active:scale-90 transition-all" title="Download">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10" stroke="#7F888F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="p-1.5 rounded-lg hover:bg-[#F2F2F3] active:scale-90 transition-all" title="Delete">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 5h8l-.667 8H4.667L4 5zM6 3h4M3 5h10" stroke="#7F888F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
