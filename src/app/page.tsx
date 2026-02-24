"use client";

import { useState } from "react";

const todos = [
  { id: 1, text: "Voicemail received", sub: "Listen before EOD", date: "Jul 11, 2025", time: "12:30 PM", done: false },
  { id: 2, text: "Respond from urgent SMS", sub: "Call back the number +1(2...", date: "Jul 11, 2025", time: "01:00 PM", done: true },
  { id: 3, text: "Listen voicemail EOD", sub: "Sales department agreement...", date: "Jul 11, 2025", time: "02:30PM", done: false },
];

const meetings = [
  { title: "Weekly 1:1 (Maksym & Seti)", time: "11 – 11:30 at https://meet.sangoma.com/9", day: "WED", date: "12", avatars: ["LB"], more: null },
  { title: "Design Team Meeting", time: "12 – 13:30 at https://meet.sangoma.com/4", avatars: ["TC", "AW"], more: "+ 3 more" },
  { title: "Marketing ODS Meeting", time: "13 – 14:30 at https://meet.sangoma.com/4", avatars: ["LS", "CL"], more: "+ 4 more" },
  { title: "CPO Terry Microsoft Company", time: "14:00 – 15:30 at https://meet.sangoma.com/2...", avatars: ["TW", "WW"], more: "+ 11 more" },
  { title: "Design Team Meeting", time: "15 – 16:30", avatars: ["TC"], more: "+ 3 more" },
];

const apps = [
  { name: "Sangoma AI-Agent", desc: "Set up call help based on what your business needs", action: "INSTALL", color: "#7C3AED", iconType: "ai" as const },
  { name: "Appointment Scheduler", desc: "Schedule an easy and efficient way for you to schedule your events", action: "INSTALL", color: "#2CAD43", iconType: "calendar" as const },
  { name: "SMS Campaign Registry", desc: "Buy a number, register your brand and register your campaigns in app", action: "VIEW", color: "#E85D04", iconType: "sms" as const },
];

const recentCalls = [
  { name: "+1 (345) 333 3333", type: "Personal", duration: "00:00", time: "2/11/2025 8:32 AM", direction: "outgoing" as const },
  { name: "Kristin Watson", type: "Groups", duration: "00:00", time: "3/11/2025 12:11 AM", direction: "missed" as const },
  { name: "Wade Warren", type: "Personal", duration: "00:00", time: "3/11/2025 10:11 AM", direction: "missed" as const },
  { name: "Kristin Watson", type: "Groups", duration: "00:00", time: "3/11/2025 12:15 AM", direction: "outgoing" as const },
];

const news = [
  { date: "12 Jul 2025", title: "Enhance conversational IVR", desc: "New AI-transcription, visualisation, talk and much more" },
  { date: "11 Jul 2025", title: "Conversational IVR updates", desc: "New AI-transcription, visualisation, talk and much more" },
  { date: "10 Jul 2025", title: "Talk and Chat together", desc: "New AI-transcription, visualisation, talk and much more" },
];

const avatarColors: Record<string, string> = {
  LB: "#7C3AED", TC: "#2CAD43", AW: "#E85D04", LS: "#3B82F6", CL: "#EC4899", TW: "#F59E0B", WW: "#6366F1",
};

export default function Home() {
  const [callFilter, setCallFilter] = useState("All");

  return (
    <div className="flex flex-col h-full overflow-y-auto px-6 py-5 gap-4">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-normal text-[#001221]">Good day, Lora Benedict!</h1>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#E5E6E8] rounded-lg text-sm text-[#001221]">
          Today
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#001221" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
      </div>

      {/* Top row: To-do + Quick actions */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white border border-[#E5E6E8] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#001221]">To-do for today</h2>
            <button className="text-sm text-[#7F888F] flex items-center gap-1">+ New task</button>
          </div>
          <div className="flex flex-col gap-3">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-start gap-3">
                <div className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center shrink-0 ${todo.done ? "bg-[#2CAD43] border-[#2CAD43]" : "border-[#CCCFD2]"}`}>
                  {todo.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#001221]">{todo.text}</p>
                  <p className="text-xs text-[#7F888F] truncate">{todo.sub}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-[#7F888F]">{todo.date}</p>
                  <p className="text-xs text-[#7F888F]">{todo.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-1 mt-4 text-sm text-[#7F888F]">+ New task</button>
        </div>

        <div className="bg-[rgba(29,62,119,0.04)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-[#001221]">Quick actions</h2>
            <button className="text-[#7F888F] text-sm">•••</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Create new\ntask", iconBg: "border border-[#E5E6E8]", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4C5863" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> },
              { label: "Send SMS", iconBg: "bg-[#DCF1E0]", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#066A18"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12zM7 9h2v2H7V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9z"/></svg> },
              { label: "Make a call", iconBg: "bg-[#d1daeb]", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="#1D3E77"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg> },
              { label: "Start video\nmeeting", iconBg: "bg-[#ebd6e8]", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#7C3AED"><rect x="2" y="4" width="14" height="14" rx="2"/><polygon points="22 7 18 10 18 14 22 17"/></svg> },
            ].map((action) => (
              <button key={action.label} className="flex items-center gap-4 pl-1 pr-3 py-3 rounded-xl bg-white shadow-[0_1px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_16px_rgba(0,0,0,0.08)] transition-shadow">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${action.iconBg}`}>{action.icon}</span>
                <span className="text-sm font-medium text-[#001221] text-left whitespace-pre-wrap leading-[1.3]">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Middle row: Upcoming meeting + Apps */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white border border-[#E5E6E8] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#001221]">Upcoming meeting</h2>
            <button className="text-sm text-[#7F888F] flex items-center gap-1">View all →</button>
          </div>
          <div className="flex flex-col gap-1">
            {meetings.map((meeting, i) => (
              <div key={i} className="flex items-center gap-3 py-1.5">
                {i === 0 && (
                  <div className="flex flex-col items-center w-10 shrink-0">
                    <span className="text-[10px] text-[#7F888F] uppercase">{meeting.day}</span>
                    <span className="text-xl font-semibold text-[#001221]">{meeting.date}</span>
                  </div>
                )}
                {i !== 0 && <div className="w-10 shrink-0" />}
                <div className={`flex-1 p-3 rounded-lg ${i === 1 ? "bg-[#F0EBFF]" : i === 2 ? "bg-[#FFF3CD]" : ""}`}>
                  <p className="text-sm font-medium text-[#001221]">{meeting.title}</p>
                  <p className="text-xs text-[#7F888F]">{meeting.time}</p>
                </div>
                <div className="flex items-center -space-x-2">
                  {meeting.avatars.map((a) => (
                    <div key={a} className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium text-white border-2 border-white" style={{ background: avatarColors[a] || "#7C3AED" }}>{a}</div>
                  ))}
                </div>
                {meeting.more && <span className="text-xs text-[#7F888F] whitespace-nowrap">{meeting.more}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#E5E6E8] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#001221]">Apps</h2>
            <button className="text-sm text-[#7F888F] flex items-center gap-1">View all →</button>
          </div>
          <div className="flex flex-col gap-4">
            {apps.map((app) => (
              <div key={app.name} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: app.color }}>
                  {app.iconType === "ai" && <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1.27c.34-.6.99-1 1.73-1a2 2 0 110 4c-.74 0-1.39-.4-1.73-1H20a7 7 0 01-7 7v1.27c.6.34 1 .99 1 1.73a2 2 0 11-4 0c0-.74.4-1.39 1-1.73V18a7 7 0 01-7-7H2.73c-.34.6-.99 1-1.73 1a2 2 0 110-4c.74 0 1.39.4 1.73 1H4a7 7 0 017-7V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2zm0 7a3 3 0 100 6 3 3 0 000-6z"/></svg>}
                  {app.iconType === "calendar" && <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM7 12h5v5H7v-5z"/></svg>}
                  {app.iconType === "sms" && <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#001221]">{app.name}</p>
                  <p className="text-xs text-[#7F888F] line-clamp-2">{app.desc}</p>
                </div>
                <button className="px-3 py-1 border border-[#E5E6E8] rounded text-xs font-medium text-[#001221] shrink-0 hover:bg-[#F2F2F3]">{app.action}</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: Recent calls + Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white border border-[#E5E6E8] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#001221]">Recent calls</h2>
            <div className="flex items-center gap-1">
              {["All", "Missed", "Recorded"].map((f) => (
                <button
                  key={f}
                  onClick={() => setCallFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${callFilter === f ? "bg-[#001221] text-white" : "text-[#7F888F] hover:bg-[#F2F2F3]"}`}
                >{f}</button>
              ))}
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-[#7F888F]">
                <th className="text-left font-medium pb-2">To / From</th>
                <th className="text-left font-medium pb-2">Type</th>
                <th className="text-left font-medium pb-2">Duration</th>
                <th className="text-left font-medium pb-2">Call time</th>
                <th className="text-left font-medium pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call, i) => (
                <tr key={i} className="border-t border-[#F2F2F3] hover:bg-[#F9F9FA]">
                  <td className="py-2.5 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={call.direction === "missed" ? "#EF4444" : "#2CAD43"} strokeWidth="2">
                      {call.direction === "missed" ? <><line x1="18" y1="6" x2="6" y2="18"/><polyline points="8 6 18 6 18 16"/></> : <><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></>}
                    </svg>
                    <span className="text-[#001221]">{call.name}</span>
                  </td>
                  <td className="py-2.5 text-[#7F888F]">{call.type}</td>
                  <td className="py-2.5 text-[#7F888F]">{call.duration}</td>
                  <td className="py-2.5 text-[#7F888F]">{call.time}</td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <button className="text-[#7F888F] hover:text-[#001221]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                      </button>
                      <button className="text-[#7F888F] hover:text-[#001221]">⋮</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white border border-[#E5E6E8] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#001221]">Stats</h2>
            <button className="text-[#7F888F]">•••</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-[#7F888F]">Missed calls</p>
              <p className="text-2xl font-semibold text-[#001221]">3</p>
            </div>
            <div>
              <p className="text-xs text-[#7F888F]">Voicemails</p>
              <p className="text-2xl font-semibold text-[#001221]">2</p>
            </div>
            <div>
              <p className="text-xs text-[#7F888F]">Unread SMS</p>
              <p className="text-2xl font-semibold text-[#001221]">22</p>
            </div>
            <div>
              <p className="text-xs text-[#7F888F]">Chat mentioned</p>
              <p className="text-2xl font-semibold text-[#001221]">8</p>
            </div>
            <div>
              <p className="text-xs text-[#7F888F]">Upcoming meeting</p>
              <p className="text-2xl font-semibold text-[#001221]">4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Last row: Calls chart + News */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white border border-[#E5E6E8] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-[#001221]">Calls</h2>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#001221" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <button className="text-sm text-[#7F888F] flex items-center gap-1">Learn more →</button>
          </div>
          <div className="h-40 flex items-end justify-between gap-1 relative">
            {/* Simplified chart visualization */}
            <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-[#7F888F] pointer-events-none">
              <span>80</span><span>60</span><span>40</span><span>20</span><span>0</span>
            </div>
            <svg className="w-full h-full" viewBox="0 0 500 160" preserveAspectRatio="none">
              <polyline points="0,120 60,80 120,90 180,100 240,60 300,80 360,100 420,90 480,100 500,95" fill="none" stroke="#2a1051" strokeWidth="2"/>
              {[0,60,120,180,240,300,360,420,480].map((x, i) => (
                <circle key={i} cx={x} cy={[120,80,90,100,60,80,100,90,100][i]} r="4" fill="#2a1051"/>
              ))}
            </svg>
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-[#7F888F]">
            {["10am","11am","12am","01am","02am","03am","04am","05am","06am","07am"].map(t => <span key={t}>{t}</span>)}
          </div>
        </div>

        <div className="bg-white border border-[#E5E6E8] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#001221]">News</h2>
            <button className="text-sm text-[#7F888F] flex items-center gap-1">View all →</button>
          </div>
          <div className="flex flex-col gap-4">
            {news.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-[#7F888F]">{item.date}</p>
                  <p className="text-sm font-medium text-[#001221]">{item.title}</p>
                  <p className="text-xs text-[#7F888F]">{item.desc}</p>
                </div>
                <div className="w-16 h-12 bg-[#F2F2F3] rounded-lg shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
