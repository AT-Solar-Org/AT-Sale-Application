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
      title="Customer Not Found"
      message="Failed to load customer information. The customer may not exist or there was an error loading the data."
      showBackButton={true}
    />
  );
}
