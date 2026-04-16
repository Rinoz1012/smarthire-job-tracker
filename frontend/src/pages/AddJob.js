import React, { useState } from 'react';
import './AddJob.css';

function AddJob({ addJob, setCurrentPage }) {
  const [form, setForm] = useState({ company: '', role: '', location: '', status: 'applied', jd: '' });
  const [success, setSuccess] = useState(false);

  const handle = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = () => {
    if (!form.company || !form.role) { alert('Please fill in company and role.'); return; }
    addJob({ ...form, score: Math.floor(Math.random() * 25) + 65, date: new Date().toISOString().slice(0, 10) });
    setForm({ company: '', role: '', location: '', status: 'applied', jd: '' });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Add application</h1>
        <p className="page-sub">Log a new job you've applied to</p>
      </div>

      <div className="form-card">
        <div className="form-section-title">Application details</div>
        <div className="form-row">
          <div className="field">
            <label>Company name</label>
            <input name="company" value={form.company} onChange={handle} placeholder="e.g. Google" />
          </div>
          <div className="field">
            <label>Job title</label>
            <input name="role" value={form.role} onChange={handle} placeholder="e.g. Full Stack Developer" />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label>Location</label>
            <input name="location" value={form.location} onChange={handle} placeholder="e.g. Bangalore / Remote" />
          </div>
          <div className="field">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handle}>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        <div className="field full">
          <label>Job description (optional)</label>
          <textarea name="jd" value={form.jd} onChange={handle} placeholder="Paste the job description for AI scoring..." rows={4} />
        </div>
        <div className="form-actions">
          <button className="btn-primary" onClick={submit}>Add application</button>
          <button className="btn-ghost" onClick={() => setCurrentPage('dashboard')}>Cancel</button>
          {success && <span className="success-msg">Application added!</span>}
        </div>
      </div>
    </div>
  );
}

export default AddJob;
