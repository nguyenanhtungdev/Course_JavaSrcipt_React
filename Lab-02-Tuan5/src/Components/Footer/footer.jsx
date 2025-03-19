import React from "react";
import Button from "../Button/button";
import logoImage from "../../assets/images/icons8-food-bar-50.png";

export default function Footer() {
  var Recipes = [
    "What to Cook This Week",
    "Pasta",
    "Dinner",
    "Healthy",
    "Vegetarian",
    "Vegan",
    "Christmas",
  ];

  var Shop = ["Gift Subscription", "Send Us Feedback"];

  var LearnMore = ["Our Cooks", "See Our Features", "FAQ"];

  return (
    <footer className="bg-[#1a1a1a] text-white w-full font-sans overflow-x-hidden">
      {/* Container */}
      <div className="flex flex-wrap justify-between max-w-6xl gap-5 px-8 py-10 mx-auto">
        {/* About Us */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="mb-4 text-lg font-bold">About Us</h3>
          <p className="text-sm leading-relaxed text-gray-300">
            Welcome to our website, a wonderful place to explore and learn how
            to cook like a pro.
          </p>
          <div className="flex items-center mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 text-sm border-none rounded-full outline-none"
            />
            <Button className="ml-3">Send</Button>
          </div>
        </div>

        {/* Learn More */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="mb-4 text-lg font-bold">Learn More</h3>
          <ul className="space-y-2">
            {LearnMore.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-gray-400 text-sm hover:text-[#ff5773] transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="mb-4 text-lg font-bold">Shop</h3>
          <ul className="space-y-2">
            {Shop.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-gray-400 text-sm hover:text-[#ff5773] transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Recipes */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="mb-4 text-lg font-bold">Recipes</h3>
          <ul className="space-y-2">
            {Recipes.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-gray-400 text-sm hover:text-[#ff5773] transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="py-4 mt-6 text-sm text-center text-gray-400 border-t border-white/20">
        <div className="flex items-center justify-center mb-2">
          <img src={logoImage} alt="Chefify Logo" className="h-6 mr-2" />
          <span className="text-xl font-bold text-white">Chefify</span>
        </div>
        <p>
          © 2023 Chefify Company &nbsp; | &nbsp;
          <a href="#" className="hover:text-[#ff5773]">
            Terms of Service
          </a>{" "}
          &nbsp; | &nbsp;
          <a href="#" className="hover:text-[#ff5773]">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
}
