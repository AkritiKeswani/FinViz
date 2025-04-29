"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

interface DebtItem {
  type: string
  amount: number
  interestRate: number
  color: string
}

export function DebtOverview() {
  const [debts, setDebts] = useState<DebtItem[]>([
    { type: "Student Loans", amount: 25000, interestRate: 5.8, color: "#FF6B6B" },
    { type: "Credit Card", amount: 5000, interestRate: 19.99, color: "#4ECDC4" },
    { type: "Car Loan", amount: 15000, interestRate: 4.5, color: "#45B7D1" },
  ])

  const [newDebt, setNewDebt] = useState({
    type: "",
    amount: "",
    interestRate: "",
  })

  const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0)
  const highestInterestDebt = [...debts].sort((a, b) => b.interestRate - a.interestRate)[0]

  const handleAddDebt = () => {
    if (newDebt.type && newDebt.amount && newDebt.interestRate) {
      setDebts([
        ...debts,
        {
          type: newDebt.type,
          amount: Number(newDebt.amount),
          interestRate: Number(newDebt.interestRate),
          color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Random color
        },
      ])
      setNewDebt({ type: "", amount: "", interestRate: "" })
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Debt: ${totalDebt.toLocaleString()}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={debts}
                  dataKey="amount"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {debts.map((debt) => (
                    <Cell key={debt.type} fill={debt.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Debt Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {debts.map((debt) => (
              <div key={debt.type} className="flex items-center justify-between p-2 rounded bg-muted">
                <div>
                  <div className="font-medium">{debt.type}</div>
                  <div className="text-sm text-muted-foreground">
                    {debt.interestRate}% APR
                  </div>
                </div>
                <div className="font-medium">${debt.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Debt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input
              placeholder="Debt Type (e.g., Student Loan)"
              value={newDebt.type}
              onChange={(e) => setNewDebt({ ...newDebt, type: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={newDebt.amount}
              onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Interest Rate (%)"
              value={newDebt.interestRate}
              onChange={(e) => setNewDebt({ ...newDebt, interestRate: e.target.value })}
            />
            <Button onClick={handleAddDebt}>Add Debt</Button>
          </div>
        </CardContent>
      </Card>

      {highestInterestDebt && (
        <Card className="bg-destructive/10">
          <CardHeader>
            <CardTitle>Priority Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Focus on paying off your {highestInterestDebt.type} first</p>
            <p className="text-sm text-muted-foreground mt-1">
              It has the highest interest rate at {highestInterestDebt.interestRate}%
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 