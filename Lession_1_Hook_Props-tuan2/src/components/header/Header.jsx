import style from "./Header.module.css";
import { useState } from "react";
function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={style.header}>
      <div className={style.container}>
        <h1 className={style.logo}>MyWebsite</h1>

        <button
          className={style.menu_toggle}
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <nav className={`${style.nav} ${isOpen ? style.open : ""}`}>
          <ul>
            <li>
              <a href="#">Trang Chủ</a>
            </li>
            <li>
              <a href="#">Dịch Vụ</a>
            </li>
            <li>
              <a href="#">Về Chúng Tôi</a>
            </li>
            <li>
              <a href="#">Liên Hệ</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
