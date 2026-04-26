import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import KanbanBoard from './pages/KanbanBoard';
import AllJobs from './pages/AllJobs';
import AddJob from './pages/AddJob';
import AIAnalyzer from './pages/AIAnalyzer';
import AdminDashboard from './pages/AdminDashboard';
import { initialJobs } from './utils/data';
import './App.css';

const ADMIN_EMAIL = 'fathimarinoz10@gmail.com';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [jobs, setJobs] = useState(initialJobs);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addJob = (job) => {
    setJobs(prev => [{ ...job, id: Date.now() }, ...prev]);
  };

  const deleteJob = (id) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  const pages = {
    dashboard: Dashboard,
    kanban: KanbanBoard,
    alljobs: AllJobs,
    add: AddJob,
    analyzer: AIAnalyzer,
    admin: AdminDashboard,
  };

  const PageComponent = pages[currentPage] || Dashboard;

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent)',
        fontFamily: 'Syne, sans-serif',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app-layout">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        jobs={jobs}
        user={user}
        isAdmin={user?.email === ADMIN_EMAIL}
      />
      <main className="app-main">
        <PageComponent
          jobs={jobs}
          addJob={addJob}
          deleteJob={deleteJob}
          setCurrentPage={setCurrentPage}
          user={user}
        />
      </main>
    </div>
  );
}

export default App;
