import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Contact() {
  return (
    <div>
      <Header></Header>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-amber-600 mb-6">
          Liên hệ với chúng tôi
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-10">
          <div>
            <h3 className="text-lg font-semibold mb-1">📍 Địa chỉ</h3>
            <p className="text-gray-700">134 Trần Phú, Phường 5, TP.Quy Nhơn</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">📞 Hotline</h3>
            <p className="text-gray-700">0929 58 2968</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">✉️ Email</h3>
            <p className="text-gray-700">nguyenanhtung@gmail.com</p>
          </div>
        </div>

        <form className="bg-white shadow-md rounded px-6 py-8 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-amber-500"
              placeholder="Nhập họ tên của bạn"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Số điện thoại
            </label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-amber-500"
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nội dung
            </label>
            <textarea
              className="w-full border border-gray-300 rounded px-4 py-2 h-32 focus:outline-none focus:ring focus:border-amber-500"
              placeholder="Bạn cần hỗ trợ gì?"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600"
          >
            Gửi liên hệ
          </button>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
}
