
import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import InputSection from '@/components/calculator/InputSection';
import ResultsSection from '@/components/calculator/ResultsSection';
import ChartSection from '@/components/calculator/ChartSection';
import ExplanationSection from '@/components/calculator/ExplanationSection';
import { calculateSWP } from '@/utils/calculationUtils';
import { generatePDF } from '@/utils/pdfGenerator';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Default starting values
  const [initialInvestment, setInitialInvestment] = useState(5000000); // 50 lakhs
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(30000); // 30k per month
  const [expectedReturn, setExpectedReturn] = useState(8.0); // 8% annual return
  const [investmentDuration, setInvestmentDuration] = useState(20); // 20 years
  const [inflationRate, setInflationRate] = useState(5.0); // 5% inflation

  // Calculated results
  const [results, setResults] = useState(calculateSWP(
    initialInvestment, 
    monthlyWithdrawal, 
    expectedReturn, 
    investmentDuration, 
    inflationRate
  ));

  // Update results when inputs change
  useEffect(() => {
    setResults(calculateSWP(
      initialInvestment, 
      monthlyWithdrawal, 
      expectedReturn, 
      investmentDuration, 
      inflationRate
    ));
  }, [initialInvestment, monthlyWithdrawal, expectedReturn, investmentDuration, inflationRate]);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleValueChange = (field: string, value: number) => {
    switch (field) {
      case 'initialInvestment':
        setInitialInvestment(value);
        break;
      case 'monthlyWithdrawal':
        setMonthlyWithdrawal(value);
        break;
      case 'expectedReturn':
        setExpectedReturn(value);
        break;
      case 'investmentDuration':
        setInvestmentDuration(value);
        break;
      case 'inflationRate':
        setInflationRate(value);
        break;
      default:
        break;
    }
  };

  const handleDownloadPDF = () => {
    try {
      generatePDF(results);
      toast({
        title: "PDF Generated",
        description: "Your SWP results have been downloaded as a PDF.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error Generating PDF",
        description: "There was a problem creating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow px-4 py-8">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Systematic Withdrawal Plan Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Plan your financial freedom with our SWP calculator. Understand how long your investments will last 
              and how much income you can generate through systematic withdrawals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-1">
              <InputSection 
                initialInvestment={initialInvestment}
                monthlyWithdrawal={monthlyWithdrawal}
                expectedReturn={expectedReturn}
                investmentDuration={investmentDuration}
                inflationRate={inflationRate}
                onValueChange={handleValueChange}
              />
            </div>
            
            <div className="lg:col-span-2">
              <ResultsSection
                initialInvestment={results.initialInvestment}
                monthlyWithdrawal={results.monthlyWithdrawal}
                totalWithdrawals={results.totalWithdrawals}
                finalBalance={results.finalBalance}
                investmentDuration={results.investmentDuration}
                withdrawalYears={results.withdrawalYears}
                expectedReturn={results.expectedReturn}
                onDownloadPDF={handleDownloadPDF}
              />
            </div>
          </div>
          
          <div className="mb-8">
            <ChartSection 
              yearlyData={results.yearlyData} 
              finalSummary={results.finalSummary} 
            />
          </div>
          
          <div className="mb-8">
            <ExplanationSection />
          </div>
        </div>
      </main>
      
      <Footer />
      
      {showScrollTop && (
        <Button
          className="fixed bottom-8 right-8 p-2 rounded-full shadow-lg"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </Button>
      )}
    </div>
  );
};

export default Index;
