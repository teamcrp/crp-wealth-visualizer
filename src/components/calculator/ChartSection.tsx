
import { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface ChartSectionProps {
  yearlyData: {
    year: number;
    balance: number;
    withdrawal: number;
    cumulativeWithdrawal: number;
    inflationAdjustedWithdrawal: number;
  }[];
  finalSummary: {
    initialInvestment: number;
    totalWithdrawals: number;
    finalBalance: number;
    returns: number;
  };
}

const ChartSection: FC<ChartSectionProps> = ({ yearlyData, finalSummary }) => {
  const formatRupee = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Prepare data for the pie chart
  const pieData = [
    { name: 'Final Balance', value: Math.max(0, finalSummary.finalBalance) },
    { name: 'Total Withdrawals', value: finalSummary.totalWithdrawals },
    { name: 'Returns', value: finalSummary.returns }
  ];

  const COLORS = ['#2c7a7b', '#1a365d', '#ecc94b'];

  return (
    <Card className="gradient-card animate-fade-in w-full">
      <CardHeader>
        <CardTitle>SWP Analytics</CardTitle>
        <CardDescription>
          Visualize how your investment and withdrawals evolve over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="balance" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="balance">Balance</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="balance" className="mt-2">
            <div className="bg-card p-4 rounded-md h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={yearlyData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis 
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('en-IN', {
                        notation: 'compact',
                        compactDisplay: 'short',
                      }).format(value)
                    }
                  />
                  <Tooltip 
                    formatter={(value: number) => formatRupee(value)}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    name="Balance" 
                    stroke="#2c7a7b" 
                    fill="#2c7a7b" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              This chart shows how your investment balance changes over time as you make withdrawals.
            </p>
          </TabsContent>
          
          <TabsContent value="withdrawals" className="mt-2">
            <div className="bg-card p-4 rounded-md h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={yearlyData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis 
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('en-IN', {
                        notation: 'compact',
                        compactDisplay: 'short',
                      }).format(value)
                    }
                  />
                  <Tooltip 
                    formatter={(value: number) => formatRupee(value)}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="withdrawal" 
                    name="Annual Withdrawal" 
                    stroke="#1a365d" 
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="inflationAdjustedWithdrawal" 
                    name="Inflation Adjusted Withdrawal" 
                    stroke="#ecc94b" 
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              This chart compares your annual withdrawal amounts with inflation-adjusted values, showing the impact of inflation on your purchasing power.
            </p>
          </TabsContent>
          
          <TabsContent value="comparison" className="mt-2">
            <div className="bg-card p-4 rounded-md h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={yearlyData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis 
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('en-IN', {
                        notation: 'compact',
                        compactDisplay: 'short',
                      }).format(value)
                    }
                  />
                  <Tooltip 
                    formatter={(value: number) => formatRupee(value)}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="balance" name="Balance" fill="#2c7a7b" />
                  <Bar dataKey="cumulativeWithdrawal" name="Cumulative Withdrawal" fill="#1a365d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              This chart compares your remaining balance against the cumulative withdrawals you've made, showing the relationship between the two.
            </p>
          </TabsContent>
          
          <TabsContent value="summary" className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-4 rounded-md h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value: number) => formatRupee(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-muted p-6 rounded-md flex flex-col justify-center space-y-4 h-[300px]">
                <div>
                  <h3 className="font-semibold text-lg">Financial Summary</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Breakdown of your SWP performance
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Initial Investment:</span>
                    <span className="font-medium">{formatRupee(finalSummary.initialInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Withdrawals:</span>
                    <span className="font-medium">{formatRupee(finalSummary.totalWithdrawals)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Investment Returns:</span>
                    <span className="font-medium">{formatRupee(finalSummary.returns)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm font-semibold">Final Balance:</span>
                    <span className="font-semibold">
                      {formatRupee(Math.max(0, finalSummary.finalBalance))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              This summary shows how your initial investment was distributed between withdrawals, 
              remaining balance, and the returns generated over time.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChartSection;
