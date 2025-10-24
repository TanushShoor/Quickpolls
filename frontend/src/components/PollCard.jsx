// src/components/PollCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function PollCard({ poll }) {
  const totalVotes = poll.options.reduce((s, o) => s + (o.votes || 0), 0);
  return (
    <div style={card}>
      <h3>{poll.question}</h3>
      <div style={{ fontSize: 14, color: "#555" }}>{poll.options.length} options · {totalVotes} votes</div>
      <div style={{ marginTop: 10 }}>
        <Link to={`/polls/${poll._id}`}>View / Vote →</Link>
      </div>
    </div>
  );
}

const card = { padding: 12, borderRadius: 8, background: "#fff", marginBottom: 12, boxShadow: "0 1px 6px rgba(0,0,0,.04)" };
