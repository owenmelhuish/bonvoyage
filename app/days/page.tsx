import Link from "next/link";
import { Frame } from "@/components/Frame";
import { Header } from "@/components/Header";
import { ChevronRight } from "@/components/Icons";
import { DAYS, CITY_IMAGES, TRIP, countryFlag } from "@/lib/itinerary";
import { TravelerBadges } from "@/components/Chip";

export default function DaysPage() {
  return (
    <Frame>
      <Header back title="All days" />

      <p className="mb-4 text-[13px] text-ink-500">
        {DAYS.length} days · {TRIP.startDate.slice(5).replace("-", "/")} → {TRIP.endDate.slice(5).replace("-", "/")}
      </p>

      <div className="space-y-2.5">
        {DAYS.map((d) => {
          const travelers = Array.from(new Set(d.events.flatMap((e) => e.travelers))) as (
            | "family"
            | "oliver"
          )[];
          const image = CITY_IMAGES[d.city] ?? TRIP.heroImage;
          return (
            <Link
              key={d.date}
              href={`/day/${d.date}`}
              className="flex items-center gap-3 rounded-2xl bg-cream-50 p-2 shadow-soft transition active:scale-[0.99]"
            >
              <div
                className="h-16 w-16 shrink-0 rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-moss-500">
                    {d.label}
                  </div>
                  <span className="text-base leading-none">{countryFlag(d.country)}</span>
                </div>
                <div className="truncate text-[15px] font-semibold tracking-tight text-moss-900">
                  {d.city}
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-[11.5px] text-ink-500">
                  {travelers.length > 0 && <TravelerBadges ids={travelers} />}
                  <span>
                    {d.events.length === 0
                      ? "Open day"
                      : `${d.events.length} ${d.events.length === 1 ? "plan" : "plans"}`}
                  </span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-ink-300" />
            </Link>
          );
        })}
      </div>
    </Frame>
  );
}
