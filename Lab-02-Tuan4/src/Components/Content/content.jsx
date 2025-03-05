import React from "react";
import Button from "../Button/button";
import styles from "./content.module.css";
import { useEffect, useState } from "react";
import logoImage from "../../assets/images/image3.png";

export default function Content() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.profileBox}>
        <img
          src={logoImage}
          alt="Emma Gonzalez"
          className={styles.profileImage}
        />
        <div className={styles.profileInfo}>
          <h1 className={styles.profileName}>Emma Gonzalez's Recipe Box</h1>
          <p className={styles.profileDescription}>
            Emma Gonzalez is a deputy editor at Chefify, bringing her expertise
            as a former cooking editor at The Los Angeles Times...
          </p>
          <div className={styles.actions}>
            <span className={styles.subscribers}>6.5k Subscribers</span>
            <button className={styles.shareButton}>Share</button>
          </div>
        </div>
      </div>

      {/* Tabs điều hướng */}
      <div className={styles.tabs}>
        <button className={styles.activeTab}>Saved Recipes</button>
        <button className={styles.inactiveTab}>Folders</button>
        <button className={styles.inactiveTab}>Recipes by Genevieve</button>
      </div>

      {/* Danh sách sản phẩm */}
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3 className={styles.productTitle}>{product.name}</h3>
              <span className={styles.productTime}>{product.time}</span>
              <button className={styles.saveButton}>♡</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
