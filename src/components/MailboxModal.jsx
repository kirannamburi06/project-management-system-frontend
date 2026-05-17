import { useEffect, useState } from "react";

import api from "../api/axios";

import styles from "./MailboxModal.module.css";

function MailboxModal({ onClose }) {
  const [invitations, setInvitations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchInvitations = async () => {
    try {
      setLoading(true);

      const response = await api.get("/projects/invitations");

      setInvitations(response.data.data);
    } catch (err) {
      setError("Failed to load invitations");
    } finally {
      setLoading(false);
    }
  };

  const acceptInvitation = async (projectId) => {
    try {
      await api.post(`/projects/${projectId}/accept`);

      setInvitations((prev) =>
        prev.filter((invite) => invite.projectId !== projectId),
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to accept invitation");
    }
  };

  const rejectInvitation = async (projectId) => {
    try {
      await api.post(`/projects/${projectId}/reject`);

      setInvitations((prev) =>
        prev.filter((invite) => invite.projectId !== projectId),
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reject invitation");
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Mailbox</h2>

          <button onClick={onClose}>✕</button>
        </div>

        {loading && <p>Loading invitations...</p>}

        {error && <p className={styles.error}>{error}</p>}

        {!loading && invitations.length === 0 && <p>No pending invitations</p>}

        <div className={styles.invitationList}>
          {invitations.map((invite) => (
            <div key={invite.projectId} className={styles.invitationCard}>
              <div>
                <h4>{invite.projectName}</h4>

                <p>Invited by: {invite.invitedBy}</p>
                <p>Role: {invite.role}</p>
              </div>

              <button
                className={styles.acceptBtn}
                onClick={() => acceptInvitation(invite.projectId)}
              >
                Accept
              </button>
              <button
                className={styles.rejectBtn}
                onClick={() => rejectInvitation(invite.projectId)}
              >
                Reject
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MailboxModal;
