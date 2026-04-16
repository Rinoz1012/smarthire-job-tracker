import React from 'react';
import { getStats, scorePillClass } from '../utils/data';
import './Dashboard.css';

function Dashboard({ jobs, setCurrentPage }) {
  const stats = getStats(jobs);
  const recent = [...jobs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  const cards = [
    { label: 'Total applied',  value: stats.total,        color: 'var(--text)',    sub: 'all time' },
    { label: 'Interviews',     value: stats.interview,    color: 'var(--amber)',   sub: 'in progress' },
    { label: 'Offers',         value: stats.offer,        color: 'var(--accent)',  sub: 'received' },
    { label: 'Avg AI score',   value: stats.avgScore+'%', color: 'var(--purple)',  sub: 'resume fit' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-sub">Your job search at a glance</p>
      </div>

      <div className="stat-grid">
        {cards.map(c => (
          <div className="stat-card" key={c.label}>
            <div className="stat-label">{c.label}</div>
            <div className="stat-value" style={{ color: c.color }}>{c.value}</div>
            <div className="stat-sub">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="recent-card">
        <div className="recent-header">
          <span className="recent-title">Recent applications</span>
          <button className="btn-ghost" onClick={() => setCurrentPage('alljobs')}>View all</button>
        </div>
        {recent.map(j => (
          <div className="recent-row" key={j.id}>
            <div>
              <div className="recent-company">{j.company}</div>
              <div className="recent-role">{j.role} · {j.location}</div>
            </div>
            <div className="recent-right">
              <span className={scorePillClass(j.score)}>{j.score}%</span>
              <span className={`status-badge s-${j.status}`}>{j.status}</span>
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <div className="empty-state">
            No applications yet. <span onClick={() => setCurrentPage('add')} style={{color:'var(--accent)',cursor:'pointer'}}>Add your first one →</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
