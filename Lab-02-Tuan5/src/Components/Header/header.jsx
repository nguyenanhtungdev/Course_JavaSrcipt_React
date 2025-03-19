import React from "react";
import Button from "../Button/button";
import logoImage from "../../assets/images/image.png";

export default function Header() {
  var list_menu = ["What to cook", "Ingredients", "Occasions", "About us"];
  return (
    <header className="flex flex-row justify-around items-center w-full m-0 p-4 border-b-[#f0f0f0] border-b border-solid;">
      <nav
        className="flex justify-center gap-[15px] items-center
  list-style: none;"
      >
        <a href="#">
          <img src={logoImage} alt="Logo" />
        </a>
        <div className="relative w-full max-w-[500px]">
          <i className="fas fa-search absolute -translate-y-2/4 text-[#666] text-base left-[15px] top-2/4"></i>
          <input
            type="text"
            placeholder="What would you like to?"
            className="w-full bg-[#eee] focus:bg-[#ddd] transition-all duration-[0.3s] ease-[ease] pl-10 pr-[15px] py-3 rounded-[25px] border-[none] outline: none"
          />
        </div>
      </nav>
      <nav>
        <ul
          className="flex justify-center gap-[15px] items-center
  list-style: none gap: 30px;"
        >
          {list_menu.map((item, index) => {
            return (
              <li key={index}>
                <a
                  href="#"
                  className="text-[#C0C0C0] no-underline text-lg font-semibold hover:text-[#A0A0A0]"
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <nav
        className="flex justify-center gap-[15px] items-center
  list-style: none"
      >
        <Button variant="sweetCake">Login</Button>
        <Button>Subscribe</Button>
      </nav>
    </header>
  );
}
