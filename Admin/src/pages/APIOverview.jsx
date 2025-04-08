// pages/APIOverview.jsx
import React from "react";

const apiList = [
  {
    name: "Users",
    method: "GET",
    endpoint: "/api/users",
    description: "Lấy danh sách người dùng",
  },
  {
    name: "Products",
    method: "POST",
    endpoint: "/api/products",
    description: "Tạo sản phẩm mới",
  },
  {
    name: "Orders",
    method: "PUT",
    endpoint: "/api/orders/:id",
    description: "Cập nhật đơn hàng",
  },
];

export default function APIOverview() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">API Overview</h2>
      <div className="space-y-4">
        {apiList.map((api, index) => (
          <div key={index} className="border p-4 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-bold text-pink-500">{api.name}</h3>
            <p className="text-gray-700">{api.description}</p>
            <p className="mt-1 text-sm">
              <span className="font-medium">Method:</span> {api.method}
            </p>
            <p className="text-sm">
              <span className="font-medium">Endpoint:</span>{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded">
                {api.endpoint}
              </code>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
