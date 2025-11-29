"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { setCategory } from "@/store/tokenSlice";

const tabs = [
  { key: "NEW_PAIRS", label: "New Pairs" },
  { key: "FINAL_STRETCH", label: "Final Stretch" },
  { key: "MIGRATED", label: "Migrated" },
];

export const MobileTabs = () => {
  const dispatch = useAppDispatch();
  const active = useAppSelector((s) => s.tokens.activeCategory);

  return (
    <div className="px-3 mt-3">
      <div className="flex items-center justify-between">
        
        {/* Category Buttons */}
        <div className="flex bg-slate-900/60 rounded-full p-1 text-[12px]">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => dispatch(setCategory(t.key as any))}
              className={`
                px-3 py-[6px] rounded-full font-medium
                transition-colors
                ${active === t.key 
                  ? "bg-white text-black shadow-sm" 
                  : "text-slate-300"
                }
              `}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* P1 / P2 / P3 cluster */}
        <div className="flex items-center gap-1 text-[12px]">
          <button className="rounded-md px-2 py-[3px] bg-slate-900 text-slate-300">P1</button>
          <button className="rounded-md px-2 py-[3px] bg-slate-900 text-slate-300">P2</button>
          <button className="rounded-md px-2 py-[3px] bg-slate-900 text-slate-300">P3</button>
        </div>

      </div>
    </div>
  );
};
