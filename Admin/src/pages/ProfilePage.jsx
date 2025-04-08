import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, MapPin, Mail, Edit, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    avatar: "/public/images/image2.png",
    phone: "0901234567",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-white rounded-xl flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white shadow-xl rounded-2xl max-w-md w-full overflow-hidden"
      >
        {/* Background header decoration */}
        <div className="h-32 bg-gradient-to-r from-pink-400 to-purple-500 relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <ArrowLeft size={20} />
          </motion.button>
        </div>

        {/* Profile content */}
        <div className="px-8 pb-8 -mt-16">
          <div className="flex flex-col items-center">
            <motion.div
              className="relative"
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovering ? 1 : 0 }}
                  className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <Edit size={24} className="text-white" />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="mt-4 text-2xl font-bold text-gray-800"
            >
              {user.name}
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="flex items-center text-gray-500 mt-1"
            >
              <Mail size={16} className="mr-1" />
              <span>{user.email}</span>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-8 space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center">
                <div className="bg-pink-100 p-3 rounded-lg">
                  <Phone size={20} className="text-pink-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="font-medium text-gray-800">{user.phone}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <MapPin size={20} className="text-purple-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Địa chỉ</p>
                  <p className="font-medium text-gray-800">{user.address}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center text-red-500 hover:text-red-600 transition-colors duration-300"
            >
              <LogOut size={16} className="mr-1" />
              <span>Đăng xuất</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
