import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = "stroke-current";
const baseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24"
};

export const PlaneIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <path d="M10.5 13.5L3.5 11 2 12.5l5 3.5L8.5 22l1.5-1.5 2.5-7 7 7L21 19 13.5 10l4-9-2-1.5-9 4-3-1.5L4 3.5l3 4 3.5 6z" />
  </svg>
);

export const TrainIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <rect x="5" y="3" width="14" height="14" rx="3" />
    <path d="M5 11h14" />
    <circle cx="9" cy="14" r="0.8" fill="currentColor" />
    <circle cx="15" cy="14" r="0.8" fill="currentColor" />
    <path d="M7 17l-2 4M17 17l2 4" />
  </svg>
);

export const FerryIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <path d="M3 17c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0" />
    <path d="M5 14V9l7-3 7 3v5" />
    <path d="M9 9V6.5M15 9V6.5" />
  </svg>
);

export const CarIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <path d="M5 14l1.5-4.5A2 2 0 018.5 8h7a2 2 0 011.9 1.5L19 14" />
    <rect x="3" y="14" width="18" height="5" rx="1.5" />
    <circle cx="7.5" cy="18.5" r="1.2" fill="currentColor" />
    <circle cx="16.5" cy="18.5" r="1.2" fill="currentColor" />
  </svg>
);

export const BedIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <path d="M3 18V8" />
    <path d="M3 13h18v5" />
    <path d="M21 18v-4a3 3 0 00-3-3h-7v2" />
    <circle cx="7" cy="11.5" r="1.5" />
  </svg>
);

export const StarIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <path d="M12 3l2.7 5.7 6.3.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.3-.9z" />
  </svg>
);

export const MapPinIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <path d="M12 22s-7-6-7-12a7 7 0 0114 0c0 6-7 12-7 12z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const CalendarIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);

export const UsersIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <circle cx="9" cy="9" r="3" />
    <path d="M3 20a6 6 0 0112 0" />
    <circle cx="17" cy="10" r="2.5" />
    <path d="M15 20a5 5 0 016-4.5" />
  </svg>
);

export const ChevronRight = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const ArrowLeft = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const PhoneIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </svg>
);

export const SparkleIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
  </svg>
);

export const CompassIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15 9l-2 6-6 2 2-6z" />
  </svg>
);

export const HomeIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z" />
  </svg>
);

export const ExternalLinkIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <path d="M14 4h6v6M20 4l-9 9" />
    <path d="M18 13v5a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h5" />
  </svg>
);

export const TicketIcon = (p: P) => (
  <svg {...baseProps} className={base} {...p}>
    <path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 100-4z" />
    <path d="M14 6v12" strokeDasharray="1.5 2.5" />
  </svg>
);
