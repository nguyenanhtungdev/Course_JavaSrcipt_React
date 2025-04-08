import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Search,
  ChevronDown,
  ChevronRight,
  Globe,
  Copy,
  Check,
} from "lucide-react";

export default function APIOverview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedApi, setExpandedApi] = useState(null);
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);

  const apiList = [
    {
      name: "Users",
      method: "GET",
      endpoint: "/api/users",
      description: "Lấy danh sách người dùng",
      parameters: [
        { name: "page", type: "number", description: "Số trang" },
        { name: "limit", type: "number", description: "Số lượng mỗi trang" },
      ],
      response: {
        code: 200,
        data: `{
  "users": [
    {
      "id": 1,
      "name": "Nguyễn Văn A",
      "email": "nguyenvana@example.com"
    },
    {
      "id": 2,
      "name": "Trần Thị B",
      "email": "tranthib@example.com"
    }
  ],
  "total": 2,
  "page": 1,
  "limit": 10
}`,
      },
    },
    {
      name: "Products",
      method: "POST",
      endpoint: "/api/products",
      description: "Tạo sản phẩm mới",
      parameters: [
        {
          name: "name",
          type: "string",
          description: "Tên sản phẩm",
          required: true,
        },
        {
          name: "price",
          type: "number",
          description: "Giá sản phẩm",
          required: true,
        },
        { name: "description", type: "string", description: "Mô tả sản phẩm" },
      ],
      response: {
        code: 201,
        data: `{
  "id": 1,
  "name": "Sản phẩm mới",
  "price": 100000,
  "description": "Mô tả sản phẩm",
  "createdAt": "2025-04-08T12:00:00Z"
}`,
      },
    },
    {
      name: "Orders",
      method: "PUT",
      endpoint: "/api/orders/:id",
      description: "Cập nhật đơn hàng",
      parameters: [
        {
          name: "id",
          type: "number",
          description: "ID đơn hàng",
          required: true,
        },
        {
          name: "status",
          type: "string",
          description: "Trạng thái đơn hàng",
          required: true,
        },
        { name: "notes", type: "string", description: "Ghi chú đơn hàng" },
      ],
      response: {
        code: 200,
        data: `{
  "id": 1,
  "status": "completed",
  "notes": "Đã giao hàng thành công",
  "updatedAt": "2025-04-08T15:30:00Z"
}`,
      },
    },
    {
      name: "Categories",
      method: "GET",
      endpoint: "/api/categories",
      description: "Lấy danh sách danh mục",
      parameters: [],
      response: {
        code: 200,
        data: `{
  "categories": [
    {
      "id": 1,
      "name": "Điện thoại"
    },
    {
      "id": 2,
      "name": "Laptop"
    }
  ]
}`,
      },
    },
  ];

  const getMethodColor = (method) => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-700 border-green-200";
      case "POST":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "PUT":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "DELETE":
        return "bg-red-100 text-red-700 border-red-200";
      case "PATCH":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredApis = apiList.filter(
    (api) =>
      api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (index) => {
    if (expandedApi === index) {
      setExpandedApi(null);
    } else {
      setExpandedApi(index);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(index);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Globe className="text-pink-500 mr-2" size={24} />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              API Overview
            </h2>
          </div>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Tìm kiếm API..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 ease-in-out text-sm"
            />
          </div>
        </div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredApis.length > 0 ? (
            filteredApis.map((api, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                variants={itemVariants}
              >
                <div
                  className="p-4 cursor-pointer flex items-center justify-between"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 mr-3 text-xs font-medium rounded-full border ${getMethodColor(
                        api.method
                      )}`}
                    >
                      {api.method}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {api.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{api.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center bg-gray-100 rounded-md px-3 py-1 mr-3">
                      <Code size={14} className="text-gray-500 mr-1" />
                      <code className="text-sm font-mono text-gray-700">
                        {api.endpoint}
                      </code>
                      <button
                        className="ml-2 focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(api.endpoint, index);
                        }}
                      >
                        {copiedEndpoint === index ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <Copy
                            size={14}
                            className="text-gray-500 hover:text-gray-700"
                          />
                        )}
                      </button>
                    </div>
                    {expandedApi === index ? (
                      <ChevronDown size={20} className="text-gray-500" />
                    ) : (
                      <ChevronRight size={20} className="text-gray-500" />
                    )}
                  </div>
                </div>

                {expandedApi === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-4 border-t border-gray-100 pt-3"
                  >
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Tham số
                      </h4>
                      {api.parameters.length > 0 ? (
                        <div className="bg-gray-50 rounded-md overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Tên
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Kiểu
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Mô tả
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Bắt buộc
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {api.parameters.map((param, paramIndex) => (
                                <tr key={paramIndex}>
                                  <td className="px-4 py-2 text-sm font-mono text-gray-700">
                                    {param.name}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-700">
                                    {param.type}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-700">
                                    {param.description}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-700">
                                    {param.required ? (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        Có
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        Không
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Không có tham số
                        </p>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Phản hồi
                      </h4>
                      <div className="relative">
                        <div className="absolute top-2 right-2 flex items-center space-x-1">
                          <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-800">
                            {api.response.code}
                          </span>
                          <button
                            className="p-1 hover:bg-gray-200 rounded focus:outline-none"
                            onClick={() =>
                              copyToClipboard(
                                api.response.data,
                                `response-${index}`
                              )
                            }
                          >
                            {copiedEndpoint === `response-${index}` ? (
                              <Check size={14} className="text-green-500" />
                            ) : (
                              <Copy size={14} className="text-gray-500" />
                            )}
                          </button>
                        </div>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm font-mono">
                          {api.response.data}
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <Search size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Không tìm thấy API phù hợp</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
