"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-rose-500/50 bg-rose-500/10 p-4 text-sm text-rose-50">
          Something went wrong while rendering the token table.
        </div>
      );
    }
    return this.props.children;
  }
}
