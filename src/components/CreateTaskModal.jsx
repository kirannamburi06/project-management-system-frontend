import { useState } from "react";

import api from "../api/axios";

import styles from "./CreateTaskModal.module.css";

function CreateTaskModal({ projectId, members, onClose, onTaskCreated }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    assignUserId: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      if (form.assignUserId) {
        const { name, description } = form;
        const response = await api.post(`/projects/${projectId}/tasks`, {
          name,
          description,
        });
        const taskId = response?.data?.data?.id;
        const { assignUserId } = form;
        await api.post(`/projects/${projectId}/tasks/${taskId}/assign`, {
          assignUserId,
        });
      } else {
        const { name, description } = form;
        await api.post(`/projects/${projectId}/tasks`, { name, description });
      }

      onTaskCreated();

      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create Task</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Task name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Task description"
            value={form.description}
            onChange={handleChange}
          />

          <select
            name="assignUserId"
            value={form.assignUserId}
            onChange={handleChange}
          >
            <option value="">Assign Member</option>

            {members.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal;
