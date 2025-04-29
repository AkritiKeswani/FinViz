"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface RefinanceCompany {
  name: string
  description: string
  websiteUrl: string
}

const REFINANCE_COMPANIES: RefinanceCompany[] = [
  {
    name: "Splash Financial",
    description: "A marketplace specifically for refinancing student debt that allows you to compare products and rates across various bank and credit union partners.",
    websiteUrl: "https://splashfinancial.com"
  },
  {
    name: "SoFi",
    description: "The first company to refinance federal and private student loans together since 2012. No minimum income requirement and accepts associate's degree holders.",
    websiteUrl: "https://sofi.com"
  },
  {
    name: "Laurel Road",
    description: "Ideal for students with large balances, offering competitive rates with additional benefits through their checking account. No limit on refinancing amount.",
    websiteUrl: "https://laurelroad.com"
  },
  {
    name: "Earnest",
    description: "Offers highly flexible payment options including interest-only payments, forbearance options, biweekly payments, and the ability to skip one payment per year.",
    websiteUrl: "https://earnest.com"
  },
  {
    name: "PenFed Credit Union",
    description: "Notable for allowing Parent PLUS Loans to be transferred to children. Offers competitive rates and credit union membership benefits.",
    websiteUrl: "https://penfed.org"
  }
]

export function RefinanceOptions() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Student Loan Refinancing Options</h2>
        <p className="text-muted-foreground">
          Compare top lenders for refinancing your student loans. Refinancing can help you get better rates
          or consolidate multiple loans into one payment.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {REFINANCE_COMPANIES.map((company) => (
          <Card key={company.name} className="flex flex-col">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{company.name}</CardTitle>
              <CardDescription className="mt-2">
                {company.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => window.open(company.websiteUrl, '_blank')}
              >
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> When refinancing federal student loans with a private lender, you may lose access to federal benefits such as income-driven repayment plans, loan forgiveness programs, and federal forbearance options. Consider your options carefully before proceeding.
        </p>
      </div>
    </div>
  )
} 