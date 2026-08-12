import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ViolationChart({ data }) {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-slate-800 rounded-xl p-5 shadow-lg h-80">
      <h2 className="text-white text-xl font-semibold mb-4">
        Violation Distribution
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <CartesianGrid stroke="#374151" />

          <XAxis dataKey="name" stroke="#fff" />

          <YAxis stroke="#fff" />

          <Tooltip />

          <Bar dataKey="value" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}