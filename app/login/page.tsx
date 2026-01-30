"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    console.log("Login data:", { username, password });

    await new Promise((r) => setTimeout(r, 1000));

    setLoading(false);
    alert("Login submitted (check console)");
  }

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back 👋</h1>
        <p style={styles.subtitle}>Login to continue (test mode)</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.footer}>
          No account?{" "}
          <Link href="/register" style={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    width: 360,
    padding: 30,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: 5,
    fontSize: 26,
  },
  subtitle: {
    marginBottom: 20,
    color: "#666",
    fontSize: 14,
  },
  field: {
    marginBottom: 15,
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "center" as const,
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 500,
  },
};
