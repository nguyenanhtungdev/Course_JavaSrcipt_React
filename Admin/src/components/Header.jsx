import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../pages/Notifications";

export default function Header() {
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 flex items-center justify-between px-6 py-4 transition-all duration-300 ease-in-out ml-0 w-full
        ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-md"
            : "bg-white shadow-sm"
        }`}
    >
      <div className="flex items-center space-x-2">
        <h1
          className="text-xl font-bold transition-all duration-300 
            bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
            bg-clip-text text-transparent 
            hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600
            cursor-pointer transform hover:scale-105"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </h1>

        {/* Animated underline */}
        <div className="hidden md:block h-1 w-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-75" />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className={`w-64 px-4 py-2 border rounded-full text-sm placeholder-gray-400
              transition-all duration-300 ease-in-out
              ${
                isSearchFocused
                  ? "border-transparent focus:outline-none ring-2 ring-pink-400 shadow-md shadow-pink-100"
                  : "border-gray-200 focus:border-transparent focus:ring-2 focus:ring-pink-400"
              }`}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <div className="absolute right-3 top-2.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="relative group">
          <Notification />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
        </div>

        <div className="relative cursor-pointer group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 text-gray-600 transition-all duration-300 group-hover:text-pink-500 group-hover:scale-110"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
          {/* Tooltip */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Help
          </div>
        </div>

        <div
          className="relative cursor-pointer group"
          onClick={() => navigate("/profile")}
        >
          <div className="p-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500">
            <img
              src="/public/images/image2.png"
              alt="User"
              className="w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-110 border-2 border-white"
            />
          </div>
          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
      </div>
    </header>
  );
}
