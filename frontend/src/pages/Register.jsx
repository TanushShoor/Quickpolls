// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = e => setForm({...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post("/api/auth/register", form);
      // cookie set by backend; res.data.user available
      navigate("/polls");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={card}>
      <h2>Register</h2>
      {error && <div style={err}>{error}</div>}
      <form onSubmit={onSubmit} style={formStyle}>
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required/>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

const card = { background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,.08)" };
const formStyle = { display: "grid", gap: 10 };
const err = { color: "red", marginBottom: 10 };
