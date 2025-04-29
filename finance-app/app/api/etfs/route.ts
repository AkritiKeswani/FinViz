import { NextResponse } from 'next/server'
import { RestClient } from '@polygon.io/client-js'

// Initialize Polygon client - in production, use environment variable
const client = new RestClient('YOUR_POLYGON_API_KEY')

// ETF tickers by category
const ETF_TICKERS = {
  'Bond ETFs': ['BND', 'AGG', 'SCHZ', 'TLT', 'IEF'],
  'Large Cap ETFs': ['VOO', 'SPY', 'IVV', 'VTI', 'QQQ'],
  'International ETFs': ['VXUS', 'EFA', 'VEA', 'IEFA', 'EEM'],
  'Small Cap ETFs': ['VB', 'IJR', 'IWM', 'SCHA', 'VTWO']
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  if (!category || !ETF_TICKERS[category as keyof typeof ETF_TICKERS]) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
  }

  try {
    const tickers = ETF_TICKERS[category as keyof typeof ETF_TICKERS]
    const etfData = await Promise.all(
      tickers.map(async (ticker) => {
        try {
          // Get last trade
          const lastTrade = await client.stocks.lastTrade(ticker)
          // Get ticker details
          const tickerDetails = await client.reference.tickerDetails(ticker)
          
          return {
            symbol: ticker,
            name: tickerDetails.results.name,
            price: lastTrade.results.p,
            description: tickerDetails.results.description,
            expense_ratio: tickerDetails.results.expense_ratio || 'N/A'
          }
        } catch (error) {
          console.error(`Error fetching data for ${ticker}:`, error)
          return null
        }
      })
    )

    const validEtfData = etfData.filter(data => data !== null)

    return NextResponse.json({
      category,
      etfs: validEtfData
    })
  } catch (error) {
    console.error('Error fetching ETF data:', error)
    return NextResponse.json({ error: 'Failed to fetch ETF data' }, { status: 500 })
  }
} 