import { Frame } from "@/components/Frame";
import { Header } from "@/components/Header";
import { Chip } from "@/components/Chip";
import { DAYS, TRAVELERS, eventsOfType } from "@/lib/itinerary";

export default function TravelersPage() {
  const travelers = [TRAVELERS.family, TRAVELERS.oliver];

  return (
    <Frame>
      <Header back title="Travelers" />

      <p className="mb-4 text-[13px] text-ink-500">Two routes, one trip — converging in Florence on Jun 24.</p>

      <div className="space-y-4">
        {travelers.map((t) => {
          const flights = eventsOfType("flight").filter((e) => e.travelers.includes(t.id));
          const totalDays = DAYS.filter((d) =>
            d.events.some((e) => e.travelers.includes(t.id))
          ).length;

          return (
            <article key={t.id} className="overflow-hidden rounded-3xl bg-cream-50 shadow-card">
              <div className={`flex items-center gap-3 p-4 ${t.id === "family" ? "bg-moss-900 text-cream-50" : "bg-lime-300 text-moss-900"}`}>
                <span
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold ring-2 ring-cream-100 ${t.id === "family" ? "bg-cream-50 text-moss-900" : "bg-moss-900 text-cream-50"}`}
                >
                  {t.initial}
                </span>
                <div>
                  <div className="text-[20px] font-semibold tracking-tight">{t.name}</div>
                  <div className="text-[12px] opacity-80">
                    {t.id === "family"
                      ? "Via Atlanta → Rome"
                      : "Via Paris → Bastia → Corsica"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 p-4">
                <Stat label="Flights" value={flights.length} />
                <Stat label="Active days" value={totalDays} />
              </div>

              <div className="border-t border-cream-200 p-4">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-moss-500">
                  Flight summary
                </div>
                <ul className="space-y-1.5 text-[13px] text-moss-900">
                  {flights.map((f) => (
                    <li key={f.id} className="flex items-center justify-between gap-2">
                      <span className="font-medium">
                        {f.from.code} → {f.to.code}
                      </span>
                      <span className="text-[12px] text-ink-500">
                        {f.airline} {f.flightNo}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </Frame>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-moss-50 p-3 text-moss-900">
      <div className="text-[10.5px] font-semibold uppercase tracking-wide text-moss-500">
        {label}
      </div>
      <div className="mt-0.5 text-[24px] font-semibold leading-none tracking-tight">{value}</div>
    </div>
  );
}
