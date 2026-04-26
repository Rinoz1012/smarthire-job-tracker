import React from 'react';
import { logout } from '../firebase';
import { getStats } from '../utils/data';
import './Sidebar.css';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'kanban',    label: 'Kanban board' },
  { id: 'alljobs',   label: 'All applications' },
  { id: 'add',       label: 'Add application' },
  { id: 'analyzer',  label: 'AI analyzer' },
];

function Sidebar({ currentPage, setCurrentPage, jobs, user, isAdmin }) {
  const stats = getStats(jobs);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-name">SmartHire</div>
        <div className="brand-sub">AI Job Tracker</div>
      </div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <div
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            {item.label}
          </div>
        ))}
        {isAdmin && (
          <div
            className={`nav-item ${currentPage === 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentPage('admin')}
            style={{ color: 'var(--amber)', marginTop: '8px' }}
          >
            ⚡ Admin
          </div>
        )}
      </nav>
      <div style={{ padding: '0 12px', marginTop: 'auto' }}>
        <div className="sidebar-stats">
          <div className="stats-title">Overview</div>
          <div className="stat-row"><span>Applied</span><span>{stats.applied}</span></div>
          <div className="stat-row"><span>Interviews</span><span style={{color:'var(--amber)'}}>{stats.interview}</span></div>
          <div className="stat-row"><span>Offers</span><span style={{color:'var(--accent)'}}>{stats.offer}</span></div>
        </div>
        <div className="user-card">
          <img src={user?.photoURL} alt="avatar" className="user-avatar" />
          <div className="user-info">
            <div className="user-name">{user?.displayName}</div>
            <div className="user-email">{user?.email}</div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
