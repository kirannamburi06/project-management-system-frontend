import { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import styles from "./DashboardLayout.module.css";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [refreshProjects, setRefreshProjects] = useState(false);

  return (
    <div className={styles.dashboardLayout}>
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setRefreshProjects={setRefreshProjects}
      />

      <div className={styles.dashboardBody}>
        <Sidebar sidebarOpen={sidebarOpen} />

        <main className={styles.dashboardContent}>{children}</main>

        {React.cloneElement(children, { refreshProjects })}
      </div>
    </div>
  );
};

export default DashboardLayout;
