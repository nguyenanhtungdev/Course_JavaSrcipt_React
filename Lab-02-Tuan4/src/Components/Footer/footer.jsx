import React from "react";
import styles from "./footer.module.css";
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
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h3>About Us</h3>
          <p>
            Welcome to our website, a wonderful place to explore and learn how
            to cook like a pro.
          </p>
          <div className={styles.subscribe}>
            <input type="email" placeholder="Enter your email" />
            <Button>Send</Button>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3>Learn More</h3>
          <ul>
            {LearnMore.map((item, index) => {
              return (
                <li key={index}>
                  <a href="#">{item}</a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Shop</h3>
          <ul>
            {Shop.map((item, index) => {
              return (
                <li key={index}>
                  <a href="#">{item}</a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Recipes</h3>
          <ul>
            {Recipes.map((item, index) => {
              return (
                <li key={index}>
                  <a href="#">{item}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerLogo}>
          <img src={logoImage} alt="Chefify Logo" />
          <span
            style={{ fontSize: "24px", color: "white", fontWeight: "bold" }}
          >
            Chefify
          </span>
        </div>
        <p>
          © 2023 Chefify Company &nbsp; | &nbsp;
          <a href="#">Terms of Service</a> &nbsp; | &nbsp;
          <a href="#">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
}
