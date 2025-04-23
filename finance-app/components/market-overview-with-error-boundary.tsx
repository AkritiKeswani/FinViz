"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { MarketOverview } from "@/components/market-overview"

export function MarketOverviewWithErrorBoundary() {
  return (
    <ErrorBoundary componentName="Market Overview">
      <MarketOverview />
    </ErrorBoundary>
  )
}
