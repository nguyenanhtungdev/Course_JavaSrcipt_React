import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h2>MyWebsite</h2>
          <p>&copy; 2025 - Tất cả quyền được bảo lưu</p>
        </div>

        <nav className={styles.nav}>
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

        <div className={styles.social}>
          <a href="#" className={styles.icon}>
            📘
          </a>
          <a href="#" className={styles.icon}>
            🐦
          </a>
          <a href="#" className={styles.icon}>
            📸
          </a>
        </div>
      </div>
    </footer>
  );
}
