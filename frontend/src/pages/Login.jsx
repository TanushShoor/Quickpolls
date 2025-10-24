// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = e => setForm({...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
    //   const res = await api.post("/api/auth/login", form);
        await api.post("/api/auth/login", form);
      // cookie set automatically; navigate to polls
      navigate("/polls");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={card}>
      <h2>Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required/>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

const card = { background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,.08)" };
