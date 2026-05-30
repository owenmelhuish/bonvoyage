import Link from "next/link";
import { notFound } from "next/navigation";
import { Frame } from "@/components/Frame";
import { Header } from "@/components/Header";
import { EventCard } from "@/components/EventCard";
import { Chip, TravelerBadges } from "@/components/Chip";
import {
  DAYS,
  CITY_IMAGES,
  TRIP,
  countryFlag,
  dayByDate
} from "@/lib/itinerary";
import { ArrowLeft, ArrowRight, MapPinIcon } from "@/components/Icons";

export function generateStaticParams() {
  return DAYS.map((d) => ({ date: d.date }));
}

export default function DayPage({ params }: { params: { date: string } }) {
  const day = dayByDate(params.date);
  if (!day) notFound();

  const idx = DAYS.findIndex((d) => d.date === day.date);
  const prev = idx > 0 ? DAYS[idx - 1] : null;
  const next = idx < DAYS.length - 1 ? DAYS[idx + 1] : null;

  const image = CITY_IMAGES[day.city] ?? TRIP.heroImage;
  const allTravelers = Array.from(new Set(day.events.flatMap((e) => e.travelers)));

  return (
    <Frame>
      <Header back />

      {/* Hero image with day info */}
      <section className="relative -mx-4 -mt-2 overflow-hidden">
        <div
          className="aspect-[16/12] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-moss-900/85 via-moss-900/20 to-transparent" />

        <div className="absolute left-4 top-3 flex gap-2">
          <Chip tone="solid">{day.label}</Chip>
          <Chip tone="ghost" icon={<span className="text-sm leading-none">{countryFlag(day.country)}</span>}>
            {day.country}
          </Chip>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-cream-50">
          <div className="flex items-center gap-1.5 text-[12px] text-cream-100/80">
            <MapPinIcon className="h-3.5 w-3.5" />
            Day {idx + 1} of {DAYS.length}
          </div>
          <h1 className="mt-1 font-display text-[28px] font-semibold leading-tight tracking-tight">
            {day.city}
          </h1>
          {allTravelers.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <TravelerBadges ids={allTravelers as ("family" | "oliver")[]} size="md" />
              <span className="text-[12px] text-cream-100/85">
                {allTravelers.length === 2 ? "Family + Oliver" : allTravelers[0] === "family" ? "Family" : "Oliver"}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Plan list */}
      <section className="mt-5">
        <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-[0.15em] text-moss-700">
          Plans
        </h2>
        {day.events.length === 0 ? (
          <div className="rounded-3xl bg-cream-50 p-6 text-center shadow-soft">
            <div className="text-[15px] font-semibold text-moss-900">Open day</div>
            <p className="mt-1 text-[13px] text-ink-500">
              No bookings yet — explore the city at your own pace.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {day.events.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        )}
      </section>

      {/* Prev / next */}
      <section className="mt-6 grid grid-cols-2 gap-2.5">
        {prev ? (
          <Link
            href={`/day/${prev.date}`}
            className="flex items-center gap-2 rounded-2xl bg-cream-50 p-3 shadow-soft"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-moss-900 text-cream-50">
              <ArrowLeft className="h-4 w-4" />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="text-[11px] uppercase tracking-wide text-ink-500">Previous</div>
              <div className="truncate text-[13.5px] font-semibold text-moss-900">{prev.city}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <Link
            href={`/day/${next.date}`}
            className="flex items-center justify-end gap-2 rounded-2xl bg-cream-50 p-3 text-right shadow-soft"
          >
            <div className="min-w-0 leading-tight">
              <div className="text-[11px] uppercase tracking-wide text-ink-500">Next</div>
              <div className="truncate text-[13.5px] font-semibold text-moss-900">{next.city}</div>
            </div>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-moss-900 text-cream-50">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        )}
      </section>
    </Frame>
  );
}
