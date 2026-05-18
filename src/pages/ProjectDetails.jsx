import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../api/axios";

import InviteUserModal from "../components/InviteUserModal";
import CreateTaskModal from "../components/CreateTaskModal";
import TaskCard from "../components/TaskCard";

import styles from "./ProjectDetails.module.css";

const ProjectDetails = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);

  const [tasks, setTasks] = useState([]);

  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [showInviteModal, setShowInviteModal] = useState(false);

  const [showTaskModal, setShowTaskModal] = useState(false);

  const [page, setPage] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const fetchProjectDetails = async (currentPage = 0) => {
    try {
      setLoading(true);

      const [projectRes, tasksRes] = await Promise.all([
        api.get(`/projects/${projectId}`),

        api.get(`/projects/${projectId}/tasks?page=${currentPage}&size=${8}`),
      ]);

      const projectData = projectRes.data.data;

      setProject(projectData);

      setTasks(tasksRes.data.data.content);

      createMemberList(projectData.members);

      setPage(tasksRes.data.data.currentPage);

      setTotalPages(tasksRes.data.data.totalPages);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to load project details",
      );
    } finally {
      setLoading(false);
    }
  };

  const getIdByUsername = async (username) => {
    try {
      const response = await api.get(
        `/projects/${projectId}/getIdByUsername?username=${username}`,
      );

      return response.data.data;
    } catch (err) {
      console.log(err);

      return null;
    }
  };

  const createMemberList = async (memberNames) => {
    const memberObjects = await Promise.all(
      memberNames.map(async (m) => {
        const userId = await getIdByUsername(m);

        return {
          userId,
          name: m,
        };
      }),
    );

    setMembers(memberObjects);
  };

  const assignTask = async (taskId, assignUserId) => {
    try {
      await api.post(`/projects/${projectId}/tasks/${taskId}/assign`, {
        assignUserId,
      });

      fetchProjectDetails();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to assign task");
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await api.patch(
        `/projects/${projectId}/tasks/${taskId}/update?status=${status}`,
      );

      fetchProjectDetails();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchProjectDetails(page);
  }, [page]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className={styles.projectDetailsPage}>
      <div className={styles.projectHeader}>
        <h1>{project?.name}</h1>

        <p>{project?.Description}</p>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Members</h2>

          <button onClick={() => setShowInviteModal(true)}>
            + Invite User
          </button>
        </div>

        <div className={styles.membersGrid}>
          {members.map((member) => (
            <div key={member.userId} className={styles.memberCard}>
              <h4>{member.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Tasks</h2>

          <button onClick={() => setShowTaskModal(true)}>+ Create Task</button>
        </div>

        <div className={styles.tasksGrid}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              members={members}
              onStatusChange={updateTaskStatus}
              onAssign={assignTask}
            />
          ))}
        </div>
        <div className={styles.pagination}>
          <button disabled={page == 0} onClick={() => setPage(page - 1)}>
            Previous
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </section>

      {showInviteModal && (
        <InviteUserModal
          projectId={projectId}
          onClose={() => setShowInviteModal(false)}
        />
      )}

      {showTaskModal && (
        <CreateTaskModal
          projectId={projectId}
          members={members}
          onClose={() => setShowTaskModal(false)}
          onTaskCreated={fetchProjectDetails}
        />
      )}
    </div>
  );
};

export default ProjectDetails;
