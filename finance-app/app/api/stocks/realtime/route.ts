import { NextResponse } from 'next/server'

const API_KEY = "Imf_QydlTlMJdnngcepReLLhV6zqbILN"
const BASE_URL = "https://api.polygon.io"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 })
  }

  try {
    console.log(`Fetching data for ${symbol}...`)
    // Get the last trade data
    const response = await fetch(
      `${BASE_URL}/v2/last/trade/${symbol}?apiKey=${API_KEY}`
    )

    const data = await response.json()

    // If we get a 403, try the previous close endpoint as fallback
    if (response.status === 403) {
      const fallbackResponse = await fetch(
        `${BASE_URL}/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${API_KEY}`
      )
      const fallbackData = await fallbackResponse.json()
      
      if (fallbackResponse.ok && fallbackData.results?.[0]) {
        return NextResponse.json({
          results: {
            symbol,
            p: fallbackData.results[0].c,
            o: fallbackData.results[0].o,
            h: fallbackData.results[0].h,
            l: fallbackData.results[0].l,
            t: fallbackData.results[0].t
          }
        })
      }
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: `Polygon API error: ${data.error || response.statusText}` },
        { status: response.status }
      )
    }

    return NextResponse.json({
      results: {
        symbol,
        p: data.results.p,
        t: data.results.t
      }
    })

  } catch (error) {
    console.error('Error fetching stock data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    )
  }
} 