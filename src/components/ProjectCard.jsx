import styles from "./ProjectCard.module.css";

function ProjectCard({ project, onClick, onDelete }) {
  return (
    <div className={styles.projectCard}>
      <h3>{project.name}</h3>
      <p>{project.Description}</p>
      <span>Members: {project.members.join(", ")}</span>

      <div className={styles.projectCardActions}>
        <button className={styles.viewBtn} onClick={onClick}>
          View Project
        </button>
        <button className={styles.deleteBtn} onClick={onDelete}>
          Delete Project
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
