// src/pages/CreatePoll.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const setOption = (i, v) => {
    const copy = [...options]; copy[i] = v; setOptions(copy);
  };

  const addOption = () => setOptions(prev => [...prev, ""]);
  const removeOption = (i) => setOptions(prev => prev.filter((_, idx) => idx !== i));

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    const trimmed = options.map(o => o.trim()).filter(Boolean);
    if (!question.trim() || trimmed.length < 2) {
      setError("Question required and at least 2 non-empty options");
      return;
    }
    try {
      const body = { question: question.trim(), options: trimmed };
      const res = await api.post("/api/polls", body); // cookie is sent automatically
      navigate(`/polls/${res.data._id}`);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to create poll");
    }
  };

  return (
    <div style={card}>
      <h2>Create Poll</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
        <input placeholder="Question" value={question} onChange={e => setQuestion(e.target.value)} required />
        <div>
          <div style={{ marginBottom: 6 }}>Options:</div>
          {options.map((opt, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input value={opt} onChange={e => setOption(i, e.target.value)} placeholder={`Option ${i+1}`} />
              {options.length > 2 && <button type="button" onClick={() => removeOption(i)}>Remove</button>}
            </div>
          ))}
          <button type="button" onClick={addOption}>Add option</button>
        </div>
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
}

const card = { background: "#fff", padding: 18, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,.06)" };
