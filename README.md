# SmartHire — AI-Powered Job Application Tracker

A full-stack web app to track job applications with AI resume-fit scoring powered by Claude AI.

## Live Demo
> Add your Vercel link here after deployment

## Screenshots
> Add a screenshot here after running the app

## Tech Stack

**Frontend**
- React 18
- CSS Modules
- Claude AI (Anthropic API)

**Backend**
- Java 21
- Spring Boot 3.2
- Maven
- REST API

## Features

- **Dashboard** — stats overview with recent applications
- **Kanban board** — track applications across Applied → Interview → Offer → Rejected
- **All applications** — full table view with delete support
- **Add application** — log new jobs with company, role, location, status
- **AI analyzer** — paste a job description and get a fit score (0–100%), matching skills, missing skills, and a recommendation

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd backend
export ANTHROPIC_API_KEY=your_key_here
mvn spring-boot:run
```

API runs at [http://localhost:8080](http://localhost:8080)

## Project Structure

```
smarthire-job-tracker/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/     # Sidebar
│       ├── pages/          # Dashboard, Kanban, AllJobs, AddJob, AIAnalyzer
│       ├── utils/          # Shared data helpers
│       ├── App.js
│       └── index.js
├── backend/
│   └── src/main/java/com/smarthire/
│       ├── controller/
│       ├── service/
│       └── model/
└── README.md
```

## What I Learned

- Integrating Claude AI API into a React frontend
- Building a full-stack app with Java Spring Boot REST backend
- Managing application state across multiple pages in React
- Designing a clean dark-mode UI with CSS variables

## Author

Rinoz Fathima
