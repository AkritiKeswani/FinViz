import { NextResponse } from 'next/server'

const API_KEY = "Imf_QydlTlMJdnngcepReLLhV6zqbILN"
const BASE_URL = "https://api.polygon.io"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')
  const timeRange = searchParams.get('timeRange') || '1M'

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 })
  }

  try {
    // Calculate date range based on timeRange
    const endDate = new Date()
    let startDate = new Date()
    
    switch (timeRange) {
      case '1D':
        startDate.setDate(startDate.getDate() - 1)
        break
      case '1W':
        startDate.setDate(startDate.getDate() - 7)
        break
      case '1M':
        startDate.setMonth(startDate.getMonth() - 1)
        break
      case '3M':
        startDate.setMonth(startDate.getMonth() - 3)
        break
      case '1Y':
        startDate.setFullYear(startDate.getFullYear() - 1)
        break
    }

    const formattedStartDate = startDate.toISOString().split('T')[0]
    const formattedEndDate = endDate.toISOString().split('T')[0]

    const response = await fetch(
      `${BASE_URL}/v2/aggs/ticker/${symbol}/range/1/day/${formattedStartDate}/${formattedEndDate}?apiKey=${API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch stock data')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching stock data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    )
  }
} 