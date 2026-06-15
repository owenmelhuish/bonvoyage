// Single source of truth for the Italy / France 2026 trip.
// Edit here; everything else reads from this file.

export type TravelerId = "family" | "oliver";

export type Traveler = {
  id: TravelerId;
  name: string;
  initial: string;
  hue: string; // tailwind class for chip color
};

export const TRAVELERS: Record<TravelerId, Traveler> = {
  family: { id: "family", name: "Family", initial: "F", hue: "bg-moss-900 text-cream-50" },
  oliver: { id: "oliver", name: "Oliver", initial: "O", hue: "bg-lime-300 text-moss-900" }
};

export type EventBase = {
  id: string;
  travelers: TravelerId[];
  notes?: string;
};

export type FlightEvent = EventBase & {
  type: "flight";
  airline: string;
  flightNo: string;
  from: { code: string; city: string };
  to: { code: string; city: string };
  depart: string; // local HH:mm
  arrive: string; // local HH:mm
  arriveNextDay?: boolean;
};

export type TrainEvent = EventBase & {
  type: "train";
  operator?: string;
  from: { city: string };
  to: { city: string };
  depart: string;
  arrive: string;
};

export type FerryEvent = EventBase & {
  type: "ferry";
  operator?: string;
  from: { city: string };
  to: { city: string };
  depart: string;
  arrive: string;
};

export type TransferEvent = EventBase & {
  type: "transfer";
  title: string;
  vendor?: string;
  emergencyPhone?: string;
};

export type StayEvent = EventBase & {
  type: "stay";
  action: "check-in" | "check-out" | "stay";
  property: string;
  address: string;
  city: string;
};

export type ExcursionEvent = EventBase & {
  type: "excursion";
  title: string;
  time?: string;
  vendor?: string;
};

export type Event =
  | FlightEvent
  | TrainEvent
  | FerryEvent
  | TransferEvent
  | StayEvent
  | ExcursionEvent;

export type Day = {
  date: string; // YYYY-MM-DD
  label: string; // "Wed, Jun 17"
  city: string;
  country: "USA" | "Italy" | "France" | "Travel";
  events: Event[];
};

export type Accommodation = {
  id: string;
  city: string;
  country: "Italy" | "France";
  property: string;
  address: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  image: string;
  travelers: TravelerId[];
  airbnbUrl?: string;
};

export const TRIP = {
  name: "Italy & France",
  year: 2026,
  tagline: "The Berger Family Voyage",
  startDate: "2026-06-17",
  endDate: "2026-07-02",
  heroImage:
    "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1600&q=80"
};

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: "rome",
    city: "Rome",
    country: "Italy",
    property: "Trastevere Apartment",
    address: "Vicolo del Cedro 36, Roma, 00153",
    checkIn: "2026-06-18",
    checkOut: "2026-06-20",
    nights: 2,
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    travelers: ["family"],
    airbnbUrl: "https://vrbo.onelink.me/ItNz/sk8w9aqw"
  },
  {
    id: "sorrento",
    city: "Sorrento",
    country: "Italy",
    property: "Villa Mimosa, Massa Lubrense",
    address: "Traversa Caprile, Massa Lubrense, Campania 80061",
    checkIn: "2026-06-20",
    checkOut: "2026-06-24",
    nights: 4,
    image:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1200&q=80",
    travelers: ["family"],
    airbnbUrl: "https://www.airbnb.com/rooms/19264313?unique_share_id=63c0b404-40b5-4190-b3b3-ab168a5fadd7&viralityEntryPoint=1&s=76"
  },
  {
    id: "florence",
    city: "Florence",
    country: "Italy",
    property: "Villa dell'Oche",
    address: "Villa dell'Oche, 16R, Florence, Tuscany 50122",
    checkIn: "2026-06-24",
    checkOut: "2026-06-27",
    nights: 3,
    image:
      "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1200&q=80",
    travelers: ["family", "oliver"],
    airbnbUrl: "https://www.airbnb.com/l/3AtaO3Kp"
  },
  {
    id: "paris",
    city: "Paris",
    country: "France",
    property: "Montmartre Apartment",
    address: "Rue Ravignan 24, Paris 75018",
    checkIn: "2026-06-27",
    checkOut: "2026-07-02",
    nights: 5,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    travelers: ["family", "oliver"],
    airbnbUrl: "https://vrbo.onelink.me/ItNz/xpg9zxn8"
  }
];

// Helpers for cleaner data construction
const f = (e: Omit<FlightEvent, "type">): FlightEvent => ({ type: "flight", ...e });
const t = (e: Omit<TrainEvent, "type">): TrainEvent => ({ type: "train", ...e });
const fy = (e: Omit<FerryEvent, "type">): FerryEvent => ({ type: "ferry", ...e });
const tr = (e: Omit<TransferEvent, "type">): TransferEvent => ({ type: "transfer", ...e });
const s = (e: Omit<StayEvent, "type">): StayEvent => ({ type: "stay", ...e });
const ex = (e: Omit<ExcursionEvent, "type">): ExcursionEvent => ({ type: "excursion", ...e });

export const DAYS: Day[] = [
  {
    date: "2026-06-17",
    label: "Wed, Jun 17",
    city: "LAX → Rome",
    country: "Travel",
    events: [
      tr({
        id: "uber-lax-fam",
        title: "Uber to LAX",
        travelers: ["family"]
      }),
      f({
        id: "af2873",
        airline: "Air France",
        flightNo: "AF 2873",
        from: { code: "LAX", city: "Los Angeles" },
        to: { code: "ATL", city: "Atlanta" },
        depart: "07:05",
        arrive: "14:45",
        travelers: ["family"]
      }),
      f({
        id: "af3669",
        airline: "Air France",
        flightNo: "AF 3669",
        from: { code: "ATL", city: "Atlanta" },
        to: { code: "FCO", city: "Rome" },
        depart: "17:50",
        arrive: "07:30",
        arriveNextDay: true,
        travelers: ["family"]
      }),
      tr({
        id: "ride-lax-oli",
        title: "Ride to LAX",
        travelers: ["oliver"]
      }),
      f({
        id: "bf731",
        airline: "French Bee",
        flightNo: "BF 731",
        from: { code: "LAX", city: "Los Angeles" },
        to: { code: "ORY", city: "Paris" },
        depart: "19:45",
        arrive: "15:35",
        arriveNextDay: true,
        travelers: ["oliver"]
      }),
      f({
        id: "xk787",
        airline: "Air Corsica",
        flightNo: "XK 787",
        from: { code: "ORY", city: "Paris" },
        to: { code: "BIA", city: "Bastia" },
        depart: "21:50",
        arrive: "23:25",
        arriveNextDay: true,
        travelers: ["oliver"]
      })
    ]
  },
  {
    date: "2026-06-18",
    label: "Thu, Jun 18",
    city: "Rome",
    country: "Italy",
    events: [
      s({
        id: "rome-ci",
        action: "check-in",
        property: "Trastevere Apartment",
        address: "Vicolo del Cedro 36, Roma",
        city: "Rome",
        travelers: ["family"],
        notes: "Early check-in arranged"
      }),
      tr({
        id: "rome-pickup",
        title: "Airbnb pickup & transfer from FCO",
        travelers: ["family"]
      })
    ]
  },
  {
    date: "2026-06-19",
    label: "Fri, Jun 19",
    city: "Rome",
    country: "Italy",
    events: []
  },
  {
    date: "2026-06-20",
    label: "Sat, Jun 20",
    city: "Rome → Sorrento",
    country: "Italy",
    events: [
      s({
        id: "rome-co",
        action: "check-out",
        property: "Trastevere Apartment",
        address: "Vicolo del Cedro 36, Roma",
        city: "Rome",
        travelers: ["family"]
      }),
      t({
        id: "rome-naples-train",
        operator: "Trenitalia",
        from: { city: "Rome" },
        to: { city: "Naples" },
        depart: "12:40",
        arrive: "15:05",
        travelers: ["family"]
      }),
      fy({
        id: "naples-sorrento-ferry",
        from: { city: "Naples" },
        to: { city: "Sorrento" },
        depart: "15:05",
        arrive: "15:50",
        travelers: ["family"]
      }),
      tr({
        id: "feeling-italy-sorrento",
        title: "Feeling Italy pickup → Villa Mimosa",
        vendor: "Feeling Italy (1 minivan)",
        emergencyPhone: "+39 081 1931 2378",
        travelers: ["family"]
      }),
      s({
        id: "sorrento-ci",
        action: "check-in",
        property: "Villa Mimosa, Massa Lubrense",
        address: "Traversa Caprile, Massa Lubrense",
        city: "Sorrento",
        travelers: ["family"]
      })
    ]
  },
  {
    date: "2026-06-21",
    label: "Sun, Jun 21",
    city: "Sorrento",
    country: "Italy",
    events: [
      ex({
        id: "pizza-night",
        title: "Explore town & Pizza making night",
        vendor: "Feeling Italy",
        travelers: ["family"]
      })
    ]
  },
  {
    date: "2026-06-22",
    label: "Mon, Jun 22",
    city: "Sorrento",
    country: "Italy",
    events: [
      ex({
        id: "capri-boat",
        title: "All-day boat trip to Capri",
        vendor: "Feeling Italy",
        travelers: ["family"]
      })
    ]
  },
  {
    date: "2026-06-23",
    label: "Tue, Jun 23",
    city: "Sorrento",
    country: "Italy",
    events: [
      ex({
        id: "sorrento-open",
        title: "Open day — needs booking",
        travelers: ["family"],
        notes: "TBD — leave open or add an excursion"
      })
    ]
  },
  {
    date: "2026-06-24",
    label: "Wed, Jun 24",
    city: "Sorrento → Florence",
    country: "Italy",
    events: [
      s({
        id: "sorrento-co",
        action: "check-out",
        property: "Villa Mimosa, Massa Lubrense",
        address: "Traversa Caprile, Massa Lubrense",
        city: "Sorrento",
        travelers: ["family"]
      }),
      fy({
        id: "sorrento-naples-ferry",
        from: { city: "Sorrento" },
        to: { city: "Naples" },
        depart: "07:20",
        arrive: "08:30",
        travelers: ["family"]
      }),
      t({
        id: "naples-florence-train",
        operator: "Trenitalia",
        from: { city: "Naples" },
        to: { city: "Florence" },
        depart: "08:55",
        arrive: "11:31",
        travelers: ["family"]
      }),
      f({
        id: "xk202",
        airline: "Air Corsica",
        flightNo: "XK 202",
        from: { code: "BIA", city: "Bastia" },
        to: { code: "NCE", city: "Nice" },
        depart: "07:30",
        arrive: "08:30",
        travelers: ["oliver"]
      }),
      f({
        id: "xk712",
        airline: "Air Corsica",
        flightNo: "XK 712",
        from: { code: "NCE", city: "Nice" },
        to: { code: "FLR", city: "Florence" },
        depart: "09:50",
        arrive: "11:00",
        travelers: ["oliver"]
      }),
      tr({
        id: "tuscan-flo-fam",
        title: "Tuscan & Beyond pickup — Florence train station",
        vendor: "Tuscan & Beyond",
        emergencyPhone: "+39 340 859 1573",
        travelers: ["family"]
      }),
      tr({
        id: "tuscan-flo-oli",
        title: "Tuscan & Beyond pickup — Florence airport",
        vendor: "Tuscan & Beyond",
        travelers: ["oliver"]
      }),
      s({
        id: "florence-ci",
        action: "check-in",
        property: "Villa dell'Oche",
        address: "Villa dell'Oche 16R, Florence",
        city: "Florence",
        travelers: ["family", "oliver"]
      })
    ]
  },
  {
    date: "2026-06-25",
    label: "Thu, Jun 25",
    city: "Florence",
    country: "Italy",
    events: [
      ex({
        id: "pasta-class",
        title: "Pasta cooking class",
        time: "18:30",
        travelers: ["family", "oliver"]
      })
    ]
  },
  {
    date: "2026-06-26",
    label: "Fri, Jun 26",
    city: "Florence",
    country: "Italy",
    events: []
  },
  {
    date: "2026-06-27",
    label: "Sat, Jun 27",
    city: "Florence → Paris",
    country: "Travel",
    events: [
      s({
        id: "florence-co",
        action: "check-out",
        property: "Villa dell'Oche",
        address: "Villa dell'Oche 16R, Florence",
        city: "Florence",
        travelers: ["family", "oliver"]
      }),
      tr({
        id: "tuscan-flo-out",
        title: "Tuscan & Beyond sprinter van — to FLR airport",
        vendor: "Tuscan & Beyond",
        travelers: ["family", "oliver"]
      }),
      f({
        id: "vy1500",
        airline: "Vueling",
        flightNo: "VY 1500",
        from: { code: "FLR", city: "Florence" },
        to: { code: "ORY", city: "Paris" },
        depart: "09:10",
        arrive: "11:00",
        travelers: ["family", "oliver"]
      }),
      tr({
        id: "viator-paris-in",
        title: "Viator transfer — ORY to Montmartre",
        vendor: "Viator (RT airport transfer)",
        travelers: ["family", "oliver"]
      }),
      s({
        id: "paris-ci",
        action: "check-in",
        property: "Montmartre Apartment",
        address: "Rue Ravignan 24, Paris 75018",
        city: "Paris",
        travelers: ["family", "oliver"]
      })
    ]
  },
  {
    date: "2026-06-28",
    label: "Sun, Jun 28",
    city: "Paris",
    country: "France",
    events: [
      ex({
        id: "river-cruise",
        title: "Seine river cruise",
        time: "22:00",
        vendor: "Viator (booked)",
        travelers: ["family", "oliver"]
      })
    ]
  },
  {
    date: "2026-06-29",
    label: "Mon, Jun 29",
    city: "Paris",
    country: "France",
    events: [
      ex({
        id: "laperouse",
        title: "Dinner at Laperouse",
        time: "20:00",
        travelers: ["family", "oliver"]
      })
    ]
  },
  {
    date: "2026-06-30",
    label: "Tue, Jun 30",
    city: "Paris",
    country: "France",
    events: [
      ex({
        id: "eiffel",
        title: "Eiffel Tower",
        time: "16:00",
        travelers: ["family", "oliver"]
      })
    ]
  },
  {
    date: "2026-07-01",
    label: "Wed, Jul 1",
    city: "Paris",
    country: "France",
    events: [
      ex({
        id: "food-tour",
        title: "Paris food tour",
        travelers: ["family", "oliver"]
      })
    ]
  },
  {
    date: "2026-07-02",
    label: "Thu, Jul 2",
    city: "Paris → LA",
    country: "Travel",
    events: [
      s({
        id: "paris-co",
        action: "check-out",
        property: "Montmartre Apartment",
        address: "Rue Ravignan 24, Paris 75018",
        city: "Paris",
        travelers: ["family", "oliver"]
      }),
      tr({
        id: "viator-paris-out",
        title: "Viator transfer — Montmartre to ORY",
        vendor: "Viator (round-trip booking)",
        travelers: ["family", "oliver"]
      }),
      f({
        id: "af0020",
        airline: "Air France",
        flightNo: "AF 0020",
        from: { code: "ORY", city: "Paris" },
        to: { code: "LAX", city: "Los Angeles" },
        depart: "09:05",
        arrive: "11:40",
        travelers: ["family", "oliver"]
      })
    ]
  }
];

// City image lookup for visual richness
export const CITY_IMAGES: Record<string, string> = {
  Rome: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1200&q=80",
  Sorrento: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1200&q=80",
  Florence: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1200&q=80",
  Paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
  "LAX → Rome": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
  "Rome → Sorrento": "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1200&q=80",
  "Sorrento → Florence": "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1200&q=80",
  "Florence → Paris": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
  "Paris → LA": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
};

// Pulled helpers
export function eventsOfType<T extends Event["type"]>(
  type: T
): Array<Extract<Event, { type: T }> & { date: string; dayLabel: string }> {
  const out: Array<Extract<Event, { type: T }> & { date: string; dayLabel: string }> = [];
  for (const day of DAYS) {
    for (const ev of day.events) {
      if (ev.type === type) {
        out.push({ ...(ev as Extract<Event, { type: T }>), date: day.date, dayLabel: day.label });
      }
    }
  }
  return out;
}

// Converts a 24-hour "HH:mm" string to a 12-hour clock with am/pm.
export function formatTime(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr ?? "00";
  const period = h >= 12 ? "pm" : "am";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${period}`;
}

export function dayByDate(date: string): Day | undefined {
  return DAYS.find((d) => d.date === date);
}

export function findToday(now: Date = new Date()): Day {
  const iso = now.toISOString().slice(0, 10);
  // Before trip → first day; after → last day
  if (iso < TRIP.startDate) return DAYS[0];
  if (iso > TRIP.endDate) return DAYS[DAYS.length - 1];
  return DAYS.find((d) => d.date === iso) ?? DAYS[0];
}

export function daysUntilStart(now: Date = new Date()): number {
  const start = new Date(TRIP.startDate + "T00:00:00");
  const ms = start.getTime() - now.getTime();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

// Returns the set of event types occurring on a given date.
export function eventTypesByDate(date: string): Set<Event["type"]> {
  const day = dayByDate(date);
  const types = new Set<Event["type"]>();
  if (!day) return types;
  for (const ev of day.events) types.add(ev.type);
  return types;
}

// Returns the active stay (accommodation) on a given date, if any.
export function activeStayOnDate(date: string): Accommodation | undefined {
  return ACCOMMODATIONS.find((a) => date >= a.checkIn && date < a.checkOut);
}

export function countryFlag(country: string): string {
  switch (country) {
    case "Italy":
      return "🇮🇹";
    case "France":
      return "🇫🇷";
    case "USA":
      return "🇺🇸";
    default:
      return "✈️";
  }
}
