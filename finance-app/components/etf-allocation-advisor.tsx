"use client"

import { useState, useEffect } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { HelpCircle, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label as UILabel } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// ETF allocation recommendations based on risk profile
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

// Recommended ETFs for each category
const recommendedEtfs = {
  "Bond ETFs": ["BND - Vanguard Total Bond", "AGG - iShares Core US Aggregate", "SCHZ - Schwab US Aggregate Bond"],
  "Large Cap ETFs": ["VOO - Vanguard S&P 500", "SPY - SPDR S&P 500", "IVV - iShares Core S&P 500"],
  "International ETFs": [
    "VXUS - Vanguard Total International",
    "IXUS - iShares Core MSCI Total International",
    "SPDW - SPDR Portfolio Developed World",
  ],
  "Small Cap ETFs": ["VB - Vanguard Small-Cap", "IJR - iShares Core S&P Small-Cap", "SCHA - Schwab U.S. Small-Cap"],
}

export function EtfAllocationAdvisor() {
  const [mounted, setMounted] = useState(false)
  const [riskProfile, setRiskProfile] = useState("moderate")
  const [investmentAmount, setInvestmentAmount] = useState(10000)
  const [timeHorizon, setTimeHorizon] = useState(15)
  const [selectedCategory, setSelectedCategory] = useState("")

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const currentAllocation = allocations[riskProfile as keyof typeof allocations]

  // Calculate dollar amounts for each allocation
  const dollarAllocations = currentAllocation.map((item) => ({
    ...item,
    dollars: Math.round(investmentAmount * (item.value / 100)),
  }))

  if (!mounted) {
    return null // Return nothing on the server side
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
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <UILabel>Risk Tolerance</UILabel>
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
                  <UILabel htmlFor="conservative">Conservative</UILabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <UILabel htmlFor="moderate">Moderate</UILabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aggressive" id="aggressive" />
                  <UILabel htmlFor="aggressive">Aggressive</UILabel>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <UILabel htmlFor="investment-amount">Investment Amount</UILabel>
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
                <UILabel htmlFor="time-horizon">Time Horizon (Years)</UILabel>
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

            <div className="p-4 border rounded-lg bg-muted/30">
              <h3 className="font-medium mb-2">Recommended Strategy</h3>
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

          {/* Right Column - Chart and Allocations */}
          <div className="space-y-6">
            <div className="h-[200px]">
              <ChartContainer
                config={Object.fromEntries(
                  currentAllocation.map((item) => [item.name, { label: item.name, color: item.color }])
                )}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, value }) => `${name} ${value}%`}
                      labelLine={true}
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

            <div className="grid grid-cols-2 gap-3">
              {dollarAllocations.map((item) => (
                <Card
                  key={item.name}
                  className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedCategory === item.name ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedCategory(item.name)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  <div className="text-lg font-bold">${item.dollars.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{item.value}% of portfolio</div>
                </Card>
              ))}
            </div>

            {selectedCategory && (
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Recommended {selectedCategory}</h3>
                <div className="space-y-2">
                  {recommendedEtfs[selectedCategory as keyof typeof recommendedEtfs].map((etf, index) => (
                    <div key={index} className="p-2 bg-muted/30 rounded-lg">
                      <div className="font-medium">{etf}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
