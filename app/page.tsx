import Link from "next/link";
import { Frame } from "@/components/Frame";
import { Header } from "@/components/Header";
import { Chip, TravelerBadges } from "@/components/Chip";
import {
  ACCOMMODATIONS,
  DAYS,
  TRIP,
  CITY_IMAGES,
  countryFlag,
  daysUntilStart,
  findToday
} from "@/lib/itinerary";
import {
  CalendarIcon,
  ChevronRight,
  MapPinIcon,
  PlaneIcon,
  BedIcon,
  CompassIcon,
  CarIcon
} from "@/components/Icons";

export default function HomePage() {
  const now = new Date();
  const today = findToday(now);
  const upcoming = DAYS.filter((d) => d.date >= today.date).slice(0, 7);
  const countdown = daysUntilStart(now);
  const todayIso = now.toISOString().slice(0, 10);
  const status: "pre" | "during" | "post" =
    todayIso < TRIP.startDate ? "pre" : todayIso > TRIP.endDate ? "post" : "during";
  const todayLabel = status === "during" ? "Today" : status === "pre" ? "Trip starts" : "Trip recap";

  const segments = uniqueSegments();

  return (
    <Frame>
      <Header />

      {/* Hero */}
      <section className="relative mt-1 overflow-hidden rounded-[28px]">
        <div
          className="aspect-[4/5] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${TRIP.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-moss-900/85 via-moss-900/15 to-transparent" />

        <div className="absolute left-4 top-4 flex gap-2">
          <Chip tone="solid" icon={<CalendarIcon className="h-3.5 w-3.5" />}>
            Jun 17 — Jul 2
          </Chip>
          <Chip tone="accent">{DAYS.length} days</Chip>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-cream-50">
          <div className="text-[12px] font-medium uppercase tracking-[0.18em] text-cream-100/85">
            {TRIP.tagline}
          </div>
          <h1 className="mt-1 font-display text-[34px] font-semibold leading-[1.05] tracking-tight">
            {TRIP.name}
            <br />
            <span className="text-cream-100/80">{TRIP.year}</span>
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <TravelerBadges ids={["family", "oliver"]} size="md" />
            <div className="text-[12.5px] text-cream-100/85">
              {countdown > 0 ? `${countdown} days to go` : "Trip is underway"}
            </div>
          </div>
        </div>
      </section>

      {/* Route strip */}
      <section className="mt-5">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-moss-700">
            Route
          </h2>
        </div>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {segments.map((s) => (
            <div
              key={s.city}
              className="flex shrink-0 items-center gap-2 rounded-full bg-cream-50 px-3 py-2 shadow-soft"
            >
              <span className="text-base leading-none">{countryFlag(s.country)}</span>
              <div className="leading-tight">
                <div className="text-[13px] font-semibold text-moss-900">{s.city}</div>
                <div className="text-[10.5px] uppercase tracking-wide text-ink-500">
                  {s.nights} {s.nights === 1 ? "day" : "days"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="mt-5 grid grid-cols-2 gap-2.5">
        <QuickLink href="/flights" label="Travel" sub="Flights · Trains · Ferries" Icon={PlaneIcon} />
        <QuickLink href="/stays" label="Stays" sub={`${ACCOMMODATIONS.length} bookings`} Icon={BedIcon} />
        <QuickLink href="/excursions" label="Excursions" sub="Plans by day" Icon={CompassIcon} />
        <QuickLink href="/transfers" label="Transfers" sub="Pickups & rides" Icon={CarIcon} />
      </section>

      {/* Today */}
      <section className="mt-6">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-moss-700">
            {todayLabel}
          </h2>
          <Link
            href={`/day/${today.date}`}
            className="text-[12.5px] font-medium text-moss-700 hover:text-moss-900"
          >
            Open day →
          </Link>
        </div>
        <TodayCard day={today} />
      </section>

      {/* Upcoming days */}
      <section className="mt-6">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-moss-700">
            Upcoming
          </h2>
          <Link
            href="/days"
            className="text-[12.5px] font-medium text-moss-700 hover:text-moss-900"
          >
            See all →
          </Link>
        </div>
        <div className="space-y-2.5">
          {upcoming.slice(1).map((d) => (
            <DayRow key={d.date} day={d} />
          ))}
        </div>
      </section>

      <p className="mt-10 text-center text-[11px] text-ink-500">
        Bon Voyage · {TRIP.tagline}
      </p>
    </Frame>
  );
}

function uniqueSegments() {
  const segs: { city: string; country: string; nights: number }[] = [];
  for (const acc of ACCOMMODATIONS) {
    segs.push({ city: acc.city, country: acc.country, nights: acc.nights });
  }
  return segs;
}

function QuickLink({
  href,
  label,
  sub,
  Icon
}: {
  href: string;
  label: string;
  sub: string;
  Icon: (p: { className?: string }) => JSX.Element;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-2xl bg-cream-50 p-3 shadow-soft transition active:scale-[0.99]"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-moss-900 text-cream-50">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0 leading-tight">
        <div className="truncate text-[14px] font-semibold text-moss-900">{label}</div>
        <div className="truncate text-[11.5px] text-ink-500">{sub}</div>
      </div>
    </Link>
  );
}

function TodayCard({ day }: { day: ReturnType<typeof findToday> }) {
  const image = CITY_IMAGES[day.city] ?? TRIP.heroImage;
  return (
    <Link
      href={`/day/${day.date}`}
      className="block overflow-hidden rounded-3xl bg-cream-50 shadow-card"
    >
      <div className="relative">
        <div
          className="aspect-[16/9] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-moss-900/70 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Chip tone="solid">{day.label}</Chip>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-cream-50">
          <div>
            <div className="flex items-center gap-1.5 text-[12px] text-cream-100/80">
              <MapPinIcon className="h-3.5 w-3.5" /> {day.country}
            </div>
            <div className="text-[22px] font-semibold tracking-tight">{day.city}</div>
          </div>
          <Chip tone="accent">
            {day.events.length || "Rest"} {day.events.length === 1 ? "plan" : day.events.length ? "plans" : "day"}
          </Chip>
        </div>
      </div>

      {day.events.length > 0 && (
        <ul className="divide-y divide-cream-200">
          {day.events.slice(0, 3).map((ev) => (
            <li key={ev.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <div className="truncate text-[13.5px] font-medium text-moss-900">
                  {summarize(ev)}
                </div>
                <div className="text-[11.5px] uppercase tracking-wide text-ink-500">
                  {ev.type}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-ink-300" />
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}

function DayRow({ day }: { day: ReturnType<typeof findToday> }) {
  const image = CITY_IMAGES[day.city] ?? TRIP.heroImage;
  return (
    <Link
      href={`/day/${day.date}`}
      className="flex items-center gap-3 rounded-2xl bg-cream-50 p-2 shadow-soft transition active:scale-[0.99]"
    >
      <div
        className="h-16 w-16 shrink-0 rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-moss-500">
            {day.label}
          </div>
          <span className="text-base leading-none">{countryFlag(day.country)}</span>
        </div>
        <div className="truncate text-[15px] font-semibold tracking-tight text-moss-900">
          {day.city}
        </div>
        <div className="mt-0.5 text-[11.5px] text-ink-500">
          {day.events.length === 0
            ? "Open day"
            : `${day.events.length} ${day.events.length === 1 ? "plan" : "plans"}`}
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-ink-300" />
    </Link>
  );
}

import type { Event } from "@/lib/itinerary";
function summarize(ev: Event): string {
  switch (ev.type) {
    case "flight":
      return `${ev.from.code} → ${ev.to.code} · ${ev.airline} ${ev.flightNo}`;
    case "train":
      return `Train · ${ev.from.city} → ${ev.to.city}`;
    case "ferry":
      return `Ferry · ${ev.from.city} → ${ev.to.city}`;
    case "transfer":
      return ev.title;
    case "stay":
      return `${ev.action === "check-in" ? "Check-in" : ev.action === "check-out" ? "Check-out" : "Stay"} · ${ev.property}`;
    case "excursion":
      return ev.title;
  }
}
