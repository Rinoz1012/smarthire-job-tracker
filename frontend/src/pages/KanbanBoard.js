import React from 'react';
import { STATUS_COLS, STATUS_COLOR, scorePillClass } from '../utils/data';
import './KanbanBoard.css';

function KanbanBoard({ jobs }) {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Kanban board</h1>
        <p className="page-sub">Track your applications by stage</p>
      </div>
      <div className="kanban-grid">
        {STATUS_COLS.map(col => {
          const colJobs = jobs.filter(j => j.status === col);
          return (
            <div className="kanban-col" key={col}>
              <div className="kanban-col-header">
                <div className="col-title">
                  <div className="col-dot" style={{ background: STATUS_COLOR[col] }} />
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </div>
                <span className="col-count">{colJobs.length}</span>
              </div>
              {colJobs.map(j => (
                <div className="job-card" key={j.id}>
                  <div className="job-card-company">{j.company}</div>
                  <div className="job-card-role">{j.role}</div>
                  <div className="job-card-footer">
                    <span className="job-card-date">{j.date}</span>
                    <span className={scorePillClass(j.score)}>{j.score}%</span>
                  </div>
                </div>
              ))}
              {colJobs.length === 0 && (
                <div className="col-empty">No applications</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KanbanBoard;
