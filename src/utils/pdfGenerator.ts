
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface YearlyData {
  year: number;
  balance: number;
  withdrawal: number;
  cumulativeWithdrawal: number;
  inflationAdjustedWithdrawal: number;
}

interface SWPData {
  initialInvestment: number;
  monthlyWithdrawal: number;
  expectedReturn: number;
  investmentDuration: number;
  inflationRate: number;
  finalBalance: number;
  totalWithdrawals: number;
  withdrawalYears: number;
  yearlyData: YearlyData[];
  finalSummary: {
    initialInvestment: number;
    totalWithdrawals: number;
    finalBalance: number;
    returns: number;
  };
}

export const generatePDF = (data: SWPData) => {
  // Create a new PDF document
  const doc = new jsPDF();
  const formatRupee = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Add title and date
  const title = 'SWP Calculator Results';
  const today = new Date().toLocaleDateString();
  
  doc.setFontSize(20);
  doc.text(title, 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`Generated on ${today}`, 105, 27, { align: 'center' });
  doc.text('Powered by Team CRP (www.teamcrp.in)', 105, 32, { align: 'center' });

  doc.setLineWidth(0.5);
  doc.line(20, 35, 190, 35);

  // Input parameters section
  doc.setFontSize(14);
  doc.text('Input Parameters', 20, 45);

  const inputParams = [
    ['Initial Investment', formatRupee(data.initialInvestment)],
    ['Monthly Withdrawal', formatRupee(data.monthlyWithdrawal)],
    ['Expected Annual Return', `${data.expectedReturn.toFixed(1)}%`],
    ['Investment Duration', `${data.investmentDuration} years`],
    ['Inflation Rate', `${data.inflationRate.toFixed(1)}%`],
  ];

  // Track positions with local variables
  let currentY = 50;
  
  const inputParamsTableOutput = autoTable(doc, {
    startY: currentY,
    head: [['Parameter', 'Value']],
    body: inputParams,
    theme: 'grid',
    headStyles: { fillColor: [26, 54, 93] },
  });
  
  // Update currentY based on where the table ended
  currentY = inputParamsTableOutput.finalY || currentY + 40;

  // Results summary section
  doc.setFontSize(14);
  doc.text('Results Summary', 20, currentY + 15);

  const withdrawalRate = (data.monthlyWithdrawal * 12 / data.initialInvestment) * 100;
  const isWithdrawalRateSustainable = withdrawalRate <= data.expectedReturn;
  const fundDepletion = data.finalBalance <= 0;

  const resultsSummary = [
    ['Total Withdrawals', formatRupee(data.totalWithdrawals)],
    ['Final Balance', data.finalBalance < 0 ? '₹0 (Depleted)' : formatRupee(data.finalBalance)],
    ['Withdrawal Period', fundDepletion ? `${data.withdrawalYears.toFixed(1)} years (Funds depleted)` : `${data.investmentDuration} years (Full duration)`],
    ['Annual Withdrawal Rate', `${withdrawalRate.toFixed(2)}% (${isWithdrawalRateSustainable ? 'Sustainable' : 'Unsustainable'})`],
    ['Investment Returns', formatRupee(data.finalSummary.returns)],
  ];

  const resultsSummaryTableOutput = autoTable(doc, {
    startY: currentY + 20,
    head: [['Metric', 'Value']],
    body: resultsSummary,
    theme: 'grid',
    headStyles: { fillColor: [44, 122, 123] },
  });
  
  // Update currentY for the next section
  currentY = resultsSummaryTableOutput.finalY || currentY + 60;

  // Yearly data section
  doc.setFontSize(14);
  doc.text('Yearly Projection', 20, currentY + 15);

  const yearlyDataForTable = data.yearlyData.map(item => [
    item.year,
    formatRupee(item.balance),
    formatRupee(item.withdrawal),
    formatRupee(item.cumulativeWithdrawal),
    formatRupee(item.inflationAdjustedWithdrawal)
  ]);

  const yearlyDataTableOutput = autoTable(doc, {
    startY: currentY + 20,
    head: [['Year', 'Balance', 'Annual Withdrawal', 'Cumulative', 'Inflation Adjusted']],
    body: yearlyDataForTable,
    theme: 'grid',
    headStyles: { fillColor: [26, 54, 93] },
    didDrawPage: (data) => {
      // Footer on each page
      const pageCount = doc.getNumberOfPages();
      doc.setFontSize(8);
      doc.text(
        `Generated using SWP Calculator by Team CRP | Page ${data.pageNumber} of ${pageCount}`,
        105, 
        285, 
        { align: 'center' }
      );
    },
  });
  
  // Update currentY for the notes section
  currentY = yearlyDataTableOutput.finalY || currentY + 100;
  
  // Notes section
  doc.setFontSize(12);
  doc.text('Notes:', 20, currentY + 15);
  
  doc.setFontSize(9);
  const notes = [
    '• This projection assumes a constant rate of return throughout the investment period.',
    '• Market volatility and sequence of returns risk may significantly impact actual results.',
    '• Tax implications are not considered in these calculations.',
    '• Inflation adjustment is applied annually to show the reduced purchasing power over time.',
    '• Consult a financial advisor before making investment decisions based on this projection.'
  ];
  
  let yPos = currentY + 20;
  notes.forEach(note => {
    doc.text(note, 20, yPos);
    yPos += 5;
  });
  
  // Save the PDF
  doc.save('SWP_Calculator_Results.pdf');
};
