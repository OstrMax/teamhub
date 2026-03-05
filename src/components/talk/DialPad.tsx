"use client";

import { useState } from "react";
import Image from "next/image";
import CallPopup from "./CallPopup";

const keys = [
  { num: "1", sub: "" },
  { num: "2", sub: "ABC" },
  { num: "3", sub: "DEF" },
  { num: "4", sub: "GHI" },
  { num: "5", sub: "JKL" },
  { num: "6", sub: "NMO" },
  { num: "7", sub: "PQRS" },
  { num: "8", sub: "TUV" },
  { num: "9", sub: "WXYZ" },
  { num: "*", sub: "" },
  { num: "0", sub: "+" },
  { num: "#", sub: "" },
];

export default function DialPad() {
  const [input, setInput] = useState("");
  const [calling, setCalling] = useState(false);

  const handleCall = () => {
    if (input.length > 0) setCalling(true);
  };

  return (
    <>
      {calling && (
        <CallPopup
          name={input || "Unknown"}
          initials="#"
          onEnd={() => { setCalling(false); }}
        />
      )}
      <div className="flex flex-col items-center w-[300px] shrink-0 border-r border-[#E5E6E8] h-full bg-white p-6">
        {/* Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a name or number"
          className="w-full text-center text-base text-[#7F888F] mb-6 pb-2 outline-none placeholder:text-[#7F888F]"
        />

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {keys.map((key) => (
            <button
              key={key.num}
              onClick={() => setInput((prev) => prev + key.num)}
              className="flex flex-col items-center justify-center w-16 h-16 rounded-full border border-[#E5E6E8] hover:bg-[#F2F2F3] transition-colors"
            >
              <span className="text-2xl font-medium text-[#001221]">{key.num}</span>
              {key.sub && (
                <span className="text-[10px] font-medium text-[#7F888F] tracking-wider">{key.sub}</span>
              )}
            </button>
          ))}
        </div>

        {/* Call button */}
        <button
          onClick={handleCall}
          className={`w-14 h-14 rounded-full bg-[#2CAD43] hover:bg-[#259c3a] flex items-center justify-center transition-all shadow-lg ${input.length > 0 ? "active:scale-90" : "opacity-60 cursor-not-allowed"}`}
        >
          <Image src="/icons/call-button.svg" alt="Call" width={22} height={23} />
        </button>
      </div>
    </>
  );
}
