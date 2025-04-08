import React from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../pages/Notifications";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-64 px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400
          transition duration-200 ease-in-out"
        />
        <Notification />
        <span className="text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
        </span>
        <img
          src="/public/images/image2.png"
          alt="User"
          className="w-11 h-11 rounded-full"
          onClick={() => navigate("/profile")}
        />
      </div>
    </header>
  );
}
