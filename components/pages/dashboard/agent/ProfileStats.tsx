import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudCheck, PhoneCall, Timer, Users } from "lucide-react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
  ResponsiveContainer,
  BarChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ProfileStats = () => {
  const callHistory = [
    { date: "2025-10-24", totalCalls: 20, successfulCalls: 12 },
    { date: "2025-10-25", totalCalls: 18, successfulCalls: 9 },
    { date: "2025-10-26", totalCalls: 25, successfulCalls: 15 },
    { date: "2025-10-27", totalCalls: 22, successfulCalls: 16 },
    { date: "2025-10-28", totalCalls: 30, successfulCalls: 20 },
    { date: "2025-10-29", totalCalls: 28, successfulCalls: 18 },
    { date: "2025-10-30", totalCalls: 26, successfulCalls: 14 },
    { date: "2025-10-31", totalCalls: 24, successfulCalls: 12 },
    { date: "2025-11-01", totalCalls: 27, successfulCalls: 19 },
    { date: "2025-11-02", totalCalls: 29, successfulCalls: 21 },
  ];

  const dataWithRatio = callHistory.map((item) => ({
    ...item,
    successRatio: Math.round((item.successfulCalls / item.totalCalls) * 100),
  }));

  const orderHistory = [
    {
      date: "2025-10-24",
      pending: 5,
      processed: 10,
      shipped: 8,
      delivered: 6,
      cancelled: 1,
    },
    {
      date: "2025-10-25",
      pending: 3,
      processed: 12,
      shipped: 9,
      delivered: 7,
      cancelled: 2,
    },
    {
      date: "2025-10-26",
      pending: 4,
      processed: 15,
      shipped: 10,
      delivered: 9,
      cancelled: 1,
    },
    {
      date: "2025-10-27",
      pending: 2,
      processed: 14,
      shipped: 12,
      delivered: 10,
      cancelled: 0,
    },
    {
      date: "2025-10-28",
      pending: 6,
      processed: 18,
      shipped: 15,
      delivered: 12,
      cancelled: 2,
    },
    {
      date: "2025-10-29",
      pending: 3,
      processed: 16,
      shipped: 13,
      delivered: 11,
      cancelled: 1,
    },
    {
      date: "2025-10-30",
      pending: 4,
      processed: 14,
      shipped: 12,
      delivered: 10,
      cancelled: 0,
    },
    {
      date: "2025-10-31",
      pending: 2,
      processed: 13,
      shipped: 10,
      delivered: 9,
      cancelled: 1,
    },
    {
      date: "2025-11-01",
      pending: 5,
      processed: 17,
      shipped: 14,
      delivered: 12,
      cancelled: 2,
    },
    {
      date: "2025-11-02",
      pending: 3,
      processed: 16,
      shipped: 13,
      delivered: 11,
      cancelled: 0,
    },
  ];

  const totalOrders = orderHistory.reduce(
    (acc, day) => ({
      pending: acc.pending + day.pending,
      processed: acc.processed + day.processed,
      shipped: acc.shipped + day.shipped,
      delivered: acc.delivered + day.delivered,
      cancelled: acc.cancelled + day.cancelled,
    }),
    { pending: 0, processed: 0, shipped: 0, delivered: 0, cancelled: 0 }
  );

  // 2️⃣ Prepare data for PieChart
  const pieData = Object.entries(totalOrders).map(([stage, value]) => ({
    name: stage,
    value,
  }));

  const COLORS = ["#FACC15", "#3B82F6", "#2563EB", "#22C55E", "#EF4444"];

  return (
    <section className="w-full lg:max-w-4xl space-y-6">
      {/* card section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
        <Card className="bg-white border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-1">500</h3>
              <p className="text-sm text-gray-500">Total Customer</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-white border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-1">1,000</h3>
              <p className="text-sm text-gray-500">Total Call</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
              <PhoneCall className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-white border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-1">2 min</h3>
              <p className="text-sm text-gray-500">Avarage call duration</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Timer className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-white border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-1">55%</h3>
              <p className="text-sm text-gray-500">Success Ratio</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <CloudCheck className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* rechart section */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Agent Call History (Last 10 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={dataWithRatio}>
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="totalCalls"
                  fill="#FACC15"
                  name="Total Calls"
                />
                <Bar
                  yAxisId="left"
                  dataKey="successfulCalls"
                  fill="#22C55E"
                  name="Successful Calls"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="successRatio"
                  stroke="#2563EB"
                  name="Success %"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Agent Order Process History (Last 10 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderHistory}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="pending"
                  stackId="a"
                  fill="#FACC15"
                  name="Pending"
                />
                <Bar
                  dataKey="processed"
                  stackId="a"
                  fill="#3B82F6"
                  name="Processed"
                />
                <Bar
                  dataKey="shipped"
                  stackId="a"
                  fill="#2563EB"
                  name="Shipped"
                />
                <Bar
                  dataKey="delivered"
                  stackId="a"
                  fill="#22C55E"
                  name="Delivered"
                />
                <Bar
                  dataKey="cancelled"
                  stackId="a"
                  fill="#EF4444"
                  name="Cancelled"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Process Distribution (Last 10 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProfileStats;
