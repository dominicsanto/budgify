import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, Label } from 'recharts';

const TransactionChart = ({ totalExpenses, totalIncome, weeklyTransactions }) => {
  console.log(weeklyTransactions);

  const data = [
    { date: 'Week 1', income: 400, expense: 2400 },
    { date: 'Week 2', income: 800, expense: 500 },
    { date: 'Week 3', income: 200, expense: 0 },
    { date: 'Week 4', income: 0, expense: 2400 }
  ];

  const pieChartData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expenses', value: totalExpenses }
  ];

  const COLORS = ['#4CA154', '#CA3A31'];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return ( <>
    <div className="flex mt-2 pt-10">
      <BarChart
        width={600}
        height={300}
        data={weeklyTransactions}
      >
        <XAxis dataKey="date" />
        <YAxis label={{ value: 'Amount in (R)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Bar dataKey="income" stackId="a" fill="#4CA154" barSize={30} />
        <Bar dataKey="expense" stackId="a" fill="#CA3A31" barSize={30} />
      </BarChart>
      <PieChart width={400} height={400}>
        <Pie
          data={pieChartData}
          cx="75%"
          cy="35%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="top" align="right" />
      </PieChart>
    </div>
  </> );
}

export default TransactionChart;
