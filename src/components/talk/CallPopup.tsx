"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface CallPopupProps {
  name: string;
  initials?: string;
  onEnd: () => void;
}

export default function CallPopup({ name, onEnd }: CallPopupProps) {
  const [timer, setTimer] = useState(0);

  /* ── Drag state ── */
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });

  const formatTime = useCallback((seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }, []);

  /* ── Connection timer ── */
  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  /* ── Default position (bottom-right) ── */
  useEffect(() => {
    if (pos === null) {
      const w = 320;
      setPos({
        x: window.innerWidth - w - 24,
        y: window.innerHeight - 200 - 24,
      });
    }
  }, [pos]);

  /* ── Drag handlers ── */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      isDragging.current = true;
      hasDragged.current = false;
      dragStart.current = {
        mx: e.clientX,
        my: e.clientY,
        px: pos?.x ?? 0,
        py: pos?.y ?? 0,
      };
    },
    [pos]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.mx;
    const dy = e.clientY - dragStart.current.my;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasDragged.current = true;
    const w = 320;
    const h = 200;
    setPos({
      x: Math.max(0, Math.min(window.innerWidth - w, dragStart.current.px + dx)),
      y: Math.max(0, Math.min(window.innerHeight - h, dragStart.current.py + dy)),
    });
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  const style: React.CSSProperties = pos
    ? { left: pos.x, top: pos.y, width: 320, animation: hasDragged.current ? undefined : "slideInRight 0.25s ease-out" }
    : { right: 24, bottom: 24, width: 320, animation: "slideInRight 0.25s ease-out" };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="fixed z-[150] rounded-[12px] shadow-2xl shadow-black/30 select-none touch-none"
      style={{
        ...style,
        cursor: isDragging.current ? "grabbing" : "grab",
        backgroundColor: "var(--th-call-card-bg, #001221)",
        border: "1px solid var(--th-call-card-border, transparent)",
      }}
    >
      {/* Section label */}
      <div className="px-3 pt-3 pb-2">
        <span className="text-xs font-semibold" style={{ color: "var(--th-call-card-text, white)" }}>Ongoing call</span>
      </div>

      <div className="px-3 pb-3">
        {/* Header row: name/number + External badge */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-[14px] font-medium" style={{ color: "var(--th-call-card-text, white)" }}>{name}</span>
          <span className="flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-medium rounded-full" style={{ backgroundColor: "var(--th-badge-external-bg, #ebd6e8)", color: "var(--th-badge-external-text, #9c328c)" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="7 17 2 12 7 7"/><polyline points="17 7 22 12 17 17"/></svg>
            External
          </span>
        </div>

        {/* Timer */}
        <div className="text-[12px] mb-3" style={{ color: "var(--th-call-card-muted, rgba(255,255,255,0.6))" }}>{formatTime(timer)}</div>

        {/* Controls row */}
        <div className="flex items-center gap-2">
          {/* Blind dropdown */}
          <button className="flex items-center gap-1 rounded-full px-3 py-1.5 transition-colors active:scale-95" title="Transfer call" style={{ backgroundColor: "var(--th-call-btn-bg, white)", color: "var(--th-call-btn-text, #001221)" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            <span className="text-[12px] font-medium">Blind</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>

          <div className="flex-1" />

          {/* Hold */}
          <button className="w-9 h-9 rounded-full flex items-center justify-center transition-colors active:scale-95" title="Hold" style={{ backgroundColor: "var(--th-call-action-bg, rgba(255,255,255,0.1))" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--th-call-card-text, white)" strokeWidth="2"><line x1="8" y1="5" x2="8" y2="19"/><line x1="16" y1="5" x2="16" y2="19"/></svg>
          </button>

          {/* Park */}
          <button className="w-9 h-9 rounded-full flex items-center justify-center transition-colors active:scale-95" title="Park" style={{ backgroundColor: "var(--th-call-action-bg, rgba(255,255,255,0.1))" }}>
            <span className="text-[13px] font-bold" style={{ color: "var(--th-call-card-text, white)" }}>P</span>
          </button>

          {/* End call */}
          <button
            onClick={onEnd}
            className="w-9 h-9 rounded-full bg-[#EF4444] flex items-center justify-center hover:bg-[#dc3545] transition-all active:scale-90"
            title="End call"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M10.68 13.31a16 16 0 006.63-6.63l-1.27 1.27a2 2 0 01-2.11.45 12.84 12.84 0 01-2.81-.7A2 2 0 019.12 6l.42-1.72A2 2 0 007.55 2.4c-5.1 1.26-6.82 7.88-1.2 13.5s12.24 3.9 13.5-1.2a2 2 0 00-1.88-1.99L16.25 13a2 2 0 00-1.67 1.72 12.84 12.84 0 01-.7 2.81 2 2 0 01-.45 2.11l-1.27 1.27"/><line x1="23" y1="1" x2="1" y2="23"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
