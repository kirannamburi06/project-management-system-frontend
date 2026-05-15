import { useState } from "react";
import api from "../api/axios";
import styles from "./CreateProjectModal.module.css";

function CreateProjectModal({ onClose, onProjectCreated }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFormChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      await api.post("/projects", form);
      onProjectCreated();
      onClose();
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create Project</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Project name"
            value={form.name}
            onChange={handleFormChange}
            required
          />

          <textarea
            name="description"
            placeholder="Project description"
            value={form.description}
            onChange={handleFormChange}
            rows="4"
          />

          {error && <p className={styles.modalError}>{error}</p>}

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
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

export default CreateProjectModal;
