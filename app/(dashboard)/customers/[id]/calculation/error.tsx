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
      title="Calculation Error"
      message="Failed to load calculation data. Please try again."
      showBackButton={true}
    />
  );
}
