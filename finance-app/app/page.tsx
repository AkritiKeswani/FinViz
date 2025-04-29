import { EtfAllocationWithErrorBoundary } from "@/components/etf-allocation-with-error-boundary"
import { DebtOverviewWithErrorBoundary } from "@/components/debt-overview-with-error-boundary"
import { RefinanceOptionsWithErrorBoundary } from "@/components/refinance-options-with-error-boundary"
import { FinancialEducationWithErrorBoundary } from "@/components/financial-education-with-error-boundary"

export default function Home() {
  return (
    <div className="container mx-auto p-4 space-y-8 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3">FinViz</h1>
        <p className="text-muted-foreground text-lg">Forget about your debt, and leverage your money into ETFs.</p>
      </header>

      <div className="grid gap-8">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Debt Overview</h2>
            <DebtOverviewWithErrorBoundary />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Refinancing Options</h2>
            <RefinanceOptionsWithErrorBoundary />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">ETF Investment Strategy</h2>
          <div className="bg-card rounded-lg p-4">
            <EtfAllocationWithErrorBoundary />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Financial Education</h2>
          <FinancialEducationWithErrorBoundary />
        </section>
      </div>
    </div>
  )
}
