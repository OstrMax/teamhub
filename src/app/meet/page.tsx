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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-[22px] font-semibold text-[#001221]">Events</h1>
            <div className="flex items-center gap-2 text-[13px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2CAD43]" />
                <span className="text-[#4C5863]">Today 2 events done</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <span className="text-[#4C5863]">3 scheduled</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Events toggle */}
            <div className="flex items-center bg-[#F2F2F3] rounded-full p-0.5">
              <button
                onClick={() => setEventsTab("upcoming")}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                  eventsTab === "upcoming"
                    ? "bg-white text-[#001221] shadow-sm"
                    : "text-[#7F888F] hover:text-[#4C5863]"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setEventsTab("past")}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                  eventsTab === "past"
                    ? "bg-white text-[#001221] shadow-sm"
                    : "text-[#7F888F] hover:text-[#4C5863]"
                }`}
              >
                Past events
              </button>
            </div>

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

        {/* Action buttons */}
        <div className="flex items-center gap-4">
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-2xl bg-[#FEE2E2] flex items-center justify-center group-hover:shadow-md group-active:scale-95 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="13" height="10" rx="1.5" stroke="#DC2626" strokeWidth="1.5"/>
                <path d="M16 10l4-3v10l-4-3" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="11" r="2" fill="#DC2626" opacity="0.6"/>
              </svg>
            </div>
            <span className="text-[12px] font-medium text-[#001221]">New meeting</span>
          </button>

          <button className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-2xl bg-[#DBEAFE] flex items-center justify-center group-hover:shadow-md group-active:scale-95 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[12px] font-medium text-[#001221]">Join</span>
          </button>

          <button className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-2xl bg-[#E0E7FF] flex items-center justify-center group-hover:shadow-md group-active:scale-95 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="#4F46E5" strokeWidth="1.5"/>
                <path d="M3 9h18" stroke="#4F46E5" strokeWidth="1.5"/>
                <path d="M8 2v4M16 2v4" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round"/>
                <rect x="7" y="13" width="3" height="3" rx="0.5" fill="#4F46E5" opacity="0.5"/>
              </svg>
            </div>
            <span className="text-[12px] font-medium text-[#001221]">Schedule</span>
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
