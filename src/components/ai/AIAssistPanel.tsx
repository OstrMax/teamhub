"use client";

import { useState, useEffect } from "react";

type PanelView = "main" | "receptionist" | "tone";

const personas = [
  { name: "John", img: "/personas/john.jpg" },
  { name: "Stacy", img: "/personas/stacy.jpg" },
  { name: "Lora", img: "/personas/lora.jpg" },
  { name: "Steve", img: "/personas/steve.jpg" },
  { name: "Kerry", img: "/personas/kerry.jpg" },
  { name: "Arro", img: "/personas/arro.jpg" },
  { name: "Terry", img: "/personas/terry.jpg" },
  { name: "Mike", img: "/personas/mike.jpg" },
];

const actionButtons = [
  "Catch up on meeting",
  "Help me write a text message",
  "Add your AI receptionist",
  "Help to find recordings",
  "Create auto-response",
];

const receptionistSteps = [
  "Tone and personality",
  "Company description",
  "Location and business hours",
  "Transfer by name",
  "Greeting",
];

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
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6.5" stroke="#2E1055" strokeWidth="1"/>
      <path d="M5.5 4.5L9.5 7L5.5 9.5V4.5Z" fill="#2E1055"/>
    </svg>
  );
}

/* ── Banner illustration for receptionist view ── */
function ReceptionistBanner() {
  return (
    <div className="mx-5 mt-5 mb-4 rounded-2xl overflow-hidden h-[160px] relative bg-gradient-to-br from-[#e8d5f5] via-[#d4b0e8] to-[#c89de0]">
      {/* Audio transcript mock rows */}
      <div className="absolute inset-0 flex flex-col justify-center px-4 gap-2">
        <div className="bg-white/90 backdrop-blur rounded-lg px-3 py-2 flex items-center gap-2 text-xs shadow-sm">
          <span className="font-medium text-[#2E1055]">SENTIMENT</span>
          <span className="text-[#4C5863] ml-1">AUDIO</span>
          <span className="ml-auto text-[#4C5863]">ACTIONS</span>
        </div>
        {["Neutral", "Neutral", "Good", "Good"].map((sentiment, i) => (
          <div key={i} className="bg-white/80 backdrop-blur rounded-lg px-3 py-1.5 flex items-center gap-2 text-[10px] shadow-sm">
            <span className={`w-1.5 h-1.5 rounded-full ${sentiment === "Good" ? "bg-green-500" : "bg-yellow-400"}`} />
            <span className="text-[#001221] font-medium">{sentiment}</span>
            <div className="flex-1 flex items-center gap-1 mx-1">
              <div className="w-3 h-3 rounded-full bg-[#2E1055]/10 flex items-center justify-center">
                <span className="text-[6px]">&#9654;</span>
              </div>
              <span className="text-[#7F888F]">00:0{i}</span>
              <div className="flex-1 h-0.5 bg-[#2E1055]/10 rounded-full relative mx-1">
                <div className="absolute left-0 top-0 h-full bg-[#2E1055]/30 rounded-full" style={{ width: `${30 + i * 15}%` }} />
              </div>
              <span className="text-[#7F888F]">00:2{i + 4}</span>
            </div>
            <span className="text-[#2E1055] font-medium cursor-pointer hover:underline">
              {i === 1 ? "Close transcript" : "Open transcript"}
            </span>
          </div>
        ))}
        {/* Chat bubble */}
        <div className="absolute bottom-5 right-6 bg-[#001221] text-white text-[9px] rounded-xl rounded-bl-sm px-3 py-2 max-w-[170px] shadow-lg">
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#783a9b] to-[#2E1055] flex items-center justify-center">
              <span className="text-[6px] text-white">&#10022;</span>
            </div>
          </div>
          Welcome to Restaurant! My name is Laura, AI-reception assistant. How can I help you?
        </div>
      </div>
    </div>
  );
}

/* ── Main AI Assist Panel (inline, not popup) ── */
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

  // Reset view when panel opens
  useEffect(() => {
    if (isOpen) {
      setView("main");
      setExpandedStep(null);
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
    <div className="w-[390px] shrink-0 bg-[#F9F9FA] border-l border-[#E5E6E8] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 h-14 shrink-0 border-b border-[#E5E6E8]">
        <div className="flex items-center gap-2">
          {view !== "main" && (
            <button
              onClick={handleBack}
              className="p-1 -ml-1 rounded-lg hover:bg-[#E5E6E8] transition-colors"
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
          className="p-1.5 rounded-lg hover:bg-[#E5E6E8] transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M13.5 4.5L4.5 13.5" stroke="#001221" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M4.5 4.5L13.5 13.5" stroke="#001221" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
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
  );
}

/* ── Main View ── */
function MainView({ onActionClick }: { onActionClick: (a: string) => void }) {
  return (
    <div className="px-5 pt-10 pb-8">
      {/* Sparkle icon */}
      <div className="mb-6">
        <SparkleIcon />
      </div>

      {/* Heading */}
      <h2 className="text-[22px] font-bold text-[#001221] leading-[1.3] mb-3">
        Use Your Sangoma AI<br />Assistant to Make Your<br />Job Easier
      </h2>

      {/* Subtitle */}
      <p className="text-[14px] text-[#4C5863] leading-[1.5] mb-8">
        Power up your productivity with AI features in the app you use every day.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col gap-3">
        {actionButtons.map((action) => (
          <button
            key={action}
            onClick={() => onActionClick(action)}
            className="w-full py-4 px-5 bg-white rounded-xl border border-[#E5E6E8] text-[14px] font-medium text-[#001221] text-center hover:border-[#C5C7CA] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] active:scale-[0.98] transition-all duration-150"
          >
            {action}
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
                className="w-full flex items-center justify-between py-4 px-1 text-left hover:bg-white/50 transition-colors"
              >
                <span className="text-[14px] font-medium text-[#001221]">
                  {i + 1}. {step}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="transition-transform duration-200"
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
              {expandedStep === i && i !== 0 && (
                <div className="px-1 pb-4 text-[13px] text-[#7F888F]">
                  Configure {step.toLowerCase()} settings for your AI receptionist.
                </div>
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

          {/* Persona grid */}
          <div className="grid grid-cols-4 gap-3 px-1 pt-2 pb-5">
            {personas.map((persona) => {
              const isSelected = selectedPersona === persona.name;
              return (
                <button
                  key={persona.name}
                  onClick={() => onSelectPersona(persona.name)}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className={`w-16 h-16 rounded-full overflow-hidden transition-all duration-150 ${
                      isSelected
                        ? "ring-2 ring-[#2E1055] ring-offset-2"
                        : "hover:ring-2 hover:ring-[#E5E6E8] hover:ring-offset-1"
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-[#d4b0e8] to-[#9b6bc4] flex items-center justify-center text-white font-semibold text-lg">
                      {persona.name[0]}
                    </div>
                  </div>
                  <span className={`text-[12px] font-medium ${isSelected ? "text-[#001221]" : "text-[#4C5863]"}`}>
                    {persona.name}
                  </span>
                  <PlayIcon />
                </button>
              );
            })}
          </div>

          {/* Save and Continue button */}
          <div className="px-1 pb-5">
            <button
              onClick={onSave}
              className="w-full py-3.5 bg-[#001221] text-white text-[13px] font-bold tracking-wider uppercase rounded-full hover:bg-[#0a2540] active:scale-[0.98] transition-all"
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
              className="w-full flex items-center justify-between py-4 px-1 text-left hover:bg-white/50 transition-colors"
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
