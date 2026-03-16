"use client";

import { useEffect, useMemo, useState } from "react";

type DurationProps = {
  from: string; // ISO date string e.g. "2024-08-01"
  to?: string; // ISO date string; omit for "now"
  fallback?: string;
  className?: string;
  updateIntervalMs?: number;
};

function formatYearsMonthsFromTotalMonths(totalMonths: number) {
  const safeMonths = Math.max(0, totalMonths);
  const years = Math.floor(safeMonths / 12);
  const months = safeMonths % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (months > 0 || parts.length === 0) parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
}

function diffMonthsCeilPartial(from: Date, to: Date) {
  // Computes month difference and counts any partial month as a full month.
  // This matches common “X yrs Y mos” display expectations.
  const fromY = from.getFullYear();
  const fromM = from.getMonth();
  const fromD = from.getDate();
  const toY = to.getFullYear();
  const toM = to.getMonth();
  const toD = to.getDate();

  let baseMonths = (toY - fromY) * 12 + (toM - fromM);

  // “Floor” full months first.
  if (toD < fromD) baseMonths -= 1;

  // If not exactly on the same day-of-month, count the ongoing partial month.
  const hasPartial = toD !== fromD;
  if (hasPartial) baseMonths += 1;

  return baseMonths;
}

export function Duration({
  from,
  to,
  fallback = "",
  className,
  updateIntervalMs = 1000 * 60 * 60 * 24, // daily
}: DurationProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), updateIntervalMs);
    return () => window.clearInterval(id);
  }, [updateIntervalMs]);

  const text = useMemo(() => {
    if (!now) return fallback;

    const fromDate = new Date(from);
    const toDate = to ? new Date(to) : now;

    if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) return fallback;

    const months = diffMonthsCeilPartial(fromDate, toDate);
    return formatYearsMonthsFromTotalMonths(months);
  }, [fallback, from, now, to]);

  return (
    <span className={className} suppressHydrationWarning>
      {text}
    </span>
  );
}
