// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PollList from "./pages/PollList";
import CreatePoll from "./pages/CreatePoll";
import PollDetail from "./pages/PollDetail";

function App() {
  return (
    <div>
      <NavBar />
      <main style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/polls" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/polls" element={<PollList />} />
          <Route path="/polls/create" element={<CreatePoll />} />
          <Route path="/polls/:id" element={<PollDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
