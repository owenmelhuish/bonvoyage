import Link from "next/link";
import { Frame } from "@/components/Frame";
import { Header } from "@/components/Header";
import { TravelerBadges } from "@/components/Chip";
import { CarIcon, PhoneIcon, ChevronRight } from "@/components/Icons";
import { eventsOfType } from "@/lib/itinerary";

export default function TransfersPage() {
  const transfers = eventsOfType("transfer");

  return (
    <Frame>
      <Header back title="Transfers" />
      <p className="mb-4 text-[13px] text-ink-500">
        Pickups, transfers, and pre-booked rides
      </p>

      <div className="space-y-2.5">
        {transfers.map((e) => (
          <article
            key={e.id}
            className="overflow-hidden rounded-3xl bg-cream-50 shadow-soft"
          >
            <Link
              href={`/day/${e.date}`}
              className="flex items-start gap-3 p-4 transition active:scale-[0.99]"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cream-200 text-moss-900">
                <CarIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-moss-500">
                  {e.dayLabel}
                </div>
                <div className="text-[15px] font-semibold tracking-tight text-moss-900">{e.title}</div>
                {e.vendor && <div className="mt-0.5 text-[12.5px] text-ink-500">{e.vendor}</div>}
                {e.cost && (
                  <div className="mt-2">
                    <span className="rounded-full bg-lime-200 px-2.5 py-1 text-[12px] font-semibold text-moss-900">
                      {e.cost}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <TravelerBadges ids={e.travelers} />
                <ChevronRight className="h-4 w-4 text-ink-300" />
              </div>
            </Link>
            {e.emergencyPhone && (
              <a
                href={`tel:${e.emergencyPhone.replace(/[^+0-9]/g, "")}`}
                className="flex items-center justify-between gap-2 border-t border-cream-200 bg-moss-50 px-4 py-2.5 text-moss-900"
              >
                <span className="inline-flex items-center gap-2 text-[12.5px] font-medium">
                  <PhoneIcon className="h-3.5 w-3.5" />
                  Emergency contact
                </span>
                <span className="text-[12.5px] font-semibold">{e.emergencyPhone}</span>
              </a>
            )}
          </article>
        ))}
      </div>
    </Frame>
  );
}
