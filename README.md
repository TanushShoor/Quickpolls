Sem-3 Term-1 MERN project
# 🗳️ QuickPolls

**QuickPolls** is a full-stack MERN application that allows users to create, share, and participate in live polls easily.  
Users can register, log in, create polls, vote on polls, and view results in real-time — all in a clean and modern interface.  

This project was built as part of my **Semester 3 - Term 1 MERN Project**, focusing on authentication, API design, and integration between frontend and backend.

---

## 🌐 Live Demo

- **Frontend (Vercel)** → [https://quickpolls-puce.vercel.app](https://quickpolls-puce.vercel.app)  
- **Backend (Render)** → [https://quickpolls-backend-a1cr.onrender.com](https://quickpolls-backend-a1cr.onrender.com)

> ⚠️ Note: Since both services are hosted on free tiers, the backend may take a few seconds to “wake up” on the first request.

---

## 🧩 Features

| Feature | Description |
|----------|-------------|
| 🧑‍💻 **User Authentication** | Register, login, and logout using JWT + cookies |
| 🔒 **Protected Routes** | Only logged-in users can create or vote on polls |
| 🗳️ **Poll Management** | Create custom polls with multiple options |
| 📊 **Voting System** | Vote once per poll, and view live vote counts |
| 🍪 **JWT Cookies** | Secure token handling using httpOnly cookies |
| 🌍 **CORS Enabled** | Seamless communication between Render backend and Vercel frontend |
| 📱 **Responsive Design** | Fully responsive React interface |

---

## 🧠 Tech Stack

### 🏗️ Frontend
- **React.js**
- **Axios** for API requests
- **React Router DOM** for navigation
- **CSS (custom)** for styling

### ⚙️ Backend
- **Node.js** with **Express.js**
- **MongoDB + Mongoose**
- **JWT** (JSON Web Token) for authentication
- **bcrypt.js** for password hashing
- **cookie-parser** for token management
- **dotenv** for environment configuration

### ☁️ Deployment
- **Frontend** → Vercel  
- **Backend** → Render  
- **Database** → MongoDB Atlas  

---

## ⚙️ Folder Structure
Quickpolls/
│
├── backend/
│ ├── config/
│ │ └── db.js # MongoDB connection
│ ├── middleware/
│ │ └── authMiddleware.js # Protect routes with JWT
│ ├── models/
│ │ ├── User.js
│ │ ├── Poll.js
│ │ └── Vote.js
│ ├── routes/
│ │ ├── auth.js # Register, Login, Logout
│ │ └── polls.js # Create, Get, Vote on polls
│ ├── utils/
│ │ └── genToken.js # Generate JWT
│ ├── .env
│ ├── package.json
│ └── index.js # Entry point for Express app
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/ # NavBar, PollCard, etc.
│ │ ├── pages/ # Login, Register, PollList, CreatePoll
│ │ ├── App.js
│ │ └── index.js
│ ├── package.json
│ └── .env
│
└── README.md



---

## 🪄 Environment Variables

Create a `.env` file inside `backend/` with:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=production
```
---

## 🚀 Running Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/TanushShoor/Quickpolls.git
cd Quickpolls
```

### 2️⃣ Setup backend
```bash
cd backend
npm install
npm run dev
```
### 3️⃣ Setup frontend
```bash
cd ../frontend
npm install
npm start

```
Your frontend will start at:
👉 http://localhost:3000

🧑‍💼 About the Developer

👋 Hi, I’m Tanush Shoor

I’m a Computer Science student passionate about full-stack web development, data analytics, and entrepreneurship.
This project helped me learn how to:

Connect React Frontend ↔ Express Backend with real-world APIs

Handle authentication & cookies securely

Deploy full-stack apps across Render and Vercel

🌟 Future Improvements

📈 Add visual poll result charts

🔄 Real-time updates with WebSockets

🗑️ Delete or edit polls

💬 Comments or discussion under polls

📱 Mobile-optimized dashboard
