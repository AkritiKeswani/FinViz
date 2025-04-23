import { StockDashboardWithErrorBoundary } from "@/components/stock-dashboard-with-error-boundary"
import { MarketOverviewWithErrorBoundary } from "@/components/market-overview-with-error-boundary"
import { EtfAllocationWithErrorBoundary } from "@/components/etf-allocation-with-error-boundary"
import { PersonalFinanceWithErrorBoundary } from "@/components/personal-finance-with-error-boundary"
import { FinancialEducationWithErrorBoundary } from "@/components/financial-education-with-error-boundary"

export default function Home() {
  return (
    <div className="container mx-auto p-4 space-y-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Financial Wellness Dashboard</h1>
        <p className="text-muted-foreground">Track, manage, and learn about your finances in one place</p>
      </header>

      <div className="grid gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
          <MarketOverviewWithErrorBoundary />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Live Market Data</h2>
          <StockDashboardWithErrorBoundary />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Investment Recommendations</h2>
          <EtfAllocationWithErrorBoundary />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Your Financial Overview</h2>
          <PersonalFinanceWithErrorBoundary />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Learn About Investing</h2>
          <FinancialEducationWithErrorBoundary />
        </section>
      </div>
    </div>
  )
}
