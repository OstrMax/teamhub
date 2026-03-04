"use client";

import { useState } from "react";
import Image from "next/image";

const queues = [
  { name: "Sales", waiting: 3, active: 5, avgWait: "1:24", sla: 92 },
  { name: "Support", waiting: 7, active: 8, avgWait: "2:45", sla: 78 },
  { name: "Billing", waiting: 1, active: 3, avgWait: "0:32", sla: 96 },
  { name: "Technical", waiting: 4, active: 6, avgWait: "3:12", sla: 71 },
];

const agents = [
  { name: "Sarah Chen", status: "available", queue: "Sales", calls: 12, avgHandle: "3:45", img: 5 },
  { name: "Mike Ross", status: "on-call", queue: "Support", calls: 8, avgHandle: "5:12", img: 12 },
  { name: "Laura Kim", status: "available", queue: "Sales", calls: 15, avgHandle: "2:58", img: 9 },
  { name: "David Park", status: "wrap-up", queue: "Technical", calls: 6, avgHandle: "7:30", img: 11 },
  { name: "Ava Singh", status: "on-call", queue: "Support", calls: 10, avgHandle: "4:20", img: 32 },
  { name: "Tom Blake", status: "break", queue: "Billing", calls: 9, avgHandle: "3:05", img: 53 },
  { name: "Chris Lee", status: "available", queue: "Technical", calls: 11, avgHandle: "6:15", img: 68 },
  { name: "Kerry James", status: "on-call", queue: "Sales", calls: 7, avgHandle: "4:50", img: 33 },
];

const activeCalls = [
  { caller: "+1 (416) 555-0123", agent: "Mike Ross", queue: "Support", duration: "3:42", topic: "Account access issue" },
  { caller: "+1 (905) 555-0456", agent: "Ava Singh", queue: "Support", duration: "1:15", topic: "Billing inquiry" },
  { caller: "+1 (647) 555-0789", agent: "Kerry James", queue: "Sales", duration: "5:30", topic: "Enterprise plan demo" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  available: { label: "Available", color: "#2CAD43", bg: "#E8F5E9" },
  "on-call": { label: "On Call", color: "#3B82F6", bg: "#DBEAFE" },
  "wrap-up": { label: "Wrap-up", color: "#F59E0B", bg: "#FEF3C7" },
  break: { label: "Break", color: "#7F888F", bg: "#F2F2F3" },
};

/* Hourly call data with inbound/outbound split */
const hourlyData = [
  { hour: 8, inbound: 6, outbound: 2, missed: 1 },
  { hour: 9, inbound: 12, outbound: 3, missed: 2 },
  { hour: 10, inbound: 18, outbound: 4, missed: 3 },
  { hour: 11, inbound: 24, outbound: 6, missed: 4 },
  { hour: 12, inbound: 20, outbound: 5, missed: 2 },
  { hour: 13, inbound: 14, outbound: 4, missed: 1 },
  { hour: 14, inbound: 28, outbound: 7, missed: 5 },
  { hour: 15, inbound: 22, outbound: 6, missed: 3 },
  { hour: 16, inbound: 16, outbound: 4, missed: 2 },
  { hour: 17, inbound: 10, outbound: 2, missed: 1 },
  { hour: 18, inbound: 6, outbound: 2, missed: 0 },
  { hour: 19, inbound: 3, outbound: 2, missed: 0 },
];

const maxTotal = Math.max(...hourlyData.map(d => d.inbound + d.outbound));

export default function CXPage() {
  const [tab, setTab] = useState<"dashboard" | "agents" | "calls">("dashboard");

  return (
    <div className="flex h-full">
      {/* Left sidebar — same pattern as Meet page */}
      <div className="w-[220px] shrink-0 border-r border-[#E5E6E8] bg-white flex flex-col">
        <div className="px-4 pt-5 pb-3">
          {([
            { key: "dashboard" as const, label: "Dashboard", icon: (active: boolean) => (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" rx="1.5" stroke={active ? "#2E1055" : "#7F888F"} strokeWidth="1.3"/>
                <rect x="9" y="2" width="5" height="5" rx="1.5" stroke={active ? "#2E1055" : "#7F888F"} strokeWidth="1.3"/>
                <rect x="2" y="9" width="5" height="5" rx="1.5" stroke={active ? "#2E1055" : "#7F888F"} strokeWidth="1.3"/>
                <rect x="9" y="9" width="5" height="5" rx="1.5" stroke={active ? "#2E1055" : "#7F888F"} strokeWidth="1.3"/>
              </svg>
            )},
            { key: "agents" as const, label: "Agents", icon: (active: boolean) => (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5.5" r="2.5" stroke={active ? "#2E1055" : "#7F888F"} strokeWidth="1.3"/>
                <path d="M3 13.5c0-2 3.33-3 5-3s5 1 5 3" stroke={active ? "#2E1055" : "#7F888F"} strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            )},
            { key: "calls" as const, label: "Active Calls", icon: (active: boolean) => (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 10.67v1.66a1.11 1.11 0 01-1.21 1.11 11 11 0 01-4.8-1.7 10.83 10.83 0 01-3.33-3.33A11 11 0 012.96 3.6 1.11 1.11 0 014.07 2.4h1.66a1.11 1.11 0 011.11.96c.07.53.2 1.05.39 1.56a1.11 1.11 0 01-.25 1.17l-.7.7a8.89 8.89 0 003.33 3.33l.7-.7a1.11 1.11 0 011.17-.25c.51.19 1.03.32 1.56.39a1.11 1.11 0 01.96 1.11z" stroke={active ? "#2E1055" : "#7F888F"} strokeWidth="1.3"/>
              </svg>
            )},
          ]).map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all mt-1 first:mt-0 ${
                tab === item.key
                  ? "bg-[#F2F0F5] text-[#2E1055]"
                  : "text-[#4C5863] hover:bg-[#F9F9FA]"
              }`}
            >
              {item.icon(tab === item.key)}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {tab === "dashboard" && <DashboardView />}
          {tab === "agents" && <AgentsView />}
          {tab === "calls" && <CallsView />}
        </div>
      </div>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="px-6 py-5 space-y-5">
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Calls Today", value: "142", change: "+12%", icon: "calls", color: "#2a1051" },
          { label: "Calls in Queue", value: "15", change: "", icon: "queue", color: "#F59E0B" },
          { label: "Active Agents", value: "8", change: "", icon: "agents", color: "#2CAD43" },
          { label: "Avg. Wait Time", value: "2:05", change: "-18%", icon: "time", color: "#3B82F6" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white border border-[#E5E6E8] rounded-xl p-5 hover:shadow-sm transition-shadow"
            style={{ animation: `fadeIn 0.2s ease-out ${0.05 * i}s both` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-[12px] text-[#7F888F] font-medium">{stat.label}</div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                {stat.icon === "calls" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke={stat.color} strokeWidth="1.5"/></svg>}
                {stat.icon === "queue" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={stat.color} strokeWidth="1.5" strokeLinecap="round"/></svg>}
                {stat.icon === "agents" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={stat.color} strokeWidth="1.5"/><path d="M4 20c0-2.67 5.33-4 8-4s8 1.33 8 4" stroke={stat.color} strokeWidth="1.5" strokeLinecap="round"/></svg>}
                {stat.icon === "time" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={stat.color} strokeWidth="1.5"/><path d="M12 7v5l3 3" stroke={stat.color} strokeWidth="1.5" strokeLinecap="round"/></svg>}
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-[28px] font-semibold text-[#001221] leading-none">{stat.value}</span>
              {stat.change && (
                <span className={`text-[12px] font-medium mb-0.5 ${stat.change.startsWith("+") ? "text-[#2CAD43]" : "text-[#3B82F6]"}`}>
                  {stat.change}
                </span>
              )}
            </div>
            <div className="mt-3 h-1 bg-[#F2F2F3] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${60 + i * 10}%`, background: stat.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Queue Overview + Agents side by side */}
      <div className="grid grid-cols-3 gap-5">
        {/* Queues */}
        <div className="col-span-2 bg-white border border-[#E5E6E8] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#001221]">Queue Overview</h2>
            <button className="text-sm text-[#7F888F] hover:text-[#001221] transition-colors">View all →</button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E6E8]">
                <th className="text-left text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider pb-2.5">Queue</th>
                <th className="text-center text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider pb-2.5">Waiting</th>
                <th className="text-center text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider pb-2.5">Active</th>
                <th className="text-center text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider pb-2.5">Avg. Wait</th>
                <th className="text-center text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider pb-2.5">SLA %</th>
                <th className="text-right text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider pb-2.5 w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {queues.map((q) => (
                <tr key={q.name} className="border-b border-[#F2F2F3] last:border-0 hover:bg-[#F9F9FA] transition-colors group">
                  <td className="py-3 text-[13px] font-medium text-[#001221]">{q.name}</td>
                  <td className="py-3 text-center">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-semibold ${
                      q.waiting > 5 ? "bg-[#FEE2E2] text-[#EF4444]" : q.waiting > 2 ? "bg-[#FEF3C7] text-[#F59E0B]" : "bg-[#E8F5E9] text-[#2CAD43]"
                    }`}>{q.waiting}</span>
                  </td>
                  <td className="py-3 text-center text-[13px] text-[#001221]">{q.active}</td>
                  <td className="py-3 text-center text-[13px] text-[#7F888F]">{q.avgWait}</td>
                  <td className="py-3 text-center">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[#F2F2F3] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${q.sla}%`, background: q.sla > 90 ? "#2CAD43" : q.sla > 80 ? "#F59E0B" : "#EF4444" }} />
                      </div>
                      <span className="text-[12px] font-medium text-[#001221]">{q.sla}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-[#FEF3C7] transition-colors active:scale-90" title="Hold">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="4" y="3" width="2.5" height="10" rx="1" fill="#F59E0B"/><rect x="9.5" y="3" width="2.5" height="10" rx="1" fill="#F59E0B"/></svg>
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[#FEE2E2] transition-colors active:scale-90" title="End">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[#DBEAFE] transition-colors active:scale-90" title="Transfer">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5 8h8m0 0l-3-3m3 3l-3 3M3 3v10" stroke="#3B82F6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Agents overview on dashboard */}
        <div className="bg-white border border-[#E5E6E8] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#001221]">Agents</h2>
            <button className="text-sm text-[#7F888F] hover:text-[#001221] transition-colors">View all →</button>
          </div>

          {/* Status summary */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: "Available", count: agents.filter(a => a.status === "available").length, color: "#2CAD43", bg: "#E8F5E9" },
              { label: "On Call", count: agents.filter(a => a.status === "on-call").length, color: "#3B82F6", bg: "#DBEAFE" },
              { label: "Wrap-up", count: agents.filter(a => a.status === "wrap-up").length, color: "#F59E0B", bg: "#FEF3C7" },
              { label: "Break", count: agents.filter(a => a.status === "break").length, color: "#7F888F", bg: "#F2F2F3" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 px-2.5 py-2 rounded-lg" style={{ background: s.bg }}>
                <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-[11px] font-medium" style={{ color: s.color }}>{s.count} {s.label}</span>
              </div>
            ))}
          </div>

          {/* Agent list */}
          <div className="space-y-1.5">
            {agents.slice(0, 6).map((agent, i) => {
              const st = statusConfig[agent.status];
              return (
                <div key={i} className="flex items-center gap-2.5 py-1.5 hover:bg-[#F9F9FA] rounded-lg px-1 -mx-1 transition-colors cursor-pointer">
                  <div className="relative">
                    <Image src={`https://i.pravatar.cc/64?img=${agent.img}`} alt="" width={28} height={28} className="w-7 h-7 rounded-full object-cover" unoptimized />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ background: st.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-[#001221] truncate">{agent.name}</div>
                    <div className="text-[10px] text-[#7F888F]">{agent.queue} · {agent.calls} calls</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Calls per Hour - line chart with gradient like home page */}
      <div className="bg-white border border-[#E5E6E8] rounded-xl p-5">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-[#001221]">Calls per Hour</h2>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#001221" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <button className="text-sm text-[#7F888F] flex items-center gap-1 hover:text-[#001221] transition-colors">Learn more →</button>
        </div>

        {/* Totals */}
        <div className="flex items-center gap-6 mb-4">
          <div>
            <span className="text-[24px] font-semibold text-[#001221]">{hourlyData.reduce((a, d) => a + d.inbound + d.outbound, 0)}</span>
            <span className="text-[12px] text-[#7F888F] ml-1.5">total calls</span>
          </div>
          <div className="h-6 w-px bg-[#E5E6E8]" />
          <div className="text-[13px] text-[#7F888F]">
            <span className="font-medium text-[#2a1051]">{hourlyData.reduce((a, d) => a + d.inbound, 0)}</span> inbound
          </div>
          <div className="text-[13px] text-[#7F888F]">
            <span className="font-medium text-[#B882D4]">{hourlyData.reduce((a, d) => a + d.outbound, 0)}</span> outbound
          </div>
          <div className="text-[13px] text-[#7F888F]">
            <span className="font-medium text-[#EF4444]">{hourlyData.reduce((a, d) => a + d.missed, 0)}</span> missed
          </div>
        </div>

        {/* Line chart with gradient fill — same style as home page */}
        <div className="relative h-44">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-[#7F888F] w-6 pointer-events-none">
            <span>{maxTotal}</span><span>{Math.round(maxTotal * 0.75)}</span><span>{Math.round(maxTotal * 0.5)}</span><span>{Math.round(maxTotal * 0.25)}</span><span>0</span>
          </div>
          {/* Grid lines */}
          <svg className="absolute left-8 right-0 top-0 bottom-6" viewBox="0 0 500 140" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="500" y2="0" stroke="#F2F2F3" strokeWidth="1"/>
            <line x1="0" y1="35" x2="500" y2="35" stroke="#F2F2F3" strokeWidth="1"/>
            <line x1="0" y1="70" x2="500" y2="70" stroke="#F2F2F3" strokeWidth="1"/>
            <line x1="0" y1="105" x2="500" y2="105" stroke="#F2F2F3" strokeWidth="1"/>
            <line x1="0" y1="140" x2="500" y2="140" stroke="#F2F2F3" strokeWidth="1"/>
          </svg>
          {/* Area + Line */}
          <svg className="absolute left-8 right-0 top-0 bottom-6" viewBox="0 0 500 140" preserveAspectRatio="none">
            <path d={`M0,${140 - (hourlyData[0].inbound + hourlyData[0].outbound) / maxTotal * 140} ${hourlyData.map((d, i) => `L${(i / (hourlyData.length - 1)) * 500},${140 - (d.inbound + d.outbound) / maxTotal * 140}`).join(' ')} L500,140 L0,140Z`} fill="url(#cxChartGradient)" />
            <polyline points={hourlyData.map((d, i) => `${(i / (hourlyData.length - 1)) * 500},${140 - (d.inbound + d.outbound) / maxTotal * 140}`).join(' ')} fill="none" stroke="#2a1051" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="cxChartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a1051" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#2a1051" stopOpacity="0.01"/>
              </linearGradient>
            </defs>
          </svg>
          {/* Data points */}
          <svg className="absolute left-8 right-0 top-0 bottom-6" viewBox="0 0 500 140">
            {hourlyData.map((d, i) => {
              const x = (i / (hourlyData.length - 1)) * 500;
              const y = 140 - (d.inbound + d.outbound) / maxTotal * 140;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="4" fill="#2a1051"/>
                  <circle cx={x} cy={y} r="8" fill="transparent" className="cursor-pointer"/>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex justify-between pl-8 mt-1 text-[10px] text-[#7F888F]">
          {hourlyData.map((d) => <span key={d.hour}>{d.hour > 12 ? d.hour - 12 : d.hour}{d.hour >= 12 ? "pm" : "am"}</span>)}
        </div>
      </div>
    </div>
  );
}

function AgentsView() {
  return (
    <div className="px-6 py-5">
      <div className="bg-white border border-[#E5E6E8] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E6E8] bg-[#F9F9FA]">
              <th className="text-left text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider px-4 py-2.5">Agent</th>
              <th className="text-left text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider px-4 py-2.5">Status</th>
              <th className="text-left text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider px-4 py-2.5">Queue</th>
              <th className="text-center text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider px-4 py-2.5">Calls Today</th>
              <th className="text-center text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider px-4 py-2.5">Avg. Handle</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent, i) => {
              const st = statusConfig[agent.status];
              return (
                <tr
                  key={agent.name}
                  className="border-b border-[#F2F2F3] last:border-0 hover:bg-[#F9F9FA] transition-colors cursor-pointer"
                  style={{ animation: `fadeIn 0.2s ease-out ${0.03 * i}s both` }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <Image src={`https://i.pravatar.cc/64?img=${agent.img}`} alt="" width={32} height={32} className="w-8 h-8 rounded-full object-cover" unoptimized />
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white" style={{ background: st.color }} />
                      </div>
                      <span className="text-[13px] font-medium text-[#001221]">{agent.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ background: st.bg, color: st.color }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.color }} />
                      {st.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-[#4C5863]">{agent.queue}</td>
                  <td className="px-4 py-3 text-center text-[13px] font-medium text-[#001221]">{agent.calls}</td>
                  <td className="px-4 py-3 text-center text-[13px] text-[#7F888F]">{agent.avgHandle}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CallsView() {
  return (
    <div className="px-6 py-5">
      <div className="bg-white border border-[#E5E6E8] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E6E8] bg-[#F9F9FA]">
              <th className="text-left text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider px-4 py-2.5">Caller</th>
              <th className="text-left text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider px-4 py-2.5">Agent</th>
              <th className="text-left text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider px-4 py-2.5">Queue</th>
              <th className="text-left text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider px-4 py-2.5">Duration</th>
              <th className="text-left text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider px-4 py-2.5">Topic</th>
              <th className="text-center text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider px-4 py-2.5 w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeCalls.map((call, i) => (
              <tr
                key={i}
                className="border-b border-[#F2F2F3] last:border-0 hover:bg-[#F9F9FA] transition-colors group"
                style={{ animation: `fadeIn 0.2s ease-out ${0.05 * i}s both` }}
              >
                <td className="px-4 py-3 text-[13px] font-medium text-[#001221]">{call.caller}</td>
                <td className="px-4 py-3 text-[13px] text-[#4C5863]">{call.agent}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-[#F2F0F5] text-[#2E1055] rounded-full text-[11px] font-medium">{call.queue}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[13px] font-mono text-[#001221] animate-pulse">{call.duration}</span>
                </td>
                <td className="px-4 py-3 text-[13px] text-[#7F888F]">{call.topic}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg hover:bg-[#F2F2F3] transition-colors active:scale-90" title="Listen">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 7v2a6 6 0 0012 0V7" stroke="#7F888F" strokeWidth="1.3" strokeLinecap="round"/><rect x="1" y="7" width="3" height="5" rx="1" stroke="#7F888F" strokeWidth="1.3"/><rect x="12" y="7" width="3" height="5" rx="1" stroke="#7F888F" strokeWidth="1.3"/></svg>
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-[#FEF3C7] transition-colors active:scale-90" title="Hold">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="4" y="3" width="2.5" height="10" rx="1" fill="#F59E0B"/><rect x="9.5" y="3" width="2.5" height="10" rx="1" fill="#F59E0B"/></svg>
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-[#DBEAFE] transition-colors active:scale-90" title="Transfer">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5 8h8m0 0l-3-3m3 3l-3 3M3 3v10" stroke="#3B82F6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-[#FEE2E2] transition-colors active:scale-90" title="End">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Waiting queue */}
      <div className="mt-5 bg-white border border-[#E5E6E8] rounded-xl p-5">
        <h2 className="text-base font-semibold text-[#001221] mb-3">Callers Waiting</h2>
        <div className="space-y-2">
          {[
            { number: "+1 (416) 555-1234", queue: "Support", wait: "2:45" },
            { number: "+1 (905) 555-5678", queue: "Support", wait: "1:32" },
            { number: "+1 (647) 555-9012", queue: "Sales", wait: "0:48" },
            { number: "+1 (416) 555-3456", queue: "Technical", wait: "3:15" },
          ].map((caller, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2.5 bg-[#F9F9FA] rounded-lg group hover:bg-[#F2F2F3] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                <span className="text-[13px] font-medium text-[#001221]">{caller.number}</span>
                <span className="px-2 py-0.5 bg-[#F2F0F5] text-[#2E1055] rounded-full text-[11px] font-medium">{caller.queue}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#7F888F] font-mono">Waiting {caller.wait}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 rounded hover:bg-[#E8F5E9] transition-colors active:scale-90" title="Answer">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M14 10.67v2a1.33 1.33 0 01-1.45 1.33A13.2 13.2 0 016.8 12a13 13 0 01-4-4 13.2 13.2 0 01-2-5.72A1.33 1.33 0 012.13 1H4.13a1.33 1.33 0 011.34 1.15c.08.64.24 1.27.47 1.87a1.33 1.33 0 01-.3 1.4L4.8 6.27a10.67 10.67 0 004 4l.85-.85a1.33 1.33 0 011.4-.3c.6.23 1.23.39 1.87.47A1.33 1.33 0 0114 10.93z" stroke="#2CAD43" strokeWidth="1.2"/></svg>
                  </button>
                  <button className="p-1 rounded hover:bg-[#DBEAFE] transition-colors active:scale-90" title="Transfer">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M5 8h8m0 0l-3-3m3 3l-3 3M3 3v10" stroke="#3B82F6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
