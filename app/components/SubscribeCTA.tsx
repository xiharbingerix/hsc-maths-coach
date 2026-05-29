"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackSubscribeClicked } from "../../lib/analytics";

export function SubscribeCTA({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex max-w-full shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold leading-none text-white shadow-sm transition hover:bg-slate-800 ${className}`}
      onClick={() => trackSubscribeClicked()}
    >
      {children}
    </Link>
  );
}
