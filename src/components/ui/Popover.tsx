"use client";

import * as React from "react";
import * as RadixPopover from "@radix-ui/react-popover";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export const Popover: React.FC<PopoverProps> = ({ trigger, children }) => (
  <RadixPopover.Root>
    <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
    <RadixPopover.Portal>
      <RadixPopover.Content className="w-64 rounded-xl border border-slate-800 bg-slate-900/95 p-3 shadow-xl backdrop-blur">
        {children}
        <RadixPopover.Arrow className="fill-slate-900" />
      </RadixPopover.Content>
    </RadixPopover.Portal>
  </RadixPopover.Root>
);
