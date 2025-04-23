"use client"

import { useState, useEffect } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ArrowRight, HelpCircle, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { fetchETFData } from "@/lib/api"

// This would be replaced with API data in a real implementation
const allocations = {
  conservative: [
    { name: "Bond ETFs", value: 60, color: "hsl(var(--chart-1))" },
    { name: "Large Cap ETFs", value: 25, color: "hsl(var(--chart-2))" },
    { name: "International ETFs", value: 10, color: "hsl(var(--chart-3))" },
    { name: "Small Cap ETFs", value: 5, color: "hsl(var(--chart-4))" },
  ],
  moderate: [
    { name: "Bond ETFs", value: 40, color: "hsl(var(--chart-1))" },
    { name: "Large Cap ETFs", value: 30, color: "hsl(var(--chart-2))" },
    { name: "International ETFs", value: 20, color: "hsl(var(--chart-3))" },
    { name: "Small Cap ETFs", value: 10, color: "hsl(var(--chart-4))" },
  ],
  aggressive: [
    { name: "Bond ETFs", value: 15, color: "hsl(var(--chart-1))" },
    { name: "Large Cap ETFs", value: 40, color: "hsl(var(--chart-2))" },
    { name: "International ETFs", value: 25, color: "hsl(var(--chart-3))" },
    { name: "Small Cap ETFs", value: 20, color: "hsl(var(--chart-4))" },
  ],
}

// ETF tickers that would be fetched from the API
const etfTickers = {
  "Bond ETFs": ["BND", "AGG", "SCHZ"],
  "Large Cap ETFs": ["VOO", "SPY", "IVV"],
  "International ETFs": ["VXUS", "IXUS", "SPDW"],
  "Small Cap ETFs": ["VB", "IJR", "SCHA"],
}

export function EtfAllocationWithAPI() {
  const [riskProfile, setRiskProfile] = useState("moderate")
  const [investmentAmount, setInvestmentAmount] = useState(10000)
  const [timeHorizon, setTimeHorizon] = useState(15)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [etfDetails, setEtfDetails] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)

  const currentAllocation = allocations[riskProfile as keyof typeof allocations]

  // Calculate dollar amounts for each allocation
  const dollarAllocations = currentAllocation.map((item) => ({
    ...item,
    dollars: Math.round(investmentAmount * (item.value / 100)),
  }))

  // Fetch ETF details when a category is selected
  useEffect(() => {
    if (!selectedCategory || !etfTickers[selectedCategory as keyof typeof etfTickers]) {
      return
    }

    async function fetchSelectedETFs() {
      setIsLoading(true)

      try {
        const tickers = etfTickers[selectedCategory as keyof typeof etfTickers]
        const promises = tickers.map((ticker) => fetchETFData(ticker))
        const results = await Promise.all(promises)

        // Create a map of ticker to ETF details
        const etfMap: Record<string, any> = {}
        results.forEach((result, index) => {
          if (result && result.results) {
            const ticker = tickers[index]
            etfMap[ticker] = result.results
          }
        })

        setEtfDetails(etfMap)
      } catch (error) {
        console.error("Error fetching ETF details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSelectedETFs()
  }, [selectedCategory])

  // Format ETF data for display
  const getFormattedEtfList = () => {
    if (!selectedCategory || !etfTickers[selectedCategory as keyof typeof etfTickers]) {
      return []
    }

    const tickers = etfTickers[selectedCategory as keyof typeof etfTickers]

    // If we have API data, use it; otherwise fall back to mock data
    return tickers.map((ticker) => {
      const details = etfDetails[ticker]

      if (details) {
        return `${ticker} - ${details.name || "Loading..."}`
      }

      // Mock data fallback
      const mockNames: Record<string, string> = {
        BND: "Vanguard Total Bond",
        AGG: "iShares Core US Aggregate",
        SCHZ: "Schwab US Aggregate Bond",
        VOO: "Vanguard S&P 500",
        SPY: "SPDR S&P 500",
        IVV: "iShares Core S&P 500",
        VXUS: "Vanguard Total International",
        IXUS: "iShares Core MSCI Total International",
        SPDW: "SPDR Portfolio Developed World",
        VB: "Vanguard Small-Cap",
        IJR: "iShares Core S&P Small-Cap",
        SCHA: "Schwab U.S. Small-Cap",
      }

      return `${ticker} - ${mockNames[ticker] || ticker}`
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          ETF Investment Advisor
        </CardTitle>
        <CardDescription>Optimize your ETF allocation based on your risk profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rest of the component remains the same */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Risk Tolerance</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Your risk tolerance determines how your investments are allocated between more stable assets
                        (bonds) and potentially higher-return but more volatile assets (stocks).
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <RadioGroup value={riskProfile} onValueChange={setRiskProfile} className="flex space-x-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="conservative" id="conservative" />
                  <Label htmlFor="conservative">Conservative</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Moderate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aggressive" id="aggressive" />
                  <Label htmlFor="aggressive">Aggressive</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="investment-amount">Investment Amount</Label>
                <span className="text-sm font-medium">${investmentAmount.toLocaleString()}</span>
              </div>
              <Slider
                id="investment-amount"
                value={[investmentAmount]}
                onValueChange={(value) => setInvestmentAmount(value[0])}
                min={1000}
                max={100000}
                step={1000}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="time-horizon">Time Horizon (Years)</Label>
                <span className="text-sm font-medium">{timeHorizon} years</span>
              </div>
              <Slider
                id="time-horizon"
                value={[timeHorizon]}
                onValueChange={(value) => setTimeHorizon(value[0])}
                min={1}
                max={40}
                step={1}
              />
            </div>

            <div className="p-4 border rounded-lg bg-muted/30 space-y-2">
              <h3 className="font-medium">Recommended Strategy</h3>
              <p className="text-sm text-muted-foreground">
                {riskProfile === "conservative" &&
                  "This conservative allocation focuses on stability with a higher percentage in bonds, suitable for shorter time horizons or lower risk tolerance."}
                {riskProfile === "moderate" &&
                  "This balanced allocation provides a mix of growth and stability, suitable for medium-term goals and moderate risk tolerance."}
                {riskProfile === "aggressive" &&
                  "This growth-focused allocation has higher stock exposure for potentially higher returns, best for longer time horizons and higher risk tolerance."}
              </p>
            </div>
          </div>

          <div>
            <div className="mb-2 font-medium">Recommended Allocation</div>
            <div className="h-[250px]">
              <ChartContainer
                config={
                  currentAllocation
                    ? Object.fromEntries(
                        currentAllocation.map((item) => [item.name, { label: item.name, color: item.color }]),
                      )
                    : {}
                }
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                      onClick={(data) => setSelectedCategory(data.name)}
                    >
                      {currentAllocation.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke={selectedCategory === entry.name ? "#000" : "none"}
                          strokeWidth={selectedCategory === entry.name ? 2 : 0}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {dollarAllocations.map((item) => (
                <div
                  key={item.name}
                  className={`p-2 border rounded-lg cursor-pointer ${selectedCategory === item.name ? "border-primary bg-primary/5" : ""}`}
                  onClick={() => setSelectedCategory(item.name)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <div className="text-sm font-medium">{item.name}</div>
                  </div>
                  <div className="mt-1">
                    <div className="text-lg font-bold">${item.dollars.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{item.value}% of portfolio</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedCategory && (
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Recommended {selectedCategory}</h3>
            {isLoading ? (
              <div className="py-4 text-center text-muted-foreground">Loading ETF data...</div>
            ) : (
              <div className="space-y-2">
                {getFormattedEtfList().map((etf, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                    <div className="font-medium">{etf}</div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full">Get Personalized Recommendations</Button>
      </CardFooter>
    </Card>
  )
}
