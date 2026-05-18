import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ProjectCard from "../components/ProjectCard";
import styles from "./Projects.module.css";
import CreateProjectModal from "../components/CreateProjectModal";
import DashboardLayout from "../layouts/DashboardLayout";

function Projects({ refreshProjects }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const fetchProjects = async (currentPage = 0) => {
    try {
      setLoading(true);

      const response = await api.get(`/projects?page=${currentPage}&size=${8}`);

      setProjects(response.data.data.content);
      setPage(response.data.data.currentPage);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      if (error?.response?.status == 403) {
        setError("You have no privileges to access this url. Login first");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError("Failed to load projects");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project? Deleting will completely remove related data from our data bases",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/projects/${projectId}`);
      fetchProjects(page);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to delete project");
    }
  };

  useEffect(() => {
    fetchProjects(page);
  }, [page, refreshProjects]);

  if (loading) {
    return <h2>Loading Projects...</h2>;
  }
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorMessage}>{error}</h2>;
      </div>
    );
  }

  return (
    <div className={styles.projectsPage}>
      <div className={styles.projectsHeader}>
        <h1>Projects</h1>
        <button onClick={() => setShowModal(true)}>+ Create Project</button>
      </div>
      <div className={styles.content}>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => navigate(`/projects/${project.id}`)}
              onDelete={() => deleteProject(project.id)}
            />
          ))}
        </div>
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

      {showModal && (
        <CreateProjectModal
          onClose={() => setShowModal(false)}
          onProjectCreated={() => fetchProjects(page)}
        />
      )}
    </div>
  );
}

export default Projects;
