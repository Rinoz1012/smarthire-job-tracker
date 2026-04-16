import React from 'react';
import { scorePillClass } from '../utils/data';
import './AllJobs.css';

function AllJobs({ jobs, deleteJob }) {
  const sorted = [...jobs].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">All applications</h1>
        <p className="page-sub">{jobs.length} applications total</p>
      </div>

      <div className="jobs-table">
        <div className="table-header">
          <span>Company / Role</span>
          <span>Location</span>
          <span>Status</span>
          <span>AI score</span>
          <span>Date</span>
          <span></span>
        </div>
        {sorted.map(j => (
          <div className="table-row" key={j.id}>
            <div>
              <div className="company-name">{j.company}</div>
              <div className="role-name">{j.role}</div>
            </div>
            <div className="cell-muted">{j.location}</div>
            <div><span className={`status-badge s-${j.status}`}>{j.status}</span></div>
            <div><span className={scorePillClass(j.score)}>{j.score}%</span></div>
            <div className="cell-muted">{j.date}</div>
            <div>
              <button className="delete-btn" onClick={() => deleteJob(j.id)}>✕</button>
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <div className="table-empty">No applications yet. Add your first one!</div>
        )}
      </div>
    </div>
  );
}

export default AllJobs;
