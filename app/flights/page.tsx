import Link from "next/link";
import { Frame } from "@/components/Frame";
import { Header } from "@/components/Header";
import { Chip, TravelerBadges } from "@/components/Chip";
import { PlaneIcon, TrainIcon, FerryIcon } from "@/components/Icons";
import { eventsOfType } from "@/lib/itinerary";

export default function TravelPage() {
  const flights = eventsOfType("flight");
  const trains = eventsOfType("train");
  const ferries = eventsOfType("ferry");

  return (
    <Frame>
      <Header back title="Travel" />

      <Section title="Flights" count={flights.length} accent="bg-moss-900 text-cream-50">
        <div className="space-y-2.5">
          {flights.map((e) => (
            <Link
              key={e.id}
              href={`/day/${e.date}`}
              className="block overflow-hidden rounded-3xl bg-cream-50 shadow-soft transition active:scale-[0.99]"
            >
              <div className="flex items-center justify-between gap-3 bg-moss-900 px-4 py-2 text-cream-50">
                <div className="flex items-center gap-2">
                  <PlaneIcon className="h-4 w-4" />
                  <span className="text-[12.5px] font-semibold">
                    {e.airline} {e.flightNo}
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-wide text-cream-100/85">{e.dayLabel}</span>
              </div>
              <div className="flex items-end justify-between gap-3 p-4">
                <div>
                  <div className="text-[22px] font-semibold leading-none tracking-tight text-moss-900">
                    {e.from.code}
                  </div>
                  <div className="text-[11.5px] text-ink-500">{e.from.city}</div>
                  <div className="mt-1.5 text-[14px] font-medium text-moss-900">{e.depart}</div>
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
                    {e.to.code}
                  </div>
                  <div className="text-[11.5px] text-ink-500">{e.to.city}</div>
                  <div className="mt-1.5 text-[14px] font-medium text-moss-900">
                    {e.arrive}
                    {e.arriveNextDay && <span className="ml-0.5 text-[10px] text-ink-500">+1</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-cream-200 bg-lime-200/50 px-4 py-2.5">
                <span className="text-[11px] uppercase tracking-wide text-moss-700">Passengers</span>
                <TravelerBadges ids={e.travelers} />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Trains" count={trains.length} accent="bg-moss-500 text-cream-50">
        <div className="space-y-2.5">
          {trains.map((e) => (
            <RailRow
              key={e.id}
              date={e.date}
              dayLabel={e.dayLabel}
              from={e.from.city}
              to={e.to.city}
              depart={e.depart}
              arrive={e.arrive}
              op={e.operator ?? "Train"}
              Icon={TrainIcon}
              travelers={e.travelers}
            />
          ))}
        </div>
      </Section>

      <Section title="Ferries" count={ferries.length} accent="bg-moss-500 text-cream-50">
        <div className="space-y-2.5">
          {ferries.map((e) => (
            <RailRow
              key={e.id}
              date={e.date}
              dayLabel={e.dayLabel}
              from={e.from.city}
              to={e.to.city}
              depart={e.depart}
              arrive={e.arrive}
              op={e.operator ?? "Ferry"}
              Icon={FerryIcon}
              travelers={e.travelers}
            />
          ))}
        </div>
      </Section>
    </Frame>
  );
}

function Section({
  title,
  count,
  accent,
  children
}: {
  title: string;
  count: number;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5 first:mt-0">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-moss-700">{title}</h2>
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${accent}`}>{count}</span>
      </div>
      {children}
    </section>
  );
}

function RailRow({
  date,
  dayLabel,
  from,
  to,
  depart,
  arrive,
  op,
  Icon,
  travelers
}: {
  date: string;
  dayLabel: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
  op: string;
  Icon: (p: { className?: string }) => JSX.Element;
  travelers: ("family" | "oliver")[];
}) {
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
        <span className="text-[11px] uppercase tracking-wide text-cream-100/85">{dayLabel}</span>
      </div>
      <div className="flex items-end justify-between gap-3 p-4">
        <div>
          <div className="text-[18px] font-semibold leading-tight tracking-tight text-moss-900">{from}</div>
          <div className="mt-1 text-[14px] font-medium text-moss-900">{depart}</div>
        </div>
        <div className="px-2 text-ink-300">→</div>
        <div className="text-right">
          <div className="text-[18px] font-semibold leading-tight tracking-tight text-moss-900">{to}</div>
          <div className="mt-1 text-[14px] font-medium text-moss-900">{arrive}</div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-cream-200 bg-moss-50 px-4 py-2.5">
        <span className="text-[11px] uppercase tracking-wide text-moss-700">Passengers</span>
        <TravelerBadges ids={travelers} />
      </div>
    </Link>
  );
}
