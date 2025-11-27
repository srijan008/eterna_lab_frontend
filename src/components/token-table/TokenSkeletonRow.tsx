import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const TokenSkeletonRow: React.FC = () => (
  <tr className="border-b border-slate-800/70">
    <td className="px-3 py-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </td>
    {Array.from({ length: 8 }).map((_, i) => (
      <td key={i} className="px-3 py-3">
        <Skeleton className="ml-auto h-3 w-14" />
      </td>
    ))}
  </tr>
);
