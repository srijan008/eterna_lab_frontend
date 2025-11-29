import { Token } from "@/lib/types";

export const TokenCardMobile = ({ token }: { token: Token }) => {
  return (
    <div className="
      w-full rounded-xl border border-slate-800 bg-[#0b0f15] 
      px-3 py-2 mb-2 shadow-sm
    ">
      
      {/* TOP ROW — ICON + NAME + MC/PRICE */}
      <div className="flex items-start gap-3">

        {/* Token Image */}
        <div className="h-12 w-12 rounded-md overflow-hidden border border-slate-700">
          <img
            src={token.imageUrl}
            alt={token.symbol}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Name + icons + small stats */}
        <div className="flex flex-col flex-1 min-w-0">
          
          {/* Name Row */}
          <div className="flex items-center gap-1 truncate">
            <span className="text-white font-semibold text-[14px] truncate">
              {token.symbol}
            </span>
            <span className="text-slate-400 text-[12px] truncate">
              {token.name}
            </span>
          </div>

          {/* AGE + ICON BAR */}
          <div className="flex items-center gap-2 text-[11px] text-slate-300 mt-[2px]">
            {/* Age */}
            <span className="text-emerald-400 font-semibold">
              {token.ageLabel}
            </span>

            {/* Icon row similar to Axiom */}
            <div className="flex items-center gap-1 opacity-80">
              <span>👤</span><span>{token.txCount24h}</span>
              <span>🕒</span><span>{token.holders}</span>
              <span>🏆</span><span>4/5</span>
            </div>
          </div>

        </div>

        {/* Market Cap cluster (RIGHT) */}
        <div className="text-right whitespace-nowrap">
          <div className="text-slate-300 text-[11px]">MC</div>
          <div className="text-blue-400 text-[13px] font-semibold">
            ${token.marketCapLabel}
          </div>
          <div className="text-slate-300 text-[11px] mt-1">V</div>
          <div className="text-slate-200 text-[12px]">
            ${token.volumeLabel}
          </div>
        </div>

      </div>

      {/* METRICS BADGE ROW */}
      <div className="flex flex-wrap gap-1 mt-3 text-[10px]">
        <span className="px-2 py-[2px] rounded-full bg-green-900/40 text-emerald-400">
          {token.change24hLabel}
        </span>
        <span className="px-2 py-[2px] rounded-full bg-slate-800 text-slate-300">
          LQ {token.liquidityLabel}
        </span>
        <span className="px-2 py-[2px] rounded-full bg-slate-800 text-slate-300">
          TX {token.txCount24h}
        </span>
        <span className="px-2 py-[2px] rounded-full bg-slate-800 text-slate-300">
          {token.holders} holders
        </span>
      </div>

      {/* BUY BUTTON LIKE AXIOM */}
      <div className="mt-3 flex justify-end">
        <button className="
          rounded-full bg-blue-600 hover:bg-blue-700 
          text-white text-[12px] font-semibold 
          px-3 py-[4px]
        ">
          0 SOL
        </button>
      </div>

    </div>
  );
};
