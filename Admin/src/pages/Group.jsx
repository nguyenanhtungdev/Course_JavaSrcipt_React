import { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Settings,
  Search,
  UserPlus,
  Mail,
  Trash2,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";

export default function TeamManagementPage() {
  const [activeTab, setActiveTab] = useState("members");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      role: "Admin",
      avatar: "/public/images/image4.png",
      lastActive: "Hôm nay",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      role: "Member",
      avatar: "/public/images/image4.png",
      lastActive: "Hôm qua",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@example.com",
      role: "Member",
      avatar: "/public/images/image4.png",
      lastActive: "3 ngày trước",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      role: "Member",
      avatar: "/public/images/image4.png",
      lastActive: "1 tuần trước",
    },
  ]);

  // Filter members based on search query
  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add new member
  const handleAddMember = (newMember) => {
    setTeamMembers([
      ...teamMembers,
      {
        id: teamMembers.length + 1,
        ...newMember,
        avatar: "/api/placeholder/40/40",
        lastActive: "Vừa tham gia",
      },
    ]);
    setShowAddMemberModal(false);
  };

  // Remove member
  const handleRemoveMember = (id) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
    setShowDeleteConfirm(null);
  };

  // Animation for new members
  useEffect(() => {
    const tableRows = document.querySelectorAll("tbody tr");
    tableRows.forEach((row, index) => {
      row.style.opacity = "0";
      row.style.transform = "translateY(10px)";

      setTimeout(() => {
        row.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        row.style.opacity = "1";
        row.style.transform = "translateY(0)";
      }, index * 100);
    });
  }, [filteredMembers]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto transition-all duration-300">
      {/* Header with gradient background */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div className="flex items-center group">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg mr-4 transform group-hover:scale-110 transition-transform duration-300">
            <Users className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors duration-300">
              Đội nhóm
            </h1>
            <p className="text-sm text-gray-500">
              {teamMembers.length} thành viên
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAddMemberModal(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
        >
          <Plus className="mr-2" size={16} />
          <span>Thêm thành viên</span>
        </button>
      </div>

      {/* Tabs with animation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px relative">
          <button
            onClick={() => setActiveTab("members")}
            className={`py-3 px-6 font-medium text-sm transition-all duration-300 ${
              activeTab === "members"
                ? "text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Thành viên
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`py-3 px-6 font-medium text-sm transition-all duration-300 ${
              activeTab === "settings"
                ? "text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Cài đặt
          </button>
          {/* Animated tab indicator */}
          <div
            className="absolute bottom-0 h-0.5 bg-indigo-600 transition-all duration-300"
            style={{
              left: activeTab === "members" ? "0" : "120px",
              width: "120px",
            }}
          ></div>
        </nav>
      </div>

      {/* Members Tab Content */}
      {activeTab === "members" && (
        <div className="animate-fadeIn">
          {/* Enhanced Search */}
          <div className="relative mb-6 transition-all duration-300">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                isSearchFocused ? "text-indigo-500" : "text-gray-400"
              }`}
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm kiếm thành viên..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full pl-10 pr-4 py-2 border transition-all duration-300 rounded-md focus:outline-none ${
                isSearchFocused
                  ? "border-indigo-500 ring-2 ring-indigo-200 shadow-sm"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            />
          </div>

          {/* Members List with hover effects */}
          <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vai trò
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-indigo-50 transition-colors duration-200"
                  >
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="relative flex-shrink-0 cursor-pointer group">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-9 h-9 rounded-full border-2 border-transparent group-hover:border-indigo-400 transition-all duration-300"
                          />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white opacity-75"></div>
                        </div>
                        <span className="font-medium text-gray-900 ml-3 group-hover:text-indigo-600">
                          {member.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-gray-600">
                      {member.email}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-300 ${
                          member.role === "Admin"
                            ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`}
                      >
                        {member.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-gray-500 text-sm">
                      {member.lastActive}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-1">
                        <button className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-full hover:bg-indigo-100 transition-colors duration-200">
                          <Mail size={16} />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(member.id)}
                          className="text-red-600 hover:text-red-900 p-1.5 rounded-full hover:bg-red-100 transition-colors duration-200"
                        >
                          <Trash2 size={16} />
                        </button>
                        <div className="relative">
                          <button className="text-gray-600 hover:text-gray-900 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200">
                            <MoreHorizontal size={16} />
                          </button>
                          {/* Could add dropdown menu here */}
                        </div>

                        {/* Delete confirmation popup */}
                        {showDeleteConfirm === member.id && (
                          <div className="absolute bg-white border border-gray-200 shadow-lg rounded-md p-3 z-10 text-left">
                            <p className="text-sm mb-2">Xóa thành viên này?</p>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleRemoveMember(member.id)}
                                className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                              >
                                Xác nhận
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded hover:bg-gray-300"
                              >
                                Hủy
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">
                  <Search size={48} className="mx-auto opacity-50" />
                </div>
                <p className="text-gray-500">Không tìm thấy thành viên nào</p>
              </div>
            )}
          </div>

          {/* Pagination example */}
          {filteredMembers.length > 0 && (
            <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
              <div>
                Hiển thị 1-{filteredMembers.length} trên{" "}
                {filteredMembers.length} thành viên
              </div>
              <div className="flex space-x-1">
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  Trước
                </button>
                <button className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  Sau
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Settings Tab Content */}
      {activeTab === "settings" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow transition-shadow duration-300">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Settings size={18} className="mr-2 text-indigo-500" />
              Thông tin đội nhóm
            </h3>
            <div className="space-y-4">
              <div className="group">
                <label
                  htmlFor="team-name"
                  className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-indigo-600 transition-colors duration-200"
                >
                  Tên nhóm
                </label>
                <input
                  id="team-name"
                  type="text"
                  defaultValue="Nhóm Marketing"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 hover:border-indigo-300"
                />
              </div>
              <div className="group">
                <label
                  htmlFor="team-description"
                  className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-indigo-600 transition-colors duration-200"
                >
                  Mô tả
                </label>
                <textarea
                  id="team-description"
                  rows={3}
                  defaultValue="Nhóm phụ trách các hoạt động marketing và truyền thông."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 hover:border-indigo-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quyền truy cập
                </label>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center group">
                    <div className="relative">
                      <input
                        id="private"
                        name="privacy"
                        type="radio"
                        defaultChecked
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 transition-colors duration-200"
                      />
                      <div className="absolute -inset-1 bg-indigo-100 scale-50 opacity-0 rounded-full group-hover:scale-100 group-hover:opacity-50 transition-all duration-200"></div>
                    </div>
                    <label
                      htmlFor="private"
                      className="ml-2 text-sm text-gray-700 group-hover:text-indigo-600 transition-colors duration-200"
                    >
                      Riêng tư
                    </label>
                  </div>
                  <div className="flex items-center group">
                    <div className="relative">
                      <input
                        id="public"
                        name="privacy"
                        type="radio"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 transition-colors duration-200"
                      />
                      <div className="absolute -inset-1 bg-indigo-100 scale-50 opacity-0 rounded-full group-hover:scale-100 group-hover:opacity-50 transition-all duration-200"></div>
                    </div>
                    <label
                      htmlFor="public"
                      className="ml-2 text-sm text-gray-700 group-hover:text-indigo-600 transition-colors duration-200"
                    >
                      Công khai
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow transition-shadow duration-300">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <ChevronDown size={18} className="mr-2 text-indigo-500" />
              Cài đặt nâng cao
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between group p-2 rounded-md hover:bg-white transition-colors duration-200">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    Thông báo
                  </h4>
                  <p className="text-sm text-gray-500">
                    Nhận thông báo khi có hoạt động mới
                  </p>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between group p-2 rounded-md hover:bg-white transition-colors duration-200">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                    Xóa nhóm
                  </h4>
                  <p className="text-sm text-gray-500">
                    Hành động này không thể hoàn tác
                  </p>
                </div>
                <button className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5">
                  Xóa
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Lưu thay đổi
            </button>
          </div>
        </div>
      )}

      {/* Add Member Modal with animation */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 backdrop-blur-sm transition duration-300 animate-fadeIn">
          <div
            className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-md animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold flex items-center">
                <UserPlus size={18} className="mr-2 text-indigo-500" />
                Thêm thành viên mới
              </h3>
              <button
                onClick={() => setShowAddMemberModal(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded-full transition-colors duration-200"
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleAddMember({
                  name: formData.get("name"),
                  email: formData.get("email"),
                  role: formData.get("role"),
                });
              }}
            >
              <div className="space-y-5">
                <div className="group">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-indigo-600 transition-colors duration-200"
                  >
                    Tên
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Nhập tên thành viên"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 hover:border-indigo-300"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-indigo-600 transition-colors duration-200"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="example@domain.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 hover:border-indigo-300"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-indigo-600 transition-colors duration-200"
                  >
                    Vai trò
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 hover:border-indigo-300 appearance-none bg-white"
                    style={{
                      backgroundImage:
                        'url(\'data:image/svg+xml;utf8,<svg fill="gray" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\')',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.5rem center",
                    }}
                  >
                    <option value="Member">Thành viên</option>
                    <option value="Admin">Quản trị viên</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow hover:shadow-md"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
