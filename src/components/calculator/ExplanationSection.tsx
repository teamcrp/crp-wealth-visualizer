
import { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ExplanationSection: FC = () => {
  return (
    <Card className="gradient-card animate-fade-in w-full">
      <CardHeader>
        <CardTitle>Understanding SWP</CardTitle>
        <CardDescription>
          Learn more about Systematic Withdrawal Plans and how to use this calculator
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="what-is-swp">
            <AccordionTrigger>What is a Systematic Withdrawal Plan (SWP)?</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground mb-4">
                A Systematic Withdrawal Plan (SWP) is an investment strategy that allows you to withdraw a fixed amount from your 
                investments at regular intervals, typically monthly. It's essentially the opposite of a Systematic Investment Plan (SIP).
              </p>
              <p className="text-sm text-muted-foreground">
                SWPs are commonly used to create a regular income stream from accumulated investments, particularly 
                during retirement or when passive income is needed. The remaining corpus continues to be invested and 
                can potentially generate returns.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="how-swp-works">
            <AccordionTrigger>How does an SWP work?</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground mb-4">
                In an SWP, you start with a lump sum investment, and the fund house or investment platform redeems units 
                equivalent to your monthly withdrawal amount. This amount is then credited to your bank account.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                The key aspects of an SWP are:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mb-4 space-y-2">
                <li>Your investment remains exposed to market returns</li>
                <li>The withdrawal amount can be fixed or variable</li>
                <li>Withdrawals are tax-efficient compared to interest income</li>
                <li>Your corpus can potentially last longer if returns exceed withdrawal rate</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                SWPs are popular for retirement planning, education funding, and creating regular income streams from accumulated wealth.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="using-calculator">
            <AccordionTrigger>How to use this calculator</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground mb-4">
                This SWP calculator helps you plan your withdrawal strategy by showing how long your investments might last. 
                Here's how to use it:
              </p>
              <ol className="list-decimal list-inside text-sm text-muted-foreground mb-4 space-y-2">
                <li>Enter your initial investment amount (the lump sum you're starting with)</li>
                <li>Specify your desired monthly withdrawal amount</li>
                <li>Set the expected annual return on your investments (be realistic!)</li>
                <li>Define how long you want the withdrawals to continue</li>
                <li>Input the expected inflation rate to see its impact</li>
              </ol>
              <p className="text-sm text-muted-foreground">
                The calculator will show you if your money will last through your planned withdrawal period, and 
                how inflation might affect your purchasing power over time. You can adjust the inputs to see how 
                different scenarios impact the longevity of your investment.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sustainable-rate">
            <AccordionTrigger>What is a sustainable withdrawal rate?</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground mb-4">
                A sustainable withdrawal rate is the percentage of your investment portfolio that you can withdraw annually 
                without depleting your principal over your withdrawal period.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                The classic "4% rule" suggests withdrawing 4% of your initial portfolio in the first year, and then 
                adjusting that amount for inflation in subsequent years. This rule was based on historical market 
                performance and assumes a portfolio would last for at least 30 years.
              </p>
              <p className="text-sm text-muted-foreground">
                However, the ideal withdrawal rate depends on:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-2">
                <li>Your investment return expectations</li>
                <li>Market conditions and volatility</li>
                <li>Your planned withdrawal period</li>
                <li>Asset allocation and investment strategy</li>
                <li>Inflation rates</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Generally, if your annual withdrawal rate is lower than your expected returns (after accounting for inflation), 
                your corpus has a higher probability of lasting through your planned duration.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="tax-implications">
            <AccordionTrigger>Tax implications of SWP</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground mb-4">
                In India, the tax implications of SWP depend on the type of investment and how long you've held it:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mb-4 space-y-2">
                <li>
                  <strong>Equity Mutual Funds:</strong> Long-term capital gains (held for more than 1 year) are taxed at 10% for gains exceeding ₹1 lakh per financial year. Short-term gains are taxed at 15%.
                </li>
                <li>
                  <strong>Debt Mutual Funds:</strong> Long-term capital gains (held for more than 3 years) are taxed at 20% with indexation benefits. Short-term gains are added to your income and taxed at your income tax slab rate.
                </li>
                <li>
                  <strong>Hybrid Funds:</strong> Tax implications depend on the asset allocation and follow the equity or debt taxation rules based on the fund's exposure.
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Note: This calculator doesn't account for taxes. You should consider the tax implications separately when planning your SWP strategy. Consult a tax professional for personalized advice.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="assumptions">
            <AccordionTrigger>Assumptions and limitations</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground mb-4">
                This SWP calculator makes several simplifying assumptions:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mb-4 space-y-2">
                <li>Returns are assumed to be constant throughout the investment period</li>
                <li>Withdrawals occur at the end of each month</li>
                <li>Inflation adjustment is applied annually</li>
                <li>Tax implications are not considered</li>
                <li>Market volatility and sequence of returns risk are not factored in</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Real-world investment performance will vary, and actual results may differ from the calculator's projections. 
                This tool provides estimates for planning purposes only and should not be considered financial advice. 
                Consult with a financial advisor for personalized guidance.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ExplanationSection;
