# AI Chatbot Project

- 🚀 Project Overview
  - AI-powered chat application with separate `frontend` and `Backend` codebases.
  - Built as a modern full-stack app using React/Vite for the UI and Node.js for the backend.

- 🧩 Architecture
  - `frontend/`: React + Vite client, responsive chat interface, Tailwind CSS support.
  - `Backend/`: Node.js server or API layer for chat message handling.

- ✨ Key Features
  - Real-time chat UI with message bubbles and typing indicators.
  - Clean component structure: `ChatBubble`, `ChatContainer`, `ChatInput`, `Header`, `TypingIndicator`.
  - Easy-to-extend design for AI response integration.

- ⚙️ **Tech Stack**
  - Frontend: React, Vite, Tailwind CSS
  - Backend: Node.js
  - Project setup split into separate `frontend` and `Backend` packages.

- 🧪 Setup & Run
  - Install dependencies in both folders.
  - Start the backend server and frontend dev server separately.
  - Example:
    - `cd Backend && npm install && npm start`
    - `cd frontend && npm install && npm run dev`

- 🛠️ Development Notes
  - Clear separation of concerns between UI and API.
  - Modular components make it easy to add features like authentication, message persistence, or AI integration.

- 📄 Project Structure
  - `frontend/`: UI, components, config files.
  - `Backend/`: server logic, API endpoints.
  - `README.md`: entrypoint for documentation and setup guidance.

- ✅ Why this project
  - Great starter for building a chatbot or AI assistant frontend.
  - Scalable structure for adding advanced natural language features later.
