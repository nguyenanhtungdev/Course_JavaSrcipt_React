import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * parseFloat(item.price),
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-center text-amber-600 mb-10 flex items-center justify-center gap-2">
          🛒 Giỏ hàng của bạn
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">
            Bạn chưa thêm sản phẩm nào vào giỏ.
          </p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between border rounded-lg shadow-md p-4"
              >
                {/* Ảnh + Thông tin */}
                <div className="flex items-center gap-4 w-full md:w-2/3">
                  <img
                    src={item.img || "https://via.placeholder.com/80"}
                    alt={item.productName}
                    className="w-24 h-24 object-cover rounded border"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{item.productName}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Số lượng: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Đơn giá: {parseFloat(item.price).toFixed(2)} đ
                    </p>
                  </div>
                </div>

                {/* Tổng phụ */}
                <div className="text-right mt-4 md:mt-0">
                  <p className="text-lg text-red-500 font-bold">
                    Tổng: {(item.quantity * parseFloat(item.price)).toFixed(2)}{" "}
                    đ
                  </p>
                </div>
              </div>
            ))}

            {/* Tổng cộng + thanh toán */}
            <div className="text-right mt-8">
              <p className="text-2xl font-bold text-green-600">
                Tổng cộng: {totalPrice.toFixed(2)} đ
              </p>
              <button className="mt-4 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded shadow">
                Thanh toán
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
