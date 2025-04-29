"use client"

import { ErrorBoundary } from "react-error-boundary"
import { EtfRecommendations } from "./etf-recommendations"

export function EtfRecommendationsWithErrorBoundary() {
  return (
    <ErrorBoundary fallback={<div>Error loading ETF recommendations</div>}>
      <EtfRecommendations />
    </ErrorBoundary>
  )
} 