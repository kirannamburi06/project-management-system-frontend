import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import styles from "./Login.module.css";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleFormChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", form);

      localStorage.setItem("token", response.data.data);
      navigate("/projects");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Email"
          value={form.email}
          onChange={handleFormChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.value}
          onChange={handleFormChange}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        <div className={styles.registerPage}>
          New user? <Link to="/register"> Create Account </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
