# Project Management System - Frontend

A modern React-based frontend application for a collaborative project and task management system.

This frontend communicates with a Spring Boot backend and provides features for project collaboration, task tracking, user invitations, activity monitoring, and workflow management.

---

# Live Frontend: https://cptms.vercel.app

---

# Features

## Authentication
- User registration
- User login
- JWT-based authentication
- Protected routes
- Logout functionality

---

## Project Management
- View all projects
- Create projects
- Delete projects
- Paginated project listing
- View project details

---

## Task Management
- Create tasks
- Assign tasks to project members
- Update task status
- Task workflow tracking

---

## Collaboration Features
- Invite users to projects
- Mailbox invitation system
- Accept project invitations
- Project member management

---

## Activity Logs
- Project activity tracking
- Audit log modal
- Collaboration history

---

## Dashboard UI
- Responsive dashboard layout
- Collapsible sidebar
- Header navigation
- Profile page
- Modal-based interactions

---

# Tech Stack

- React
- React Router DOM
- Axios
- CSS Modules

---

# Project Structure

```text
src/
│
├── api/
├── components/
├── layouts/
├── pages/
├── styles/
└── ...
```

---

# Installation

Clone the repository:

```bash
git clone <your-frontend-repository-url>
```

Move into project directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# Running the Application

Start development server:

```bash
npm run dev
```

Application runs on:

```text
http://localhost:5173
```

---

# Backend Configuration

Update API base URL inside:

```text
src/api/axios.js
```

Example:

```javascript
baseURL: "http://localhost:8080/api"
```
Or create a ".env" file and add VITE_API_URL=backend-url
---

# Build for Production

```bash
npm run build
```

---

# Preview Production Build

```bash
npm run preview
```

---

# Authentication Flow

```text
Login/Register
        ↓
JWT Token Stored
        ↓
Protected Dashboard Access
        ↓
Authenticated API Requests
```

---

# Major Frontend Concepts Used

- React Hooks
- State Management
- Component Composition
- Protected Routes
- API Integration
- Reusable Components
- Dashboard Layout Architecture
- Modal-Based UI Design
- Pagination Handling

---

# Pages Implemented

- Login Page
- Register Page
- Projects Page
- Project Details Page
- Profile Page

---

# Components Implemented

- Header
- Sidebar
- Project Cards
- Task Cards
- Create Project Modal
- Create Task Modal
- Invite User Modal
- Mailbox Modal
- Activity Log Modal

---

# Future Improvements

- Drag-and-drop Kanban board
- Real-time notifications
- WebSocket integration
- Dark mode
- Mobile responsiveness improvements
- Task filtering and search
- Analytics dashboard

---

# Author

Kiran

Backend-focused developer interested in:
- Java backend engineering
- Distributed systems
- DevOps
- Scalable architectures
- System design
