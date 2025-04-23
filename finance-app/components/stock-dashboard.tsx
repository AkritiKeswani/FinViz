"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ArrowDown, ArrowUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStockHistory, getCompanyInfo } from "@/lib/polygon"
import { LiveStockPrice } from "@/components/live-stock-price"

type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y"

export function StockDashboard() {
  const [symbol, setSymbol] = useState("AAPL")
  const [timeRange, setTimeRange] = useState<TimeRange>("1M")
  const [stockData, setStockData] = useState<any[]>([])
  const [companyInfo, setCompanyInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [popularStocks] = useState(["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"])

  // Fetch stock history data
  useEffect(() => {
    async function fetchStockData() {
      setIsLoading(true)
      setError(null)

      try {
        const historyData = await getStockHistory(symbol)

        // Check if historyData is valid
        if (Array.isArray(historyData) && historyData.length > 0) {
          // Process the data based on the selected time range
          const processedData = processDataForTimeRange(historyData, timeRange)
          setStockData(processedData)
        } else {
          console.log("Using mock data due to empty API response")
          // Fall back to mock data
          setStockData(getMockDataForTimeRange(timeRange))
        }
      } catch (err) {
        console.error("Error loading stock data:", err)
        setError("Failed to load stock data. Using mock data instead.")

        // Fall back to mock data
        setStockData(getMockDataForTimeRange(timeRange))
      } finally {
        setIsLoading(false)
      }
    }

    fetchStockData()
  }, [symbol, timeRange])

  // Fetch company information
  useEffect(() => {
    async function fetchCompanyInfo() {
      try {
        const info = await getCompanyInfo(symbol)
        setCompanyInfo(info || null) // Ensure null if info is undefined
      } catch (error) {
        console.error("Error fetching company info:", error)
        setCompanyInfo(null)
      }
    }

    fetchCompanyInfo()
  }, [symbol])

  // Process API data based on time range
  function processDataForTimeRange(results: any[], range: TimeRange) {
    if (!results || !Array.isArray(results) || results.length === 0) {
      return getMockDataForTimeRange(range)
    }

    try {
      // Convert the Polygon data format to our chart format
      const chartData = results.map((item) => ({
        time: new Date(item.t || Date.now()).toLocaleDateString(),
        price: item.c || 0, // closing price with fallback
      }))

      // Filter or aggregate based on time range
      if (range === "1D") {
        return chartData.slice(-1)
      } else if (range === "1W") {
        return chartData.slice(-7)
      } else if (range === "1M") {
        return chartData.slice(-30)
      } else if (range === "3M") {
        return chartData.slice(-90)
      } else {
        return chartData
      }
    } catch (error) {
      console.error("Error processing data:", error)
      return getMockDataForTimeRange(range)
    }
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

    return mockData[range] || []
  }

  // If we have no data, show a loading state
  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading stock data...</div>
      </div>
    )
  }

  const data = stockData || []
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="text-muted-foreground">No stock data available</div>
      </div>
    )
  }

  // Calculate percent change with null checks
  const firstPrice = data[0]?.price || 0
  const lastPrice = data[data.length - 1]?.price || 0
  const percentChange = firstPrice > 0 ? (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2) : "0.00"
  const isPositive = Number(percentChange) >= 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{symbol}</h2>
          {companyInfo && <p className="text-muted-foreground">{companyInfo.name || "Unknown Company"}</p>}
        </div>

        <div className="flex flex-wrap gap-2">
          {popularStocks.map((stock) => (
            <Button
              key={stock}
              variant={stock === symbol ? "default" : "outline"}
              size="sm"
              onClick={() => setSymbol(stock)}
            >
              {stock}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Price Chart</CardTitle>
              <div className="flex gap-1">
                <Button
                  variant={timeRange === "1D" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange("1D")}
                >
                  1D
                </Button>
                <Button
                  variant={timeRange === "1W" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange("1W")}
                >
                  1W
                </Button>
                <Button
                  variant={timeRange === "1M" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange("1M")}
                >
                  1M
                </Button>
                <Button
                  variant={timeRange === "3M" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange("3M")}
                >
                  3M
                </Button>
                <Button
                  variant={timeRange === "1Y" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange("1Y")}
                >
                  1Y
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
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
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={isPositive ? "hsl(var(--chart-1))" : "hsl(var(--destructive))"}
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mt-4">
              <Card className="p-3">
                <div className="text-xs text-muted-foreground">Open</div>
                <div className="text-sm font-medium">${data[0]?.price.toFixed(2) || "N/A"}</div>
              </Card>
              <Card className="p-3">
                <div className="text-xs text-muted-foreground">Close</div>
                <div className="text-sm font-medium">${data[data.length - 1]?.price.toFixed(2) || "N/A"}</div>
              </Card>
              <Card className="p-3">
                <div className="text-xs text-muted-foreground">High</div>
                <div className="text-sm font-medium">
                  ${Math.max(...data.map((item) => item?.price || 0)).toFixed(2)}
                </div>
              </Card>
              <Card className="p-3">
                <div className="text-xs text-muted-foreground">Low</div>
                <div className="text-sm font-medium">
                  ${Math.min(...data.map((item) => item?.price || Number.POSITIVE_INFINITY)).toFixed(2)}
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <LiveStockPrice symbol={symbol} />

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Change</div>
                <div className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
                  {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  <span className="font-medium">{percentChange}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {companyInfo && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Company Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <div className="text-sm text-muted-foreground">Industry</div>
                  <div className="font-medium">{companyInfo.sic_description || "N/A"}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                  <div className="font-medium">
                    {companyInfo.market_cap ? `$${(companyInfo.market_cap / 1000000000).toFixed(2)}B` : "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Exchange</div>
                  <div className="font-medium">{companyInfo.primary_exchange || "N/A"}</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
