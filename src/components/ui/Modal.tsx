"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  children,
}) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm data-[state=open]:animate-fade-in" />
      <Dialog.Content className="fixed left-1/2 top-1/2 w-[min(480px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl data-[state=open]:animate-scale-in">
        <Dialog.Title className="mb-3 text-base font-semibold text-slate-50">
          {title}
        </Dialog.Title>
        <div className="text-sm text-slate-200">{children}</div>
        <Dialog.Close asChild>
          <button className="mt-4 inline-flex h-8 items-center rounded-full bg-slate-800 px-4 text-xs font-medium text-slate-100 hover:bg-slate-700">
            Close
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
