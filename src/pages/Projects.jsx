import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ProjectCard from "../components/ProjectCard";
import styles from "./Projects.module.css";

function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProjects = async (currentPage = 0) => {
    try {
      setLoading(true);

      const response = await api.get(`/projects?page=${currentPage}&size=${6}`);

      setProjects(response.data.data.content);
      setPage(response.data.data.currentPage);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      if (error.response.status == 403) {
        setError("You have no privileges to access this url. Login first");
      } else {
        setError("Failed to load projects");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(page);
  }, [page]);

  if (loading) {
    return <h2>Loading Projects...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className={styles.projectsPage}>
      <div className={styles.projectsHeader}>
        <h1>Projects</h1>
        <button>+ Create Project</button>
      </div>
      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => navigate(`/projects/${project.id}`)}
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
    </div>
  );
}

export default Projects;
