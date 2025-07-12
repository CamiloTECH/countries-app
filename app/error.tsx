"use client";

import { Button } from "@/components/ui";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-md text-center p-8 bg-background rounded-lg">
        <h1 className="text-4xl font-bold mb-4">500 - Error</h1>
        <p className="mb-8">An error occurred, refresh the page</p>

        <Button onClick={reset}>Refresh</Button>
      </div>
    </div>
  );
}
