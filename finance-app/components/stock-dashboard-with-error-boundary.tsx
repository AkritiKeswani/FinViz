"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { StockDashboard } from "@/components/stock-dashboard"

export function StockDashboardWithErrorBoundary() {
  return (
    <ErrorBoundary componentName="Stock Dashboard">
      <StockDashboard />
    </ErrorBoundary>
  )
}
