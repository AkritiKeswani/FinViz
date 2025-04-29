"use client"

import { ErrorBoundary } from "react-error-boundary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface DebtCategory {
  type: string
  amount: number
  interestRate: number
  color: string
}

const INITIAL_DEBT_DATA: DebtCategory[] = [
  {
    type: "Credit Card",
    amount: 0,
    interestRate: 19.99,
    color: "bg-red-500"
  },
  {
    type: "Student Loans",
    amount: 26000,
    interestRate: 12,
    color: "bg-blue-500"
  },
  {
    type: "Car Loan",
    amount: 0,
    interestRate: 4.5,
    color: "bg-green-500"
  }
]

function DebtOverview() {
  const [debts, setDebts] = useState<DebtCategory[]>(INITIAL_DEBT_DATA)
  const [loanTerm, setLoanTerm] = useState<number>(10) // Default 10 years

  const totalPrincipal = debts.reduce((sum, debt) => sum + debt.amount, 0)
  
  // Calculate total payoff amount including interest for each debt
  const calculateTotalPayoff = (principal: number, rate: number, years: number) => {
    const monthlyRate = rate / 100 / 12
    const numberOfPayments = years * 12
    const monthlyPayment = principal === 0 ? 0 :
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    return monthlyPayment * numberOfPayments
  }

  const totalPayoff = debts.reduce((sum, debt) => 
    sum + calculateTotalPayoff(debt.amount, debt.interestRate, loanTerm), 0
  )

  const totalInterest = totalPayoff - totalPrincipal
  
  const monthlyPayment = debts.reduce((sum, debt) => {
    const monthlyRate = debt.interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    const payment = debt.amount === 0 ? 0 :
      (debt.amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    return sum + payment
  }, 0)

  const handleDebtChange = (index: number, amount: number) => {
    const newDebts = [...debts]
    newDebts[index] = { ...newDebts[index], amount }
    setDebts(newDebts)
  }

  const handleInterestRateChange = (index: number, rate: string) => {
    const newRate = parseFloat(rate) || 0
    const newDebts = [...debts]
    newDebts[index] = { ...newDebts[index], interestRate: newRate }
    setDebts(newDebts)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Debt Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4 bg-background border shadow-sm">
              <p className="text-sm font-medium mb-1">Principal Amount</p>
              <p className="text-2xl font-bold">${totalPrincipal.toLocaleString()}</p>
            </Card>
            <Card className="p-4 bg-background border shadow-sm">
              <p className="text-sm font-medium mb-1">Total Interest</p>
              <p className="text-2xl font-bold">${Math.round(totalInterest).toLocaleString()}</p>
            </Card>
            <Card className="p-4 bg-background border shadow-sm">
              <p className="text-sm font-medium mb-1">Total Payoff Amount</p>
              <p className="text-2xl font-bold">${Math.round(totalPayoff).toLocaleString()}</p>
            </Card>
            <Card className="p-4 bg-background border shadow-sm">
              <p className="text-sm font-medium mb-1">Monthly Payment</p>
              <p className="text-2xl font-bold">${Math.round(monthlyPayment).toLocaleString()}</p>
            </Card>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <Label>Loan Term (Years)</Label>
              <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(parseInt(value))}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                  <SelectItem value="15">15 Years</SelectItem>
                  <SelectItem value="20">20 Years</SelectItem>
                  <SelectItem value="25">25 Years</SelectItem>
                  <SelectItem value="30">30 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 space-y-8">
            {debts.map((debt, index) => (
              <div key={debt.type} className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>{debt.type}</Label>
                  <span className="font-medium">${debt.amount.toLocaleString()}</span>
                </div>
                
                <Slider
                  value={[debt.amount]}
                  onValueChange={(values) => handleDebtChange(index, values[0])}
                  max={100000}
                  step={1000}
                  className={debt.color}
                />

                <div className="flex items-center gap-2">
                  <Label>Interest Rate:</Label>
                  <Input
                    type="number"
                    value={debt.interestRate}
                    onChange={(e) => handleInterestRateChange(index, e.target.value)}
                    className="w-24"
                    step="0.1"
                    min="0"
                    max="100"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Error Loading Debt Overview</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {error.message}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function DebtOverviewWithErrorBoundary() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <DebtOverview />
    </ErrorBoundary>
  )
} 