import React from "react";

export default function Button({
  children,
  variant = "default",
  className = "",
  ...props
}) {
  const baseStyles =
    "px-4 py-1.5 text-lg font-medium rounded-lg transition-transform duration-300 ease-in-out cursor-pointer";

  const variants = {
    default:
      "bg-[#f44b86] text-white hover:bg-[#c52d62] active:bg-[#f44b86] active:scale-95",
    login: "bg-[#fff0f5] text-[#f44b86]",
    sweetCake: "bg-[#fef0f5] text-[#d53e73]",
    blackCake: "bg-[#eae5f8] text-[#9074db]",
    pozoleVerde: "bg-[#cae4f7] text-[#5788f3]",
    healthyFood: "bg-[#b0f1fc] text-[#34a2b6]",
  };

  return (
    <button
      className={`${baseStyles} ${
        variants[variant] || variants.default
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
