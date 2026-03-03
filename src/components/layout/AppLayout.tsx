"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AIAssistPanel, { PassiveAIIcon, ActiveAIIcon } from "@/components/ai/AIAssistPanel";

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
        className="flex flex-1 overflow-hidden relative"
        style={{
          background: "linear-gradient(180deg, rgb(41, 15, 79) 0%, rgb(112, 22, 156) 33%, rgb(132, 25, 178) 64.5%, rgb(180, 10, 131) 100%)",
        }}
      >
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <div className="flex-1 bg-white rounded-tl-xl overflow-hidden relative">
            {children}

            {/* AI Assist floating button */}
            <button
              onClick={() => setAiPanelOpen(!aiPanelOpen)}
              className={`fixed bottom-6 right-6 z-[60] flex items-center justify-center rounded-full transition-all duration-200 ${
                aiPanelOpen
                  ? "w-12 h-12 bg-[#2E1055] shadow-[0_4px_20px_rgba(46,16,85,0.4)] hover:shadow-[0_4px_24px_rgba(46,16,85,0.5)] hover:scale-105 active:scale-95"
                  : "w-11 h-11 bg-[#2E1055]/80 hover:bg-[#2E1055] shadow-[0_4px_16px_rgba(46,16,85,0.3)] hover:shadow-[0_4px_20px_rgba(46,16,85,0.4)] hover:scale-110 active:scale-95"
              }`}
              title="AI Assist"
            >
              {aiPanelOpen ? (
                <ActiveAIIcon />
              ) : (
                <PassiveAIIcon />
              )}
            </button>
          </div>
        </div>

        {/* AI Assist Panel overlay */}
        {aiPanelOpen && (
          <div
            className="fixed inset-0 bg-black/10 z-40 transition-opacity"
            onClick={() => setAiPanelOpen(false)}
          />
        )}
        <AIAssistPanel isOpen={aiPanelOpen} onClose={() => setAiPanelOpen(false)} />
      </div>
    </div>
  );
}
