"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { PersonalFinanceDashboard } from "@/components/personal-finance-dashboard"

export function PersonalFinanceWithErrorBoundary() {
  return (
    <ErrorBoundary componentName="Personal Finance Dashboard">
      <PersonalFinanceDashboard />
    </ErrorBoundary>
  )
}
