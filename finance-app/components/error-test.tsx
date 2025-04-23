"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorBoundary } from "@/components/error-boundary"

// Component that will throw an error when the button is clicked
function BuggyCounter() {
  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    if (counter === 5) {
      // Simulate an error
      throw new Error("I crashed when counter reached 5!")
    }
    setCounter(counter + 1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Boundary Test</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Counter: {counter}</p>
        <p className="text-sm text-muted-foreground mt-2">This component will crash when the counter reaches 5.</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleClick}>Increment</Button>
      </CardFooter>
    </Card>
  )
}

export function ErrorTest() {
  return (
    <ErrorBoundary componentName="Error Test">
      <BuggyCounter />
    </ErrorBoundary>
  )
}
