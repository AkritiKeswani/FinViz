"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { FinancialEducationHub } from "@/components/financial-education-hub"

export function FinancialEducationWithErrorBoundary() {
  return (
    <ErrorBoundary componentName="Financial Education Hub">
      <FinancialEducationHub />
    </ErrorBoundary>
  )
}
