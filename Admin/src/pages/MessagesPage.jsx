import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Trash2,
  MoreVertical,
  ChevronLeft,
  Phone,
  Video,
  Image,
  Smile,
  Paperclip,
  Mic,
  Search,
  MessageCircle,
  User,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TrangTinNhan() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Nguyễn Thị Mai",
      avatar: "/public/images/image3.png",
      time: "2 giờ trước",
      online: true,
      messages: [
        {
          from: "Mai",
          text: "Giao diện mới trông rất đẹp! Chỉ có vấn đề nhỏ với hiển thị trên điện thoại.",
          time: "2 giờ trước",
          isRead: true,
        },
      ],
    },
    {
      id: 2,
      sender: "Trần Minh Hoàng",
      avatar: "/public/images/image5.png",
      time: "1 ngày trước",
      online: false,
      messages: [
        {
          from: "Hoàng",
          text: "Tôi muốn yêu cầu hóa đơn chi tiết cho đơn hàng vừa rồi của tôi.",
          time: "1 ngày trước",
          isRead: true,
        },
      ],
    },
    {
      id: 3,
      sender: "Phạm Thị Linh",
      avatar: "/public/images/image4.png",
      time: "3 ngày trước",
      online: true,
      messages: [
        {
          from: "Linh",
          text: "Chúng tôi muốn thảo luận về khả năng hợp tác với đội ngũ của bạn.",
          time: "3 ngày trước",
          isRead: false,
        },
      ],
    },
  ]);

  const [selectedId, setSelectedId] = useState(1);
  const [input, setInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchText, setSearchText] = useState("");

  const selectedChat = messages.find((m) => m.id === selectedId);
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Cuộn xuống tin nhắn mới nhất khi chat thay đổi
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [selectedChat?.messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simulating typing effect from the other user
  useEffect(() => {
    if (selectedChat && selectedChat.messages.length > 0) {
      const lastMessage =
        selectedChat.messages[selectedChat.messages.length - 1];
      if (lastMessage.from === "Tôi") {
        setIsTyping(true);
        const timer = setTimeout(() => {
          setIsTyping(false);
          simulateReply();
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedChat?.messages]);

  const simulateReply = () => {
    const replies = [
      "Cảm ơn bạn đã phản hồi nhanh chóng!",
      "Tôi hiểu rồi, để tôi xem xét thêm nhé.",
      "Vâng, chúng ta sẽ tiếp tục trao đổi sau.",
      "Ý kiến của bạn rất hữu ích đấy.",
      "Tôi sẽ gửi thêm thông tin cho bạn sau.",
    ];

    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    const updated = messages.map((m) => {
      if (m.id === selectedId) {
        return {
          ...m,
          messages: [
            ...m.messages,
            {
              from: m.sender.split(" ").pop(),
              text: randomReply,
              time: "vừa xong",
              isRead: true,
            },
          ],
          time: "vừa xong",
        };
      }
      return m;
    });

    setMessages(updated);
  };

  const handleReply = () => {
    if (!input.trim()) return;
    const updated = messages.map((m) => {
      if (m.id === selectedId) {
        return {
          ...m,
          messages: [
            ...m.messages,
            { from: "Tôi", text: input.trim(), time: "vừa xong", isRead: true },
          ],
          time: "vừa xong",
        };
      }
      return m;
    });
    setMessages(updated);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReply();
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.sender.toLowerCase().includes(searchText.toLowerCase()) ||
      msg.messages.some((m) =>
        m.text.toLowerCase().includes(searchText.toLowerCase())
      )
  );

  const markAsRead = (id) => {
    setMessages(
      messages.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            messages: m.messages.map((msg) => ({ ...msg, isRead: true })),
          };
        }
        return m;
      })
    );
  };

  const handleSelectChat = (id) => {
    setSelectedId(id);
    markAsRead(id);
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  // Emoji picker component
  const emojis = [
    "😊",
    "😂",
    "❤️",
    "👍",
    "🙏",
    "😍",
    "🤔",
    "😎",
    "🎉",
    "😢",
    "😡",
    "👋",
    "🔥",
    "💯",
    "✅",
  ];

  const EmojiPicker = () => (
    <motion.div
      ref={emojiPickerRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute bottom-full mb-2 bg-white p-2 rounded-lg shadow-lg border border-gray-200 grid grid-cols-5 gap-2 z-10"
    >
      {emojis.map((emoji, index) => (
        <button
          key={index}
          className="text-xl hover:bg-gray-100 p-2 rounded-lg transition-colors"
          onClick={() => {
            setInput((prev) => prev + emoji);
            textareaRef.current.focus();
          }}
        >
          {emoji}
        </button>
      ))}
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen max-h-[85vh] rounded-xl overflow-hidden shadow-xl bg-gray-50"
    >
      {/* Thanh bên */}
      <AnimatePresence>
        {showSidebar && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full md:w-1/3 lg:w-1/4 border-r border-purple-100 bg-white flex flex-col absolute md:relative z-10 h-full"
          >
            <div className="p-4 border-b bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.span
                  initial={{ rotate: -30, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl"
                >
                  💬
                </motion.span>
                <span className="text-lg font-semibold">Tin Nhắn</span>
              </div>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-all"
                >
                  <User className="w-5 h-5" />
                </motion.button>
                <button
                  className="md:hidden p-1"
                  onClick={() => setShowSidebar(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-3 sticky top-0 bg-white z-10 shadow-sm">
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Tìm kiếm tin nhắn..."
                  className="w-full px-4 pl-10 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                {searchText && (
                  <button
                    onClick={() => setSearchText("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <AnimatePresence>
                {filteredMessages.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-gray-500 p-4"
                  >
                    <Search className="w-12 h-12 mb-2 text-purple-300" />
                    <p>Không tìm thấy kết quả</p>
                  </motion.div>
                ) : (
                  filteredMessages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSelectChat(msg.id)}
                      className={`flex items-start gap-3 p-4 cursor-pointer border-b border-gray-100 hover:bg-purple-50 transition-all ${
                        msg.id === selectedId ? "bg-purple-100" : ""
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={msg.avatar}
                          alt={msg.sender}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm transition-all hover:shadow-md"
                        />
                        {msg.online && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"
                          />
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-800">
                            {msg.sender}
                          </h4>
                          <span className="text-xs text-gray-400">
                            {msg.time}
                          </span>
                        </div>
                        <div className="flex justify-between items-start mt-1">
                          <p className="text-sm text-gray-500 truncate max-w-[180px]">
                            {msg.messages[msg.messages.length - 1]?.text}
                          </p>
                          {msg.messages.some(
                            (m) => !m.isRead && m.from !== "Tôi"
                          ) && (
                            <span className="bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center ml-1">
                              {
                                msg.messages.filter(
                                  (m) => !m.isRead && m.from !== "Tôi"
                                ).length
                              }
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Cửa sổ chat */}
      <main className="flex-1 bg-gray-50 flex flex-col relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 border-b border-gray-200 bg-white shadow-sm flex justify-between items-center sticky top-0 z-10"
        >
          <div className="flex items-center gap-3">
            {!showSidebar && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSidebar(true)}
                className="p-2 rounded-full hover:bg-gray-100 transition-all text-purple-600"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            )}
            <div className="flex items-center gap-3">
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={selectedChat?.avatar}
                  alt={selectedChat?.sender}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                />
                {selectedChat?.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                )}
              </div>
              <div>
                <motion.h3 layout className="font-medium text-gray-800">
                  {selectedChat?.sender}
                </motion.h3>
                <p className="text-xs text-green-500">
                  {isTyping ? (
                    <span className="flex items-center gap-1">
                      <span>Đang soạn tin</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        ...
                      </motion.span>
                    </span>
                  ) : selectedChat?.online ? (
                    "Đang hoạt động"
                  ) : (
                    "Hoạt động gần đây"
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full text-purple-600 hover:bg-purple-100 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full text-purple-600 hover:bg-purple-100 transition-colors"
            >
              <Video className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-purple-50 to-indigo-50"
          ref={messageContainerRef}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-xs bg-white bg-opacity-80 text-gray-600 px-3 py-1 rounded-full shadow-sm">
              Hôm nay
            </span>
          </motion.div>

          {selectedChat?.messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className={`max-w-xs md:max-w-md ${
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
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-2xl px-4 py-2 shadow-sm ${
                    msg.from === "Tôi"
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </motion.div>
              </div>
              <div
                className={`text-[10px] mt-1 text-gray-400 flex items-center gap-1 ${
                  msg.from === "Tôi" ? "text-right mr-2 justify-end" : "ml-10"
                }`}
              >
                {msg.time}
                {msg.from === "Tôi" && (
                  <span className="text-blue-500">
                    {msg.isRead ? "✓✓" : "✓"}
                  </span>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xs"
            >
              <div className="flex items-end gap-2">
                <img
                  src={selectedChat?.avatar}
                  alt={selectedChat?.sender}
                  className="w-8 h-8 rounded-full object-cover mb-1"
                />
                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm rounded-bl-none flex items-center">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                    className="w-2 h-2 bg-gray-400 rounded-full mr-1"
                  />
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 rounded-full mr-1"
                  />
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <motion.div
          layout
          className="p-4 border-t border-gray-200 bg-white flex gap-2 items-end sticky bottom-0"
        >
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-purple-500 hover:bg-purple-100 rounded-full transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-purple-500 hover:bg-purple-100 rounded-full transition-colors"
            >
              <Image className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Nhập tin nhắn của bạn..."
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 max-h-24 resize-none pr-10"
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex space-x-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-1 text-gray-400 hover:text-purple-500 rounded-full transition-colors"
              >
                <Smile className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 text-gray-400 hover:text-purple-500 rounded-full transition-colors"
              >
                <Mic className="w-5 h-5" />
              </motion.button>
            </div>

            <AnimatePresence>
              {showEmojiPicker && <EmojiPicker />}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={input.trim() ? { scale: 1.1 } : {}}
            whileTap={input.trim() ? { scale: 0.9 } : {}}
            onClick={handleReply}
            disabled={!input.trim()}
            className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-full hover:shadow-lg flex items-center justify-center transition-all duration-300 ${
              !input.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </main>
    </motion.div>
  );
}
