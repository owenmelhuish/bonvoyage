import type { ReactNode } from "react";

export function Chip({
  children,
  tone = "ghost",
  icon
}: {
  children: ReactNode;
  tone?: "ghost" | "solid" | "accent" | "mint";
  icon?: ReactNode;
}) {
  const tones: Record<string, string> = {
    ghost: "bg-cream-50 text-moss-900 border border-cream-200",
    solid: "bg-moss-900 text-cream-50",
    accent: "bg-lime-300 text-moss-900",
    mint: "bg-moss-50 text-moss-900 border border-moss-100"
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[12.5px] font-medium ${tones[tone]}`}
    >
      {icon}
      {children}
    </span>
  );
}

export function TravelerBadges({
  ids,
  size = "sm"
}: {
  ids: ("family" | "oliver")[];
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-6 w-6 text-[11px]" : "h-7 w-7 text-[12px]";
  const map = {
    family: "bg-moss-900 text-cream-50",
    oliver: "bg-lime-300 text-moss-900"
  };
  return (
    <div className="flex -space-x-1.5">
      {ids.map((id) => (
        <span
          key={id}
          className={`${map[id]} ${dim} inline-flex items-center justify-center rounded-full font-semibold ring-2 ring-cream-100`}
          title={id === "family" ? "Family" : "Oliver"}
        >
          {id === "family" ? "F" : "O"}
        </span>
      ))}
    </div>
  );
}
