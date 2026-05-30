"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  TicketIcon,
  BedIcon,
  CompassIcon,
  UsersIcon,
  CalendarIcon
} from "./Icons";

const TABS = [
  { href: "/", label: "Trip", icon: HomeIcon, match: (p: string) => p === "/" || p.startsWith("/day") },
  { href: "/calendar", label: "Calendar", icon: CalendarIcon, match: (p: string) => p.startsWith("/calendar") },
  { href: "/flights", label: "Travel", icon: TicketIcon, match: (p: string) => p.startsWith("/flights") },
  { href: "/stays", label: "Stays", icon: BedIcon, match: (p: string) => p.startsWith("/stays") },
  { href: "/excursions", label: "Plans", icon: CompassIcon, match: (p: string) => p.startsWith("/excursions") },
  { href: "/travelers", label: "Party", icon: UsersIcon, match: (p: string) => p.startsWith("/travelers") }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[440px] -translate-x-1/2 px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-2"
    >
      <div className="flex items-center justify-between gap-0.5 rounded-full bg-moss-900/95 px-1.5 py-1.5 shadow-card backdrop-blur">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = tab.match(pathname);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label={tab.label}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-[11.5px] font-medium transition-all ${
                active
                  ? "bg-lime-300 text-moss-900 shadow-soft"
                  : "text-cream-100/80 hover:text-cream-50"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              {active && <span className="whitespace-nowrap">{tab.label}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
