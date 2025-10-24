// src/pages/PollList.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import PollCard from "../components/PollCard";

export default function PollList() {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const res = await api.get("/api/polls");
      setPolls(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load polls");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>All Polls</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        {polls.length === 0 ? (
          <div>No polls yet. Create one!</div>
        ) : (
          polls.map(p => <PollCard key={p._id} poll={p} />)
        )}
      </div>
    </div>
  );
}
