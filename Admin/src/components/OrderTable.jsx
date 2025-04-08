import React, { useState, useEffect } from "react";
import EditModal from "./EditModal";
import AddModal from "./AddModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = () => {
    setExporting(true);

    setTimeout(() => {
      const headers = ["Name", "Company", "Value", "Date", "Status"];
      const rows = orders.map((u) => [
        `"${u.name}"`,
        `"${u.company}"`,
        `"${u.value}"`,
        `"${u.date}"`,
        `"${u.status}"`,
      ]);

      const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers, ...rows].map((e) => e.join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `users_export_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Export thành công!");
      setExporting(false);
    }, 1200);
  };

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
    toast.success("Updated successfully!");
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedOrders.map((row) => row.id));
    }
    setSelectAll(!selectAll);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white shadow-lg rounded-lg border border-gray-100"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <motion.h2
          className="text-2xl font-bold text-gray-800"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          Detailed Report
        </motion.h2>
        <div className="space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
            onClick={() => setAddModal(true)}
          >
            + Add User
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-pink-500 text-pink-500 px-4 py-2 rounded-lg hover:bg-pink-50 transition-all duration-300 font-medium"
          >
            Import
          </motion.button>
          <motion.button
            whileHover={!exporting ? { scale: 1.05 } : {}}
            whileTap={!exporting ? { scale: 0.95 } : {}}
            onClick={handleExport}
            disabled={exporting}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              exporting
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "border border-pink-500 text-pink-500 hover:bg-pink-50"
            }`}
          >
            {exporting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-pink-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Exporting...
              </span>
            ) : (
              "Export"
            )}
          </motion.button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg shadow">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead className="text-sm bg-gray-50">
            <tr>
              <th className="py-3 px-4 border-b border-gray-200">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 accent-pink-500 cursor-pointer"
                />
              </th>
              <th className="py-3 px-4 border-b border-gray-200">
                Customer Name
              </th>
              <th className="py-3 px-4 border-b border-gray-200">Company</th>
              <th className="py-3 px-4 border-b border-gray-200">
                Order Value
              </th>
              <th className="py-3 px-4 border-b border-gray-200">Order Date</th>
              <th className="py-3 px-4 border-b border-gray-200">Status</th>
              <th className="py-3 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((row, index) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`${
                  selectedRows.includes(row.id) ? "bg-pink-50" : "bg-white"
                } hover:bg-gray-50 transition-colors duration-150`}
              >
                <td className="py-3 px-4 border-b border-gray-100">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                    className="w-4 h-4 accent-pink-500 cursor-pointer"
                  />
                </td>
                <td className="flex items-center gap-3 py-3 px-4 border-b border-gray-100">
                  <div className="relative">
                    <img
                      src={row.avatar}
                      alt={row.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        row.status === "New"
                          ? "bg-blue-500"
                          : row.status === "In-progress"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    ></span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{row.name}</div>
                    <div className="text-xs text-gray-500">ID: {row.id}</div>
                  </div>
                </td>
                <td className="py-3 px-4 border-b border-gray-100">
                  {row.company}
                </td>
                <td className="py-3 px-4 border-b border-gray-100 font-medium">
                  {row.value}
                </td>
                <td className="py-3 px-4 border-b border-gray-100">
                  {row.date}
                </td>
                <td className="py-3 px-4 border-b border-gray-100">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      row.status === "New"
                        ? "bg-blue-100 text-blue-700"
                        : row.status === "In-progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b border-gray-100">
                  <button
                    onClick={() => setEditing(row)}
                    className="text-pink-500 hover:text-pink-700 transition-colors duration-150 flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

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
          onAdd={(newUser) => {
            setOrders((prev) => [newUser, ...prev]);
            toast.success("User added successfully!");
          }}
        />
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, orders.length)} of{" "}
          {orders.length} entries
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border text-sm hover:bg-gray-50 transition-colors duration-150 disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            &lt; Prev
          </motion.button>

          {renderPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <motion.button
                key={page}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm transition-all duration-150 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </motion.button>
            )
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border text-sm hover:bg-gray-50 transition-colors duration-150 disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            Next &gt;
          </motion.button>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </motion.div>
  );
}
