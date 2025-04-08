import React, { useState } from "react";

export default function DataTable({ data }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-pink-100">
            <th className="p-2">ID</th>
            <th className="p-2">Tên</th>
            <th className="p-2">Email</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-md w-[400px] shadow-lg">
            <h2 className="text-lg font-bold mb-2">Chỉnh sửa người dùng</h2>
            <p className="text-sm text-gray-700 mb-4">ID: {selectedUser.id}</p>
            <input
              defaultValue={selectedUser.name}
              className="w-full mb-2 border p-2 rounded"
            />
            <input
              defaultValue={selectedUser.email}
              className="w-full mb-4 border p-2 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  // handle save here
                  setSelectedUser(null);
                }}
                className="px-4 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
