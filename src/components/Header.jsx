import { useNavigate } from "react-router-dom";

import styles from "./Header.module.css";
import { useState } from "react";

import MailboxModal from "./MailboxModal";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const [showMailbox, setShowMailbox] = useState(false);

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
        <button onClick={() => setShowMailbox(true)}>📩</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      {showMailbox && (
        <MailboxModal
          onClose={() => {
            setShowMailbox(false);
            window.location.reload();
          }}
        />
      )}
    </header>
  );
};

export default Header;
