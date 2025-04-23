"use client"

import { useState, useEffect } from "react"
import { getStockPrice } from "@/lib/polygon"

export function LiveStockPrice({ symbol = "AAPL" }: { symbol?: string }) {
  const [price, setPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPrice() {
      setLoading(true)
      try {
        const currentPrice = await getStockPrice(symbol)
        setPrice(currentPrice)
      } catch (error) {
        console.error("Error fetching price:", error)
        setPrice(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPrice()

    // Refresh price every 60 seconds
    const interval = setInterval(fetchPrice, 60000)
    return () => clearInterval(interval)
  }, [symbol])

  if (loading) {
    return <div className="p-4 border rounded-lg">Loading price...</div>
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold">{symbol}</h3>
      <div className="text-2xl">${price !== null ? price.toFixed(2) : "N/A"}</div>
    </div>
  )
}
