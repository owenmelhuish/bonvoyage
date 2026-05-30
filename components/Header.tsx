"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, SparkleIcon } from "./Icons";

export function Header({ title, back }: { title?: string; back?: boolean }) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 -mx-4 mb-2 bg-cream-100/85 px-4 pb-2 pt-3 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        {back ? (
          <button
            onClick={() => router.back()}
            aria-label="Back"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream-50 text-moss-900 shadow-soft transition active:scale-95"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-3 py-1.5 shadow-soft"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-moss-900 text-cream-50">
              <SparkleIcon className="h-3.5 w-3.5" />
            </span>
            <span className="text-[13px] font-semibold tracking-tight text-moss-900">Bon Voyage</span>
          </Link>
        )}

        {title && (
          <h1 className="flex-1 truncate text-center text-[15px] font-semibold tracking-tight text-moss-900">
            {title}
          </h1>
        )}

        <div className="h-10 w-10" />
      </div>
    </header>
  );
}
