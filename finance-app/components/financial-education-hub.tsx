"use client"

import { useState } from "react"
import { ArrowRight, BookOpen, DollarSign, HelpCircle, LineChart, PieChart, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Financial education topics
const topics = [
  {
    id: "etfs",
    title: "Exchange-Traded Funds (ETFs)",
    icon: PieChart,
    description: "Learn how ETFs work and why they're popular investment vehicles",
  },
  {
    id: "index-funds",
    title: "Index Funds",
    icon: LineChart,
    description: "Understand how index funds track market segments with low fees",
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds",
    icon: TrendingUp,
    description: "Discover how mutual funds pool money for professional management",
  },
  {
    id: "roth-ira",
    title: "Roth IRAs",
    icon: DollarSign,
    description: "Explore tax-advantaged retirement accounts and their benefits",
  },
  {
    id: "stocks",
    title: "Stocks",
    icon: TrendingUp,
    description: "Learn the basics of stock investing and market fundamentals",
  },
]

export function FinancialEducationHub() {
  const [selectedTopic, setSelectedTopic] = useState("etfs")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Financial Education Hub
        </CardTitle>
        <CardDescription>Learn about investment vehicles and financial concepts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className={`cursor-pointer transition-all ${selectedTopic === topic.id ? "border-primary bg-primary/5" : ""}`}
              onClick={() => setSelectedTopic(topic.id)}
            >
              <CardContent className="p-4 text-center">
                {topic.icon && <topic.icon className="h-8 w-8 mx-auto mb-2" />}
                <div className="text-sm font-medium">{topic.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={selectedTopic} onValueChange={setSelectedTopic}>
          <TabsList className="hidden">
            {topics.map((topic) => (
              <TabsTrigger key={topic.id} value={topic.id}>
                {topic.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="etfs">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">Exchange-Traded Funds (ETFs)</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>ETFs trade like stocks but contain multiple assets</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">What are ETFs?</h4>
                    <p className="text-sm text-muted-foreground">
                      Exchange-Traded Funds (ETFs) are investment funds traded on stock exchanges. They hold assets like
                      stocks, bonds, or commodities and trade throughout the day like stocks.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Key Benefits</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          1
                        </span>
                        <span>
                          <strong>Diversification:</strong> One ETF can give you exposure to hundreds of stocks
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          2
                        </span>
                        <span>
                          <strong>Low Costs:</strong> Generally have lower expense ratios than mutual funds
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          3
                        </span>
                        <span>
                          <strong>Tax Efficiency:</strong> Typically generate fewer capital gains taxes
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          4
                        </span>
                        <span>
                          <strong>Liquidity:</strong> Can be bought and sold throughout the trading day
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Types of ETFs</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Stock ETFs</div>
                        <div className="text-muted-foreground">
                          Track stock indices like S&P 500, Dow Jones, or NASDAQ
                        </div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Bond ETFs</div>
                        <div className="text-muted-foreground">
                          Hold various types of bonds (government, corporate, municipal)
                        </div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Sector ETFs</div>
                        <div className="text-muted-foreground">
                          Focus on specific industries like technology or healthcare
                        </div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Commodity ETFs</div>
                        <div className="text-muted-foreground">
                          Track commodities like gold, oil, or agricultural products
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Popular ETF Examples</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">VOO</div>
                        <div className="text-muted-foreground">Vanguard S&P 500 ETF</div>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">QQQ</div>
                        <div className="text-muted-foreground">Invesco NASDAQ-100 ETF</div>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">VTI</div>
                        <div className="text-muted-foreground">Vanguard Total Stock Market ETF</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="index-funds">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">Index Funds</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Funds that track market indices with minimal management</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">What are Index Funds?</h4>
                    <p className="text-sm text-muted-foreground">
                      Index funds are mutual funds or ETFs designed to track a specific market index, such as the S&P
                      500 or Russell 2000. They aim to match the performance of their target index rather than
                      outperform it.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Key Benefits</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          1
                        </span>
                        <span>
                          <strong>Low Costs:</strong> Minimal management means lower expense ratios
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          2
                        </span>
                        <span>
                          <strong>Diversification:</strong> Instant exposure to many securities in one purchase
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          3
                        </span>
                        <span>
                          <strong>Simplicity:</strong> Easy to understand what you're investing in
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          4
                        </span>
                        <span>
                          <strong>Performance:</strong> Often outperform actively managed funds over time
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Index Fund vs. ETF</h4>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-muted/30 rounded-lg">
                          <div className="font-medium">Index Mutual Funds</div>
                          <ul className="mt-2 space-y-1 text-muted-foreground">
                            <li>• Trade once per day</li>
                            <li>• Often have minimum investments</li>
                            <li>• Can automatically reinvest dividends</li>
                          </ul>
                        </div>
                        <div className="p-2 bg-muted/30 rounded-lg">
                          <div className="font-medium">Index ETFs</div>
                          <ul className="mt-2 space-y-1 text-muted-foreground">
                            <li>• Trade throughout the day</li>
                            <li>• No minimum investment beyond share price</li>
                            <li>• More tax-efficient in some cases</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Popular Index Funds</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">VFIAX</div>
                        <div className="text-muted-foreground">Vanguard 500 Index Fund</div>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">FXAIX</div>
                        <div className="text-muted-foreground">Fidelity 500 Index Fund</div>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">SWPPX</div>
                        <div className="text-muted-foreground">Schwab S&P 500 Index Fund</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mutual-funds">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">Mutual Funds</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Professionally managed investment pools</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">What are Mutual Funds?</h4>
                    <p className="text-sm text-muted-foreground">
                      Mutual funds pool money from many investors to purchase a portfolio of stocks, bonds, or other
                      securities. They're managed by professional fund managers who make investment decisions on behalf
                      of investors.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Key Characteristics</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          1
                        </span>
                        <span>
                          <strong>Professional Management:</strong> Fund managers make investment decisions
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          2
                        </span>
                        <span>
                          <strong>NAV Pricing:</strong> Priced once daily at Net Asset Value
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          3
                        </span>
                        <span>
                          <strong>Expense Ratios:</strong> Annual fees that can vary widely
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          4
                        </span>
                        <span>
                          <strong>Minimum Investments:</strong> Often require initial minimum investments
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Types of Mutual Funds</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Equity Funds</div>
                        <div className="text-muted-foreground">Invest primarily in stocks</div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Fixed Income Funds</div>
                        <div className="text-muted-foreground">Invest in bonds and other debt securities</div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Balanced Funds</div>
                        <div className="text-muted-foreground">Invest in both stocks and bonds</div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Money Market Funds</div>
                        <div className="text-muted-foreground">Invest in short-term, high-quality investments</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Active vs. Passive Management</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Active Management</div>
                        <div className="text-muted-foreground">
                          Managers try to outperform a benchmark index through research and market timing
                        </div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Passive Management</div>
                        <div className="text-muted-foreground">
                          Aims to match the performance of a specific index (index funds)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="roth-ira">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">Roth IRAs</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tax-advantaged retirement accounts with tax-free growth</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">What is a Roth IRA?</h4>
                    <p className="text-sm text-muted-foreground">
                      A Roth IRA is an individual retirement account that offers tax-free growth and tax-free
                      withdrawals in retirement. Contributions are made with after-tax dollars, meaning you pay taxes
                      upfront but not when you withdraw in retirement.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Key Benefits</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          1
                        </span>
                        <span>
                          <strong>Tax-Free Growth:</strong> Investments grow tax-free
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          2
                        </span>
                        <span>
                          <strong>Tax-Free Withdrawals:</strong> Qualified withdrawals in retirement are tax-free
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          3
                        </span>
                        <span>
                          <strong>No RMDs:</strong> No required minimum distributions during your lifetime
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          4
                        </span>
                        <span>
                          <strong>Flexibility:</strong> Contributions can be withdrawn at any time without penalties
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Roth IRA Rules (2024)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Contribution Limits</div>
                        <div className="text-muted-foreground">$7,000 per year ($8,000 if age 50+)</div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Income Limits</div>
                        <div className="text-muted-foreground">
                          Phase-out begins at $146,000 (single) or $230,000 (married)
                        </div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Withdrawal Rules</div>
                        <div className="text-muted-foreground">
                          Tax and penalty-free after age 59½ and account open for 5+ years
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Roth IRA vs. Traditional IRA</h4>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-muted/30 rounded-lg">
                          <div className="font-medium">Roth IRA</div>
                          <ul className="mt-2 space-y-1 text-muted-foreground">
                            <li>• After-tax contributions</li>
                            <li>• Tax-free withdrawals</li>
                            <li>• No RMDs</li>
                          </ul>
                        </div>
                        <div className="p-2 bg-muted/30 rounded-lg">
                          <div className="font-medium">Traditional IRA</div>
                          <ul className="mt-2 space-y-1 text-muted-foreground">
                            <li>• Pre-tax contributions</li>
                            <li>• Taxable withdrawals</li>
                            <li>• RMDs at age 73</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stocks">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">Stocks</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ownership shares in publicly traded companies</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">What are Stocks?</h4>
                    <p className="text-sm text-muted-foreground">
                      Stocks represent ownership shares in a company. When you buy a stock, you're purchasing a small
                      piece of that company, which entitles you to a portion of its assets and earnings.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">How Stocks Work</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          1
                        </span>
                        <span>
                          <strong>Ownership:</strong> Each share represents partial ownership in a company
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          2
                        </span>
                        <span>
                          <strong>Price Fluctuation:</strong> Stock prices change based on supply and demand
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          3
                        </span>
                        <span>
                          <strong>Dividends:</strong> Some companies share profits with shareholders through dividends
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                          4
                        </span>
                        <span>
                          <strong>Capital Gains:</strong> Profit from selling stocks at a higher price than purchase
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Types of Stocks</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Common Stocks</div>
                        <div className="text-muted-foreground">
                          Standard shares with voting rights but lower priority for dividends
                        </div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Preferred Stocks</div>
                        <div className="text-muted-foreground">
                          Higher claim on assets and earnings, fixed dividends, usually no voting rights
                        </div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Growth Stocks</div>
                        <div className="text-muted-foreground">
                          Companies expected to grow faster than average, often reinvest profits
                        </div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Value Stocks</div>
                        <div className="text-muted-foreground">
                          Companies trading at a lower price relative to fundamentals
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Key Stock Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">P/E Ratio</div>
                        <div className="text-muted-foreground">
                          Price-to-Earnings ratio measures current share price relative to earnings
                        </div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Market Cap</div>
                        <div className="text-muted-foreground">
                          Total market value of a company's outstanding shares
                        </div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="font-medium">Dividend Yield</div>
                        <div className="text-muted-foreground">
                          Annual dividend payment as a percentage of stock price
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Explore More Financial Topics
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
