RealTrust 🌐

A full-stack web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).
This project was developed as part of a company assignment.

🛠️ Tech Stack Used
💻 Frontend:
React.js

HTML5

CSS3

JavaScript (ES6+)

🌐 Backend:
Node.js

Express.js

🗃️ Database:
MongoDB (NoSQL)
(Mongoose ODM for schema modeling)

🚀 Features
User Authentication (Login / Register)

RESTful API Integration

MongoDB Database Connectivity

Responsive and User-Friendly UI

CRUD Operations (Create, Read, Update, Delete)

Secure Password Storage using bcrypt

Token-based Authentication using JWT (JSON Web Tokens)

Error Handling and Validation

📂 Project Structure (MERN Directory Layout)
bash
Copy
Edit
RealTrust/
├── client/                # React Frontend
├── server/                # Node + Express Backend
├── .env                   # Environment Variables
├── package.json           # Node package file
└── README.md              # Project Readme
⚙️ How to Run Locally?
✅ Prerequisites:
Node.js installed 

MongoDB installed or Atlas Cluster 

1. Clone the Repository:
bash
Copy
Edit
git clone https://github.com/YourUsername/RealTrust.git
cd RealTrust
2. Backend Setup (Node.js + Express):
bash
Copy
Edit
cd server
npm install
Create a .env file inside /server with the following variables:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start backend server:

bash
Copy
Edit
npm start
3. Frontend Setup (React):
bash
Copy
Edit
cd client
npm install
Start React Frontend:

bash
Copy
Edit
npm start
✅ Your App will be running at:
Frontend: http://localhost:3000

Backend API: http://localhost:5000

✅ Deployment (Optional):
For deployment, you can use:

Frontend: Netlify / Vercel

Backend + DB: Render / Railway / MongoDB Atlas / Heroku (legacy)

Learnings & Outcome:
Full understanding of MERN architecture

Real-time development workflow with Node.js server and React client

Working with REST APIs, MongoDB CRUD, Token-based Authentication

Following best practices for backend security, error handling, and frontend UI/UX

