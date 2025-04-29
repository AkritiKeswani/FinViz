"use client"

import { ErrorBoundary } from "react-error-boundary"
import { RefinanceOptions } from "@/components/refinance-options"
import { Card, CardContent } from "@/components/ui/card"

function ErrorFallback({ error }: { error: Error }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Error Loading Refinance Options</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {error.message}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function RefinanceOptionsWithErrorBoundary() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RefinanceOptions />
    </ErrorBoundary>
  )
} 