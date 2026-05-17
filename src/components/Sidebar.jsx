// src/components/Sidebar.jsx

import { useNavigate } from "react-router-dom";

import styles from "./Sidebar.module.css";

const Sidebar = ({ sidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`${styles.sidebar} ${
        sidebarOpen ? styles.open : styles.closed
      }`}
    >
      <button onClick={() => navigate("/projects")}>Projects</button>

      <button>Profile</button>
    </aside>
  );
};

export default Sidebar;
