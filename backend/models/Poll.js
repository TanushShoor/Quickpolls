import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 }
});

const pollSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  question: { type: String, required: true },
  options: [optionSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Poll", pollSchema);