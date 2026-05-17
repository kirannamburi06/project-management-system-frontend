import { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import styles from "./DashboardLayout.module.css";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={styles.dashboardLayout}>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={styles.dashboardBody}>
        <Sidebar sidebarOpen={sidebarOpen} />

        <main className={styles.dashboardContent}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
