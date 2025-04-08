import React, { useState, useEffect } from "react";
import {
  Send,
  Trash2,
  MoreVertical,
  ChevronLeft,
  Phone,
  Video,
} from "lucide-react";

export default function TrangTinNhan() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Nguyễn Thị Mai",
      avatar: "/public/images/image3.png",
      time: "2 giờ trước",
      messages: [
        {
          from: "Mai",
          text: "Giao diện mới trông rất đẹp! Chỉ có vấn đề nhỏ với hiển thị trên điện thoại.",
          time: "2 giờ trước",
        },
      ],
    },
    {
      id: 2,
      sender: "Trần Minh Hoàng",
      avatar: "/public/images/image5.png",
      time: "1 ngày trước",
      messages: [
        {
          from: "Hoàng",
          text: "Tôi muốn yêu cầu hóa đơn chi tiết cho đơn hàng vừa rồi của tôi.",
          time: "1 ngày trước",
        },
      ],
    },
    {
      id: 3,
      sender: "Phạm Thị Linh",
      avatar: "/public/images/image4.png",
      time: "3 ngày trước",
      messages: [
        {
          from: "Linh",
          text: "Chúng tôi muốn thảo luận về khả năng hợp tác với đội ngũ của bạn.",
          time: "3 ngày trước",
        },
      ],
    },
  ]);

  const [selectedId, setSelectedId] = useState(1);
  const [input, setInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const selectedChat = messages.find((m) => m.id === selectedId);

  const handleReply = () => {
    if (!input.trim()) return;
    const updated = messages.map((m) => {
      if (m.id === selectedId) {
        return {
          ...m,
          messages: [
            ...m.messages,
            { from: "Tôi", text: input.trim(), time: "vừa xong" },
          ],
          time: "vừa xong",
        };
      }
      return m;
    });
    setMessages(updated);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReply();
    }
  };

  // Cuộn xuống tin nhắn mới nhất khi chat thay đổi
  const messageContainerRef = React.useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [selectedChat?.messages]);

  return (
    <div className="flex h-screen max-h-[85vh] rounded-xl overflow-hidden shadow-xl bg-gray-50">
      {/* Thanh bên */}
      {showSidebar && (
        <aside className="w-1/3 md:w-1/4 border-r border-purple-100 bg-white flex flex-col transition-all duration-300">
          <div className="p-4 border-b bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">💬</span>
              <span className="text-lg">Tin Nhắn</span>
            </div>
            <MoreVertical className="w-5 h-5 cursor-pointer hover:text-purple-200" />
          </div>

          <div className="p-3">
            <input
              type="text"
              placeholder="Tìm kiếm tin nhắn..."
              className="w-full px-3 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedId(msg.id)}
                className={`flex items-start gap-3 p-4 cursor-pointer border-b border-gray-100 hover:bg-purple-50 transition-all ${
                  msg.id === selectedId ? "bg-purple-100" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={msg.avatar}
                    alt={msg.sender}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-800">{msg.sender}</h4>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {msg.messages[msg.messages.length - 1]?.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* Cửa sổ chat */}
      <main className="flex-1 bg-gray-50 flex flex-col">
        <div className="p-3 border-b border-gray-200 bg-white shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-3">
            {!showSidebar && (
              <ChevronLeft
                className="w-5 h-5 text-purple-600 cursor-pointer hover:text-purple-800"
                onClick={() => setShowSidebar(true)}
              />
            )}
            <div className="md:hidden">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                {showSidebar ? (
                  <ChevronLeft className="w-5 h-5" />
                ) : (
                  <MoreVertical className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={selectedChat?.avatar}
                alt={selectedChat?.sender}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
              />
              <div>
                <h3 className="font-medium text-gray-800">
                  {selectedChat?.sender}
                </h3>
                <p className="text-xs text-green-500">Đang hoạt động</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full text-purple-600 hover:bg-purple-100 transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full text-purple-600 hover:bg-purple-100 transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          ref={messageContainerRef}
        >
          <div className="text-center">
            <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
              Hôm nay
            </span>
          </div>

          {selectedChat?.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-xs md:max-w-md animate-fade-in ${
                msg.from === "Tôi" ? "ml-auto" : ""
              }`}
            >
              <div
                className={`flex items-end gap-2 ${
                  msg.from === "Tôi" ? "flex-row-reverse" : ""
                }`}
              >
                {msg.from !== "Tôi" && (
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.sender}
                    className="w-8 h-8 rounded-full object-cover mb-1"
                  />
                )}
                <div
                  className={`rounded-2xl px-4 py-2 shadow-sm ${
                    msg.from === "Tôi"
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
              <div
                className={`text-[10px] mt-1 text-gray-400 ${
                  msg.from === "Tôi" ? "text-right mr-2" : "ml-10"
                }`}
              >
                {msg.time}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white flex gap-2 items-center">
          <button className="p-2 text-purple-500 hover:bg-purple-100 rounded-full transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Nhập tin nhắn của bạn..."
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 max-h-24 resize-none"
              rows={1}
            />
          </div>
          <button
            onClick={handleReply}
            disabled={!input.trim()}
            className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-full hover:opacity-90 flex items-center justify-center transition-all ${
              !input.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
