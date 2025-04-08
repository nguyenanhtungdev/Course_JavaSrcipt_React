import React, { useState, useEffect } from "react";
import EditModal from "./EditModal";
import AddModal from "./AddModal";

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(null);
  const [addModal, setAddModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const handleSave = (updated) => {
    setOrders((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Detailed Report</h2>
        <div className="space-x-2">
          <button
            className="border border-pink-500 text-pink-500 px-4 py-1 rounded hover:bg-pink-500 hover:text-white"
            onClick={() => setAddModal(true)}
          >
            + Add User
          </button>
          <button className="border border-pink-500 text-pink-500 px-4 py-1 rounded hover:bg-pink-500 hover:text-white">
            Import
          </button>
          <button className="border border-pink-500 text-pink-500 px-4 py-1 rounded hover:bg-pink-500 hover:text-white">
            Export
          </button>
        </div>
      </div>

      {/* Table */}
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
            <tr key={row.id} className="bg-gray-50">
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

      {/* Modals */}
      {editing && (
        <EditModal
          data={editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
      {addModal && (
        <AddModal
          onClose={() => setAddModal(false)}
          onAdd={(newUser) => setOrders((prev) => [newUser, ...prev])}
        />
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border text-sm hover:bg-gray-100 disabled:text-gray-400"
        >
          &lt; Prev
        </button>

        {renderPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === page
                  ? "bg-pink-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border text-sm hover:bg-gray-100 disabled:text-gray-400"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
}
