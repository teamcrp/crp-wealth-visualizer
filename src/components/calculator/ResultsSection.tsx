
import { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowDown, Download } from 'lucide-react';

interface ResultsSectionProps {
  initialInvestment: number;
  monthlyWithdrawal: number;
  totalWithdrawals: number;
  finalBalance: number;
  investmentDuration: number;
  withdrawalYears: number;
  expectedReturn: number;
  onDownloadPDF: () => void;
}

const ResultsSection: FC<ResultsSectionProps> = ({
  initialInvestment,
  monthlyWithdrawal,
  totalWithdrawals,
  finalBalance,
  investmentDuration,
  withdrawalYears,
  expectedReturn,
  onDownloadPDF,
}) => {
  const formatRupee = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const fundDepletion = finalBalance <= 0;
  const withdrawalRate = (monthlyWithdrawal * 12 / initialInvestment) * 100;
  const isWithdrawalRateSustainable = withdrawalRate <= expectedReturn;

  return (
    <Card className="gradient-card animate-fade-in w-full">
      <CardHeader>
        <CardTitle>SWP Results Summary</CardTitle>
        <CardDescription>
          Based on your inputs, here's how your SWP would perform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background rounded-lg p-4 shadow-sm border">
            <p className="text-sm text-muted-foreground">Initial Investment</p>
            <p className="text-xl font-semibold">{formatRupee(initialInvestment)}</p>
          </div>
          <div className="bg-background rounded-lg p-4 shadow-sm border">
            <p className="text-sm text-muted-foreground">Monthly Withdrawal</p>
            <p className="text-xl font-semibold">{formatRupee(monthlyWithdrawal)}</p>
          </div>
          <div className="bg-background rounded-lg p-4 shadow-sm border">
            <p className="text-sm text-muted-foreground">Total Withdrawals</p>
            <p className="text-xl font-semibold">{formatRupee(totalWithdrawals)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background rounded-lg p-4 shadow-sm border">
            <p className="text-sm text-muted-foreground">Final Balance</p>
            <p className={`text-xl font-semibold ${finalBalance < 0 ? 'text-destructive' : ''}`}>
              {finalBalance < 0 ? '₹0 (Depleted)' : formatRupee(finalBalance)}
            </p>
          </div>
          <div className="bg-background rounded-lg p-4 shadow-sm border">
            <p className="text-sm text-muted-foreground">Withdrawal Period</p>
            <p className="text-xl font-semibold">
              {fundDepletion 
                ? `${withdrawalYears.toFixed(1)} years (Funds depleted)`
                : `${investmentDuration} years (Full duration)`}
            </p>
          </div>
        </div>

        {fundDepletion && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Fund Depletion Warning</AlertTitle>
            <AlertDescription>
              Your funds will be depleted in {withdrawalYears.toFixed(1)} years, before your target 
              duration of {investmentDuration} years. Consider reducing your withdrawal amount or 
              increasing your initial investment.
            </AlertDescription>
          </Alert>
        )}

        {!fundDepletion && !isWithdrawalRateSustainable && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Withdrawal Rate Warning</AlertTitle>
            <AlertDescription>
              Your annual withdrawal rate ({withdrawalRate.toFixed(1)}%) is higher than your expected 
              return ({expectedReturn}%). This might deplete your corpus in the long run beyond your 
              specified duration.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="bg-muted px-4 py-3 rounded-md text-sm w-full">
            <p className="font-medium">Withdrawal Rate: {withdrawalRate.toFixed(2)}% per year</p>
            <p className="text-muted-foreground text-xs mt-1">
              This is the percentage of your initial investment you're withdrawing annually
            </p>
          </div>
          <Button 
            className="w-full md:w-auto"
            onClick={onDownloadPDF}
          >
            <Download className="mr-2 h-4 w-4" /> Download Results
          </Button>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center text-muted-foreground mb-2">
            <ArrowDown className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Scroll down for detailed charts and analysis</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsSection;
