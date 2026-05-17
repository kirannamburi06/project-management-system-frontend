import { useState } from "react";

import api from "../api/axios";

import styles from "./InviteUserModal.module.css";

function InviteUserModal({ projectId, onClose }) {
  const [username, setUsername] = useState("");

  const [role, setRole] = useState("MEMBER");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      setSuccess("");

      await api.post(`/projects/${projectId}/invite`, { username, role });

      setSuccess("Invitation sent successfully");

      setUsername("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to invite user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Invite User</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter user email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <select
            className={styles.roleSelect}
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="MEMBER">MEMBER</option>
            <option value="VIEWER">VIEWER</option>
          </select>

          {error && <p className={styles.error}>{error}</p>}

          {success && <p className={styles.success}>{success}</p>}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Invite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InviteUserModal;
