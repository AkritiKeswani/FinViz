"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStockPrice } from "@/lib/polygon"

// Major market indices
const INDICES = [
  { symbol: "SPY", name: "S&P 500" },
  { symbol: "QQQ", name: "NASDAQ" },
  { symbol: "DIA", name: "Dow Jones" },
  { symbol: "IWM", name: "Russell 2000" },
]

// Mock previous day prices
const MOCK_PREVIOUS_PRICES: Record<string, number> = {
  SPY: 458.23,
  QQQ: 387.56,
  DIA: 377.89,
  IWM: 201.45,
}

export function MarketOverview() {
  const [indexData, setIndexData] = useState<Record<string, { price: number; change: number }>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMarketData() {
      setLoading(true)

      try {
        // Fetch current prices for all indices
        const results: Record<string, { price: number; change: number }> = {}

        for (const index of INDICES) {
          const price = await getStockPrice(index.symbol)

          if (price !== null) {
            const prevPrice = MOCK_PREVIOUS_PRICES[index.symbol] || price
            const change = ((price - prevPrice) / prevPrice) * 100

            results[index.symbol] = {
              price,
              change,
            }
          }
        }

        setIndexData(results)
      } catch (error) {
        console.error("Error fetching market data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()

    // Refresh every 5 minutes
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-pulse text-muted-foreground">Loading market data...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INDICES.map((index) => {
              const data = indexData[index.symbol]

              if (!data) {
                return (
                  <Card key={index.symbol} className="p-3">
                    <div className="font-medium">{index.name}</div>
                    <div className="text-muted-foreground">Data unavailable</div>
                  </Card>
                )
              }

              const isPositive = data.change >= 0

              return (
                <Card key={index.symbol} className="p-3">
                  <div className="font-medium">{index.name}</div>
                  <div className="text-xl">${data.price.toFixed(2)}</div>
                  <div className={`flex items-center text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
                    {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                    <span>
                      {isPositive ? "+" : ""}
                      {data.change.toFixed(2)}%
                    </span>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
