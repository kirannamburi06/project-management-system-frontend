import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import styles from "./ProjectDetails.module.css";
import { useEffect, useState } from "react";
import api from "../api/axios";
import InviteUserModal from "../components/InviteUserModal";

const ProjectDetails = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);

  const fetchProjectDetails = async () => {
    setLoading(true);

    try {
      const [projectRes, tasksRes] = await Promise.all([
        api.get(`/projects/${projectId}`),
        api.get(`/projects/${projectId}/tasks`),
      ]);

      setProject(projectRes.data.data);
      setTasks(tasksRes.data.data.content);
    } catch (error) {
      setError(error?.response?.data || "Failed to load project details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <h2>Loading...</h2>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <h2>{error}</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={styles.projectDetailsPage}>
        <div className={styles.projectHeader}>
          <h1>{project?.name}</h1>
          <p>{project?.Description}</p>
        </div>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Members</h2>

            <button
              onClick={() => {
                setShowInviteModal(true);
              }}
            >
              + Invite User
            </button>
          </div>

          <div className={styles.membersGrid}>
            {project?.members?.map((member, index) => (
              <div key={index} className={styles.memberCard}>
                <h4>{member}</h4>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Tasks</h2>

            <button>+ Create Task</button>
          </div>

          <div className={styles.tasksGrid}>
            {tasks?.map((task) => (
              <div key={task.id} className={styles.taskCard}>
                <h3>{task.name}</h3>

                <p>{task.description}</p>

                <span>Status: {task.status}</span>
              </div>
            ))}
          </div>
        </section>

        {showInviteModal && (
          <InviteUserModal
            projectId={projectId}
            onClose={() => {
              setShowInviteModal(false);
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetails;
