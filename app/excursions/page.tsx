import Link from "next/link";
import { Frame } from "@/components/Frame";
import { Header } from "@/components/Header";
import { TravelerBadges } from "@/components/Chip";
import { ClockIcon, StarIcon, ChevronRight } from "@/components/Icons";
import { eventsOfType, formatTime } from "@/lib/itinerary";

export default function ExcursionsPage() {
  const excursions = eventsOfType("excursion");

  return (
    <Frame>
      <Header back title="Excursions" />
      <p className="mb-4 text-[13px] text-ink-500">
        {excursions.length} experiences booked across the trip
      </p>

      <div className="space-y-2.5">
        {excursions.map((e) => (
          <Link
            key={e.id}
            href={`/day/${e.date}`}
            className="block overflow-hidden rounded-3xl bg-cream-50 shadow-soft transition active:scale-[0.99]"
          >
            <div className="flex items-center gap-3 p-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime-300 text-moss-900">
                <StarIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-moss-500">
                  {e.dayLabel}
                </div>
                <div className="truncate text-[15px] font-semibold tracking-tight text-moss-900">
                  {e.title}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink-500">
                  {e.time && (
                    <span className="inline-flex items-center gap-1">
                      <ClockIcon className="h-3.5 w-3.5" /> {formatTime(e.time)}
                    </span>
                  )}
                  {e.vendor && <span>{e.vendor}</span>}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <TravelerBadges ids={e.travelers} />
                <ChevronRight className="h-4 w-4 text-ink-300" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Frame>
  );
}
