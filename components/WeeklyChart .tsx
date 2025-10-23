import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const WeeklyChart = ({ weeklyData }: HistoryProps) => {
  return (
    <div className="bg-blue-950 p-6 rounded-2xl shadow-lg w-full max-w-2xl">
      <h2 className="text-blue-200 text-xl font-semibold mb-4">Weekly Water Intake</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={weeklyData}>
          <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
          <XAxis dataKey="day" stroke="#93C5FD" />
          <YAxis stroke="#93C5FD" />
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: 'none' }} />
          <Line type="monotone" dataKey="glasses" stroke="#3B82F6" strokeWidth={3} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeeklyChart 