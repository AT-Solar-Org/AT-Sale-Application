"use client";

import { ErrorDisplay } from "@/app/_components/ErrorDisplay";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorDisplay
      error={error}
      reset={reset}
      title="Maintenance Error"
      message="Failed to load maintenance schedule. Please try again."
    />
  );
}
