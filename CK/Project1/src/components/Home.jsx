import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImageSlider from "./ImageSlider";
import { ShoppingCart, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;
  const navigate = useNavigate();
  useEffect(() => {
    const getDataProduct = async () => {
      try {
        const respone = await fetch(
          "https://67e369672ae442db76d00431.mockapi.io/product"
        );
        const data = await respone.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    getDataProduct();
  }, []);

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = existingCart.find((p) => p.id === item.id);

    let updatedCart;

    if (exists) {
      updatedCart = existingCart.map((p) =>
        p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      updatedCart = [...existingCart, { ...item, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const totalPages = Math.ceil(product.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentData = product.slice(startIndex, startIndex + perPage);

  return (
    <div>
      <Header></Header>
      <h1 className="text-3xl md:text-3xl font-extrabold text-left bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse m-3 p-1">
        🎉 Siêu giảm giá 🎉
      </h1>
      <ImageSlider></ImageSlider>
      <h1 className="text-xl md:text-3xl font-extrabold text-left bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse m-3 p-1">
        🎉 Ưu đãi hời - Đặt mua ngay 🎉
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
        {currentData.map((item) => (
          <div key={item.id} className="border-none rounded-lg p-4 shadow">
            <h3 className="text-lg font-bold text-black mb-1">
              {item.productName}
            </h3>
            <img src={item.img} alt={item.img} />
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            <p className="text-red-500 text-lg font-semibold">{item.price} $</p>
            <div className="mt-4 flex justify-around">
              <button className="px-4 py-2 rounded bg-red-500 inline-flex items-center gap-1 text-white">
                Mua ngay
                <CreditCard className="w-5 h-5" />
              </button>
              <button
                className="px-4 py-2 rounded bg-amber-500 inline-flex items-center gap-1 text-white"
                onClick={() => handleAddToCart(item)}
              >
                Thêm vào giỏ
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center align-middle mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-amber-400 rounded hover:bg-amber-500"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ← Trang trước
        </button>
        <span className="px-4 py-2 text-amber-300 font-bold">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-amber-400 rounded hover:bg-amber-500"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Trang sau →
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
}
