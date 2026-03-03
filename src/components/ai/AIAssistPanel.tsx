"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type PanelView = "main" | "receptionist" | "tone";

const personas = [
  { name: "John", img: "https://i.pravatar.cc/128?img=11" },
  { name: "Stacy", img: "https://i.pravatar.cc/128?img=5" },
  { name: "Lora", img: "https://i.pravatar.cc/128?img=9" },
  { name: "Steve", img: "https://i.pravatar.cc/128?img=12" },
  { name: "Kerry", img: "https://i.pravatar.cc/128?img=32" },
  { name: "Arro", img: "https://i.pravatar.cc/128?img=33" },
  { name: "Terry", img: "https://i.pravatar.cc/128?img=53" },
  { name: "Mike", img: "https://i.pravatar.cc/128?img=68" },
];

const actionButtons = [
  { label: "Catch up on meeting", icon: "meeting" },
  { label: "Help me write a text message", icon: "sms" },
  { label: "Add your AI receptionist", icon: "receptionist" },
  { label: "Help to find recordings", icon: "recording" },
  { label: "Create auto-response", icon: "auto" },
];

const receptionistSteps = [
  "Tone and personality",
  "Company description",
  "Location and business hours",
  "Transfer by name",
  "Greeting",
];

/* ── Action button icons ── */
function ActionIcon({ type }: { type: string }) {
  const cls = "shrink-0";
  switch (type) {
    case "meeting":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={cls}><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="#2E1055"/></svg>;
    case "sms":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={cls}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" fill="#2E1055"/><rect x="7" y="9" width="2" height="2" rx="0.5" fill="#2E1055"/><rect x="11" y="9" width="2" height="2" rx="0.5" fill="#2E1055"/><rect x="15" y="9" width="2" height="2" rx="0.5" fill="#2E1055"/></svg>;
    case "receptionist":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={cls}><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#2E1055"/></svg>;
    case "recording":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={cls}><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="#2E1055"/></svg>;
    case "auto":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={cls}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#2E1055"/></svg>;
    default:
      return null;
  }
}

/* ── Sparkle icon (purple, used in main view heading) ── */
function SparkleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8645 11.3095L13.5196 10.2864C12.9525 10.0397 12.5008 9.58654 12.254 9.02087L11.2309 6.67592C11.1516 6.49409 10.8933 6.49409 10.8139 6.67592L9.79077 9.02087C9.54401 9.58798 9.09089 10.0397 8.52522 10.2864L6.17738 11.311C5.99556 11.3903 5.99556 11.6472 6.17738 11.7266L8.56562 12.7829C9.1313 13.0325 9.58153 13.4871 9.8254 14.0557L10.8153 16.3559C10.8933 16.5391 11.153 16.5391 11.2324 16.3559L12.254 14.0152C12.5008 13.4481 12.9539 12.9965 13.5196 12.7497L15.8645 11.7266C16.0464 11.6472 16.0464 11.3889 15.8645 11.3095Z" fill="#2E1055"/>
      <path d="M6.43189 9.78292L6.91098 8.68476C7.02643 8.41924 7.23855 8.20711 7.50407 8.09167L8.60367 7.61258C8.68881 7.57506 8.68881 7.45384 8.60367 7.41777L7.50407 6.93868C7.23855 6.82323 7.02643 6.6111 6.91098 6.34558L6.43189 5.24598C6.39437 5.16084 6.27316 5.16084 6.23708 5.24598L5.75799 6.34558C5.64255 6.6111 5.43042 6.82323 5.1649 6.93868L4.06385 7.41921C3.97872 7.45673 3.97872 7.5765 4.06385 7.61402L5.18366 8.10898C5.44918 8.22587 5.65986 8.43944 5.77386 8.70496L6.23852 9.78292C6.27604 9.86806 6.39726 9.8695 6.43333 9.78292H6.43189Z" fill="#2E1055"/>
      <path d="M8.53992 4.79559L9.13445 5.05823C9.27587 5.12028 9.38699 5.23428 9.4476 5.37425L9.69436 5.94714C9.71456 5.99332 9.77805 5.99332 9.79826 5.94714L10.0522 5.36415C10.1143 5.22273 10.2268 5.11018 10.3668 5.04957L10.9498 4.79559C10.9945 4.77539 10.9945 4.7119 10.9498 4.69169L10.3668 4.43772C10.2254 4.37567 10.1128 4.26311 10.0522 4.12313L9.79826 3.54014C9.77805 3.49541 9.71456 3.49541 9.69436 3.54014L9.44038 4.12313C9.37833 4.26455 9.26577 4.37711 9.1258 4.43772L8.54136 4.69314C8.49663 4.71334 8.49663 4.77683 8.54136 4.79703L8.53992 4.79559Z" fill="#2E1055"/>
    </svg>
  );
}

/* ── Passive state AI button (outline circle with sparkles) ── */
export function PassiveAIIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="white"/>
      <path d="M15.8645 11.3095L13.5196 10.2864C12.9525 10.0397 12.5008 9.58654 12.254 9.02087L11.2309 6.67592C11.1516 6.49409 10.8933 6.49409 10.8139 6.67592L9.79077 9.02087C9.54401 9.58798 9.09089 10.0397 8.52522 10.2864L6.17738 11.311C5.99556 11.3903 5.99556 11.6472 6.17738 11.7266L8.56562 12.7829C9.1313 13.0325 9.58153 13.4871 9.8254 14.0557L10.8153 16.3559C10.8933 16.5391 11.153 16.5391 11.2324 16.3559L12.254 14.0152C12.5008 13.4481 12.9539 12.9965 13.5196 12.7497L15.8645 11.7266C16.0464 11.6472 16.0464 11.3889 15.8645 11.3095Z" fill="white"/>
      <path d="M6.43189 9.78292L6.91098 8.68476C7.02643 8.41924 7.23855 8.20711 7.50407 8.09167L8.60367 7.61258C8.68881 7.57506 8.68881 7.45384 8.60367 7.41777L7.50407 6.93868C7.23855 6.82323 7.02643 6.6111 6.91098 6.34558L6.43189 5.24598C6.39437 5.16084 6.27316 5.16084 6.23708 5.24598L5.75799 6.34558C5.64255 6.6111 5.43042 6.82323 5.1649 6.93868L4.06385 7.41921C3.97872 7.45673 3.97872 7.5765 4.06385 7.61402L5.18366 8.10898C5.44918 8.22587 5.65986 8.43944 5.77386 8.70496L6.23852 9.78292C6.27604 9.86806 6.39726 9.8695 6.43333 9.78292H6.43189Z" fill="white"/>
      <path d="M8.53992 4.79559L9.13445 5.05823C9.27587 5.12028 9.38699 5.23428 9.4476 5.37425L9.69436 5.94714C9.71456 5.99332 9.77805 5.99332 9.79826 5.94714L10.0522 5.36415C10.1143 5.22273 10.2268 5.11018 10.3668 5.04957L10.9498 4.79559C10.9945 4.77539 10.9945 4.7119 10.9498 4.69169L10.3668 4.43772C10.2254 4.37567 10.1128 4.26311 10.0522 4.12313L9.79826 3.54014C9.77805 3.49541 9.71456 3.49541 9.69436 3.54014L9.44038 4.12313C9.37833 4.26455 9.26577 4.37711 9.1258 4.43772L8.54136 4.69314C8.49663 4.71334 8.49663 4.77683 8.54136 4.79703L8.53992 4.79559Z" fill="white"/>
    </svg>
  );
}

/* ── Active state Sangoma AI icon (filled circle with dark sparkles) ── */
export function ActiveAIIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="10" fill="white"/>
      <path d="M17.8645 13.3095L15.5196 12.2864C14.9525 12.0397 14.5008 11.5865 14.254 11.0209L13.2309 8.67592C13.1516 8.49409 12.8933 8.49409 12.8139 8.67592L11.7908 11.0209C11.544 11.588 11.0909 12.0397 10.5252 12.2864L8.17738 13.311C7.99556 13.3903 7.99556 13.6472 8.17738 13.7266L10.5656 14.7829C11.1313 15.0325 11.5815 15.4871 11.8254 16.0557L12.8153 18.3559C12.8933 18.5391 13.153 18.5391 13.2324 18.3559L14.254 16.0152C14.5008 15.4481 14.9539 14.9965 15.5196 14.7497L17.8645 13.7266C18.0464 13.6472 18.0464 13.3889 17.8645 13.3095Z" fill="#2E1055"/>
      <path d="M8.43189 11.7829L8.91098 10.6848C9.02643 10.4192 9.23855 10.2071 9.50407 10.0917L10.6037 9.61258C10.6888 9.57506 10.6888 9.45384 10.6037 9.41777L9.50407 8.93868C9.23855 8.82323 9.02643 8.6111 8.91098 8.34558L8.43189 7.24598C8.39437 7.16084 8.27316 7.16084 8.23708 7.24598L7.75799 8.34558C7.64255 8.6111 7.43042 8.82323 7.1649 8.93868L6.06385 9.41921C5.97872 9.45673 5.97872 9.5765 6.06385 9.61402L7.18366 10.109C7.44918 10.2259 7.65986 10.4394 7.77386 10.705L8.23852 11.7829C8.27604 11.8681 8.39726 11.8695 8.43333 11.7829H8.43189Z" fill="#2E1055"/>
      <path d="M10.5399 6.79559L11.1345 7.05823C11.2759 7.12028 11.387 7.23428 11.4476 7.37425L11.6944 7.94714C11.7146 7.99332 11.7781 7.99332 11.7983 7.94714L12.0522 7.36415C12.1143 7.22273 12.2268 7.11018 12.3668 7.04957L12.9498 6.79559C12.9945 6.77539 12.9945 6.7119 12.9498 6.69169L12.3668 6.43772C12.2254 6.37567 12.1128 6.26311 12.0522 6.12313L11.7983 5.54014C11.7781 5.49541 11.7146 5.49541 11.6944 5.54014L11.4404 6.12313C11.3783 6.26455 11.2658 6.37711 11.1258 6.43772L10.5414 6.69314C10.4966 6.71334 10.4966 6.77683 10.5414 6.79703L10.5399 6.79559Z" fill="#2E1055"/>
    </svg>
  );
}

/* ── Play button icon ── */
function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="#2E1055" strokeWidth="1"/>
      <path d="M6.5 5L10.5 8L6.5 11V5Z" fill="#2E1055"/>
    </svg>
  );
}

/* ── Banner illustration for receptionist view ── */
function ReceptionistBanner() {
  return (
    <div className="mx-5 mt-5 mb-4 rounded-2xl overflow-hidden h-[170px] relative" style={{ background: "linear-gradient(135deg, #f0e4f7 0%, #d8b8ec 40%, #c89de0 70%, #b882d4 100%)" }}>
      {/* Decorative sparkles */}
      <div className="absolute top-3 right-4 opacity-30">
        <svg width="24" height="24" viewBox="0 0 20 20" fill="#2E1055"><path d="M15.86 11.31L13.52 10.29C12.95 10.04 12.5 9.59 12.25 9.02L11.23 6.68C11.15 6.49 10.89 6.49 10.81 6.68L9.79 9.02C9.54 9.59 9.09 10.04 8.53 10.29L6.18 11.31C6 11.39 6 11.65 6.18 11.73L8.57 12.78C9.13 13.03 9.58 13.49 9.83 14.06L10.82 16.36C10.89 16.54 11.15 16.54 11.23 16.36L12.25 14.02C12.5 13.45 12.95 13 13.52 12.75L15.86 11.73C16.05 11.65 16.05 11.39 15.86 11.31Z"/></svg>
      </div>
      {/* Transcript rows mock */}
      <div className="absolute inset-0 flex flex-col justify-center px-3.5 gap-1.5">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center text-[9px] shadow-sm">
          <span className="font-semibold text-[#2E1055] uppercase tracking-wider w-16">Sentiment</span>
          <span className="text-[#4C5863] flex-1">Audio</span>
          <span className="text-[#4C5863]">Actions</span>
        </div>
        {[
          { sentiment: "Neutral", color: "bg-yellow-400", time1: "00:00", time2: "00:24", width: "35%", action: "Open transcript" },
          { sentiment: "Neutral", color: "bg-yellow-400", time1: "00:01", time2: "00:25", width: "50%", action: "Close transcript" },
          { sentiment: "Good", color: "bg-green-500", time1: "00:02", time2: "00:26", width: "65%", action: "Open transcript" },
          { sentiment: "Good", color: "bg-green-500", time1: "00:03", time2: "00:27", width: "80%", action: "Open transcript" },
        ].map((row, i) => (
          <div key={i} className="bg-white/75 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-1.5 text-[8px] shadow-sm">
            <span className={`w-1.5 h-1.5 rounded-full ${row.color} shrink-0`} />
            <span className="text-[#001221] font-medium w-10">{row.sentiment}</span>
            <div className="flex items-center gap-1 flex-1 mx-0.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2E1055]/10 flex items-center justify-center">
                <span className="text-[5px]">&#9654;</span>
              </div>
              <span className="text-[#7F888F]">{row.time1}</span>
              <div className="flex-1 h-[3px] bg-[#2E1055]/10 rounded-full relative mx-0.5">
                <div className="absolute left-0 top-0 h-full bg-[#2E1055]/30 rounded-full" style={{ width: row.width }} />
              </div>
              <span className="text-[#7F888F]">{row.time2}</span>
            </div>
            <span className="text-[#2E1055] font-medium shrink-0">{row.action}</span>
          </div>
        ))}
      </div>
      {/* AI chat bubble */}
      <div className="absolute bottom-3 right-4 bg-[#001221] text-white text-[8px] leading-[1.4] rounded-xl rounded-bl-sm px-3 py-2 max-w-[160px] shadow-xl">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#783a9b] to-[#2E1055] flex items-center justify-center">
            <svg width="7" height="7" viewBox="0 0 20 20" fill="white"><path d="M15.86 11.31L13.52 10.29C12.95 10.04 12.5 9.59 12.25 9.02L11.23 6.68C11.15 6.49 10.89 6.49 10.81 6.68L9.79 9.02C9.54 9.59 9.09 10.04 8.53 10.29L6.18 11.31C6 11.39 6 11.65 6.18 11.73L8.57 12.78C9.13 13.03 9.58 13.49 9.83 14.06L10.82 16.36C10.89 16.54 11.15 16.54 11.23 16.36L12.25 14.02C12.5 13.45 12.95 13 13.52 12.75L15.86 11.73C16.05 11.65 16.05 11.39 15.86 11.31Z"/></svg>
          </div>
          <span className="font-semibold text-[7px] opacity-70">Sangoma AI</span>
        </div>
        Welcome to Restaurant! My name is Laura, AI-reception assistant. How can I help you?
      </div>
    </div>
  );
}

/* ── Step content for expanded accordion sections (#6) ── */
function StepContent({ stepIndex }: { stepIndex: number }) {
  switch (stepIndex) {
    case 1: // Company description
      return (
        <div className="px-1 pb-5 space-y-3 animate-[fadeIn_0.2s_ease-out]">
          <div>
            <label className="block text-[12px] font-medium text-[#4C5863] mb-1.5">Company name</label>
            <input type="text" defaultValue="Sangoma Technologies" className="w-full px-3 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-lg bg-white focus:outline-none focus:border-[#2E1055] transition-colors" />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-[#4C5863] mb-1.5">Industry</label>
            <select className="w-full px-3 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-lg bg-white focus:outline-none focus:border-[#2E1055] transition-colors appearance-none">
              <option>Telecommunications</option>
              <option>Healthcare</option>
              <option>Restaurant & Hospitality</option>
              <option>Legal Services</option>
              <option>Real Estate</option>
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-[#4C5863] mb-1.5">Description</label>
            <textarea rows={3} defaultValue="We provide unified communication solutions for businesses of all sizes, including VoIP, video conferencing, and AI-powered tools." className="w-full px-3 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-lg bg-white focus:outline-none focus:border-[#2E1055] transition-colors resize-none" />
          </div>
          <button className="w-full py-3 bg-[#001221] text-white text-[12px] font-bold tracking-wider uppercase rounded-full hover:bg-[#0a2540] active:scale-[0.98] transition-all mt-1">
            Save and Continue
          </button>
        </div>
      );
    case 2: // Location and business hours
      return (
        <div className="px-1 pb-5 space-y-3 animate-[fadeIn_0.2s_ease-out]">
          <div>
            <label className="block text-[12px] font-medium text-[#4C5863] mb-1.5">Address</label>
            <input type="text" defaultValue="100 Renfrew Dr, Suite 100, Markham, ON" className="w-full px-3 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-lg bg-white focus:outline-none focus:border-[#2E1055] transition-colors" />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-[#4C5863] mb-1.5">Timezone</label>
            <select className="w-full px-3 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-lg bg-white focus:outline-none focus:border-[#2E1055] transition-colors appearance-none">
              <option>Eastern Time (ET)</option>
              <option>Pacific Time (PT)</option>
              <option>Central Time (CT)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-[12px] font-medium text-[#4C5863] mb-1">Business hours</label>
            {["Monday - Friday", "Saturday", "Sunday"].map((day, i) => (
              <div key={day} className="flex items-center gap-2">
                <span className="text-[12px] text-[#001221] w-28">{day}</span>
                <input type="text" defaultValue={i === 0 ? "9:00 AM - 5:00 PM" : i === 1 ? "10:00 AM - 2:00 PM" : "Closed"} className="flex-1 px-2.5 py-1.5 text-[12px] text-[#001221] border border-[#E5E6E8] rounded-lg bg-white focus:outline-none focus:border-[#2E1055] transition-colors" />
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-[#001221] text-white text-[12px] font-bold tracking-wider uppercase rounded-full hover:bg-[#0a2540] active:scale-[0.98] transition-all mt-1">
            Save and Continue
          </button>
        </div>
      );
    case 3: // Transfer by name
      return (
        <div className="px-1 pb-5 space-y-3 animate-[fadeIn_0.2s_ease-out]">
          <p className="text-[12px] text-[#4C5863]">Allow callers to be transferred to a team member by name.</p>
          <div className="flex items-center justify-between py-2">
            <span className="text-[13px] text-[#001221] font-medium">Enable transfer by name</span>
            <div className="w-10 h-6 bg-[#2E1055] rounded-full relative cursor-pointer">
              <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-[#4C5863] mb-1.5">Directory source</label>
            <select className="w-full px-3 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-lg bg-white focus:outline-none focus:border-[#2E1055] transition-colors appearance-none">
              <option>All extensions</option>
              <option>Sales team only</option>
              <option>Support team only</option>
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-[#4C5863] mb-1.5">Max transfer attempts</label>
            <input type="number" defaultValue={3} className="w-full px-3 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-lg bg-white focus:outline-none focus:border-[#2E1055] transition-colors" />
          </div>
          <button className="w-full py-3 bg-[#001221] text-white text-[12px] font-bold tracking-wider uppercase rounded-full hover:bg-[#0a2540] active:scale-[0.98] transition-all mt-1">
            Save and Continue
          </button>
        </div>
      );
    case 4: // Greeting
      return (
        <div className="px-1 pb-5 space-y-3 animate-[fadeIn_0.2s_ease-out]">
          <div>
            <label className="block text-[12px] font-medium text-[#4C5863] mb-1.5">Greeting message</label>
            <textarea rows={3} defaultValue="Thank you for calling Sangoma Technologies! How may I direct your call today?" className="w-full px-3 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-lg bg-white focus:outline-none focus:border-[#2E1055] transition-colors resize-none" />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-[#4C5863] mb-1.5">After-hours message</label>
            <textarea rows={3} defaultValue="We are currently closed. Our business hours are Monday to Friday, 9 AM to 5 PM. Please leave a message and we will return your call." className="w-full px-3 py-2.5 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-lg bg-white focus:outline-none focus:border-[#2E1055] transition-colors resize-none" />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-[13px] text-[#001221] font-medium">Play hold music</span>
            <div className="w-10 h-6 bg-[#2E1055] rounded-full relative cursor-pointer">
              <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all" />
            </div>
          </div>
          <button className="w-full py-3 bg-[#001221] text-white text-[12px] font-bold tracking-wider uppercase rounded-full hover:bg-[#0a2540] active:scale-[0.98] transition-all mt-1">
            Save and Finish
          </button>
        </div>
      );
    default:
      return null;
  }
}

/* ── Main AI Assist Panel (inline, white bg, with micro-interactions) ── */
export default function AIAssistPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [view, setView] = useState<PanelView>("main");
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<string>("Stacy");
  const [animating, setAnimating] = useState(false);

  // Reset view when panel opens with animation
  useEffect(() => {
    if (isOpen) {
      setView("main");
      setExpandedStep(null);
      setAnimating(true);
      const t = setTimeout(() => setAnimating(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleActionClick = (action: string) => {
    if (action === "Add your AI receptionist") {
      setView("receptionist");
    }
  };

  const handleStepToggle = (index: number) => {
    if (index === 0) {
      if (expandedStep === 0) {
        setExpandedStep(null);
      } else {
        setExpandedStep(0);
        setView("tone");
      }
    } else {
      setExpandedStep(expandedStep === index ? null : index);
    }
  };

  const handleBack = () => {
    if (view === "tone") {
      setView("receptionist");
      setExpandedStep(null);
    } else {
      setView("main");
    }
  };

  return (
    <div className={`w-[390px] shrink-0 bg-white border-l border-[#E5E6E8] flex flex-col overflow-hidden ${animating ? "animate-[slideInRight_0.3s_ease-out]" : ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 h-14 shrink-0 border-b border-[#E5E6E8]">
        <div className="flex items-center gap-2">
          {view !== "main" && (
            <button
              onClick={handleBack}
              className="p-1 -ml-1 rounded-lg hover:bg-[#F2F2F3] active:bg-[#E5E6E8] transition-all duration-150 active:scale-90"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="#001221" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          <span className="text-[15px] font-semibold text-[#001221]">
            {view === "main" ? "AI Assist" : "AI receptionist"}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-[#F2F2F3] active:bg-[#E5E6E8] transition-all duration-150 active:scale-90"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M13.5 4.5L4.5 13.5" stroke="#001221" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M4.5 4.5L13.5 13.5" stroke="#001221" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Content with view transitions */}
      <div className="flex-1 overflow-y-auto">
        <div key={view} className="animate-[fadeIn_0.2s_ease-out]">
          {view === "main" && (
            <MainView onActionClick={handleActionClick} />
          )}
          {view === "receptionist" && (
            <ReceptionistView
              expandedStep={expandedStep}
              onStepToggle={handleStepToggle}
            />
          )}
          {view === "tone" && (
            <ToneView
              selectedPersona={selectedPersona}
              onSelectPersona={setSelectedPersona}
              expandedStep={expandedStep}
              onStepToggle={handleStepToggle}
              onSave={() => {
                setView("receptionist");
                setExpandedStep(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main View ── */
function MainView({ onActionClick }: { onActionClick: (a: string) => void }) {
  return (
    <div className="px-5 pt-10 pb-8">
      {/* Sparkle icon */}
      <div className="mb-6 animate-[fadeIn_0.3s_ease-out]">
        <SparkleIcon />
      </div>

      {/* Heading */}
      <h2 className="text-[22px] font-bold text-[#001221] leading-[1.3] mb-3 animate-[fadeIn_0.35s_ease-out]">
        Use Your Sangoma AI<br />Assistant to Make Your<br />Job Easier
      </h2>

      {/* Subtitle */}
      <p className="text-[14px] text-[#4C5863] leading-[1.5] mb-8 animate-[fadeIn_0.4s_ease-out]">
        Power up your productivity with AI features in the app you use every day.
      </p>

      {/* Action buttons with staggered animation */}
      <div className="flex flex-col gap-3">
        {actionButtons.map((action, i) => (
          <button
            key={action.label}
            onClick={() => onActionClick(action.label)}
            className="w-full py-3.5 px-5 bg-white rounded-xl border border-[#E5E6E8] text-[14px] font-medium text-[#001221] text-left flex items-center gap-3 hover:border-[#C5C7CA] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] active:scale-[0.98] active:shadow-none transition-all duration-150"
            style={{ animationDelay: `${0.05 * i}s`, animation: `fadeIn 0.3s ease-out ${0.05 * i}s both` }}
          >
            <span className="w-8 h-8 rounded-full bg-[#F2F0F5] flex items-center justify-center shrink-0">
              <ActionIcon type={action.icon} />
            </span>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Receptionist View ── */
function ReceptionistView({
  expandedStep,
  onStepToggle,
}: {
  expandedStep: number | null;
  onStepToggle: (i: number) => void;
}) {
  return (
    <div className="pb-8">
      <ReceptionistBanner />

      <div className="px-5">
        <h2 className="text-[22px] font-bold text-[#001221] leading-[1.3] mb-2">
          Create your AI<br />receptionist
        </h2>
        <p className="text-[13px] text-[#4C5863] leading-[1.5] mb-6">
          Customize your receptionist and equip them with the skills they need to assist your business in 5 easy steps.
        </p>

        {/* Steps accordion */}
        <div className="flex flex-col">
          {receptionistSteps.map((step, i) => (
            <div key={i} className="border-b border-[#E5E6E8]">
              <button
                onClick={() => onStepToggle(i)}
                className="w-full flex items-center justify-between py-4 px-1 text-left hover:bg-[#F9F9FA] rounded-lg transition-all duration-150 active:scale-[0.99]"
              >
                <span className="text-[14px] font-medium text-[#001221]">
                  {i + 1}. {step}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`transition-transform duration-300 ${expandedStep === i ? "rotate-180" : ""}`}
                >
                  {expandedStep === i ? (
                    <path d="M4 10H16" stroke="#001221" strokeWidth="1.5" strokeLinecap="round"/>
                  ) : (
                    <>
                      <path d="M10 4V16" stroke="#001221" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M4 10H16" stroke="#001221" strokeWidth="1.5" strokeLinecap="round"/>
                    </>
                  )}
                </svg>
              </button>
              {/* Expanded content for non-tone steps */}
              {expandedStep === i && i !== 0 && (
                <StepContent stepIndex={i} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Tone & Personality View ── */
function ToneView({
  selectedPersona,
  onSelectPersona,
  expandedStep,
  onStepToggle,
  onSave,
}: {
  selectedPersona: string;
  onSelectPersona: (name: string) => void;
  expandedStep: number | null;
  onStepToggle: (i: number) => void;
  onSave: () => void;
}) {
  return (
    <div className="pb-8">
      <ReceptionistBanner />

      <div className="px-5">
        <h2 className="text-[22px] font-bold text-[#001221] leading-[1.3] mb-2">
          Create your AI<br />receptionist
        </h2>
        <p className="text-[13px] text-[#4C5863] leading-[1.5] mb-6">
          Customize your receptionist and equip them with the skills they need to assist your business in 5 easy steps.
        </p>

        {/* Step 1: Tone and personality – expanded with personas */}
        <div className="border-b border-[#E5E6E8]">
          <button
            onClick={() => onStepToggle(0)}
            className="w-full flex items-center justify-between py-4 px-1 text-left"
          >
            <span className="text-[14px] font-medium text-[#001221]">
              1. Tone and personality
            </span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16" stroke="#001221" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Persona grid with real faces */}
          <div className="grid grid-cols-4 gap-3 px-1 pt-2 pb-5">
            {personas.map((persona, i) => {
              const isSelected = selectedPersona === persona.name;
              return (
                <button
                  key={persona.name}
                  onClick={() => onSelectPersona(persona.name)}
                  className="flex flex-col items-center gap-1.5 group"
                  style={{ animation: `fadeIn 0.25s ease-out ${0.04 * i}s both` }}
                >
                  <div
                    className={`w-16 h-16 rounded-full overflow-hidden transition-all duration-200 ${
                      isSelected
                        ? "ring-2 ring-[#2E1055] ring-offset-2 scale-105"
                        : "hover:ring-2 hover:ring-[#E5E6E8] hover:ring-offset-1 hover:scale-105"
                    }`}
                  >
                    <Image
                      src={persona.img}
                      alt={persona.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <span className={`text-[12px] font-medium transition-colors ${isSelected ? "text-[#001221]" : "text-[#4C5863] group-hover:text-[#001221]"}`}>
                    {persona.name}
                  </span>
                  <div className="opacity-70 group-hover:opacity-100 transition-opacity active:scale-90">
                    <PlayIcon />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Save and Continue button */}
          <div className="px-1 pb-5">
            <button
              onClick={onSave}
              className="w-full py-3.5 bg-[#001221] text-white text-[13px] font-bold tracking-wider uppercase rounded-full hover:bg-[#0a2540] hover:shadow-[0_4px_12px_rgba(0,18,33,0.3)] active:scale-[0.98] active:shadow-none transition-all duration-200"
            >
              Save and Continue
            </button>
          </div>
        </div>

        {/* Remaining steps (collapsed) */}
        {receptionistSteps.slice(1).map((step, i) => (
          <div key={i + 1} className="border-b border-[#E5E6E8]">
            <button
              onClick={() => onStepToggle(i + 1)}
              className="w-full flex items-center justify-between py-4 px-1 text-left hover:bg-[#F9F9FA] rounded-lg transition-all duration-150 active:scale-[0.99]"
            >
              <span className="text-[14px] font-medium text-[#001221]">
                {i + 2}. {step}
              </span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4V16" stroke="#001221" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M4 10H16" stroke="#001221" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
