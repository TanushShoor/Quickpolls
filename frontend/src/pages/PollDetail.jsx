// src/pages/PollDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function PollDetail() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await api.get("/api/polls");
        const p = res.data.find(item => item._id === id);
        if (!p) setError("Poll not found");
        else setPoll(p);
      } catch (err) {
        console.error(err);
        setError("Failed to load poll");
      }
    };
    fetchPoll();
  }, [id]);

  const handleVote = async (index) => {
    try {
      const res = await api.post(`/api/polls/${id}/vote`, { optionIndex: index });
      setPoll(res.data);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to vote (maybe you already voted)");
    }
  };

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!poll) return <div>Loading...</div>;

  const data = poll.options.map(o => ({ name: o.text, votes: o.votes }));

  return (
    <div style={{ background: "#fff", padding: 16, borderRadius: 8 }}>
      <h2>{poll.question}</h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        {poll.options.map((opt, i) => (
          <button key={i} onClick={() => handleVote(i)} style={voteBtn}>
            {opt.text} ({opt.votes})
          </button>
        ))}
      </div>

      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="votes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const voteBtn = {
  padding: "8px 12px",
  borderRadius: 6,
  border: "1px solid #ddd",
  background: "#f3f4f6",
  cursor: "pointer",
};

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { BarChart, Bar, XAxis, YAxis } from "recharts";

// export default function PollDetail() {
//   const { id } = useParams();
//   const [poll, setPoll] = useState(null);

//   useEffect(() => {
//     axios.get(`/api/polls/${id}`).then(res => setPoll(res.data));
//   }, [id]);

//   const handleVote = async (index) => {
//     const res = await axios.post(`/api/polls/${id}/vote`, { optionIndex: index });
//     setPoll(res.data);
//   };

//   if (!poll) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>{poll.question}</h2>
//       {poll.options.map((opt, i) => (
//         <button key={i} onClick={() => handleVote(i)}>
//           {opt.text}
//         </button>
//       ))}
//       <BarChart width={300} height={200} data={poll.options}>
//         <XAxis dataKey="text" />
//         <YAxis />
//         <Bar dataKey="votes" fill="#8884d8" />
//       </BarChart>
//     </div>
//   );
// }
