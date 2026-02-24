"use client";

type Conversation = {
  id: number;
  name: string;
  preview: string;
  unread?: number;
  active?: boolean;
};

const conversations: Conversation[] = [
  { id: 1, name: "Cody Russell", preview: "Understanding color theory: the color..", unread: 3, active: true },
  { id: 2, name: "Darrell Steward", preview: "Any mechanical keyboard enthusiasts in..." },
];

export default function ConversationList({
  activeId,
  onSelect,
}: {
  activeId: number;
  onSelect: (id: number) => void;
}) {
  return (
    <div className="flex flex-col w-[300px] shrink-0 border-r border-[#E5E6E8] h-full bg-white">
      {/* Header */}
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-[#001221] mb-2">
          My SMS number: <span className="text-[#001221]">(480) 555-0103</span>
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 flex-1 bg-[#F2F2F3] rounded-lg px-3 py-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search SMS"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#7F888F]"
            />
          </div>
          <button className="w-8 h-8 rounded-full bg-[#2a1051] flex items-center justify-center hover:bg-[#3d1870] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${
              activeId === conv.id
                ? "bg-[#E8EDF5] border-l-2 border-[#2a1051]"
                : "hover:bg-[#F2F2F3] border-l-2 border-transparent"
            }`}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#001221] truncate">{conv.name}</p>
              <p className="text-xs text-[#7F888F] truncate">{conv.preview}</p>
            </div>
            {conv.unread && (
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#2a1051] text-white text-[10px] font-bold flex items-center justify-center">
                {conv.unread}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
