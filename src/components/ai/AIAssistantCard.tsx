"use client";

import { ReactNode } from "react";

export interface AIAssistantFeature {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}

interface AIAssistantCardProps {
  /* Header icon shown in the rounded square */
  icon: ReactNode;
  /* Background color for the header icon container (use rgba so it works in dark mode) */
  iconBg?: string;
  title: string;
  subtitle: string;
  features: AIAssistantFeature[];
  /* Optional layout variant — "stacked" (default) shows features in a vertical list,
     "grid" shows them in a 2-column grid like Home Quick Actions */
  variant?: "stacked" | "grid";
  className?: string;
}

/**
 * Reusable inline AI Assistant card that mirrors the styling used in the
 * right-side AI Assist panel: gradient-purple icon container, tab-specific
 * title / subtitle, and a list of contextual feature buttons styled like
 * the Home page Quick Actions.
 */
export default function AIAssistantCard({
  icon,
  iconBg = "rgba(174,13,138,0.12)",
  title,
  subtitle,
  features,
  variant = "stacked",
  className = "",
}: AIAssistantCardProps) {
  return (
    <div
      className={`rounded-[16px] p-[20px] ${className}`}
      style={{
        backgroundColor: "var(--th-bg-card)",
        border: "1px solid var(--th-border)",
      }}
    >
      {/* Header: icon + title + subtitle */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-[15px] font-semibold leading-[1.3]"
            style={{ color: "var(--th-text-primary)" }}
          >
            {title}
          </h3>
          <p
            className="text-[12px] leading-[1.4] mt-0.5"
            style={{ color: "var(--th-text-secondary)" }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Features */}
      <div
        className={
          variant === "grid"
            ? "grid grid-cols-2 gap-2"
            : "flex flex-col gap-2"
        }
      >
        {features.map((feature, i) => (
          <button
            key={feature.label}
            onClick={feature.onClick}
            className="card-lift w-full py-3 px-4 rounded-xl text-[13px] font-medium text-left flex items-center gap-3 transition-all"
            style={{
              backgroundColor: "var(--th-bg-card)",
              border: "1px solid var(--th-border)",
              color: "var(--th-text-primary)",
              animation: `fadeIn 0.3s ease-out ${0.05 * i}s both`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--th-text-muted)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--th-border)")
            }
          >
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "var(--th-bg-hover)" }}
            >
              {feature.icon}
            </span>
            <span className="flex-1 truncate">{feature.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
