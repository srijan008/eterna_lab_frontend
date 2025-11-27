import React from "react";
import clsx from "clsx";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div
    className={clsx(
      "animate-pulse rounded-md bg-slate-800/60 bg-[linear-gradient(110deg,#1f2933,45%,#374151,55%,#1f2933)] bg-[length:200%_100%]",
      className
    )}
  />
);
