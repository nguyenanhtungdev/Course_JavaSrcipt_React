import React from "react";
import styles from "./header.module.css";
import Button from "../Button/button";
import logoImage from "../../assets/images/image.png";

export default function Header() {
  var list_menu = ["What to cook", "Ingredients", "Occasions", "About us"];
  return (
    <header className={styles.header}>
      <nav className={styles.navLeft}>
        <a href="#">
          <img src={logoImage} alt="Logo" />
        </a>
        <div className={styles.searchContainer}>
          <i className="fas fa-search"></i>
          <input type="text" placeholder="What would you like to?" />
        </div>
      </nav>
      <nav className={styles.navCenter}>
        <ul>
          {list_menu.map((item, index) => {
            return (
              <li key={index}>
                <a href="#">{item}</a>
              </li>
            );
          })}
        </ul>
      </nav>
      <nav className={styles.navRight}>
        <Button variant="login">Login</Button>
        <Button>Subscribe</Button>
      </nav>
    </header>
  );
}
