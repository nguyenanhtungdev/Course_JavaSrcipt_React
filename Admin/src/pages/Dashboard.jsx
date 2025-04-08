// src/pages/Dashboard.jsx
import React, { useState } from "react";
import Pagination from "../components/Pagination";
import EditModal from "../components/EditModal";

export default function Dashboard() {
  const initialUsers = [
    {
      id: 1,
      name: "Elizabeth Lee",
      company: "AvatarSystems",
      value: "$359",
      date: "10/07/2023",
      status: "New",
      img: 1,
    },
    {
      id: 2,
      name: "Carlos Garcia",
      company: "SmoozeShift",
      value: "$747",
      date: "24/07/2023",
      status: "New",
      img: 2,
    },
    {
      id: 6,
      name: "Hailey Adams",
      company: "FlowRush Inc.",
      value: "$922",
      date: "10/06/2023",
      status: "Completed",
      img: 6,
    },
  ];

  const statusColor = {
    New: "bg-blue-100 text-blue-600",
    "In-progress": "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-600",
  };

  const [users, setUsers] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 11;

  // State để lưu user đang được chỉnh sửa
  const [editing, setEditing] = useState(null);

  // Hàm cập nhật thông tin user sau khi lưu từ modal
  const handleSave = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className="p-6 space-y-8">
      {/* OVERVIEW */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-pink-100 p-6 rounded shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Turnover</h3>
          <p className="text-2xl font-bold">$92,405</p>
          <p className="text-green-600 text-sm mt-1">
            ▲ 5.39% period of change
          </p>
        </div>
        <div className="bg-blue-100 p-6 rounded shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Profit</h3>
          <p className="text-2xl font-bold">$32,218</p>
          <p className="text-green-600 text-sm mt-1">
            ▲ 5.39% period of change
          </p>
        </div>
        <div className="bg-blue-100 p-6 rounded shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">
            New customer
          </h3>
          <p className="text-2xl font-bold">298</p>
          <p className="text-green-600 text-sm mt-1">
            ▲ 6.84% period of change
          </p>
        </div>
      </section>

      {/* REPORT */}
      <section className="bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Detailed report</h2>
          <div className="space-x-2">
            <button className="border border-pink-500 text-pink-500 px-4 py-1 rounded hover:bg-pink-50">
              Import
            </button>
            <button className="border border-pink-500 text-pink-500 px-4 py-1 rounded hover:bg-pink-50">
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th></th>
                <th className="py-2">Customer Name</th>
                <th>Company</th>
                <th>Order Value</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-1">
                    <input type="checkbox" />
                  </td>
                  <td className="flex items-center gap-2 py-3">
                    <img
                      src={`https://i.pravatar.cc/32?img=${user.img}`}
                      className="rounded-full"
                      alt={user.name}
                    />
                    {user.name}
                  </td>
                  <td>{user.company}</td>
                  <td>{user.value}</td>
                  <td>{user.date}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        statusColor[user.status]
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setEditing(user)}
                      className="text-pink-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {editing && (
        <EditModal
          data={editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
