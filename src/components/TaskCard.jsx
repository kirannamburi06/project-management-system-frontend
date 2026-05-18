import styles from "./TaskCard.module.css";

function TaskCard({ task, members, onStatusChange, onAssign, onDelete }) {
  return (
    <div className={styles.taskCard}>
      <h3>{task.name}</h3>

      <p>{task.description}</p>

      <span>Status: {task.status}</span>

      <span>Assigned To: {task.assignedUser || "Unassigned"}</span>

      <div className={styles.actions}>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          <option value="TODO">TODO</option>

          <option value="IN_PROGRESS">IN_PROGRESS</option>

          <option value="DONE">DONE</option>
        </select>

        <select
          value={task.assignedUser?.id || ""}
          onChange={(e) => onAssign(task.id, e.target.value)}
        >
          <option value="">Assign User</option>

          {members.map((member) => (
            <option key={member.userId} value={member.userId}>
              {member.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            onDelete(task.id);
          }}
        >
          Delete task
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
