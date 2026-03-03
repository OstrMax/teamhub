"use client";

import { useState } from "react";

const queues = [
  { name: "Sales", waiting: 3, active: 5, avgWait: "1:24", sla: 92 },
  { name: "Support", waiting: 7, active: 8, avgWait: "2:45", sla: 78 },
  { name: "Billing", waiting: 1, active: 3, avgWait: "0:32", sla: 96 },
  { name: "Technical", waiting: 4, active: 6, avgWait: "3:12", sla: 71 },
];

const agents = [
  { name: "Sarah Chen", status: "available", queue: "Sales", calls: 12, avgHandle: "3:45" },
  { name: "Mike Ross", status: "on-call", queue: "Support", calls: 8, avgHandle: "5:12" },
  { name: "Laura Kim", status: "available", queue: "Sales", calls: 15, avgHandle: "2:58" },
  { name: "David Park", status: "wrap-up", queue: "Technical", calls: 6, avgHandle: "7:30" },
  { name: "Ava Singh", status: "on-call", queue: "Support", calls: 10, avgHandle: "4:20" },
  { name: "Tom Blake", status: "break", queue: "Billing", calls: 9, avgHandle: "3:05" },
  { name: "Chris Lee", status: "available", queue: "Technical", calls: 11, avgHandle: "6:15" },
  { name: "Kerry James", status: "on-call", queue: "Sales", calls: 7, avgHandle: "4:50" },
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

export default function CXPage() {
  const [tab, setTab] = useState<"dashboard" | "agents" | "calls">("dashboard");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-6 px-6 py-3 border-b border-[#E5E6E8]">
        <h1 className="text-lg font-semibold text-[#001221]">CX</h1>
        <div className="flex items-center gap-1">
          {(["dashboard", "agents", "calls"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-2 text-sm font-medium transition-colors capitalize ${
                tab === t ? "text-[#2a1051]" : "text-[#7F888F] hover:text-[#4C5863]"
              }`}
              style={tab === t ? { boxShadow: "inset 0 -2px 0 0 #2a1051" } : undefined}
            >
              {t === "calls" ? "Active Calls" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === "dashboard" && <DashboardView />}
        {tab === "agents" && <AgentsView />}
        {tab === "calls" && <CallsView />}
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
          { label: "Total Calls Today", value: "142", change: "+12%", color: "#2E1055" },
          { label: "Calls in Queue", value: "15", change: "", color: "#F59E0B" },
          { label: "Active Agents", value: "8", change: "", color: "#2CAD43" },
          { label: "Avg. Wait Time", value: "2:05", change: "-18%", color: "#3B82F6" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white border border-[#E5E6E8] rounded-xl p-5"
            style={{ animation: `fadeIn 0.2s ease-out ${0.05 * i}s both` }}
          >
            <div className="text-[12px] text-[#7F888F] font-medium">{stat.label}</div>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-[28px] font-semibold text-[#001221] leading-none">{stat.value}</span>
              {stat.change && (
                <span className={`text-[12px] font-medium ${stat.change.startsWith("+") ? "text-[#2CAD43]" : "text-[#3B82F6]"}`}>
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

      {/* Queues */}
      <div className="bg-white border border-[#E5E6E8] rounded-xl p-5">
        <h2 className="text-base font-semibold text-[#001221] mb-4">Queue Overview</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E6E8]">
              <th className="text-left text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider pb-2.5">Queue</th>
              <th className="text-center text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider pb-2.5">Waiting</th>
              <th className="text-center text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider pb-2.5">Active</th>
              <th className="text-center text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider pb-2.5">Avg. Wait</th>
              <th className="text-center text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider pb-2.5">SLA %</th>
            </tr>
          </thead>
          <tbody>
            {queues.map((q) => (
              <tr key={q.name} className="border-b border-[#F2F2F3] last:border-0 hover:bg-[#F9F9FA] transition-colors">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hourly chart placeholder */}
      <div className="bg-white border border-[#E5E6E8] rounded-xl p-5">
        <h2 className="text-base font-semibold text-[#001221] mb-4">Calls per Hour</h2>
        <div className="flex items-end gap-2 h-32">
          {[8, 15, 22, 30, 25, 18, 35, 28, 20, 12, 8, 5].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md transition-all hover:opacity-80" style={{ height: `${(v / 35) * 100}%`, background: `linear-gradient(to top, #2E1055, #783a9b)` }} />
              <span className="text-[9px] text-[#7F888F]">{8 + i}h</span>
            </div>
          ))}
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
                      <div className="w-8 h-8 rounded-full bg-[#F2F0F5] flex items-center justify-center text-[11px] font-semibold text-[#2E1055]">
                        {agent.name.split(" ").map(w => w[0]).join("")}
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
              <th className="text-center text-[11px] font-semibold text-[#7F888F] uppercase tracking-wider px-4 py-2.5 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeCalls.map((call, i) => (
              <tr
                key={i}
                className="border-b border-[#F2F2F3] last:border-0 hover:bg-[#F9F9FA] transition-colors"
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
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-[#F2F2F3] transition-colors active:scale-90" title="Listen">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 7v2a6 6 0 0012 0V7" stroke="#7F888F" strokeWidth="1.3" strokeLinecap="round"/><rect x="1" y="7" width="3" height="5" rx="1" stroke="#7F888F" strokeWidth="1.3"/><rect x="12" y="7" width="3" height="5" rx="1" stroke="#7F888F" strokeWidth="1.3"/></svg>
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-[#FEE2E2] transition-colors active:scale-90" title="End">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#EF4444" strokeWidth="1.3" strokeLinecap="round"/></svg>
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
            <div key={i} className="flex items-center justify-between px-3 py-2.5 bg-[#F9F9FA] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                <span className="text-[13px] font-medium text-[#001221]">{caller.number}</span>
                <span className="px-2 py-0.5 bg-[#F2F0F5] text-[#2E1055] rounded-full text-[11px] font-medium">{caller.queue}</span>
              </div>
              <span className="text-[12px] text-[#7F888F] font-mono">Waiting {caller.wait}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
