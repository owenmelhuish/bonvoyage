import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

// Mobile-shaped frame that centers on desktop with a beautiful empty backdrop
export function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-200">
      {/* Decorative backdrop visible on wider screens */}
      <div className="pointer-events-none fixed inset-0 hidden md:block">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-lime-200/40 blur-3xl" />
        <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-moss-100/50 blur-3xl" />
      </div>

      <div className="relative mx-auto min-h-screen w-full max-w-[440px] bg-cream-100 px-4 pb-32 pt-1 shadow-card md:my-6 md:min-h-[calc(100vh-3rem)] md:rounded-[40px] md:overflow-hidden md:ring-1 md:ring-cream-300">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
