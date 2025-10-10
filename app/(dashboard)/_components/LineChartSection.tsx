
// src/components/LineChartComponent.js
'use client';

import { LineChart, XAxis, YAxis, Line, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Jan', up: 4000, le: 2400 },
//   { name: 'Feb', up: 3000, le: 1398 },
//   { name: 'Mar', up: 2000, le: 9800 },
//   { name: 'Apr', up: 2780, le: 3908 },
//   { name: 'May', up: 1890, le: 4800 },
//   { name: 'Jun', up: 2390, le: 3800 },
//   { name: 'Jul', up: 3490, le: 4300 },
// ];

export type ChartAnalyticsType = {
     name: string, 
     upskill: number; 
     lesson: number;
}

type Props = {
    data: ChartAnalyticsType[]
}

const LineChartComponent = ({ data }: Props) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="lesson" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="upskill" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    )
}

export default LineChartComponent;
