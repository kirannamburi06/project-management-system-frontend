import { useEffect, useState } from "react";

import api from "../api/axios";

import styles from "./ActivityLogModal.module.css";

function ActivityLogModal({ projectId, onClose }) {
  const [activities, setActivities] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchActivities = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/projects/${projectId}/activity`);

      setActivities(response.data.data.content);
    } catch (err) {
      setError("Failed to load activity logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Activity Logs</h2>

          <button onClick={onClose}>✕</button>
        </div>

        {loading && <p>Loading activities...</p>}

        {error && <p className={styles.error}>{error}</p>}

        {!loading && activities.length === 0 && <p>No activities found</p>}

        {!loading && activities.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Activity</th>

                <th>Performed By</th>

                <th>Entity</th>

                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.activityType}</td>

                  <td>{activity.performedBy}</td>

                  <td>{activity.entityType}</td>

                  <td>{activity.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ActivityLogModal;
