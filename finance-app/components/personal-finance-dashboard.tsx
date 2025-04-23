"use client"

import { useState } from "react"
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ArrowRight, CreditCard, DollarSign, GraduationCap, HelpCircle, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock financial data
const debtData = [
  { name: "Federal Student Loans", value: 25000, interestRate: 4.5, color: "hsl(var(--chart-1))" },
  { name: "Private Student Loans", value: 15000, interestRate: 6.8, color: "hsl(var(--chart-2))" },
  { name: "Credit Card 1", value: 4500, interestRate: 18.99, color: "hsl(var(--chart-3))" },
  { name: "Credit Card 2", value: 2800, interestRate: 22.49, color: "hsl(var(--chart-4))" },
  { name: "Car Loan", value: 12000, interestRate: 5.25, color: "hsl(var(--chart-5))" },
]

const monthlyExpenses = [
  { category: "Housing", amount: 1500 },
  { category: "Transportation", amount: 400 },
  { category: "Food", amount: 600 },
  { category: "Utilities", amount: 300 },
  { category: "Debt Payments", amount: 800 },
  { category: "Entertainment", amount: 200 },
  { category: "Other", amount: 300 },
]

const netWorthHistory = [
  { month: "Jan", assets: 65000, debts: 59300, netWorth: 5700 },
  { month: "Feb", assets: 66000, debts: 59000, netWorth: 7000 },
  { month: "Mar", assets: 66500, debts: 58700, netWorth: 7800 },
  { month: "Apr", assets: 67200, debts: 58400, netWorth: 8800 },
  { month: "May", assets: 68000, debts: 58000, netWorth: 10000 },
  { month: "Jun", assets: 69500, debts: 57500, netWorth: 12000 },
]

// Refinancing options
const refinancingOptions = {
  "Federal Student Loans": [
    { lender: "Federal Direct Consolidation", rate: "4.25%", term: "10 years", monthlySavings: "$12" },
    { lender: "Income-Driven Repayment", rate: "4.5%", term: "20-25 years", monthlySavings: "$85" },
  ],
  "Private Student Loans": [
    { lender: "SoFi", rate: "4.99%", term: "10 years", monthlySavings: "$45" },
    { lender: "Earnest", rate: "5.25%", term: "15 years", monthlySavings: "$28" },
    { lender: "Laurel Road", rate: "5.15%", term: "10 years", monthlySavings: "$42" },
  ],
  "Credit Card 1": [
    { lender: "Chase Slate Edge", rate: "0% intro for 18 months", term: "18 months", monthlySavings: "$68" },
    { lender: "Citi Simplicity", rate: "0% intro for 21 months", term: "21 months", monthlySavings: "$71" },
  ],
  "Credit Card 2": [
    {
      lender: "Discover it Balance Transfer",
      rate: "0% intro for 18 months",
      term: "18 months",
      monthlySavings: "$52",
    },
    { lender: "Wells Fargo Reflect", rate: "0% intro for 21 months", term: "21 months", monthlySavings: "$54" },
  ],
  "Car Loan": [
    { lender: "Capital One Auto Refinance", rate: "3.99%", term: "60 months", monthlySavings: "$35" },
    { lender: "LightStream Auto Refinance", rate: "4.25%", term: "48 months", monthlySavings: "$28" },
  ],
}

export function PersonalFinanceDashboard() {
  const [selectedDebt, setSelectedDebt] = useState("")
  const [activeTab, setActiveTab] = useState("refinance")

  // Ensure debtData is valid
  const safeDebtData = Array.isArray(debtData) ? debtData : []

  // Calculate total debt with safety check
  const totalDebt = safeDebtData.reduce((sum, item) => sum + (item?.value || 0), 0)

  // Calculate total monthly expenses with safety check
  const totalMonthlyExpenses = Array.isArray(monthlyExpenses)
    ? monthlyExpenses.reduce((sum, item) => sum + (item?.amount || 0), 0)
    : 0

  // Calculate weighted average interest rate with safety check
  const weightedAvgInterestRate =
    totalDebt > 0
      ? safeDebtData.reduce((sum, item) => sum + (item?.value || 0) * (item?.interestRate || 0), 0) / totalDebt
      : 0

  // Sort debts by interest rate (highest first) for debt avalanche strategy
  const debtAvalanche = [...safeDebtData].sort((a, b) => (b?.interestRate || 0) - (a?.interestRate || 0))

  // Sort debts by value (lowest first) for debt snowball strategy
  const debtSnowball = [...safeDebtData].sort((a, b) => (a?.value || 0) - (b?.value || 0))

  // Safe access to refinancing options
  const getRefOptions = (debtName: string) => {
    if (!debtName) return []
    return refinancingOptions[debtName as keyof typeof refinancingOptions] || []
  }

  // Create safe chart configs
  const createChartConfig = () => {
    if (!Array.isArray(safeDebtData) || safeDebtData.length === 0) {
      return { defaultColor: { label: "No Data", color: "hsl(var(--muted))" } }
    }

    const config: Record<string, { label: string; color: string }> = {}
    safeDebtData.forEach((item) => {
      if (item && item.name) {
        config[item.name] = {
          label: item.name,
          color: item.color || "hsl(var(--muted))",
        }
      }
    })
    return config
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Personal Finance Dashboard
        </CardTitle>
        <CardDescription>Track your debts, expenses, and financial progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Total Debt</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Sum of all your current debts</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold">${totalDebt.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Avg. Interest Rate</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Weighted average interest rate across all debts</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold">{weightedAvgInterestRate.toFixed(2)}%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Monthly Expenses</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your total monthly expenses</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold">${totalMonthlyExpenses.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-medium mb-4">Debt Breakdown</h3>
            <div className="h-[250px]">
              {safeDebtData.length > 0 ? (
                <ChartContainer config={createChartConfig()}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={safeDebtData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                        onClick={(data) => data?.name && setSelectedDebt(data.name)}
                      >
                        {safeDebtData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry?.color || "hsl(var(--muted))"}
                            stroke={selectedDebt === entry?.name ? "#000" : "none"}
                            strokeWidth={selectedDebt === entry?.name ? 2 : 0}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No debt data available
                </div>
              )}
            </div>

            <div className="mt-4 space-y-3">
              {safeDebtData.map((debt) => (
                <div
                  key={debt?.name || `debt-${Math.random()}`}
                  className={`p-3 border rounded-lg cursor-pointer ${
                    selectedDebt === debt?.name ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => debt?.name && setSelectedDebt(debt.name)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: debt?.color || "hsl(var(--muted))" }}
                      />
                      <div className="font-medium">{debt?.name || "Unknown"}</div>
                    </div>
                    <div className="text-sm font-medium">${(debt?.value || 0).toLocaleString()}</div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Interest Rate: {debt?.interestRate || 0}%</span>
                      <span>{totalDebt > 0 ? (((debt?.value || 0) / totalDebt) * 100).toFixed(1) : "0"}% of total</span>
                    </div>
                    <Progress value={totalDebt > 0 ? ((debt?.value || 0) / totalDebt) * 100 : 0} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Net Worth Trend</h3>
            <div className="h-[250px]">
              {Array.isArray(netWorthHistory) && netWorthHistory.length > 0 ? (
                <ChartContainer
                  config={{
                    assets: {
                      label: "Assets",
                      color: "hsl(var(--chart-1))",
                    },
                    debts: {
                      label: "Debts",
                      color: "hsl(var(--destructive))",
                    },
                    netWorth: {
                      label: "Net Worth",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={netWorthHistory}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="assets" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={true} />
                      <Line
                        type="monotone"
                        dataKey="debts"
                        stroke="hsl(var(--destructive))"
                        strokeWidth={2}
                        dot={true}
                      />
                      <Line
                        type="monotone"
                        dataKey="netWorth"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={3}
                        dot={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No net worth data available
                </div>
              )}
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Monthly Expenses</h3>
              <div className="h-[200px]">
                {Array.isArray(monthlyExpenses) && monthlyExpenses.length > 0 ? (
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyExpenses}>
                        <XAxis dataKey="category" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="amount" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    No expense data available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="refinance">Refinancing Options</TabsTrigger>
              <TabsTrigger value="avalanche">Debt Avalanche</TabsTrigger>
              <TabsTrigger value="snowball">Debt Snowball</TabsTrigger>
            </TabsList>

            <TabsContent value="refinance" className="p-4 border rounded-lg mt-4">
              {selectedDebt && getRefOptions(selectedDebt).length > 0 ? (
                <div className="space-y-4">
                  <h3 className="font-medium">Refinancing Options for {selectedDebt}</h3>
                  <div className="space-y-2">
                    {getRefOptions(selectedDebt).map((option, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <div className="font-medium">{option?.lender || "Unknown"}</div>
                          <div className="text-sm text-muted-foreground">
                            {option?.rate || "N/A"} for {option?.term || "N/A"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">Save {option?.monthlySavings || "$0"}/month</div>
                          <Button variant="ghost" size="sm" className="mt-1">
                            Apply <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  {selectedDebt ? "No refinancing options available" : "Select a debt to see refinancing options"}
                </div>
              )}
            </TabsContent>

            <TabsContent value="avalanche" className="p-4 border rounded-lg mt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Debt Avalanche Strategy</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Pay minimum payments on all debts, then put extra money toward the debt with the highest
                          interest rate. This saves the most money in interest over time.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="space-y-2">
                  {debtAvalanche.map((debt, index) => (
                    <div key={debt?.name || `avalanche-${index}`} className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div className="font-medium">{debt?.name || "Unknown"}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">${(debt?.value || 0).toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">{debt?.interestRate || 0}% interest</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="snowball" className="p-4 border rounded-lg mt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Debt Snowball Strategy</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Pay minimum payments on all debts, then put extra money toward the debt with the smallest
                          balance. This gives psychological wins as you eliminate debts quickly.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="space-y-2">
                  {debtSnowball.map((debt, index) => (
                    <div key={debt?.name || `snowball-${index}`} className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div className="font-medium">{debt?.name || "Unknown"}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">${(debt?.value || 0).toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">{debt?.interestRate || 0}% interest</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Update Financial Information</Button>
      </CardFooter>
    </Card>
  )
}
