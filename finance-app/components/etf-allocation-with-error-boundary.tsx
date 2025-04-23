"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { EtfAllocationAdvisor } from "@/components/etf-allocation-advisor"

export function EtfAllocationWithErrorBoundary() {
  return (
    <ErrorBoundary componentName="ETF Allocation Advisor">
      <EtfAllocationAdvisor />
    </ErrorBoundary>
  )
}
