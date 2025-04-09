import { useState, useEffect } from "react";
import {
  Code,
  Send,
  ChevronsRight,
  Cpu,
  Save,
  Copy,
  X,
  Download,
  RefreshCw,
  Clock,
  Trash2,
  AlertCircle,
} from "lucide-react";

export default function APIPlayground() {
  const [request, setRequest] = useState({
    method: "GET",
    endpoint: "/api/users",
    headers: '{\n  "Content-Type": "application/json"\n}',
    body: '{\n  "name": "Tên người dùng",\n  "email": "email@example.com"\n}',
  });

  const [response, setResponse] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [saved, setSaved] = useState([]);
  const [activeTab, setActiveTab] = useState("request");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [historyVisible, setHistoryVisible] = useState(true);
  const [savedVisible, setSavedVisible] = useState(true);

  useEffect(() => {
    // Hiệu ứng khi component mount
    document.querySelector(".header-container").classList.add("slide-down");
    document.querySelector(".main-container").classList.add("fade-in");
  }, []);

  const handleSend = () => {
    setLoading(true);
    const startTime = new Date().getTime();

    // Validate input
    try {
      if (request.method !== "GET" && request.body) {
        JSON.parse(request.body);
      }
      if (request.headers) {
        JSON.parse(request.headers);
      }
    } catch (e) {
      setToastMessage("JSON không hợp lệ: " + e.message);
      setToastType("error");
      setShowToast(true);
      setLoading(false);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    // Giả lập API call
    setTimeout(() => {
      const endTime = new Date().getTime();
      setResponseTime(endTime - startTime);

      // Tạo phản hồi giả lập dựa vào endpoint và method
      let mockResponse;

      if (request.endpoint.includes("/users")) {
        if (request.method === "GET") {
          mockResponse = {
            status: 200,
            statusText: "OK",
            data: [
              { id: 1, name: "Nguyễn Văn A", email: "nva@example.com" },
              { id: 2, name: "Trần Thị B", email: "ttb@example.com" },
            ],
          };
        } else if (request.method === "POST") {
          const body = tryParseJSON(request.body);
          mockResponse = {
            status: 201,
            statusText: "Created",
            data: { id: 3, ...body },
          };
        } else if (request.method === "DELETE") {
          mockResponse = {
            status: 204,
            statusText: "No Content",
            data: null,
          };
        }
      } else if (request.endpoint.includes("/products")) {
        if (request.method === "GET") {
          mockResponse = {
            status: 200,
            statusText: "OK",
            data: [
              { id: 1, name: "Sản phẩm A", price: 100000 },
              { id: 2, name: "Sản phẩm B", price: 200000 },
            ],
          };
        } else if (request.method === "POST") {
          mockResponse = {
            status: 201,
            statusText: "Created",
            data: { id: 3, name: "Sản phẩm mới", price: 150000 },
          };
        }
      } else if (request.endpoint.includes("/orders")) {
        if (request.method === "PUT") {
          mockResponse = {
            status: 200,
            statusText: "OK",
            data: { message: "Cập nhật đơn hàng thành công" },
          };
        } else if (request.method === "GET") {
          mockResponse = {
            status: 200,
            statusText: "OK",
            data: [
              { id: 1, userId: 1, total: 250000, status: "completed" },
              { id: 2, userId: 2, total: 175000, status: "pending" },
            ],
          };
        }
      } else {
        mockResponse = {
          status: 404,
          statusText: "Not Found",
          data: { error: "Không tìm thấy endpoint" },
        };
      }

      setResponse(mockResponse);
      setLoading(false);

      // Thêm vào lịch sử
      const historyItem = {
        id: Date.now(),
        method: request.method,
        endpoint: request.endpoint,
        response: mockResponse,
        time: new Date().toLocaleTimeString(),
        responseTime: endTime - startTime,
      };

      setHistory((prev) => [historyItem, ...prev].slice(0, 10));

      // Animation for response panel
      const responsePanel = document.querySelector(".response-panel");
      responsePanel.classList.add("highlight-animation");
      setTimeout(() => {
        responsePanel.classList.remove("highlight-animation");
      }, 1000);
    }, 800);
  };

  const tryParseJSON = (jsonString) => {
    try {
      return JSON.parse(jsonString);
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      return {};
    }
  };

  const formatJSON = (json) => {
    try {
      return JSON.stringify(json, null, 2);
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      return String(json);
    }
  };

  const saveRequest = () => {
    const savedItem = {
      id: Date.now(),
      name: `${request.method} ${request.endpoint}`,
      request: { ...request },
    };

    setSaved((prev) => [savedItem, ...prev]);
    setToastMessage("Đã lưu request thành công!");
    setToastType("success");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const loadSavedRequest = (savedItem) => {
    setRequest(savedItem.request);
    setToastMessage("Đã tải request thành công!");
    setToastType("success");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setToastMessage("Đã sao chép vào clipboard!");
    setToastType("success");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const clearHistory = () => {
    setHistory([]);
    setToastMessage("Đã xóa lịch sử!");
    setToastType("info");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getMethodColor = (method) => {
    switch (method) {
      case "GET":
        return "bg-emerald-100 text-emerald-800";
      case "POST":
        return "bg-blue-100 text-blue-800";
      case "PUT":
        return "bg-amber-100 text-amber-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    if (status < 300) return "bg-emerald-100 text-emerald-800";
    if (status < 400) return "bg-amber-100 text-amber-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header with animated gradient */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white shadow-lg header-container">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Code className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">API Testing Playground</h1>
          </div>
          <p className="text-indigo-100 mt-2 max-w-2xl">
            Một công cụ trực quan để kiểm thử, debug và tìm hiểu API endpoints
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 main-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Saved Requests & History */}
          <div className="col-span-1 space-y-6">
            {/* Saved Requests */}
            <div className="bg-white rounded-xl  shadow-md overflow-hidden border border-gray-100 transform transition-all hover:shadow-lg">
              <div
                className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b-gray-200 flex justify-between items-center cursor-pointer"
                onClick={() => setSavedVisible(!savedVisible)}
              >
                <h2 className="font-medium text-gray-700 flex items-center">
                  <Save className="h-4 w-4 mr-2 text-indigo-600" />
                  Request đã lưu
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      saveRequest();
                    }}
                    className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors flex items-center"
                  >
                    <Save className="h-3 w-3 mr-1" />
                    Lưu hiện tại
                  </button>
                </div>
              </div>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  savedVisible ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-4">
                  {saved.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      <Save className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>Chưa có request nào được lưu</p>
                      <p className="mt-2 text-xs">
                        Bạn có thể lưu request để sử dụng lại sau
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {saved.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all transform hover:scale-[1.02] border border-gray-100"
                          onClick={() => loadSavedRequest(item)}
                        >
                          <div>
                            <div className="flex items-center">
                              <span
                                className={`text-xs px-2.5 py-1 rounded-full font-medium ${getMethodColor(
                                  item.request.method
                                )}`}
                              >
                                {item.request.method}
                              </span>
                              <span className="ml-2 text-sm font-medium truncate max-w-xs">
                                {item.request.endpoint}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSaved(saved.filter((s) => s.id !== item.id));
                              setToastMessage("Đã xóa request!");
                              setToastType("info");
                              setShowToast(true);
                              setTimeout(() => setShowToast(false), 3000);
                            }}
                            className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* History */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transform transition-all hover:shadow-lg">
              <div
                className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b-gray-200 flex justify-between items-center cursor-pointer"
                onClick={() => setHistoryVisible(!historyVisible)}
              >
                <h2 className="font-medium text-gray-700 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-indigo-600" />
                  Lịch sử gần đây
                </h2>
                {history.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearHistory();
                    }}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Xóa
                  </button>
                )}
              </div>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  historyVisible ? "max-h-[28rem]" : "max-h-0"
                }`}
              >
                <div className="p-4">
                  {history.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>Chưa có lịch sử nào</p>
                      <p className="mt-2 text-xs">Gửi request để xem lịch sử</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                      {history.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all transform hover:scale-[1.01] border border-gray-100"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span
                                className={`text-xs px-2.5 py-1 rounded-full font-medium ${getMethodColor(
                                  item.method
                                )}`}
                              >
                                {item.method}
                              </span>
                              <span className="ml-2 text-sm font-medium truncate max-w-xs">
                                {item.endpoint}
                              </span>
                            </div>
                            <span
                              className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(
                                item.response.status
                              )}`}
                            >
                              {item.response.status}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-200 pt-2">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.time}
                            </span>
                            <span className="flex items-center">
                              <RefreshCw className="h-3 w-3 mr-1" />
                              {item.responseTime}ms
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Panel */}
          <div className="col-span-2 space-y-6">
            {/* API Request Panel */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 border border-gray-100 transform transition-all hover:shadow-lg">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b-gray-300">
                <h2 className="font-medium text-gray-700 flex items-center">
                  <Send className="h-4 w-4 mr-2 text-indigo-600" />
                  Request Builder
                </h2>
              </div>

              <div className="p-4">
                <div className="flex mb-4 items-stretch">
                  <select
                    value={request.method}
                    onChange={(e) =>
                      setRequest({ ...request, method: e.target.value })
                    }
                    className={`${getMethodColor(
                      request.method
                    )} border border-gray-200 py-2 px-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium transition-colors`}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                  <input
                    type="text"
                    value={request.endpoint}
                    onChange={(e) =>
                      setRequest({ ...request, endpoint: e.target.value })
                    }
                    placeholder="API Endpoint (e.g. /api/users)"
                    className="flex-1 border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading}
                    className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-2 px-5 rounded-r-lg hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center space-x-2 disabled:opacity-70 transition-all transform hover:translate-y-[-1px] active:translate-y-[1px] shadow-md"
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span>Gửi</span>
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex space-x-2 mb-3">
                    <button
                      className={`text-sm px-4 py-2 rounded-lg transition-all ${
                        activeTab === "request"
                          ? "bg-indigo-100 text-indigo-700 shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTab("request")}
                    >
                      Headers
                    </button>
                    <button
                      className={`text-sm px-4 py-2 rounded-lg transition-all ${
                        activeTab === "body"
                          ? "bg-indigo-100 text-indigo-700 shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTab("body")}
                    >
                      Body
                    </button>
                  </div>

                  {activeTab === "request" && (
                    <div className="relative group">
                      <textarea
                        value={request.headers}
                        onChange={(e) =>
                          setRequest({ ...request, headers: e.target.value })
                        }
                        className="w-full h-48 font-mono text-sm bg-gray-50 border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner"
                      />
                      <button
                        onClick={() => copyToClipboard(request.headers)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-indigo-600 opacity-70 group-hover:opacity-100 transition-opacity bg-white p-1 rounded-md shadow-sm"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {activeTab === "body" && (
                    <div className="relative group">
                      <textarea
                        value={request.body}
                        onChange={(e) =>
                          setRequest({ ...request, body: e.target.value })
                        }
                        className={`w-full h-48 font-mono text-sm bg-gray-50 border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner ${
                          request.method === "GET" ? "opacity-50" : ""
                        }`}
                        placeholder={
                          request.method === "GET"
                            ? "GET requests typically do not have a body"
                            : '{\n  "key": "value"\n}'
                        }
                        disabled={request.method === "GET"}
                      />
                      <button
                        onClick={() => copyToClipboard(request.body)}
                        className={`absolute top-2 right-2 text-gray-400 hover:text-indigo-600 opacity-70 group-hover:opacity-100 transition-opacity bg-white p-1 rounded-md shadow-sm ${
                          request.method === "GET" ? "hidden" : ""
                        }`}
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Response Panel */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transform transition-all hover:shadow-lg response-panel">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b-gray-200 flex justify-between">
                <h2 className="font-medium text-gray-700 flex items-center">
                  <ChevronsRight className="h-4 w-4 mr-2 text-indigo-600" />
                  Response
                </h2>
                {response && (
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {responseTime}ms
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center ${getStatusColor(
                        response.status
                      )}`}
                    >
                      {response.status} {response.statusText}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                {!response ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="p-4 bg-gray-50 rounded-full inline-flex items-center justify-center mb-4">
                      <Cpu className="h-10 w-10 text-gray-400" />
                    </div>
                    <p className="text-lg">Gửi request để xem phản hồi</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Nội dung phản hồi sẽ hiển thị tại đây
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto text-sm border border-gray-200 shadow-inner">
                      {formatJSON(response.data)}
                    </pre>
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() =>
                          copyToClipboard(formatJSON(response.data))
                        }
                        className="text-gray-500 hover:text-indigo-600 bg-white rounded-md p-2 shadow-sm hover:shadow transition-all"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          const dataStr =
                            "data:text/json;charset=utf-8," +
                            encodeURIComponent(formatJSON(response.data));
                          const downloadAnchorNode =
                            document.createElement("a");
                          downloadAnchorNode.setAttribute("href", dataStr);
                          downloadAnchorNode.setAttribute(
                            "download",
                            "response.json"
                          );
                          document.body.appendChild(downloadAnchorNode);
                          downloadAnchorNode.click();
                          downloadAnchorNode.remove();
                        }}
                        className="text-gray-500 hover:text-indigo-600 bg-white rounded-md p-2 shadow-sm hover:shadow transition-all"
                        title="Download JSON"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div
          className={`fixed bottom-4 right-4 ${
            toastType === "success"
              ? "bg-green-800"
              : toastType === "error"
              ? "bg-red-800"
              : "bg-blue-800"
          } text-white px-5 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-bounce-in`}
        >
          {toastType === "success" ? (
            <div className="p-1 bg-green-700 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
          ) : toastType === "error" ? (
            <AlertCircle className="h-4 w-4 text-red-300" />
          ) : (
            <div className="p-1 bg-blue-700 rounded-full">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            </div>
          )}
          <p>{toastMessage}</p>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        .slide-down {
          animation: slideDown 0.5s ease-out forwards;
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .highlight-animation {
          animation: highlight 1s ease-out;
        }

        .animate-bounce-in {
          animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes highlight {
          0% {
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
          }
          20% {
            box-shadow: 0 0 0 6px rgba(79, 70, 229, 0.3);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
          }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0.8) translateY(50px);
            opacity: 0;
          }
          80% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
