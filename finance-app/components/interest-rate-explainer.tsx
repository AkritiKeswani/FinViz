"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Calculator, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function InterestRateExplainer() {
  const [principal, setPrincipal] = useState(10000)
  const [interestRate, setInterestRate] = useState(5)
  const [years, setYears] = useState(10)

  // Calculate compound interest over time
  const compoundData = Array.from({ length: years + 1 }, (_, i) => {
    const amount = principal * Math.pow(1 + interestRate / 100, i)
    return {
      year: i,
      amount: Number.parseFloat(amount.toFixed(2)),
    }
  })

  // Calculate simple interest over time
  const simpleData = Array.from({ length: years + 1 }, (_, i) => {
    const amount = principal * (1 + (interestRate / 100) * i)
    return {
      year: i,
      amount: Number.parseFloat(amount.toFixed(2)),
    }
  })

  const finalCompoundAmount = compoundData[years].amount
  const totalInterestEarned = finalCompoundAmount - principal

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="col-span-full md:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Understanding Interest Rates
          </CardTitle>
          <CardDescription>How interest rates affect your money over time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">What are Interest Rates?</h3>
            <p className="text-muted-foreground">
              Interest rates represent the cost of borrowing money or the return on investment for lending money.
              They're expressed as a percentage of the principal amount.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Types of Interest</h3>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium">Simple Interest</h4>
                <p className="text-sm text-muted-foreground">
                  Calculated only on the initial principal. Formula: P × r × t (where P = principal, r = rate, t = time)
                </p>
              </div>
              <div className="p-3 border rounded-lg bg-muted/50">
                <h4 className="font-medium">Compound Interest</h4>
                <p className="text-sm text-muted-foreground">
                  Calculated on the initial principal and the accumulated interest. Formula: P(1 + r)^t
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">How Interest Rates Affect:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                  1
                </span>
                <span>
                  <strong>Savings:</strong> Higher rates mean your savings grow faster
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                  2
                </span>
                <span>
                  <strong>Loans:</strong> Higher rates mean you pay more for borrowing
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                  3
                </span>
                <span>
                  <strong>Investments:</strong> Can affect stock market and bond prices
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                  4
                </span>
                <span>
                  <strong>Economy:</strong> Central banks use rates to control inflation and economic growth
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Interest Calculator
          </CardTitle>
          <CardDescription>See how your money grows over time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="principal">Initial Investment</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">$</span>
                <Input
                  id="principal"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  min={1000}
                  max={1000000}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                <span className="text-sm font-medium">{interestRate}%</span>
              </div>
              <Slider
                id="interest-rate"
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
                min={0.1}
                max={20}
                step={0.1}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="years">Time Period (Years)</Label>
                <span className="text-sm font-medium">{years} years</span>
              </div>
              <Slider
                id="years"
                value={[years]}
                onValueChange={(value) => setYears(value[0])}
                min={1}
                max={30}
                step={1}
              />
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-muted-foreground">Final Amount</div>
                <div className="text-2xl font-bold">${finalCompoundAmount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Interest</div>
                <div className="text-2xl font-bold">${totalInterestEarned.toLocaleString()}</div>
              </div>
            </div>

            <Tabs defaultValue="compound">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="compound">Compound Interest</TabsTrigger>
                <TabsTrigger value="simple">Simple Interest</TabsTrigger>
              </TabsList>
              <TabsContent value="compound" className="h-[200px] mt-4">
                <ChartContainer
                  config={{
                    amount: {
                      label: "Amount",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={compoundData}>
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tickMargin={10} />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickMargin={10}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="amount" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
              <TabsContent value="simple" className="h-[200px] mt-4">
                <ChartContainer
                  config={{
                    amount: {
                      label: "Amount",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={simpleData}>
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tickMargin={10} />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickMargin={10}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="amount" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
            </Tabs>
          </div>

          <Button className="w-full">Calculate More Scenarios</Button>
        </CardContent>
      </Card>
    </div>
  )
}
