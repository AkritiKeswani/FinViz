export function ApiIntegrationGuide() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Setting Up Polygon.io API Integration</h2>
      <p className="text-muted-foreground">Follow these steps to integrate Polygon.io API with your financial app:</p>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">1. Add your API key to environment variables</h3>
        <p>
          Create a <code>.env.local</code> file in your project root and add:
        </p>
        <pre className="bg-muted p-2 rounded-md text-sm">
          NEXT_PUBLIC_POLYGON_API_KEY=Imf_QydlTlMJdnngcepReLLhV6zqblLN
        </pre>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">2. Import and use the API functions</h3>
        <p>Use the API functions in your components:</p>
        <pre className="bg-muted p-2 rounded-md text-sm">
          import {"{ fetchStockData }"} from "@/lib/api"; // In your component const data = await
          fetchStockData("AAPL");
        </pre>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">3. Replace mock components with API-connected ones</h3>
        <p>Replace the existing components with the API-connected versions:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Replace <code>StockChart</code> with <code>StockChartWithAPI</code>
          </li>
          <li>
            Replace <code>EtfAllocationAdvisor</code> with <code>EtfAllocationWithAPI</code>
          </li>
        </ul>
      </div>

      <div className="border-l-4 border-primary pl-4 py-2 bg-primary/5 mt-4">
        <p className="font-medium">Note on API Security</p>
        <p className="text-sm text-muted-foreground">
          Since we're using the API key directly in client-side code with NEXT_PUBLIC_POLYGON_API_KEY, be aware that
          this key will be visible in the browser. For a production app, consider implementing usage limits in your
          Polygon.io dashboard.
        </p>
      </div>

      <div className="border-l-4 border-primary pl-4 py-2 bg-primary/5 mt-4">
        <p className="font-medium">Note on API Limits</p>
        <p className="text-sm text-muted-foreground">
          Be mindful of API rate limits, especially on the free tier. Implement caching strategies to reduce API calls
          and improve performance.
        </p>
      </div>
    </div>
  )
}
