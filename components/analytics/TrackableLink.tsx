"use client";

import type { ComponentProps } from "react";
import { trackEvent, type AnalyticsDimensions, type AnalyticsEventName } from "@/lib/analytics/events";

export function TrackableLink({ eventName, dimensions, onClick, ...props }: ComponentProps<"a"> & { eventName: AnalyticsEventName; dimensions?: AnalyticsDimensions }) {
  return <a {...props} onClick={(event) => { trackEvent(eventName, dimensions); onClick?.(event); }} />;
}
