"use client";

import { useState } from "react";

type FaxStatus = "delivered" | "sending" | "failed" | "received";
type FaxFolder = "inbox" | "sent" | "drafts";

interface FaxItem {
  id: number;
  folder: FaxFolder;
  contact: string;
  number: string;
  subject: string;
  pages: number;
  date: string;
  time: string;
  status: FaxStatus;
  unread?: boolean;
  preview: string;
}

const faxes: FaxItem[] = [
  { id: 1, folder: "inbox", contact: "Acme Insurance", number: "+1 (416) 555-0144", subject: "Policy Renewal Documents", pages: 4, date: "Today", time: "10:32 AM", status: "received", unread: true, preview: "Please find enclosed the renewal documents for policy #AX-2024-8821..." },
  { id: 2, folder: "inbox", contact: "Dr. Sarah Mitchell", number: "+1 (905) 555-0287", subject: "Lab Results - Patient #4523", pages: 2, date: "Today", time: "9:15 AM", status: "received", unread: true, preview: "Lab results for patient ID 4523. All values within normal range..." },
  { id: 3, folder: "inbox", contact: "Wilson & Associates", number: "+1 (647) 555-0193", subject: "Contract Amendment #3", pages: 8, date: "Yesterday", time: "4:45 PM", status: "received", preview: "Amendment to the original contract dated March 15, 2024. Section 4.2..." },
  { id: 4, folder: "inbox", contact: "Unknown", number: "+1 (416) 555-0998", subject: "Invoice #INV-9821", pages: 1, date: "Yesterday", time: "2:18 PM", status: "received", preview: "Invoice for services rendered. Total amount due: $1,250.00..." },
  { id: 5, folder: "inbox", contact: "Metro Health Clinic", number: "+1 (905) 555-0421", subject: "Patient Referral", pages: 3, date: "Mar 18", time: "11:00 AM", status: "received", preview: "Referring patient for specialist consultation. Medical history attached..." },
  { id: 6, folder: "sent", contact: "Tax Office", number: "+1 (800) 555-0100", subject: "Tax Form Submission", pages: 5, date: "Today", time: "11:45 AM", status: "delivered", preview: "Q1 2026 tax forms as requested. Please confirm receipt..." },
  { id: 7, folder: "sent", contact: "Bank of Toronto", number: "+1 (416) 555-0011", subject: "Loan Application", pages: 12, date: "Today", time: "8:30 AM", status: "sending", preview: "Application for business loan. Supporting documents enclosed..." },
  { id: 8, folder: "sent", contact: "Legal Dept", number: "+1 (647) 555-0888", subject: "NDA Signed Copy", pages: 2, date: "Yesterday", time: "5:22 PM", status: "delivered", preview: "Signed NDA agreement as discussed in our meeting..." },
  { id: 9, folder: "sent", contact: "+1 (905) 555-0777", number: "+1 (905) 555-0777", subject: "Quote Request Response", pages: 3, date: "Mar 17", time: "10:00 AM", status: "failed", preview: "Response to quote request. Please find the proposed pricing..." },
];

export default function FaxPage() {
  const [activeFolder, setActiveFolder] = useState<FaxFolder>("inbox");
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [showCompose, setShowCompose] = useState(false);
  const [search, setSearch] = useState("");

  const filteredFaxes = faxes
    .filter((f) => f.folder === activeFolder)
    .filter((f) => f.contact.toLowerCase().includes(search.toLowerCase()) || f.subject.toLowerCase().includes(search.toLowerCase()));

  const selected = faxes.find((f) => f.id === selectedId) || null;

  const folderCounts = {
    inbox: faxes.filter((f) => f.folder === "inbox").length,
    sent: faxes.filter((f) => f.folder === "sent").length,
    drafts: faxes.filter((f) => f.folder === "drafts").length,
  };
  const unreadCount = faxes.filter((f) => f.folder === "inbox" && f.unread).length;

  return (
    <div className="flex h-full">
      {/* Left panel — fax list */}
      <div className="w-[340px] shrink-0 flex flex-col h-full" style={{ backgroundColor: "var(--th-bg)", borderRight: "1px solid var(--th-border)" }}>
        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold" style={{ color: "var(--th-text-primary)" }}>Fax</h1>
            <button
              onClick={() => setShowCompose(true)}
              className="btn-cta flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: "#001221" }}
              title="New fax"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              New fax
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: "var(--th-bg-hover)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              type="text"
              placeholder="Search faxes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm placeholder:text-[#7F888F] w-full"
              style={{ color: "var(--th-text-primary)" }}
            />
          </div>
        </div>

        {/* Folder pills */}
        <div className="flex items-center gap-2 px-5 pb-3">
          {(["inbox", "sent", "drafts"] as FaxFolder[]).map((folder) => (
            <button
              key={folder}
              onClick={() => { setActiveFolder(folder); setSelectedId(null); }}
              className="chip-interactive flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25px] transition-all"
              style={{
                backgroundColor: activeFolder === folder ? "var(--th-bg-hover)" : "transparent",
                color: activeFolder === folder ? "var(--th-tab-active)" : "var(--th-text-secondary)",
              }}
            >
              {activeFolder === folder && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              )}
              {folder}
              {folder === "inbox" && unreadCount > 0 && (
                <span className="ml-1 px-1.5 py-0 rounded-full text-[10px] font-bold" style={{ backgroundColor: "var(--th-tab-active)", color: "var(--th-bg)" }}>{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Fax list */}
        <div className="flex-1 overflow-y-auto">
          {filteredFaxes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: "var(--th-bg-hover)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--th-text-muted)" strokeWidth="1.5">
                  <path d="M7 3h10v4H7z" /><rect x="3" y="7" width="18" height="10" rx="2" /><rect x="7" y="17" width="10" height="4" />
                </svg>
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--th-text-secondary)" }}>No {activeFolder}</p>
              <p className="text-xs mt-1" style={{ color: "var(--th-text-muted)" }}>{activeFolder === "drafts" ? "Drafts you save will appear here" : `Your ${activeFolder} is empty`}</p>
            </div>
          ) : (
            filteredFaxes.map((fax) => (
              <button
                key={fax.id}
                onClick={() => setSelectedId(fax.id)}
                className="w-full text-left px-5 py-3 transition-colors flex gap-3 group"
                style={{
                  backgroundColor: selectedId === fax.id ? "var(--th-bg-hover)" : "transparent",
                  borderBottom: "1px solid var(--th-border-light)",
                }}
                onMouseEnter={(e) => { if (selectedId !== fax.id) e.currentTarget.style.backgroundColor = "var(--th-bg-hover)"; }}
                onMouseLeave={(e) => { if (selectedId !== fax.id) e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                {/* Unread indicator */}
                <div className="w-2 shrink-0 pt-2">
                  {fax.unread && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--th-tab-active)" }} />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className={`text-[13px] truncate ${fax.unread ? "font-semibold" : "font-medium"}`} style={{ color: "var(--th-text-primary)" }}>{fax.contact}</span>
                    <span className="text-[11px] shrink-0" style={{ color: "var(--th-text-muted)" }}>{fax.date}</span>
                  </div>
                  <div className="text-[12px] truncate mb-0.5" style={{ color: "var(--th-text-secondary)" }}>{fax.subject}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px]" style={{ color: "var(--th-text-muted)" }}>{fax.pages} {fax.pages === 1 ? "page" : "pages"}</span>
                    <span className="text-[11px]" style={{ color: "var(--th-text-muted)" }}>·</span>
                    <StatusBadge status={fax.status} />
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right panel — fax preview */}
      <div className="flex-1 flex flex-col h-full" style={{ backgroundColor: "var(--th-bg)" }}>
        {selected ? (
          <>
            {/* Preview header */}
            <div className="px-6 py-4 flex items-start justify-between" style={{ borderBottom: "1px solid var(--th-border)" }}>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--th-text-primary)" }}>{selected.subject}</h2>
                <div className="flex items-center gap-3 text-[13px]" style={{ color: "var(--th-text-secondary)" }}>
                  <span>{activeFolder === "sent" ? "To:" : "From:"} <span style={{ color: "var(--th-text-primary)" }}>{selected.contact}</span></span>
                  <span style={{ color: "var(--th-text-muted)" }}>·</span>
                  <span>{selected.number}</span>
                </div>
                <div className="flex items-center gap-3 text-[12px] mt-1" style={{ color: "var(--th-text-muted)" }}>
                  <span>{selected.date}, {selected.time}</span>
                  <span>·</span>
                  <span>{selected.pages} {selected.pages === 1 ? "page" : "pages"}</span>
                  <StatusBadge status={selected.status} />
                </div>
              </div>

              {/* Action bar */}
              <div className="flex items-center gap-1 shrink-0">
                <button className="btn-icon p-2 rounded-lg" title="Download">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--th-text-secondary)" strokeWidth="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                </button>
                <button className="btn-icon p-2 rounded-lg" title="Print">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--th-text-secondary)" strokeWidth="1.5"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>
                </button>
                <button className="btn-icon p-2 rounded-lg" title="Forward">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--th-text-secondary)" strokeWidth="1.5"><polyline points="15 17 20 12 15 7" /><path d="M4 18v-2a4 4 0 014-4h12" /></svg>
                </button>
                <button className="btn-icon p-2 rounded-lg" title="Delete">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                </button>
              </div>
            </div>

            {/* Document preview area */}
            <div className="flex-1 overflow-y-auto p-8" style={{ backgroundColor: "var(--th-bg-hover)" }}>
              <div className="max-w-[600px] mx-auto space-y-4">
                {Array.from({ length: selected.pages }).map((_, i) => (
                  <div key={i} className="rounded-lg shadow-sm p-10 aspect-[8.5/11]" style={{ backgroundColor: "var(--th-bg-card)", border: "1px solid var(--th-border)" }}>
                    <div className="text-center mb-8">
                      <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--th-text-muted)" }}>Page {i + 1} of {selected.pages}</div>
                      <div className="h-px w-16 mx-auto" style={{ backgroundColor: "var(--th-border)" }} />
                    </div>
                    {i === 0 && (
                      <div className="space-y-3 text-[12px]" style={{ color: "var(--th-text-secondary)" }}>
                        <p className="font-semibold text-[14px]" style={{ color: "var(--th-text-primary)" }}>{selected.subject}</p>
                        <p>{selected.preview}</p>
                        <p>This is a mock fax document preview. In production, this would show the actual rendered fax pages with full document content.</p>
                      </div>
                    )}
                    {i > 0 && (
                      <div className="space-y-2">
                        {Array.from({ length: 12 }).map((_, j) => (
                          <div key={j} className="h-2 rounded" style={{ backgroundColor: "var(--th-border-light)", width: `${60 + Math.random() * 40}%` }} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "var(--th-bg-hover)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--th-text-muted)" strokeWidth="1.5">
                <path d="M7 3h10v4H7z" /><rect x="3" y="7" width="18" height="10" rx="2" /><rect x="7" y="17" width="10" height="4" />
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-1" style={{ color: "var(--th-text-primary)" }}>Select a fax to preview</h3>
            <p className="text-sm" style={{ color: "var(--th-text-muted)" }}>Choose a fax from the list to view its content</p>
          </div>
        )}
      </div>

      {showCompose && <ComposeFaxDialog onClose={() => setShowCompose(false)} />}
    </div>
  );
}

/* ── Status badge ── */
function StatusBadge({ status }: { status: FaxStatus }) {
  const config = {
    delivered: { label: "Delivered", color: "#2CAD43", icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> },
    sending: { label: "Sending", color: "#F59E0B", icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> },
    failed: { label: "Failed", color: "#EF4444", icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg> },
    received: { label: "Received", color: "#3B82F6", icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> },
  };
  const c = config[status];
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium" style={{ color: c.color }}>
      {c.icon}
      {c.label}
    </span>
  );
}

/* ── Compose Fax Dialog ── */
function ComposeFaxDialog({ onClose }: { onClose: () => void }) {
  const [recipient, setRecipient] = useState("");
  const [from, setFrom] = useState("+1 (416) 555-0100");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [coverPage, setCoverPage] = useState(true);
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} onClick={onClose}>
      <div className="modal-enter w-[540px] max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto" style={{ backgroundColor: "var(--th-bg-card)" }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-3">
          <h2 className="text-lg font-semibold" style={{ color: "var(--th-text-primary)" }}>New fax</h2>
          <button onClick={onClose} className="btn-icon p-1.5 rounded-lg" title="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--th-text-muted)" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* From */}
          <div>
            <label className="text-[13px] font-medium mb-1.5 block" style={{ color: "var(--th-text-primary)" }}>From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-[14px] outline-none appearance-none cursor-pointer" style={{ border: "1px solid var(--th-border)", backgroundColor: "var(--th-bg)", color: "var(--th-text-primary)" }}>
              <option>+1 (416) 555-0100</option>
              <option>+1 (905) 555-0200</option>
              <option>+1 (647) 555-0300</option>
            </select>
          </div>

          {/* To */}
          <div>
            <label className="text-[13px] font-medium mb-1.5 block" style={{ color: "var(--th-text-primary)" }}><span className="text-[#EF4444]">*</span> To</label>
            <input type="tel" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="+1 (416) 555-0000" className="w-full px-4 py-2.5 rounded-xl text-[14px] outline-none" style={{ border: "1px solid var(--th-border)", backgroundColor: "var(--th-bg)", color: "var(--th-text-primary)" }} />
          </div>

          {/* Subject */}
          <div>
            <label className="text-[13px] font-medium mb-1.5 block" style={{ color: "var(--th-text-primary)" }}>Subject</label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Document subject" className="w-full px-4 py-2.5 rounded-xl text-[14px] outline-none" style={{ border: "1px solid var(--th-border)", backgroundColor: "var(--th-bg)", color: "var(--th-text-primary)" }} />
          </div>

          {/* Cover page toggle */}
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-[13px] font-medium" style={{ color: "var(--th-text-primary)" }}>Include cover page</div>
              <div className="text-[11px] mt-0.5" style={{ color: "var(--th-text-muted)" }}>Auto-generated cover with sender info</div>
            </div>
            <button onClick={() => setCoverPage(!coverPage)} className={`w-10 h-6 rounded-full relative transition-colors ${coverPage ? "bg-[#001221]" : "bg-[#CCCFD2]"}`}>
              <div className={`absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-all ${coverPage ? "right-[3px]" : "left-[3px]"}`} />
            </button>
          </div>

          {/* Message / notes */}
          <div>
            <label className="text-[13px] font-medium mb-1.5 block" style={{ color: "var(--th-text-primary)" }}>Cover note</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Optional message for the cover page..." className="w-full px-4 py-2.5 rounded-xl text-[14px] outline-none resize-none" style={{ border: "1px solid var(--th-border)", backgroundColor: "var(--th-bg)", color: "var(--th-text-primary)" }} />
          </div>

          {/* File attachments */}
          <div>
            <label className="text-[13px] font-medium mb-1.5 block" style={{ color: "var(--th-text-primary)" }}>Attachments</label>
            <button onClick={() => setFiles([...files, `Document_${files.length + 1}.pdf`])} className="w-full py-6 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors" style={{ borderColor: "var(--th-border)", backgroundColor: "var(--th-bg)" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--th-text-muted)"} onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--th-border)"}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--th-text-muted)" strokeWidth="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
              <div className="text-[13px] font-medium" style={{ color: "var(--th-text-primary)" }}>Click to upload or drag files</div>
              <div className="text-[11px]" style={{ color: "var(--th-text-muted)" }}>PDF, DOC, DOCX, JPG, PNG up to 10MB</div>
            </button>
            {files.length > 0 && (
              <div className="mt-2 space-y-1.5">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px]" style={{ backgroundColor: "var(--th-bg-hover)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--th-text-muted)" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                    <span className="flex-1 truncate" style={{ color: "var(--th-text-primary)" }}>{f}</span>
                    <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-[#EF4444]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider transition-colors" style={{ color: "var(--th-text-secondary)" }}>
              Cancel
            </button>
            <button onClick={onClose} className="btn-primary px-5 py-2.5 rounded-xl text-[13px] font-bold uppercase tracking-wider text-white" style={{ backgroundColor: "#001221" }}>
              Send fax
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
