// Your Polygon API key
const API_KEY = "Imf_QydlTlMJdnngcepReLLhV6zqbILN"

// Base URL for Polygon API
const BASE_URL = "https://api.polygon.io"

// Simple function to fetch stock data
export async function getStockPrice(symbol: string) {
  try {
    const response = await fetch(`${BASE_URL}/v2/last/trade/${symbol}?apiKey=${API_KEY}`)
    const data = await response.json()
    return data?.results?.p || null // The price with null fallback
  } catch (error) {
    console.error("Error fetching stock price:", error)
    return null
  }
}

// Get stock data for a date range
export async function getStockHistory(symbol: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/v2/aggs/ticker/${symbol}/range/1/day/2023-01-01/2023-12-31?apiKey=${API_KEY}`,
    )
    const data = await response.json()
    return data?.results || [] // Return empty array as fallback
  } catch (error) {
    console.error("Error fetching stock history:", error)
    return []
  }
}

// Get company details
export async function getCompanyInfo(symbol: string) {
  try {
    const response = await fetch(`${BASE_URL}/v3/reference/tickers/${symbol}?apiKey=${API_KEY}`)
    const data = await response.json()
    return data?.results || null
  } catch (error) {
    console.error("Error fetching company info:", error)
    return null
  }
}
