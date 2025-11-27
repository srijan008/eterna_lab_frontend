import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: "Token Discovery · Axiom-style Table",
  description: "Pixel-perfect token discovery table with live updates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-950">
      <body className="min-h-full bg-slate-950 text-slate-50 antialiased">
        <AppProviders>
          <main className="flex min-h-screen flex-col items-center justify-start px-2 py-4 sm:px-4">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
