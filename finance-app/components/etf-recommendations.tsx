"use client"

import { useState } from "react"
import { AlertCircle, ArrowRight, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ETFRecommendation {
  ticker: string
  category: string
  allocation: number
  dollarAmount: number
  lastPrice: number
  thirtyDayReturn: number
}

interface RecommendationsResponse {
  success: boolean
  error?: string
  riskProfile?: string
  investmentAmount?: number
  recommendations?: ETFRecommendation[]
}

export function EtfRecommendations() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [riskTolerance, setRiskTolerance] = useState("moderate")
  const [investmentAmount, setInvestmentAmount] = useState(10000)
  const [recommendations, setRecommendations] = useState<ETFRecommendation[]>([])

  const fetchRecommendations = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `/api/etfs?riskTolerance=${riskTolerance}&amount=${investmentAmount}`
      )
      const data: RecommendationsResponse = await response.json()
      if (data.success && data.recommendations) {
        setRecommendations(data.recommendations)
      } else {
        setError(data.error || 'Failed to fetch recommendations')
      }
    } catch (error) {
      setError('Error connecting to the recommendation service')
      console.error("Error fetching recommendations:", error)
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          ETF Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Risk Tolerance</Label>
            <RadioGroup
              value={riskTolerance}
              onValueChange={setRiskTolerance}
              className="flex space-x-4 mt-2"
            >
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
              <Label>Investment Amount</Label>
              <span className="text-sm font-medium">
                ${investmentAmount.toLocaleString()}
              </span>
            </div>
            <Slider
              value={[investmentAmount]}
              onValueChange={(value) => setInvestmentAmount(value[0])}
              min={1000}
              max={100000}
              step={1000}
            />
          </div>

          <Button
            className="w-full"
            onClick={fetchRecommendations}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Recommendations"}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {recommendations.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Recommended ETF Portfolio</h3>
            <div className="grid gap-4">
              {recommendations.map((rec) => (
                <Card key={rec.ticker} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{rec.category}</h4>
                      <p className="text-sm text-muted-foreground">
                        {rec.ticker} - {rec.allocation.toFixed(0)}% allocation
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ${rec.dollarAmount.toLocaleString()}
                      </div>
                      <div className={`text-sm ${rec.thirtyDayReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {rec.thirtyDayReturn.toFixed(2)}% (30d)
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 