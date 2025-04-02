import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Dịch Vụ Sác Thủ
        </Link>

        <nav className="space-x-6 hidden md:flex">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-500 font-bold text-lg"
          >
            Trang chủ
          </Link>
          <Link
            to="/cart"
            className="text-gray-700 hover:text-blue-500 font-bold text-lg"
          >
            Giỏ hàng
          </Link>
          <Link
            to="/customers"
            className="text-gray-700 hover:text-blue-500 font-bold text-lg"
          >
            Khách hàng
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-500 font-bold text-lg"
          >
            Liên hệ
          </Link>
          <Link
            to="/settings"
            className="text-gray-700 hover:text-blue-500 font-bold text-lg"
          >
            Cài đặt
          </Link>
        </nav>

        <div>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </header>
  );
}
