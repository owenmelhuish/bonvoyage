import Link from "next/link";
import { Frame } from "@/components/Frame";
import { Header } from "@/components/Header";
import { Chip, TravelerBadges } from "@/components/Chip";
import { MapPinIcon, CalendarIcon, ChevronRight } from "@/components/Icons";
import { ACCOMMODATIONS, countryFlag } from "@/lib/itinerary";

function fmt(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function StaysPage() {
  return (
    <Frame>
      <Header back title="Stays" />

      <p className="mb-4 text-[13px] text-ink-500">
        {ACCOMMODATIONS.length} accommodations across Italy & France
      </p>

      <div className="space-y-4">
        {ACCOMMODATIONS.map((a) => (
          <article
            key={a.id}
            className="overflow-hidden rounded-3xl bg-cream-50 shadow-card"
          >
            <div className="relative">
              <div
                className="aspect-[16/10] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${a.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-moss-900/55 to-transparent" />
              <div className="absolute left-3 top-3 flex gap-2">
                <Chip tone="solid">
                  <span className="text-sm leading-none">{countryFlag(a.country)}</span>
                  <span className="ml-1">{a.city}</span>
                </Chip>
              </div>
              <div className="absolute bottom-3 right-3">
                <Chip tone="accent">
                  {a.nights} {a.nights === 1 ? "night" : "nights"}
                </Chip>
              </div>
              <div className="absolute bottom-3 left-3 text-cream-50">
                <div className="text-[18px] font-semibold leading-tight tracking-tight">{a.property}</div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start gap-2 text-[12.5px] text-ink-500">
                <MapPinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{a.address}</span>
              </div>

              <div className="mt-3 flex items-center gap-3 rounded-2xl bg-moss-50 p-3">
                <CalendarIcon className="h-4 w-4 text-moss-700" />
                <div className="flex-1 text-[13px] text-moss-900">
                  <span className="font-semibold">{fmt(a.checkIn)}</span>
                  <span className="mx-1.5 text-ink-300">→</span>
                  <span className="font-semibold">{fmt(a.checkOut)}</span>
                </div>
                <TravelerBadges ids={a.travelers} />
              </div>

              {a.paymentRemaining && (
                <div className="mt-3 flex items-center justify-between rounded-2xl bg-lime-200/60 px-3 py-2">
                  <span className="text-[12px] font-medium text-moss-700">Payment remaining</span>
                  <span className="text-[13px] font-semibold text-moss-900">{a.paymentRemaining}</span>
                </div>
              )}

              <Link
                href={`/day/${a.checkIn}`}
                className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-medium text-moss-700 hover:text-moss-900"
              >
                Open check-in day <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Frame>
  );
}
