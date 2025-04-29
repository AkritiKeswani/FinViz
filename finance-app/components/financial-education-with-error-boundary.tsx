"use client"

import { ExternalLink } from "lucide-react"
import { ErrorBoundary } from "react-error-boundary"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const EDUCATION_RESOURCES = [
  {
    title: "Understanding Debt",
    description: "Learn about different types of debt and strategies for management",
    links: [
      {
        title: "Types of Debt Guide",
        url: "https://www.investopedia.com/terms/d/debt.asp"
      },
      {
        title: "Debt Management Strategies",
        url: "https://www.nerdwallet.com/article/finance/debt-management-guide"
      }
    ]
  },
  {
    title: "Refinancing Guide",
    description: "Compare refinancing options and understand the process",
    links: [
      {
        title: "When to Refinance",
        url: "https://www.bankrate.com/loans/student-loans/when-to-refinance-student-loans/"
      },
      {
        title: "Refinancing Pros and Cons",
        url: "https://www.creditkarma.com/personal-loans/i/pros-and-cons-refinancing"
      }
    ]
  },
  {
    title: "ETF Investment Basics",
    description: "Understand how ETFs work and their role in your portfolio",
    links: [
      {
        title: "ETF Fundamentals",
        url: "https://www.investopedia.com/terms/e/etf.asp"
      },
      {
        title: "ETF vs Mutual Funds",
        url: "https://www.fidelity.com/learning-center/investment-products/etf/etfs-vs-mutual-funds"
      }
    ]
  }
]

function FinancialEducation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {EDUCATION_RESOURCES.map((resource) => (
        <Card key={resource.title}>
          <CardHeader>
            <CardTitle className="text-lg">{resource.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{resource.description}</p>
            <div className="space-y-2">
              {resource.links.map((link) => (
                <Button
                  key={link.title}
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => window.open(link.url, '_blank')}
                >
                  {link.title}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function FinancialEducationWithErrorBoundary() {
  return (
    <ErrorBoundary fallback={<div>Error loading financial education resources</div>}>
      <FinancialEducation />
    </ErrorBoundary>
  )
}
