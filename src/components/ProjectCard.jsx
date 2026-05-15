function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card" onClick={onClick}>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <span>Members: {project.members}</span>
    </div>
  );
}

export default ProjectCard;
