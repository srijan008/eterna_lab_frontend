"use client";

import { useState } from "react";
import { Search, Settings, ClipboardList, Wallet } from "lucide-react";

export const MobileHeader = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="w-full px-3 py-3 bg-[#0b0f15] border-b border-slate-800 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        
        {/* Left Cluster */}
        <div className="flex items-center gap-3 text-slate-300 text-[13px]">
          <span className="text-xs opacity-80">= 0 0 0</span>
          <ClipboardList size={18} className="opacity-70" />
        </div>

        {/* Center — Paste CA */}
        <button
          onClick={handleCopy}
          className="
            bg-slate-800 px-3 py-1 rounded-full text-[12px]
            text-slate-200 flex items-center gap-1
          "
        >
          Paste CA
        </button>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <Search size={18} className="text-slate-300" />
          <Settings size={18} className="text-slate-300" />
          <Wallet size={18} className="text-slate-300" />
        </div>
      </div>
    </div>
  );
};
