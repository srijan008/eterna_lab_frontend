import React from "react";
import clsx from "clsx";

interface BadgeProps {
  variant?: "default" | "green" | "red";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  children,
  className,
}) => {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium";
  const styles: Record<typeof variant, string> = {
    default: "border-slate-700 bg-slate-900 text-slate-300",
    green: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    red: "border-rose-500/40 bg-rose-500/10 text-rose-300",
  };

  return <span className={clsx(base, styles[variant], className)}>{children}</span>;
};
