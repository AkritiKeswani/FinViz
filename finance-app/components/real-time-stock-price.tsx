"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

interface RealTimeStockPriceProps {
  symbol: string
}

export function RealTimeStockPrice({ symbol }: RealTimeStockPriceProps) {
  const [price, setPrice] = useState<number | null>(null)
  const [openPrice, setOpenPrice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`/api/stocks/realtime?symbol=${symbol}`)
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || `Failed to fetch stock data (${response.status})`)
        }

        if (data.results?.p) {
          setPrice(data.results.p)
          // If we have an open price from the API, use it
          if (data.results.o) {
            setOpenPrice(data.results.o)
          }
          setLastUpdateTime(new Date(data.results.t).toLocaleString())
          setError(null)
          setRetryCount(0)
        } else {
          throw new Error('Invalid data received from API')
        }
      } catch (err) {
        console.error("Error fetching stock data:", err)
        setError(err instanceof Error ? err.message : "Failed to load stock data")
        setRetryCount(prev => prev + 1)
      } finally {
        setIsLoading(false)
      }
    }

    if (retryCount < 3) {
      fetchPrice()
      const interval = setInterval(fetchPrice, 10000) // Poll every 10 seconds
      return () => clearInterval(interval)
    } else {
      setError("Unable to fetch price after multiple attempts")
    }
  }, [symbol, retryCount])

  const priceChange = price && openPrice ? price - openPrice : 0
  const percentChange = price && openPrice ? ((priceChange / openPrice) * 100).toFixed(2) : "0.00"
  const isPositive = priceChange >= 0

  if (isLoading && !price) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{symbol}</span>
            <span className="text-sm text-muted-foreground">Loading...</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse bg-muted h-8 w-24 rounded" />
        </CardContent>
      </Card>
    )
  }

  if (error && !price) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{symbol}</span>
            <span className="text-sm text-red-500">Error</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-500">{error}</p>
          <button 
            onClick={() => setRetryCount(0)} 
            className="mt-2 text-sm text-blue-500 hover:underline"
          >
            Retry
          </button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{symbol}</span>
          <span className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            {percentChange}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          ${price?.toFixed(2) || "N/A"}
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          {openPrice ? `Open: $${openPrice.toFixed(2)}` : ''}
          {lastUpdateTime ? <div>As of: {lastUpdateTime}</div> : null}
        </div>
      </CardContent>
    </Card>
  )
} 