// src/components/NavBar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/polls" style={brandStyle}>
          QuickPolls
        </Link>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/polls">Polls</Link>
        <Link to="/polls/create">Create Poll</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <button onClick={handleLogout} style={logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 20px",
  background: "#111827",
  color: "#fff",
};

const brandStyle = {
  color: "#fff",
  fontWeight: 700,
  textDecoration: "none",
};

const logoutBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: 6,
  cursor: "pointer",
};
