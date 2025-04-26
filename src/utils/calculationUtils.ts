
/**
 * Calculates SWP (Systematic Withdrawal Plan) data based on input parameters
 */
export const calculateSWP = (
  initialInvestment: number,
  monthlyWithdrawal: number,
  expectedReturn: number,
  investmentDuration: number,
  inflationRate: number
) => {
  const monthlyRate = expectedReturn / 100 / 12;
  const monthlyInflation = inflationRate / 100 / 12;
  const totalMonths = investmentDuration * 12;
  
  let balance = initialInvestment;
  let totalWithdrawal = 0;
  let monthsElapsed = 0;
  let currentMonthlyWithdrawal = monthlyWithdrawal;
  const yearlyData = [];
  
  // Calculate monthly data
  for (let month = 1; month <= totalMonths; month++) {
    // Calculate returns for this month (before withdrawal)
    const monthlyInterest = balance * monthlyRate;
    balance += monthlyInterest;
    
    // Apply withdrawal
    balance -= currentMonthlyWithdrawal;
    totalWithdrawal += currentMonthlyWithdrawal;
    monthsElapsed = month;
    
    // Adjust withdrawal for inflation (monthly compounding)
    if (month % 12 === 0 && month < totalMonths) {
      currentMonthlyWithdrawal *= (1 + monthlyInflation) ** 12;
    }
    
    // Record yearly data
    if (month % 12 === 0 || month === totalMonths) {
      const year = Math.ceil(month / 12);
      const annualWithdrawal = month % 12 === 0 
        ? currentMonthlyWithdrawal * 12 
        : (currentMonthlyWithdrawal * (month % 12)) + 
          (currentMonthlyWithdrawal * (1 + monthlyInflation) ** 12) * (12 - (month % 12));
          
      const inflationAdjustedWithdrawal = monthlyWithdrawal * 12 * (1 + inflationRate / 100) ** (year - 1);
      
      yearlyData.push({
        year,
        balance: Math.max(0, balance),
        withdrawal: annualWithdrawal,
        cumulativeWithdrawal: totalWithdrawal,
        inflationAdjustedWithdrawal: inflationAdjustedWithdrawal
      });
    }
    
    // Stop if balance depletes
    if (balance <= 0) {
      balance = 0;
      break;
    }
  }
  
  // Calculate final values
  const withdrawalYears = monthsElapsed / 12;
  const finalBalance = Math.max(0, balance);
  
  // Calculate total returns (total withdrawals + final balance - initial investment)
  const returns = totalWithdrawal + finalBalance - initialInvestment;
  
  const finalSummary = {
    initialInvestment,
    totalWithdrawals: totalWithdrawal,
    finalBalance,
    returns
  };
  
  return {
    initialInvestment,
    monthlyWithdrawal,
    expectedReturn,
    investmentDuration,
    inflationRate,
    finalBalance,
    totalWithdrawals: totalWithdrawal,
    withdrawalYears,
    yearlyData,
    finalSummary
  };
};
