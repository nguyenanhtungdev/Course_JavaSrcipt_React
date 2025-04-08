import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  CheckCheck,
  Clock,
  AlertCircle,
  Gift,
  Calendar,
} from "lucide-react";

export default function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "alert",
      title: "Cập nhật hệ thống",
      message: "Hệ thống sẽ bảo trì vào 23:00 ngày 15/04/2025",
      time: "1 giờ trước",
      read: false,
    },
    {
      id: 2,
      type: "reminder",
      title: "Lịch hẹn mới",
      message: "Bạn có cuộc hẹn với Nguyễn Văn B vào ngày mai lúc 10:00",
      time: "3 giờ trước",
      read: false,
    },
    {
      id: 3,
      type: "promotion",
      title: "Ưu đãi đặc biệt",
      message: "Giảm 20% cho đơn hàng trên 500.000đ",
      time: "1 ngày trước",
      read: true,
    },
    {
      id: 4,
      type: "alert",
      title: "Bảo mật tài khoản",
      message: "Vui lòng cập nhật mật khẩu của bạn",
      time: "2 ngày trước",
      read: true,
    },
  ]);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const getIconForType = (type) => {
    switch (type) {
      case "alert":
        return <AlertCircle size={20} className="text-red-500" />;
      case "reminder":
        return <Calendar size={20} className="text-blue-500" />;
      case "promotion":
        return <Gift size={20} className="text-purple-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      {/* Bell icon with notification badge */}
      <button
        onClick={toggleNotifications}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
      >
        <Bell size={24} className="text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Thông báo</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <CheckCheck size={16} className="mr-1" />
                  <span>Đánh dấu đã đọc</span>
                </button>
                <button
                  onClick={toggleNotifications}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                <div>
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-start ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="mr-3 mt-1">
                        {getIconForType(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4
                            className={`text-sm font-medium ${
                              !notification.read
                                ? "text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-500 flex items-center ml-2">
                            <Clock size={12} className="mr-1" />
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  <Bell size={40} className="mx-auto mb-3 text-gray-300" />
                  <p>Không có thông báo nào</p>
                </div>
              )}
            </div>

            <div className="p-3 text-center border-t border-gray-200">
              <button className="text-sm text-blue-500 hover:text-blue-700 font-medium">
                Xem tất cả thông báo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
