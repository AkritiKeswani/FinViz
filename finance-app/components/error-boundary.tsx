"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  componentName?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  resetErrorBoundary = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    const { hasError, error } = this.state
    const { children, fallback, componentName } = this.props

    if (hasError) {
      // You can render any custom fallback UI
      if (fallback) {
        return fallback
      }

      return (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              {componentName ? `Error in ${componentName}` : "Something went wrong"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">{error?.message || "An unexpected error occurred"}</div>
            {process.env.NODE_ENV === "development" && error && (
              <pre className="mt-2 max-h-40 overflow-auto rounded bg-muted p-2 text-xs">{error.stack}</pre>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" onClick={this.resetErrorBoundary} className="flex items-center gap-1">
              <RefreshCw className="h-3 w-3" />
              Try again
            </Button>
          </CardFooter>
        </Card>
      )
    }

    return children
  }
}
