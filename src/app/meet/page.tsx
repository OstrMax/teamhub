"use client";

import { useState } from "react";
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
          <EventsContent eventsTab={eventsTab} setEventsTab={setEventsTab} />
        ) : (
          <RecordingsContent />
        )}
      </div>
    </div>
  );
}

/* ── Events content ── */
function EventsContent({
  eventsTab,
  setEventsTab,
}: {
  eventsTab: "upcoming" | "past";
  setEventsTab: (t: "upcoming" | "past") => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="px-6 pt-5 pb-4">
        {/* Row 1: Title + status + controls */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <h1 className="text-[22px] font-semibold text-[#001221]">Events</h1>
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

        {/* Row 2: Centered Upcoming/Past toggle — dark navy capsule style */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-0">
            <button
              onClick={() => setEventsTab("upcoming")}
              className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all ${
                eventsTab === "upcoming"
                  ? "bg-[#001221] text-white"
                  : "text-[#7F888F] hover:text-[#4C5863]"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setEventsTab("past")}
              className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all ${
                eventsTab === "past"
                  ? "bg-[#001221] text-white"
                  : "text-[#7F888F] hover:text-[#4C5863]"
              }`}
            >
              Past events
            </button>
          </div>
        </div>

        {/* Row 3: Centered action buttons matching Figma exactly */}
        <div className="flex items-center justify-center gap-8 mb-2">
          {/* New meeting - large rounded square, light lavender bg, exact SVG icon */}
          <button className="flex flex-col items-center gap-2.5 group">
            <div className="w-[72px] h-[72px] rounded-[18px] bg-[#F2EBF5] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#9C328C]/10 group-active:scale-95 transition-all">
              <svg width="28" height="19" viewBox="0 0 23 15" fill="none">
                <path d="M21.6966 3.20756C21.3928 2.54306 20.6488 2.15006 19.9401 2.32706C19.4023 2.46131 18.8263 2.77331 18.2241 3.17906C17.9526 3.36206 17.8326 3.69506 17.9188 4.01081C18.5076 6.17306 18.5076 8.34356 17.9188 10.5058C17.8326 10.8216 17.9526 11.1553 18.2241 11.3376C18.8271 11.7433 19.4031 12.0553 19.9408 12.1896C20.6496 12.3666 21.3936 11.9728 21.6973 11.3083C22.7383 9.02831 22.7383 5.48831 21.6966 3.20756ZM2.20031 1.17956C6.35306 -0.393188 10.5058 -0.393188 14.6586 1.17956C15.0253 1.31831 15.3396 1.59881 15.5218 1.95881C17.3046 5.49206 17.3046 9.02531 15.5218 12.5578C15.3403 12.9178 15.0261 13.1983 14.6586 13.3371C10.5058 14.9098 6.35306 14.9098 2.20031 13.3371C1.83356 13.1983 1.51931 12.9178 1.33706 12.5578C-0.445687 9.02456 -0.445687 5.49206 1.33706 1.95881C1.51931 1.59881 1.83356 1.31831 2.20031 1.17956Z" fill="#9C328C"/>
              </svg>
            </div>
            <span className="text-[13px] font-medium text-[#9C328C]">New meeting</span>
          </button>

          {/* Join - large rounded square, light grey bg, exact SVG icon (rounded square with +) */}
          <button className="flex flex-col items-center gap-2.5 group">
            <div className="w-[72px] h-[72px] rounded-[18px] bg-[#F2F2F3] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#244C91]/10 group-active:scale-95 transition-all">
              <svg width="28" height="28" viewBox="0 0 20 20" fill="none">
                <path d="M19.1282 17.2876C18.9141 18.1916 18.1916 18.9141 17.2876 19.1282C14.8678 19.7023 12.4314 19.9898 9.995 19.9898C7.55859 19.9898 5.12217 19.7023 2.70243 19.1282C1.79835 18.9141 1.07593 18.1916 0.861785 17.2867C-0.287262 12.4481 -0.287262 7.54192 0.861785 2.70243C1.07593 1.79835 1.79835 1.07593 2.70326 0.861785C7.54192 -0.287262 12.4472 -0.287262 17.2876 0.861785C18.1916 1.07593 18.9141 1.79835 19.1282 2.70326C20.2773 7.54192 20.2773 12.4481 19.1282 17.2876ZM14.1612 9.16175H10.8282V5.82877C10.8282 5.36798 10.4558 4.99552 9.995 4.99552C9.53421 4.99552 9.16175 5.36798 9.16175 5.82877V9.16175H5.82877C5.36798 9.16175 4.99552 9.53422 4.99552 9.995C4.99552 10.4558 5.36798 10.8282 5.82877 10.8282H9.16175V14.1612C9.16175 14.622 9.53421 14.9945 9.995 14.9945C10.4558 14.9945 10.8282 14.622 10.8282 14.1612V10.8282H14.1612C14.622 10.8282 14.9945 10.4558 14.9945 9.995C14.9945 9.53422 14.622 9.16175 14.1612 9.16175Z" fill="#244C91"/>
              </svg>
            </div>
            <span className="text-[13px] font-medium text-[#244C91]">Join</span>
          </button>

          {/* Schedule - large rounded square, light grey bg, exact SVG calendar icon */}
          <button className="flex flex-col items-center gap-2.5 group">
            <div className="w-[72px] h-[72px] rounded-[18px] bg-[#F2F2F3] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#244C91]/10 group-active:scale-95 transition-all">
              <svg width="26" height="26" viewBox="0 0 19 19" fill="none">
                <path d="M17.715 3.44325C17.529 2.8605 17.046 2.409 16.4543 2.25375C15.84 2.09325 15.2257 1.95525 14.6115 1.836V2.577C14.6115 2.991 14.2762 3.327 13.8615 3.327C13.4468 3.327 13.1115 2.991 13.1115 2.577V0.75C13.1115 0.336 12.7762 0 12.3615 0C11.9468 0 11.6115 0.336 11.6115 0.75V1.425C10.1115 1.302 8.6115 1.305 7.1115 1.4295V2.577C7.1115 2.991 6.77625 3.327 6.3615 3.327C5.94675 3.327 5.6115 2.991 5.6115 2.577V0.75C5.6115 0.336 5.27625 0 4.8615 0C4.44675 0 4.1115 0.336 4.1115 0.75V1.842C3.49725 1.95975 2.883 2.09325 2.26875 2.2545C1.677 2.409 1.194 2.8605 1.008 3.44325C-0.336 7.64775 -0.336 11.8523 1.008 16.056C1.194 16.6388 1.677 17.0903 2.26875 17.2455C6.9975 18.4853 11.7263 18.4853 16.455 17.2455C17.0468 17.0903 17.529 16.6388 17.7157 16.056C19.059 11.8523 19.059 7.64775 17.715 3.44325ZM4.8615 14.25C4.4475 14.25 4.1115 13.914 4.1115 13.5C4.1115 13.086 4.4475 12.75 4.8615 12.75C5.2755 12.75 5.6115 13.086 5.6115 13.5C5.6115 13.914 5.2755 14.25 4.8615 14.25ZM4.8615 11.25C4.4475 11.25 4.1115 10.914 4.1115 10.5C4.1115 10.086 4.4475 9.75 4.8615 9.75C5.2755 9.75 5.6115 10.086 5.6115 10.5C5.6115 10.914 5.2755 11.25 4.8615 11.25ZM7.8615 14.25C7.4475 14.25 7.1115 13.914 7.1115 13.5C7.1115 13.086 7.4475 12.75 7.8615 12.75C8.2755 12.75 8.6115 13.086 8.6115 13.5C8.6115 13.914 8.2755 14.25 7.8615 14.25ZM7.8615 11.25C7.4475 11.25 7.1115 10.914 7.1115 10.5C7.1115 10.086 7.4475 9.75 7.8615 9.75C8.2755 9.75 8.6115 10.086 8.6115 10.5C8.6115 10.914 8.2755 11.25 7.8615 11.25ZM7.8615 8.25C7.4475 8.25 7.1115 7.914 7.1115 7.5C7.1115 7.086 7.4475 6.75 7.8615 6.75C8.2755 6.75 8.6115 7.086 8.6115 7.5C8.6115 7.914 8.2755 8.25 7.8615 8.25ZM10.8615 14.625C10.2405 14.625 9.7365 14.121 9.7365 13.5C9.7365 12.879 10.2405 12.375 10.8615 12.375C11.4825 12.375 11.9865 12.879 11.9865 13.5C11.9865 14.121 11.4825 14.625 10.8615 14.625ZM10.8615 11.25C10.4475 11.25 10.1115 10.914 10.1115 10.5C10.1115 10.086 10.4475 9.75 10.8615 9.75C11.2755 9.75 11.6115 10.086 11.6115 10.5C11.6115 10.914 11.2755 11.25 10.8615 11.25ZM10.8615 8.25C10.4475 8.25 10.1115 7.914 10.1115 7.5C10.1115 7.086 10.4475 6.75 10.8615 6.75C11.2755 6.75 11.6115 7.086 11.6115 7.5C11.6115 7.914 11.2755 8.25 10.8615 8.25ZM13.8615 11.25C13.4475 11.25 13.1115 10.914 13.1115 10.5C13.1115 10.086 13.4475 9.75 13.8615 9.75C14.2755 9.75 14.6115 10.086 14.6115 10.5C14.6115 10.914 14.2755 11.25 13.8615 11.25ZM13.8615 8.25C13.4475 8.25 13.1115 7.914 13.1115 7.5C13.1115 7.086 13.4475 6.75 13.8615 6.75C14.2755 6.75 14.6115 7.086 14.6115 7.5C14.6115 7.914 14.2755 8.25 13.8615 8.25Z" fill="#244C91"/>
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

                {/* Edit button */}
                <button className="p-1.5 rounded-lg hover:bg-[#F2F2F3] opacity-0 group-hover:opacity-100 transition-all active:scale-90 shrink-0">
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
