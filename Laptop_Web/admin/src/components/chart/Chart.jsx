import "./chart.scss"
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useFetch from "../../hooks/useFetch";



export const Chart = ({ aspect, title }) => {
  const { data, loading, error } = useFetch("/admin/orders/revenue/6-months");
  return (
    <div className="chart">
      {loading ? ("Loading ") : (<>
        <div className="title">{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect}>
          <AreaChart width={730} height={250} data={data.dataRevenue}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />
            <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
          </AreaChart>
        </ResponsiveContainer></>)}
    </div>
  )
}
