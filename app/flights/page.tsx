import Link from "next/link";
import { Frame } from "@/components/Frame";
import { Header } from "@/components/Header";
import { TravelerBadges } from "@/components/Chip";
import { PlaneIcon, TrainIcon, FerryIcon } from "@/components/Icons";
import { DAYS, formatTime } from "@/lib/itinerary";
import type { FlightEvent, TrainEvent, FerryEvent } from "@/lib/itinerary";

type TransportEvent = FlightEvent | TrainEvent | FerryEvent;

export default function TravelPage() {
  // Group flights, trains and ferries by the day they happen on.
  const groups = DAYS.map((d) => ({
    date: d.date,
    label: d.label,
    items: d.events.filter(
      (e): e is TransportEvent =>
        e.type === "flight" || e.type === "train" || e.type === "ferry"
    )
  })).filter((g) => g.items.length > 0);

  return (
    <Frame>
      <Header back title="Travel" />
      <p className="mb-4 text-[13px] text-ink-500">
        Flights, trains & ferries — in order by day
      </p>

      <div className="space-y-6">
        {groups.map((g) => (
          <section key={g.date}>
            <div className="mb-2 flex items-center gap-2">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-moss-700">
                {g.label}
              </h2>
              <span className="h-px flex-1 bg-cream-300" />
            </div>
            <div className="space-y-2.5">
              {g.items.map((e) => (
                <TransportCard key={e.id} date={g.date} event={e} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Frame>
  );
}

function TransportCard({ date, event }: { date: string; event: TransportEvent }) {
  if (event.type === "flight") {
    return (
      <Link
        href={`/day/${date}`}
        className="block overflow-hidden rounded-3xl bg-cream-50 shadow-soft transition active:scale-[0.99]"
      >
        <div className="flex items-center justify-between gap-3 bg-moss-900 px-4 py-2 text-cream-50">
          <div className="flex items-center gap-2">
            <PlaneIcon className="h-4 w-4" />
            <span className="text-[12.5px] font-semibold">
              {event.airline} {event.flightNo}
            </span>
          </div>
          <span className="text-[11px] uppercase tracking-wide text-cream-100/85">Flight</span>
        </div>
        <div className="flex items-end justify-between gap-3 p-4">
          <div>
            <div className="text-[22px] font-semibold leading-none tracking-tight text-moss-900">
              {event.from.code}
            </div>
            <div className="text-[11.5px] text-ink-500">{event.from.city}</div>
            <div className="mt-1.5 text-[14px] font-medium text-moss-900">{formatTime(event.depart)}</div>
          </div>
          <div className="flex flex-1 flex-col items-center px-2">
            <div className="relative my-1 flex w-full items-center">
              <span className="h-[2px] flex-1 border-t border-dashed border-moss-200" />
              <PlaneIcon className="mx-1 h-4 w-4 text-moss-900" />
              <span className="h-[2px] flex-1 border-t border-dashed border-moss-200" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-[22px] font-semibold leading-none tracking-tight text-moss-900">
              {event.to.code}
            </div>
            <div className="text-[11.5px] text-ink-500">{event.to.city}</div>
            <div className="mt-1.5 text-[14px] font-medium text-moss-900">
              {formatTime(event.arrive)}
              {event.arriveNextDay && <span className="ml-0.5 text-[10px] text-ink-500">+1</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-cream-200 bg-lime-200/50 px-4 py-2.5">
          <span className="text-[11px] uppercase tracking-wide text-moss-700">Passengers</span>
          <TravelerBadges ids={event.travelers} />
        </div>
      </Link>
    );
  }

  const Icon = event.type === "train" ? TrainIcon : FerryIcon;
  const op = event.operator ?? (event.type === "train" ? "Train" : "Ferry");

  return (
    <Link
      href={`/day/${date}`}
      className="block overflow-hidden rounded-3xl bg-cream-50 shadow-soft transition active:scale-[0.99]"
    >
      <div className="flex items-center justify-between gap-3 bg-moss-500 px-4 py-2 text-cream-50">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span className="text-[12.5px] font-semibold">{op}</span>
        </div>
        <span className="text-[11px] uppercase tracking-wide text-cream-100/85">
          {event.type === "train" ? "Train" : "Ferry"}
        </span>
      </div>
      <div className="flex items-end justify-between gap-3 p-4">
        <div>
          <div className="text-[18px] font-semibold leading-tight tracking-tight text-moss-900">
            {event.from.city}
          </div>
          <div className="mt-1 text-[14px] font-medium text-moss-900">{formatTime(event.depart)}</div>
        </div>
        <div className="px-2 text-ink-300">→</div>
        <div className="text-right">
          <div className="text-[18px] font-semibold leading-tight tracking-tight text-moss-900">
            {event.to.city}
          </div>
          <div className="mt-1 text-[14px] font-medium text-moss-900">{formatTime(event.arrive)}</div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-cream-200 bg-moss-50 px-4 py-2.5">
        <span className="text-[11px] uppercase tracking-wide text-moss-700">Passengers</span>
        <TravelerBadges ids={event.travelers} />
      </div>
    </Link>
  );
}
