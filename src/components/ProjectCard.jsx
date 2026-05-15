import styles from "./ProjectCard.module.css";

function ProjectCard({ project, onClick }) {
  return (
    <div className={styles.projectCard} onClick={onClick}>
      <h3>{project.name}</h3>
      <p>{project.Description}</p>
      <span>Members: {project.members.join(", ")}</span>
    </div>
  );
}

export default ProjectCard;
