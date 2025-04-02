export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
        {/* Cột 1: Thông tin */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-600">MyCRM</h3>
          <p>
            Giải pháp quản lý khách hàng toàn diện, giúp bạn nâng cao hiệu quả
            kinh doanh và chăm sóc khách hàng.
          </p>
        </div>

        {/* Cột 2: Điều hướng */}
        <div>
          <h4 className="text-md font-semibold mb-2">Liên kết nhanh</h4>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:text-blue-600 transition">
                Trang chủ
              </a>
            </li>
            <li>
              <a href="/customers" className="hover:text-blue-600 transition">
                Khách hàng
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-600 transition">
                Liên hệ
              </a>
            </li>
            <li>
              <a href="/settings" className="hover:text-blue-600 transition">
                Cài đặt
              </a>
            </li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div>
          <h4 className="text-md font-semibold mb-2">Liên hệ</h4>
          <p>
            Email:{" "}
            <a
              href="mailto:support@mycrm.com"
              className="text-blue-600 hover:underline"
            >
              support@mycrm.com
            </a>
          </p>
          <p>
            Hotline:{" "}
            <span className="text-blue-600 font-medium">0123 442 789</span>
          </p>
          <p>Địa chỉ: 134 Trần Phú, Phường 5, TP.Quy Nhơn</p>
        </div>
      </div>

      <div className="text-center py-4 shadow-md text-xs text-gray-500">
        © {new Date().getFullYear()} MyCRM. All rights reserved.
      </div>
    </footer>
  );
}
