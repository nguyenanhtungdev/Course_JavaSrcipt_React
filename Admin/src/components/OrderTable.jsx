import React, { useState, useEffect } from "react";
import EditModal from "./EditModal";

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=100")
      .then((res) => res.json())
      .then((data) => {
        const transformed = data.users.map((user) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          company: user.company.name,
          value: `$${Math.floor(Math.random() * 1000)}`,
          date: new Date().toISOString().slice(0, 10),
          status: ["New", "In-progress", "Completed"][
            Math.floor(Math.random() * 3)
          ],
          avatar: user.image,
        }));
        setOrders(transformed);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, endIndex);

  const handleSave = (updated) => {
    setOrders((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Detailed Report</h2>
        <div className="space-x-2">
          <button className="border border-pink-500 text-pink-500 px-4 py-1 rounded hover:bg-pink-500 hover:text-white">
            Import
          </button>
          <button className="border border-pink-500 text-pink-500 px-4 py-1 rounded hover:bg-pink-500 hover:text-white">
            Export
          </button>
        </div>
      </div>

      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead className="text-sm text-gray-500">
          <tr>
            <th />
            <th>Customer Name</th>
            <th>Company</th>
            <th>Order Value</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((row) => (
            <tr key={row.id} className="bg-gray-50 x`">
              <td className="py-2 pl-4">
                <input type="checkbox" />
              </td>
              <td className="flex items-center gap-2 py-2">
                <img
                  src={row.avatar}
                  alt={row.name}
                  className="w-8 h-8 rounded-full"
                />
                {row.name}
              </td>
              <td>{row.company}</td>
              <td>{row.value}</td>
              <td>{row.date}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    row.status === "New"
                      ? "bg-blue-100 text-blue-600"
                      : row.status === "In-progress"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td>
                <button
                  onClick={() => setEditing(row)}
                  className="text-pink-500 hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <EditModal
          data={editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}

      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border text-sm hover:bg-gray-100 disabled:text-gray-400"
        >
          &lt; Prev
        </button>

        {[...Array(Math.ceil(orders.length / itemsPerPage)).keys()].map((i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded text-sm ${
              currentPage === i + 1
                ? "bg-pink-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(orders.length / itemsPerPage))
            )
          }
          disabled={currentPage === Math.ceil(orders.length / itemsPerPage)}
          className="px-3 py-1 rounded border text-sm hover:bg-gray-100 disabled:text-gray-400"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
}
