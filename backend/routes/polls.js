// routes/polls.js
import express from "express";
import Poll from "../models/Poll.js";
import Vote from "../models/Vote.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();
// Create Poll
router.post("/", protect, async (req, res) => {
  const { question, options } = req.body;
  const poll = await Poll.create({
    userId: req.user._id,
    question,
    options: options.map(text => ({ text }))
  });
  res.status(201).json(poll);
});

// Vote on Poll
router.post("/:id/vote", protect, async (req, res) => {
  const { optionIndex } = req.body;
  const pollId = req.params.id;
  const userId = req.user._id;

  const existingVote = await Vote.findOne({ pollId, userId });
  if (existingVote) return res.status(400).json({ message: "Already voted" });

  await Vote.create({ pollId, userId, optionIndex });
  const poll = await Poll.findById(pollId);
  poll.options[optionIndex].votes += 1;
  await poll.save();

  res.json(poll);
});


// Get All Polls
router.get("/", async (req, res) => {
  const polls = await Poll.find();
  res.json(polls);
});


export default router;
