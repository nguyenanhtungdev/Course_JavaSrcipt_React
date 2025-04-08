import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#f59e0b", "#10b981"];
const STATUS_ICONS = {
  New: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  ),
  "In-progress": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  Completed: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  ),
};

const STATUS_GRADIENTS = {
  New: "from-indigo-50 to-indigo-100",
  "In-progress": "from-amber-50 to-amber-100",
  Completed: "from-emerald-50 to-emerald-100",
};

const STATUS_COLORS = {
  New: "text-indigo-600 bg-indigo-100",
  "In-progress": "text-amber-600 bg-amber-100",
  Completed: "text-emerald-600 bg-emerald-100",
};

export default function AnalyticsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/users?limit=100")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.users.map((user) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          status: ["New", "In-progress", "Completed"][
            Math.floor(Math.random() * 3)
          ],
          date: `2024-04-${(user.id % 10) + 1}`,
        }));
        setUsers(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải dữ liệu:", err);
        setLoading(false);
      });
  }, []);

  const countByStatus = {
    New: users.filter((u) => u.status === "New").length,
    "In-progress": users.filter((u) => u.status === "In-progress").length,
    Completed: users.filter((u) => u.status === "Completed").length,
  };

  const pieData = Object.entries(countByStatus).map(([name, value]) => ({
    name,
    value,
  }));

  const lineData = Array.from({ length: 10 }, (_, i) => {
    const day = `2024-04-${i + 1}`;
    const count = users.filter((u) => u.date === day).length;
    return { date: `${i + 1}/4`, users: count };
  });

  const formatVietnameseStatus = (status) => {
    switch (status) {
      case "New":
        return "Mới";
      case "In-progress":
        return "Đang xử lý";
      case "Completed":
        return "Hoàn thành";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <span className="mr-2">📊</span>
            Bảng Điều Khiển Phân Tích
          </h1>
          <p className="text-gray-500 mt-1">Tổng quan hiệu suất và hoạt động</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Xuất Báo Cáo
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(countByStatus).map(([label, value]) => (
          <div
            key={label}
            className={`bg-gradient-to-br ${STATUS_GRADIENTS[label]} p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${STATUS_COLORS[label]} p-3 rounded-full`}>
                {STATUS_ICONS[label]}
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[label]}`}
              >
                {formatVietnameseStatus(label)}
              </span>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-800">{value}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {value === 1 ? "người dùng" : "người dùng"}
              </p>
            </div>
          </div>
        ))}

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="text-purple-600 bg-purple-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full text-purple-600 bg-purple-100">
              Tổng số
            </span>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-gray-800">{users.length}</h3>
            <p className="text-sm text-gray-500 mt-1">người dùng</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Tỉ lệ trạng thái
            </h2>
            <div className="bg-gray-100 rounded-lg p-1">
              <button className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-md">
                Tháng này
              </button>
              <button className="text-xs px-3 py-1 text-gray-600">
                Năm nay
              </button>
            </div>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  innerRadius={60}
                  paddingAngle={5}
                  label={({ name, percent }) =>
                    `${formatVietnameseStatus(name)}: ${(percent * 100).toFixed(
                      0
                    )}%`
                  }
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    value,
                    formatVietnameseStatus(name),
                  ]}
                />
                <Legend formatter={(value) => formatVietnameseStatus(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Phân bố trạng thái
            </h2>
            <div className="p-1 bg-gray-100 rounded-lg">
              <button className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-md">
                Chi tiết
              </button>
              <button className="text-xs px-3 py-1 text-gray-600">
                Tổng quan
              </button>
            </div>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <BarChart data={pieData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => formatVietnameseStatus(value)}
                />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(value, name) => [
                    value,
                    formatVietnameseStatus(name),
                  ]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {pieData.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Người dùng theo ngày
          </h2>
          <div className="flex gap-2">
            <select className="bg-gray-100 border-0 text-sm rounded-lg px-3 py-2 text-gray-600 focus:ring-2 focus:ring-indigo-300 outline-none">
              <option>Tháng 4, 2024</option>
              <option>Tháng 3, 2024</option>
              <option>Tháng 2, 2024</option>
            </select>
            <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full h-72">
          <ResponsiveContainer>
            <LineChart
              data={lineData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.5}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  padding: "8px 12px",
                }}
                formatter={(value) => [`${value} người dùng`, "Số lượng"]}
                labelFormatter={(label) => `Ngày ${label}`}
              />
              <Line
                type="monotone"
                dataKey="users"
                strokeWidth={3}
                stroke="#6366f1"
                dot={{ stroke: "#6366f1", strokeWidth: 2, r: 4, fill: "white" }}
                activeDot={{
                  stroke: "#6366f1",
                  strokeWidth: 2,
                  r: 6,
                  fill: "#6366f1",
                }}
              />
              <Legend formatter={() => "Người dùng mới"} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Người dùng gần đây
          </h2>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition flex items-center">
            Xem tất cả
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.slice(0, 5).map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        user.status === "New"
                          ? "bg-indigo-100 text-indigo-800"
                          : user.status === "In-progress"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {formatVietnameseStatus(user.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
