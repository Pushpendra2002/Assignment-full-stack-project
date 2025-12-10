A complete full-stack web application built using React (frontend) and Node.js + Express (backend).
The project includes a modern Landing Page, an Admin Panel, and a fully functional REST API with a clean and scalable folder structure.

🌟 Features
Frontend

Responsive React UI

Landing Page for users

Admin Panel with navigation

Routing using React Router

Fetches real data from backend API

Reusable components and clean code

Backend

Node.js + Express server

Modular routes and controllers

API endpoints for projects, clients, contacts, and subscribers

Ready for database integration

Easy to scale and maintain

🛠 Tech Stack

Frontend: React, JavaScript, React Router, CSS
Backend: Node.js, Express.js
Tools: Git, GitHub, VS Code, Postman/Thunder Client

📁 Folder Structure
Assignment-full-stack-project/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── server.js
│   ├── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.jsx
    │   ├── main.jsx
    ├── public/
    ├── package.json

🚀 Running the Project Locally
1. Clone the repository
git clone https://github.com/Pushpendra2002/Assignment-full-stack-project.git
cd Assignment-full-stack-project

2. Run the Backend
cd backend
npm install
npm start


Backend runs at: http://localhost:5000

3. Run the Frontend
cd frontend
npm install
npm run dev


Frontend runs at: http://localhost:5173
 (Vite) or http://localhost:3000

📡 API Endpoints
Method	Endpoint	Description
GET	/api/projects	Get all projects
GET	/api/clients	Get all clients
POST	/api/contacts	Add new contact
GET	/api/subscribers	Get all subscribers
POST	/api/subscribers	Add new subscriber
🎯 Purpose of the Project

This project was created to demonstrate:

Frontend–backend communication

REST API development

Clean and scalable folder structure

Real-world full-stack workflow

Deployment readiness

🌱 Future Improvements

Add MongoDB or SQL database

Add JWT authentication

Role-based admin access

Dashboard analytics

Cloud deployment (Vercel, Render, etc.)


📄 License

Open-source.
