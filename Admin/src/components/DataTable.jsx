import React from "react";

export default function DataTable({ data }) {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-pink-100 text-left">
          <th className="px-4 py-2 border">ID</th>
          <th className="px-4 py-2 border">Tên</th>
          <th className="px-4 py-2 border">Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-100">
            <td className="px-4 py-2 border">{item.id}</td>
            <td className="px-4 py-2 border">{item.name}</td>
            <td className="px-4 py-2 border">{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
