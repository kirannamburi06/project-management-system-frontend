import { useNavigate } from "react-router-dom";

import styles from "./Header.module.css";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button
          className={styles.menuButton}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <div className={styles.headerLogo}>Project Management System</div>
      </div>

      <nav className={styles.headerNav}>
        <button onClick={() => navigate("/projects")}>Projects</button>

        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
