// API key would come from environment variables in a real app
const POLYGON_API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY || ""

// Base URL for Polygon API
const POLYGON_BASE_URL = "https://api.polygon.io"

// Fetch stock data for a specific ticker
export async function fetchStockData(ticker: string) {
  try {
    const response = await fetch(
      `${POLYGON_BASE_URL}/v2/aggs/ticker/${ticker}/range/1/day/2023-01-01/2023-12-31?apiKey=${POLYGON_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching stock data:", error)
    return null
  }
}

// Fetch current stock price
export async function fetchCurrentPrice(ticker: string) {
  try {
    const response = await fetch(`${POLYGON_BASE_URL}/v2/last/trade/${ticker}?apiKey=${POLYGON_API_KEY}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.results?.p || null // p is the price in the response
  } catch (error) {
    console.error("Error fetching current price:", error)
    return null
  }
}

// Fetch company details
export async function fetchCompanyDetails(ticker: string) {
  try {
    const response = await fetch(`${POLYGON_BASE_URL}/v3/reference/tickers/${ticker}?apiKey=${POLYGON_API_KEY}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching company details:", error)
    return null
  }
}

// Fetch market indices (S&P 500, NASDAQ, etc.)
export async function fetchMarketIndices() {
  try {
    // Fetch data for major indices
    const indices = ["SPY", "QQQ", "DIA"] // ETFs that track S&P 500, NASDAQ, and Dow Jones
    const promises = indices.map((index) => fetchCurrentPrice(index))

    const results = await Promise.all(promises)

    return {
      sp500: results[0],
      nasdaq: results[1],
      dowJones: results[2],
    }
  } catch (error) {
    console.error("Error fetching market indices:", error)
    return null
  }
}

// Fetch ETF data including holdings
export async function fetchETFData(ticker: string) {
  try {
    // For ETF holdings, you might need a different endpoint or service
    // This is a placeholder - Polygon might not provide detailed ETF holdings
    const response = await fetch(`${POLYGON_BASE_URL}/v3/reference/tickers/${ticker}?apiKey=${POLYGON_API_KEY}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching ETF data:", error)
    return null
  }
}
