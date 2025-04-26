
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { renderToString } from 'react-dom/server';
import html2canvas from 'html2canvas';

interface YearlyData {
  year: number;
  balance: number;
  withdrawal: number;
  cumulativeWithdrawal: number;
  inflationAdjustedWithdrawal: number;
}

const BalanceChart = ({ data }: { data: YearlyData[] }) => (
  <div style={{ width: '550px', height: '300px', background: '#fff', padding: '10px' }}>
    <AreaChart
      width={530}
      height={280}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Area 
        type="monotone" 
        dataKey="balance" 
        name="Balance" 
        stroke="#2c7a7b" 
        fill="#2c7a7b" 
        fillOpacity={0.3}
      />
    </AreaChart>
  </div>
);

export const generateChartImage = async (data: YearlyData[]): Promise<string> => {
  // Create a container for the chart
  const container = document.createElement('div');
  container.innerHTML = renderToString(<BalanceChart data={data} />);
  document.body.appendChild(container);
  
  // Render chart to canvas and get image data
  try {
    const canvas = await html2canvas(container.firstChild as HTMLElement);
    const imageData = canvas.toDataURL('image/png');
    document.body.removeChild(container);
    return imageData;
  } catch (error) {
    console.error('Error generating chart image:', error);
    document.body.removeChild(container);
    return '';
  }
};
