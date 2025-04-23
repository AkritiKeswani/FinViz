"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorBoundary } from "@/components/error-boundary"

// Component that simulates an API error
function ApiErrorSimulator() {
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const simulateApiCall = () => {
    setLoading(true)

    // Simulate an API call that takes 1 second
    setTimeout(() => {
      setLoading(false)
      // Throw an error
      throw new Error("Failed to fetch data from API")
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Error Simulator</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Click the button to simulate an API error that will be caught by the error boundary.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={simulateApiCall} disabled={loading}>
          {loading ? "Loading..." : "Simulate API Error"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export function ApiErrorSimulatorWithBoundary() {
  return (
    <ErrorBoundary componentName="API Error Simulator">
      <ApiErrorSimulator />
    </ErrorBoundary>
  )
}
