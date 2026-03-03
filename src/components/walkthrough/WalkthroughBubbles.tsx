"use client";

import { useState, useEffect } from "react";

interface WalkthroughTip {
  id: string;
  text: string;
  target: string; // CSS selector or description
  position: { top?: string; bottom?: string; left?: string; right?: string };
  arrowDirection: "up" | "down" | "left" | "right";
}

const tips: WalkthroughTip[] = [
  {
    id: "ai-assist",
    text: "Click here to open AI Assistant",
    target: "ai-button",
    position: { top: "52px", right: "140px" },
    arrowDirection: "up",
  },
  {
    id: "sidebar-meet",
    text: "Join or schedule meetings",
    target: "meet-link",
    position: { top: "210px", left: "68px" },
    arrowDirection: "left",
  },
  {
    id: "sidebar-calendar",
    text: "View your calendar",
    target: "calendar-link",
    position: { top: "315px", left: "68px" },
    arrowDirection: "left",
  },
  {
    id: "quick-actions",
    text: "Use quick actions to call, chat or meet instantly",
    target: "quick-actions",
    position: { top: "140px", right: "50px" },
    arrowDirection: "up",
  },
];

export default function WalkthroughBubbles() {
  const [currentTip, setCurrentTip] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show walkthrough after a short delay
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (dismissed || !visible) return null;

  const tip = tips[currentTip];
  const isLast = currentTip === tips.length - 1;

  const handleNext = () => {
    if (isLast) {
      setDismissed(true);
    } else {
      setCurrentTip(currentTip + 1);
    }
  };

  const handleSkip = () => {
    setDismissed(true);
  };

  const arrowStyles: Record<string, string> = {
    up: "bottom-full left-1/2 -translate-x-1/2 mb-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-[#001221]",
    down: "top-full left-1/2 -translate-x-1/2 mt-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#001221]",
    left: "right-full top-1/2 -translate-y-1/2 mr-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-[#001221]",
    right: "left-full top-1/2 -translate-y-1/2 ml-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#001221]",
  };

  return (
    <>
      {/* Subtle backdrop pulse */}
      <div className="fixed inset-0 z-[998] pointer-events-none" />

      {/* Tooltip bubble */}
      <div
        className="fixed z-[999] animate-[fadeIn_0.3s_ease-out]"
        style={{
          ...tip.position,
        }}
      >
        <div className="relative bg-[#001221] text-white rounded-xl px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.3)] max-w-[240px]">
          {/* Arrow */}
          <div className={`absolute w-0 h-0 ${arrowStyles[tip.arrowDirection]}`} />

          {/* Content */}
          <p className="text-[13px] leading-[1.4] font-medium mb-3">{tip.text}</p>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {tips.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === currentTip ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSkip}
                className="text-[11px] text-white/60 hover:text-white/90 transition-colors"
              >
                Skip
              </button>
              <button
                onClick={handleNext}
                className="px-3 py-1 bg-white text-[#001221] text-[11px] font-semibold rounded-full hover:bg-white/90 active:scale-95 transition-all"
              >
                {isLast ? "Got it!" : "Next"}
              </button>
            </div>
          </div>

          {/* Step counter */}
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#7C3AED] flex items-center justify-center text-[10px] font-bold text-white">
            {currentTip + 1}
          </div>
        </div>
      </div>
    </>
  );
}
