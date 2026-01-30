"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);

  const res = await fetch("http://localhost:8080/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  setLoading(false);

  if (!res.ok) {
    alert(data.message || "Register failed");
    return;
  }

  alert("Registered successfully!");
}

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Register (test mode)</p>

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
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link href="/login" style={styles.link}>
            Login
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
    background: "#000000",
  },
  card: {
    width: 360,
    padding: 30,
    borderRadius: 12,
    background: "#000000",
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
    background: "#16a34a",
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
