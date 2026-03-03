"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ProfileDropdown from "@/components/profile/ProfileDropdown";
import { PassiveAIIcon, ActiveAIIcon } from "@/components/ai/AIAssistPanel";

export default function Header({
  aiPanelOpen,
  onToggleAI,
}: {
  aiPanelOpen: boolean;
  onToggleAI: () => void;
}) {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-1 px-3 py-1 w-full h-11 shrink-0">
      {/* Grid/channels icon */}
      <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
        <Image src="/icons/channels.svg" alt="Apps" width={22} height={22} />
      </button>

      <div className="flex-1" />

      {/* Search bar - 80% opacity default, 100% on hover/focus */}
      <button className="flex items-center h-8 w-[365px] bg-white/80 hover:bg-white focus:bg-white rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.08)] px-4 transition-all duration-200 group">
        <Image src="/icons/search.svg" alt="Search" width={16} height={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
        <span className="ml-2 text-sm text-[#4C5863] group-hover:text-[#001221] transition-colors">Search</span>
      </button>

      <div className="flex-1" />

      {/* Right icons */}
      <div className="flex items-center gap-2">
        {/* AI Assist toggle */}
        <button
          onClick={onToggleAI}
          className={`p-1.5 rounded-full transition-all duration-200 ${
            aiPanelOpen
              ? "bg-white/20 hover:bg-white/30"
              : "hover:bg-white/10"
          }`}
          title="AI Assist"
        >
          {aiPanelOpen ? (
            <ActiveAIIcon />
          ) : (
            <PassiveAIIcon />
          )}
        </button>

        {/* Help */}
        <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
          <Image src="/icons/help.svg" alt="Help" width={24} height={24} />
        </button>

        {/* Mentions */}
        <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
          <Image src="/icons/mentions.svg" alt="Mentions" width={24} height={24} />
        </button>

        {/* Notifications */}
        <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
          <Image src="/icons/notifications.svg" alt="Notifications" width={24} height={24} />
        </button>

        {/* Settings */}
        <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
          <Image src="/icons/settings.svg" alt="Settings" width={24} height={24} />
        </button>

        {/* Profile Avatar */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="relative w-9 h-9"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/30 hover:border-white/60 transition-colors bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-semibold">
              BH
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#34C759] border-[2.5px] border-[#2a1051] rounded-full z-10" />
          </button>
          {showProfile && (
            <ProfileDropdown onClose={() => setShowProfile(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
