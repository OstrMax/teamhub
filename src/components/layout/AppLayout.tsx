"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AIAssistPanel from "@/components/ai/AIAssistPanel";
import WalkthroughBubbles from "@/components/walkthrough/WalkthroughBubbles";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {/* Top bar with logo */}
      <div className="bg-[#2a1051] flex items-center justify-center h-11 w-full shrink-0 border-b border-white/10 rounded-t-xl">
        <div className="flex items-center gap-2">
          <Image src="/icons/logo.png" alt="TeamHub" width={20} height={14} priority />
          <span className="text-white/90 font-normal text-[15px] tracking-[0.3px] font-[family-name:var(--font-inter)]">TeamHub</span>
        </div>
      </div>

      <div
        className="flex flex-1 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgb(41, 15, 79) 0%, rgb(112, 22, 156) 33%, rgb(132, 25, 178) 64.5%, rgb(180, 10, 131) 100%)",
        }}
      >
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header aiPanelOpen={aiPanelOpen} onToggleAI={() => setAiPanelOpen(!aiPanelOpen)} />
          <div className="flex flex-1 overflow-hidden">
            {/* Main content */}
            <div
              className="flex-1 overflow-hidden transition-all duration-300 rounded-tl-xl"
              style={{ backgroundColor: "var(--th-bg)" }}
            >
              {children}
            </div>

            {/* AI Assist Panel */}
            <AIAssistPanel isOpen={aiPanelOpen} onClose={() => setAiPanelOpen(false)} />
          </div>
        </div>
      </div>

      {/* Walkthrough tooltips */}
      <WalkthroughBubbles />
    </div>
  );
}
