import type { Event } from "@/lib/itinerary";
import { formatTime } from "@/lib/itinerary";
import {
  PlaneIcon,
  TrainIcon,
  FerryIcon,
  CarIcon,
  BedIcon,
  StarIcon,
  ClockIcon,
  PhoneIcon
} from "./Icons";
import { TravelerBadges } from "./Chip";

const ICONS = {
  flight: PlaneIcon,
  train: TrainIcon,
  ferry: FerryIcon,
  transfer: CarIcon,
  stay: BedIcon,
  excursion: StarIcon
};

const TONE = {
  flight: { rail: "bg-moss-900", chip: "bg-moss-50 text-moss-900", label: "Flight" },
  train: { rail: "bg-moss-500", chip: "bg-moss-50 text-moss-900", label: "Train" },
  ferry: { rail: "bg-moss-500", chip: "bg-moss-50 text-moss-900", label: "Ferry" },
  transfer: { rail: "bg-cream-300", chip: "bg-cream-200 text-moss-900", label: "Transfer" },
  stay: { rail: "bg-lime-300", chip: "bg-lime-200 text-moss-900", label: "Stay" },
  excursion: { rail: "bg-lime-300", chip: "bg-lime-200 text-moss-900", label: "Excursion" }
};

export function EventCard({ event }: { event: Event }) {
  const Icon = ICONS[event.type];
  const tone = TONE[event.type];

  return (
    <article className="overflow-hidden rounded-3xl bg-cream-50 shadow-soft">
      <div className="flex">
        {/* Side rail with rotated label */}
        <div className={`flex w-10 flex-col items-center justify-center ${tone.rail} py-3`}>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream-50"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {tone.label}
          </span>
        </div>

        <div className="flex-1 p-4">
          <div className="mb-2 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-moss-900 text-cream-50">
                <Icon className="h-4 w-4" />
              </span>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${tone.chip}`}>
                {tone.label}
              </span>
            </div>
            <TravelerBadges ids={event.travelers} />
          </div>

          <EventBody event={event} />
        </div>
      </div>
    </article>
  );
}

function EventBody({ event }: { event: Event }) {
  switch (event.type) {
    case "flight":
      return (
        <div>
          <div className="mt-1 flex items-end justify-between gap-3">
            <div>
              <div className="text-2xl font-semibold leading-none tracking-tight text-moss-900">
                {event.from.code}
              </div>
              <div className="text-[12px] text-ink-500">{event.from.city}</div>
              <div className="mt-2 text-[15px] font-medium text-moss-900">{formatTime(event.depart)}</div>
            </div>
            <div className="flex flex-1 flex-col items-center px-2">
              <div className="text-[11px] font-medium text-ink-500">{event.airline}</div>
              <div className="relative my-1 flex w-full items-center">
                <span className="h-[2px] flex-1 border-t border-dashed border-moss-200" />
                <PlaneIcon className="mx-1 h-4 w-4 text-moss-900" />
                <span className="h-[2px] flex-1 border-t border-dashed border-moss-200" />
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-moss-900">
                {event.flightNo}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold leading-none tracking-tight text-moss-900">
                {event.to.code}
              </div>
              <div className="text-[12px] text-ink-500">{event.to.city}</div>
              <div className="mt-2 text-[15px] font-medium text-moss-900">
                {formatTime(event.arrive)}
                {event.arriveNextDay && <span className="ml-0.5 text-[10px] text-ink-500">+1</span>}
              </div>
            </div>
          </div>
          {event.notes && <p className="mt-3 text-[12.5px] text-ink-500">{event.notes}</p>}
        </div>
      );
    case "train":
    case "ferry":
      return (
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wide text-ink-500">
            {event.operator ?? (event.type === "train" ? "Train" : "Ferry")}
          </div>
          <div className="mt-1 flex items-end justify-between gap-3">
            <div>
              <div className="text-xl font-semibold tracking-tight text-moss-900">{event.from.city}</div>
              <div className="mt-1 text-[15px] font-medium text-moss-900">{formatTime(event.depart)}</div>
            </div>
            <div className="px-2 text-ink-300">→</div>
            <div className="text-right">
              <div className="text-xl font-semibold tracking-tight text-moss-900">{event.to.city}</div>
              <div className="mt-1 text-[15px] font-medium text-moss-900">{formatTime(event.arrive)}</div>
            </div>
          </div>
          {event.notes && <p className="mt-3 text-[12.5px] text-ink-500">{event.notes}</p>}
        </div>
      );
    case "transfer":
      return (
        <div>
          <div className="text-[15px] font-semibold text-moss-900">{event.title}</div>
          {event.vendor && (
            <div className="mt-0.5 text-[12.5px] text-ink-500">{event.vendor}</div>
          )}
          {event.emergencyPhone && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <a
                href={`tel:${event.emergencyPhone.replace(/[^+0-9]/g, "")}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-moss-50 px-2.5 py-1 text-[12px] font-medium text-moss-900"
              >
                <PhoneIcon className="h-3.5 w-3.5" />
                {event.emergencyPhone}
              </a>
            </div>
          )}
        </div>
      );
    case "stay":
      return (
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-moss-500">
            {event.action === "check-in"
              ? "Check-in"
              : event.action === "check-out"
                ? "Check-out"
                : "Stay"}
          </div>
          <div className="text-[16px] font-semibold tracking-tight text-moss-900">
            {event.property}
          </div>
          <div className="mt-0.5 text-[12.5px] text-ink-500">{event.address}</div>
          {event.notes && <p className="mt-2 text-[12.5px] text-ink-500">{event.notes}</p>}
        </div>
      );
    case "excursion":
      return (
        <div>
          <div className="text-[16px] font-semibold tracking-tight text-moss-900">{event.title}</div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {event.time && (
              <span className="inline-flex items-center gap-1 rounded-full bg-moss-50 px-2.5 py-1 text-[12px] font-medium text-moss-900">
                <ClockIcon className="h-3.5 w-3.5" /> {formatTime(event.time)}
              </span>
            )}
            {event.vendor && (
              <span className="rounded-full bg-cream-200 px-2.5 py-1 text-[12px] font-medium text-moss-900">
                {event.vendor}
              </span>
            )}
          </div>
          {event.notes && <p className="mt-2 text-[12.5px] text-ink-500">{event.notes}</p>}
        </div>
      );
  }
}
