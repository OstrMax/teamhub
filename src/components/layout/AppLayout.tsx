"use client";

import Image from "next/image";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
          <Header />
          <div className="flex-1 bg-white rounded-tl-xl overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
