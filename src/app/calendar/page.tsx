"use client";

import { useState, useMemo } from "react";

/* ── Types ── */
type ViewMode = "Day" | "Week" | "Month" | "Agenda";

interface CalendarEvent {
  title: string;
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
  color: string;
  borderColor: string;
  url: string;
  icon?: string;
}

/* ── Fake events for the selected day ── */
const dayEvents: CalendarEvent[] = [
  { title: "All-Team kickoff", startHour: 9, startMin: 0, endHour: 10, endMin: 0, color: "#F3F0FF", borderColor: "#7C3AED", url: "https://meet.sangoma.com/9", icon: "team" },
  { title: "Dev/Design sync", startHour: 10, startMin: 30, endHour: 11, endMin: 0, color: "#E0F7FA", borderColor: "#0097A7", url: "https://meet.sangoma.com/9" },
  { title: "Design team meeting", startHour: 12, startMin: 0, endHour: 12, endMin: 30, color: "#E8F5E9", borderColor: "#2CAD43", url: "https://meet.sangoma.com/9" },
  { title: "Control Panel project kick-off meeting", startHour: 13, startMin: 0, endHour: 14, endMin: 0, color: "#FFF3E0", borderColor: "#F59E0B", url: "https://meet.sangoma.com/9", icon: "star" },
];

/* ── Mini calendar data ── */
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

/* ── Calendar event dots for mini calendar ── */
const eventDots: Record<number, string[]> = {
  2: ["#7C3AED"],
  5: ["#3B82F6"],
  9: ["#F59E0B", "#2CAD43"],
  11: ["#7C3AED"],
  14: ["#3B82F6", "#F59E0B"],
  18: ["#7C3AED", "#3B82F6"],
  22: ["#7C3AED", "#0097A7", "#2CAD43", "#F59E0B"],
  25: ["#3B82F6"],
};

export default function CalendarPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("Day");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 22)); // Aug 22, 2025 (matching Figma)
  const [calMonth, setCalMonth] = useState(7); // August (0-indexed)
  const [calYear, setCalYear] = useState(2025);

  const selectedDay = currentDate.getDate();
  const dayOfWeek = DAY_NAMES[currentDate.getDay()];

  /* Mini calendar grid */
  const calendarGrid = useMemo(() => {
    const daysInMonth = getDaysInMonth(calYear, calMonth);
    const firstDay = getFirstDayOfMonth(calYear, calMonth);
    const prevMonthDays = getDaysInMonth(calYear, calMonth - 1);

    const cells: { day: number; currentMonth: boolean }[] = [];

    // Previous month trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ day: prevMonthDays - i, currentMonth: false });
    }
    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, currentMonth: true });
    }
    // Next month leading days
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      cells.push({ day: d, currentMonth: false });
    }
    return cells;
  }, [calYear, calMonth]);

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(calYear - 1);
    } else {
      setCalMonth(calMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(calYear + 1);
    } else {
      setCalMonth(calMonth + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    setCurrentDate(new Date(calYear, calMonth, day));
  };

  const handleToday = () => {
    setCurrentDate(new Date(2025, 7, 22));
    setCalMonth(7);
    setCalYear(2025);
  };

  const handlePrevDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    setCurrentDate(d);
    setCalMonth(d.getMonth());
    setCalYear(d.getFullYear());
  };

  const handleNextDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    setCurrentDate(d);
    setCalMonth(d.getMonth());
    setCalYear(d.getFullYear());
  };

  /* ── Current time position for indicator ── */
  const nowHour = 11;
  const nowMin = 0;
  const timeIndicatorTop = (nowHour - 7) * 64 + (nowMin / 60) * 64;

  return (
    <div className="flex h-full">
      {/* Left sidebar - Mini calendar */}
      <div className="w-[260px] shrink-0 border-r border-[#E5E6E8] bg-white flex flex-col p-4">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] font-semibold text-[#001221]">
            {MONTH_NAMES[calMonth]}, {calYear}
          </span>
          <div className="flex items-center gap-1">
            <button onClick={handlePrevMonth} className="p-1 rounded hover:bg-[#F2F2F3] active:scale-90 transition-all">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 3.5L5 7l3.5 3.5" stroke="#001221" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={handleNextMonth} className="p-1 rounded hover:bg-[#F2F2F3] active:scale-90 transition-all">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 3.5L9 7l-3.5 3.5" stroke="#001221" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-0 mb-1">
          {DAY_NAMES.map((d) => (
            <div key={d} className="text-[10px] font-semibold text-[#7F888F] text-center py-1">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-0">
          {calendarGrid.map((cell, i) => {
            const isSelected = cell.currentMonth && cell.day === selectedDay && calMonth === currentDate.getMonth() && calYear === currentDate.getFullYear();
            const dots = cell.currentMonth ? eventDots[cell.day] : undefined;
            return (
              <button
                key={i}
                onClick={() => cell.currentMonth && handleSelectDay(cell.day)}
                className={`relative flex flex-col items-center justify-center h-9 text-[12px] font-medium rounded-full transition-all ${
                  !cell.currentMonth
                    ? "text-[#CCCFD2]"
                    : isSelected
                      ? "bg-[#2E1055] text-white"
                      : "text-[#001221] hover:bg-[#F2F2F3]"
                }`}
              >
                {cell.day}
                {dots && dots.length > 0 && (
                  <div className="flex items-center gap-[2px] absolute bottom-0.5">
                    {dots.slice(0, 3).map((c, di) => (
                      <span key={di} className="w-[3px] h-[3px] rounded-full" style={{ background: isSelected ? "white" : c }} />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main calendar content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E6E8]">
          <div className="flex items-center gap-3">
            {/* Add event */}
            <button className="w-8 h-8 rounded-lg bg-[#2E1055] flex items-center justify-center hover:bg-[#3d1670] active:scale-95 transition-all">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>

            {/* Nav arrows */}
            <button onClick={handlePrevDay} className="p-1.5 rounded-lg hover:bg-[#F2F2F3] active:scale-90 transition-all">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="#001221" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={handleToday} className="p-1.5 rounded-lg hover:bg-[#F2F2F3] active:scale-90 transition-all" title="Today">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="2" stroke="#001221" strokeWidth="1.3"/>
                <path d="M2 6h12" stroke="#001221" strokeWidth="1.3"/>
              </svg>
            </button>
            <button onClick={handleNextDay} className="p-1.5 rounded-lg hover:bg-[#F2F2F3] active:scale-90 transition-all">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="#001221" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {/* Date */}
            <h2 className="text-[16px] font-semibold text-[#001221] ml-1">
              {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getDate()}, {currentDate.getFullYear()}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* View mode tabs */}
            <div className="flex items-center bg-[#F2F2F3] rounded-full p-0.5">
              {(["Day", "Week", "Month", "Agenda"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                    viewMode === mode
                      ? "bg-white text-[#001221] shadow-sm"
                      : "text-[#7F888F] hover:text-[#4C5863]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="absolute left-2.5 top-1/2 -translate-y-1/2">
                <circle cx="7" cy="7" r="4.5" stroke="#7F888F" strokeWidth="1.3"/>
                <path d="M10.5 10.5L13.5 13.5" stroke="#7F888F" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-3 py-1.5 w-40 text-[13px] text-[#001221] border border-[#E5E6E8] rounded-lg bg-white focus:outline-none focus:border-[#2E1055] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Day view */}
        <div className="flex-1 overflow-y-auto">
          {/* Day header */}
          <div className="px-5 pt-4 pb-2 text-center">
            <div className="text-[11px] text-[#7F888F] uppercase tracking-wider font-medium">{dayOfWeek}</div>
            <div className="text-[28px] font-semibold text-[#001221] leading-none mt-0.5">{selectedDay}</div>
          </div>

          {/* Time grid */}
          <div className="relative px-5 pb-10">
            {/* Time slots */}
            {Array.from({ length: 11 }, (_, i) => i + 7).map((hour) => (
              <div key={hour} className="flex items-start h-16 border-t border-[#F2F2F3]">
                <span className="text-[11px] text-[#7F888F] w-14 shrink-0 -mt-[7px] font-medium">
                  {hour === 12 ? "12 PM" : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </span>
                <div className="flex-1 relative" />
              </div>
            ))}

            {/* Events positioned absolutely */}
            <div className="absolute left-[4.5rem] right-5 top-0">
              {dayEvents.map((event, i) => {
                const top = (event.startHour - 7) * 64 + (event.startMin / 60) * 64;
                const height = ((event.endHour - event.startHour) * 60 + (event.endMin - event.startMin)) / 60 * 64;
                const startStr = `${event.startHour > 12 ? event.startHour - 12 : event.startHour}:${String(event.startMin).padStart(2, "0")} ${event.startHour >= 12 ? "PM" : "AM"}`;
                const endStr = `${event.endHour > 12 ? event.endHour - 12 : event.endHour}:${String(event.endMin).padStart(2, "0")} ${event.endHour >= 12 ? "PM" : "AM"}`;
                return (
                  <div
                    key={i}
                    className="absolute left-0 right-0 rounded-lg px-3 py-2 cursor-pointer hover:shadow-md transition-shadow"
                    style={{
                      top: `${top}px`,
                      height: `${height}px`,
                      backgroundColor: event.color,
                      borderLeft: `3px solid ${event.borderColor}`,
                      animation: `fadeIn 0.25s ease-out ${0.05 * i}s both`,
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-medium text-[#001221]">{event.title}</span>
                      {event.icon === "team" && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill={event.borderColor}><circle cx="7" cy="7" r="5"/><path d="M5 7l1.5 1.5L9 5.5" stroke="white" strokeWidth="1.2"/></svg>
                      )}
                      {event.icon === "star" && (
                        <span className="text-[13px]">&#9733;</span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#7F888F] mt-0.5">
                      {startStr} - {endStr} at {event.url}
                    </div>
                  </div>
                );
              })}

              {/* Current time indicator */}
              <div className="absolute left-0 right-0" style={{ top: `${timeIndicatorTop}px` }}>
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-[5px] shrink-0" />
                  <div className="flex-1 h-[2px] bg-red-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
