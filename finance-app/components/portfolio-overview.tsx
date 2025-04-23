"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock portfolio data
const portfolioData = [
  { name: "AAPL", value: 35, color: "hsl(var(--chart-1))" },
  { name: "MSFT", value: 25, color: "hsl(var(--chart-2))" },
  { name: "AMZN", value: 15, color: "hsl(var(--chart-3))" },
  { name: "GOOGL", value: 10, color: "hsl(var(--chart-4))" },
  { name: "TSLA", value: 8, color: "hsl(var(--chart-5))" },
  { name: "Other", value: 7, color: "hsl(var(--chart-6))" },
]

const stockPerformance = [
  { name: "AAPL", price: 155.12, change: 2.34, percentChange: 1.53 },
  { name: "MSFT", price: 312.45, change: 5.67, percentChange: 1.85 },
  { name: "AMZN", price: 128.91, change: -1.23, percentChange: -0.94 },
  { name: "GOOGL", price: 134.56, change: 0.87, percentChange: 0.65 },
  { name: "TSLA", price: 245.78, change: -3.45, percentChange: -1.38 },
]

export function PortfolioOverview() {
  const totalValue = 25678.43
  const dayChange = 345.67
  const dayPercentChange = 1.37

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Portfolio Allocation</CardTitle>
          <CardDescription>Current distribution of your investments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={Object.fromEntries(
                portfolioData.map((item) => [item.name, { label: item.name, color: item.color }]),
              )}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle>Portfolio Value</CardTitle>
          <CardDescription>Total value and daily performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Total Value</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-bold">${totalValue.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {dayChange >= 0 ? (
                      <ArrowUp className="h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowDown className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-sm font-medium">Today's Change</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`text-3xl font-bold ${dayChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {dayChange >= 0 ? "+" : ""}
                    {dayChange.toLocaleString()} ({dayPercentChange}%)
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <h3 className="mb-4 text-lg font-medium">Top Holdings</h3>
            <div className="space-y-2">
              {stockPerformance.map((stock) => (
                <div key={stock.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                  <div>
                    <div className="font-medium">{stock.name}</div>
                    <div className="text-sm text-muted-foreground">${stock.price}</div>
                  </div>
                  <div className={`text-right ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                    <div>
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change}
                    </div>
                    <div className="text-sm">
                      {stock.change >= 0 ? "+" : ""}
                      {stock.percentChange}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
