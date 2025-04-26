
import { FC, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface InputSectionProps {
  initialInvestment: number;
  monthlyWithdrawal: number;
  expectedReturn: number;
  investmentDuration: number;
  inflationRate: number;
  onValueChange: (field: string, value: number) => void;
}

const InputSection: FC<InputSectionProps> = ({
  initialInvestment,
  monthlyWithdrawal,
  expectedReturn,
  investmentDuration,
  inflationRate,
  onValueChange,
}) => {
  const formatRupee = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleInputChange = (field: string, value: string) => {
    const numericValue = Number(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numericValue)) {
      onValueChange(field, numericValue);
    }
  };

  const handleSliderChange = (field: string, value: number[]) => {
    onValueChange(field, value[0]);
  };

  useEffect(() => {
    // Input validation to ensure values are reasonable
    if (monthlyWithdrawal > initialInvestment / 10) {
      onValueChange('monthlyWithdrawal', initialInvestment / 120); // Set to ~0.83% of principal per month
    }
  }, [initialInvestment, monthlyWithdrawal, onValueChange]);

  return (
    <Card className="gradient-card animate-fade-in w-full">
      <CardHeader>
        <CardTitle>SWP Calculator Inputs</CardTitle>
        <CardDescription>
          Adjust the parameters to see how your Systematic Withdrawal Plan performs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="initialInvestment" className="text-sm font-medium flex items-center">
              Initial Investment
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={16} className="ml-1 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="swp-tooltip max-w-xs">
                    <p>The lump sum amount you plan to invest initially</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="initialInvestment"
              type="text"
              className="w-32 text-right"
              value={formatRupee(initialInvestment)}
              onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
            />
          </div>
          <Slider
            value={[initialInvestment]}
            min={100000}
            max={10000000}
            step={10000}
            onValueChange={(value) => handleSliderChange('initialInvestment', value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹1 Lakh</span>
            <span>₹1 Crore</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="monthlyWithdrawal" className="text-sm font-medium flex items-center">
              Monthly Withdrawal
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={16} className="ml-1 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="swp-tooltip max-w-xs">
                    <p>The amount you plan to withdraw every month</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="monthlyWithdrawal"
              type="text"
              className="w-32 text-right"
              value={formatRupee(monthlyWithdrawal)}
              onChange={(e) => handleInputChange('monthlyWithdrawal', e.target.value)}
            />
          </div>
          <Slider
            value={[monthlyWithdrawal]}
            min={1000}
            max={initialInvestment / 60}
            step={1000}
            onValueChange={(value) => handleSliderChange('monthlyWithdrawal', value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹1,000</span>
            <span>₹{formatRupee(initialInvestment / 60).replace('₹', '')}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="expectedReturn" className="text-sm font-medium flex items-center">
              Expected Annual Return (%)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={16} className="ml-1 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="swp-tooltip max-w-xs">
                    <p>The annual return you expect from your investment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="expectedReturn"
              type="text"
              className="w-32 text-right"
              value={`${expectedReturn.toFixed(1)}%`}
              onChange={(e) => handleInputChange('expectedReturn', e.target.value)}
            />
          </div>
          <Slider
            value={[expectedReturn]}
            min={1}
            max={15}
            step={0.1}
            onValueChange={(value) => handleSliderChange('expectedReturn', value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1%</span>
            <span>15%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="investmentDuration" className="text-sm font-medium flex items-center">
              Investment Duration (years)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={16} className="ml-1 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="swp-tooltip max-w-xs">
                    <p>How long you plan to withdraw from this investment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="investmentDuration"
              type="text"
              className="w-32 text-right"
              value={`${investmentDuration} years`}
              onChange={(e) => handleInputChange('investmentDuration', e.target.value)}
            />
          </div>
          <Slider
            value={[investmentDuration]}
            min={1}
            max={30}
            step={1}
            onValueChange={(value) => handleSliderChange('investmentDuration', value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 year</span>
            <span>30 years</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="inflationRate" className="text-sm font-medium flex items-center">
              Inflation Rate (%)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={16} className="ml-1 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="swp-tooltip max-w-xs">
                    <p>Expected annual inflation rate affecting your withdrawal power</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="inflationRate"
              type="text"
              className="w-32 text-right"
              value={`${inflationRate.toFixed(1)}%`}
              onChange={(e) => handleInputChange('inflationRate', e.target.value)}
            />
          </div>
          <Slider
            value={[inflationRate]}
            min={0}
            max={10}
            step={0.1}
            onValueChange={(value) => handleSliderChange('inflationRate', value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>10%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InputSection;
