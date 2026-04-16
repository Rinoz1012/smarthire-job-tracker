import React from 'react';
import { getStats } from '../utils/data';
import './Sidebar.css';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'kanban',    label: 'Kanban board' },
  { id: 'alljobs',   label: 'All applications' },
  { id: 'add',       label: 'Add application' },
  { id: 'analyzer',  label: 'AI analyzer' },
];

function Sidebar({ currentPage, setCurrentPage, jobs }) {
  const stats = getStats(jobs);
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
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-stats">
          <div className="stats-title">Overview</div>
          <div className="stat-row"><span>Applied</span><span>{stats.applied}</span></div>
          <div className="stat-row"><span>Interviews</span><span style={{color:'var(--amber)'}}>{stats.interview}</span></div>
          <div className="stat-row"><span>Offers</span><span style={{color:'var(--accent)'}}>{stats.offer}</span></div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
