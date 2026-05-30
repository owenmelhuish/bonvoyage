import Link from "next/link";
import { Frame } from "@/components/Frame";
import { Header } from "@/components/Header";
import { Chip } from "@/components/Chip";
import {
  TRIP,
  DAYS,
  ACCOMMODATIONS,
  eventTypesByDate,
  activeStayOnDate,
  dayByDate
} from "@/lib/itinerary";
import type { Event } from "@/lib/itinerary";

const DOT_LEGEND: { type: Event["type"]; label: string; dot: string }[] = [
  { type: "flight", label: "Flight", dot: "bg-moss-900" },
  { type: "train", label: "Train", dot: "bg-moss-500" },
  { type: "ferry", label: "Ferry", dot: "bg-moss-200 ring-1 ring-moss-500" },
  { type: "stay", label: "Check-in / out", dot: "bg-lime-300" },
  { type: "excursion", label: "Excursion", dot: "bg-terracotta-500" },
  { type: "transfer", label: "Transfer", dot: "bg-cream-300 ring-1 ring-moss-200" }
];

const DOT_BY_TYPE: Record<Event["type"], string> = DOT_LEGEND.reduce(
  (acc, x) => {
    acc[x.type] = x.dot;
    return acc;
  },
  {} as Record<Event["type"], string>
);

export default function CalendarPage() {
  // Show the months that the trip spans (June 2026 + July 2026).
  const start = new Date(TRIP.startDate + "T00:00:00");
  const end = new Date(TRIP.endDate + "T00:00:00");
  const months: { year: number; month: number }[] = [];
  for (
    let y = start.getFullYear(), m = start.getMonth();
    y < end.getFullYear() || (y === end.getFullYear() && m <= end.getMonth());

  ) {
    months.push({ year: y, month: m });
    m += 1;
    if (m > 11) {
      m = 0;
      y += 1;
    }
  }

  return (
    <Frame>
      <Header back title="Calendar" />

      {/* Summary */}
      <section className="mb-4 rounded-3xl bg-cream-50 p-4 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-moss-500">
              At a glance
            </div>
            <div className="mt-0.5 text-[20px] font-semibold tracking-tight text-moss-900">
              {DAYS.length} travel days
            </div>
            <div className="text-[12.5px] text-ink-500">
              Tap any day to see the plan
            </div>
          </div>
          <Chip tone="accent">
            {ACCOMMODATIONS.length} stays
          </Chip>
        </div>
      </section>

      {/* Legend */}
      <section className="mb-5 rounded-3xl bg-cream-50 p-4 shadow-soft">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-moss-500">
          Legend
        </div>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
          {DOT_LEGEND.map((l) => (
            <li key={l.type} className="flex items-center gap-2">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${l.dot}`} />
              <span className="text-[12.5px] text-moss-900">{l.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Months */}
      <div className="space-y-6">
        {months.map(({ year, month }) => (
          <MonthGrid key={`${year}-${month}`} year={year} month={month} />
        ))}
      </div>
    </Frame>
  );
}

function MonthGrid({ year, month }: { year: number; month: number }) {
  const first = new Date(year, month, 1);
  const totalDays = new Date(year, month + 1, 0).getDate();
  const monthName = first.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // Leading offset (Sun = 0)
  const leading = first.getDay();
  // Cells: leading blanks + month days, then trailing to fill rows of 7
  const cells: ({ date: string; day: number } | null)[] = [];
  for (let i = 0; i < leading; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ date, day: d });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-display text-[22px] font-semibold tracking-tight text-moss-900">
          {monthName}
        </h2>
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-moss-500">
          {countDaysInMonth(year, month)} trip days
        </span>
      </div>

      <div className="overflow-hidden rounded-3xl bg-cream-50 p-3 shadow-soft">
        <div className="grid grid-cols-7 gap-1 pb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div
              key={i}
              className="text-center text-[10px] font-semibold uppercase tracking-wide text-ink-500"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((cell, i) =>
            cell ? <DayCell key={cell.date} date={cell.date} day={cell.day} /> : <div key={`b-${i}`} />
          )}
        </div>
      </div>

      <MonthLegend year={year} month={month} />
    </section>
  );
}

function DayCell({ date, day }: { date: string; day: number }) {
  const inTrip = date >= TRIP.startDate && date <= TRIP.endDate;
  const stay = activeStayOnDate(date);
  const dayData = dayByDate(date);
  const types = inTrip ? Array.from(eventTypesByDate(date)) : [];

  // Subtle background hue for which city we're in
  const cityTint: Record<string, string> = {
    Rome: "bg-cream-200/70",
    Sorrento: "bg-moss-50",
    Florence: "bg-lime-200/40",
    Paris: "bg-terracotta-200/60"
  };
  const tint = stay ? cityTint[stay.city] ?? "" : "";

  const base = "relative flex aspect-square flex-col items-center justify-between rounded-2xl p-1.5 transition";

  if (!inTrip) {
    return (
      <div className={`${base} text-ink-300`}>
        <span className="text-[12px] font-medium">{day}</span>
      </div>
    );
  }

  return (
    <Link
      href={`/day/${date}`}
      aria-label={`Open ${dayData?.label ?? date}`}
      className={`${base} ${tint} text-moss-900 hover:bg-cream-200 active:scale-95`}
    >
      <div className="flex w-full items-start justify-between">
        <span className="text-[13px] font-semibold">{day}</span>
        {stay && date === stay.checkIn && (
          <span className="text-[8px] font-bold uppercase tracking-wide text-moss-700">
            in
          </span>
        )}
        {stay && date === isoMinus1(stay.checkOut) && (
          <span className="text-[8px] font-bold uppercase tracking-wide text-moss-700">
            out
          </span>
        )}
      </div>

      {types.length > 0 && (
        <div className="flex items-center justify-center gap-[3px] pb-0.5">
          {types.slice(0, 4).map((t) => (
            <span key={t} className={`inline-block h-1.5 w-1.5 rounded-full ${DOT_BY_TYPE[t]}`} />
          ))}
        </div>
      )}
    </Link>
  );
}

function MonthLegend({ year, month }: { year: number; month: number }) {
  // Show which cities you're in this month as little pill chips.
  const cities = new Set<string>();
  for (const d of DAYS) {
    const dd = new Date(d.date + "T00:00:00");
    if (dd.getFullYear() === year && dd.getMonth() === month) {
      const stay = activeStayOnDate(d.date);
      if (stay) cities.add(stay.city);
    }
  }
  if (cities.size === 0) return null;
  const cityTint: Record<string, string> = {
    Rome: "bg-cream-200",
    Sorrento: "bg-moss-50",
    Florence: "bg-lime-200",
    Paris: "bg-terracotta-200"
  };
  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5">
      <span className="text-[10.5px] font-semibold uppercase tracking-wide text-moss-500">
        In:
      </span>
      {Array.from(cities).map((c) => (
        <span
          key={c}
          className={`rounded-full px-2.5 py-1 text-[11.5px] font-semibold text-moss-900 ${cityTint[c] ?? "bg-cream-200"}`}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function countDaysInMonth(year: number, month: number) {
  return DAYS.filter((d) => {
    const dd = new Date(d.date + "T00:00:00");
    return dd.getFullYear() === year && dd.getMonth() === month;
  }).length;
}

function isoMinus1(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}
