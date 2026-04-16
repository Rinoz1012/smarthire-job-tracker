import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import KanbanBoard from './pages/KanbanBoard';
import AllJobs from './pages/AllJobs';
import AddJob from './pages/AddJob';
import AIAnalyzer from './pages/AIAnalyzer';
import { initialJobs } from './utils/data';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [jobs, setJobs] = useState(initialJobs);

  const addJob = (job) => {
    setJobs(prev => [{ ...job, id: Date.now() }, ...prev]);
  };

  const deleteJob = (id) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  const pages = { dashboard: Dashboard, kanban: KanbanBoard, alljobs: AllJobs, add: AddJob, analyzer: AIAnalyzer };
  const PageComponent = pages[currentPage] || Dashboard;

  return (
    <div className="app-layout">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} jobs={jobs} />
      <main className="app-main">
        <PageComponent jobs={jobs} addJob={addJob} deleteJob={deleteJob} setCurrentPage={setCurrentPage} />
      </main>
    </div>
  );
}

export default App;
