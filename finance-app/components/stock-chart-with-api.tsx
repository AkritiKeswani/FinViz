"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { fetchStockData } from "@/lib/api"

type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y"

export function StockChartWithAPI({ symbol = "AAPL" }: { symbol?: string }) {
  const [timeRange, setTimeRange] = useState<TimeRange>("1M")
  const [stockData, setStockData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStockData() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchStockData(symbol)

        if (!data || !data.results) {
          throw new Error("Failed to fetch stock data")
        }

        // Process the data based on the selected time range
        const processedData = processDataForTimeRange(data.results, timeRange)
        setStockData(processedData)
      } catch (err) {
        console.error("Error loading stock data:", err)
        setError("Failed to load stock data. Using mock data instead.")

        // Fall back to mock data
        setStockData(getMockDataForTimeRange(timeRange))
      } finally {
        setIsLoading(false)
      }
    }

    loadStockData()
  }, [symbol, timeRange])

  // Process API data based on time range
  function processDataForTimeRange(results: any[], range: TimeRange) {
    // This would need to be implemented based on the actual API response format
    // For now, returning mock data
    return getMockDataForTimeRange(range)
  }

  // Mock data as fallback
  function getMockDataForTimeRange(range: TimeRange) {
    // Same mock data from the original component
    const mockData = {
      "1D": [
        { time: "9:30", price: 152.83 },
        { time: "10:30", price: 153.05 },
        { time: "11:30", price: 152.91 },
        { time: "12:30", price: 153.78 },
        { time: "13:30", price: 154.23 },
        { time: "14:30", price: 153.95 },
        { time: "15:30", price: 154.63 },
        { time: "16:00", price: 155.12 },
      ],
      "1W": [
        { time: "Mon", price: 151.23 },
        { time: "Tue", price: 152.45 },
        { time: "Wed", price: 153.67 },
        { time: "Thu", price: 152.89 },
        { time: "Fri", price: 155.12 },
      ],
      "1M": [
        { time: "Week 1", price: 148.32 },
        { time: "Week 2", price: 150.76 },
        { time: "Week 3", price: 152.45 },
        { time: "Week 4", price: 155.12 },
      ],
      "3M": [
        { time: "Jan", price: 142.56 },
        { time: "Feb", price: 147.89 },
        { time: "Mar", price: 155.12 },
      ],
      "1Y": [
        { time: "Q1", price: 135.78 },
        { time: "Q2", price: 142.34 },
        { time: "Q3", price: 148.92 },
        { time: "Q4", price: 155.12 },
      ],
    }

    return mockData[range]
  }

  // If we have no data, show a loading state
  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading stock data...</div>
      </div>
    )
  }

  const data = stockData
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="text-muted-foreground">No stock data available</div>
      </div>
    )
  }

  const percentChange = (((data[data.length - 1].price - data[0].price) / data[0].price) * 100).toFixed(2)
  const isPositive = Number(percentChange) >= 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">{symbol}</h3>
          <div className="flex items-center gap-2">
            <span className="text-xl">${data[data.length - 1].price}</span>
            <span className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? "+" : ""}
              {percentChange}%
            </span>
          </div>
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
        <div className="flex gap-1">
          <Button variant={timeRange === "1D" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("1D")}>
            1D
          </Button>
          <Button variant={timeRange === "1W" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("1W")}>
            1W
          </Button>
          <Button variant={timeRange === "1M" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("1M")}>
            1M
          </Button>
          <Button variant={timeRange === "3M" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("3M")}>
            3M
          </Button>
          <Button variant={timeRange === "1Y" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("1Y")}>
            1Y
          </Button>
        </div>
      </div>

      <div className="h-[300px]">
        <ChartContainer
          config={{
            price: {
              label: "Price",
              color: isPositive ? "hsl(var(--chart-1))" : "hsl(var(--destructive))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={isPositive ? "hsl(var(--chart-1))" : "hsl(var(--destructive))"}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={isPositive ? "hsl(var(--chart-1))" : "hsl(var(--destructive))"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tickMargin={10} />
              <YAxis
                domain={["dataMin - 1", "dataMax + 1"]}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "hsl(var(--chart-1))" : "hsl(var(--destructive))"}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Card className="p-3">
          <div className="text-xs text-muted-foreground">Open</div>
          <div className="text-sm font-medium">${data[0].price}</div>
        </Card>
        <Card className="p-3">
          <div className="text-xs text-muted-foreground">Close</div>
          <div className="text-sm font-medium">${data[data.length - 1].price}</div>
        </Card>
        <Card className="p-3">
          <div className="text-xs text-muted-foreground">High</div>
          <div className="text-sm font-medium">${Math.max(...data.map((item) => item.price)).toFixed(2)}</div>
        </Card>
        <Card className="p-3">
          <div className="text-xs text-muted-foreground">Low</div>
          <div className="text-sm font-medium">${Math.min(...data.map((item) => item.price)).toFixed(2)}</div>
        </Card>
      </div>
    </div>
  )
}
