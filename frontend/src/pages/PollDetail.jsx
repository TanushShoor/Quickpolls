import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

export default function PollDetail() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    axios.get(`/api/polls/${id}`).then(res => setPoll(res.data));
  }, [id]);

  const handleVote = async (index) => {
    const res = await axios.post(`/api/polls/${id}/vote`, { optionIndex: index });
    setPoll(res.data);
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div>
      <h2>{poll.question}</h2>
      {poll.options.map((opt, i) => (
        <button key={i} onClick={() => handleVote(i)}>
          {opt.text}
        </button>
      ))}
      <BarChart width={300} height={200} data={poll.options}>
        <XAxis dataKey="text" />
        <YAxis />
        <Bar dataKey="votes" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
