import React, { useState } from 'react';
import './AIAnalyzer.css';

function AIAnalyzer() {
  const [resume, setResume]   = useState('');
  const [jd, setJd]           = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState('');

  const analyze = async () => {
    if (!resume || !jd) { alert('Please fill in both fields.'); return; }
    setLoading(true);
    setResult(null);
    setError('');

    const prompt = `You are a technical recruiter AI. Analyze the candidate's profile against this job description.

Candidate profile:
${resume}

Job description:
${jd}

Respond ONLY with valid JSON (no markdown, no backticks):
{
  "score": <number 0-100>,
  "matchingSkills": ["skill1","skill2"],
  "missingSkills": ["skill1","skill2"],
  "recommendation": "2-3 sentence actionable recommendation"
}`;

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 800,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content.map(i => i.text || '').join('').replace(/```json|```/g, '').trim();
      setResult(JSON.parse(text));
    } catch (e) {
      setError('Analysis failed. Please try again.');
    }
    setLoading(false);
  };

  const scoreColor = (s) => s >= 75 ? 'var(--accent)' : s >= 55 ? 'var(--amber)' : 'var(--red)';
  const scoreLabel = (s) => s >= 75 ? 'Strong match' : s >= 55 ? 'Moderate match' : 'Weak match';

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">AI resume analyzer</h1>
        <p className="page-sub">Paste a job description to see how well your profile fits</p>
      </div>

      <div className="form-card">
        <div className="field" style={{ marginBottom: 14 }}>
          <label className="field-label">Your profile / resume summary</label>
          <textarea value={resume} onChange={e => setResume(e.target.value)}
            placeholder="e.g. 1.5 years experience in React, Node.js, Java Spring Boot. Built REST APIs, worked with PostgreSQL..."
            rows={4} />
        </div>
        <div className="field" style={{ marginBottom: 18 }}>
          <label className="field-label">Job description to analyze</label>
          <textarea value={jd} onChange={e => setJd(e.target.value)}
            placeholder="Paste the full job description here..."
            rows={5} />
        </div>
        <button className="btn-primary" onClick={analyze} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze fit with AI'}
        </button>
      </div>

      {error && <div className="analyzer-error">{error}</div>}

      {result && (
        <div className="result-card">
          <div className="score-row">
            <div className="score-circle" style={{ borderColor: scoreColor(result.score) }}>
              <span className="score-num" style={{ color: scoreColor(result.score) }}>{result.score}%</span>
            </div>
            <div>
              <div className="score-label" style={{ color: scoreColor(result.score) }}>{scoreLabel(result.score)}</div>
              <div className="score-desc">
                {result.score >= 75 ? 'Your profile aligns well. Apply with confidence.' :
                 result.score >= 55 ? 'Some gaps exist. Review the missing skills below.' :
                 'Significant gaps found. Consider upskilling before applying.'}
              </div>
            </div>
          </div>

          <div className="skills-section">
            <div className="skills-title">Matching skills</div>
            <div>{(result.matchingSkills || []).map(s => <span key={s} className="skill-tag match">{s}</span>)}</div>
          </div>

          <div className="skills-section">
            <div className="skills-title">Skills to improve</div>
            <div>{(result.missingSkills || []).map(s => <span key={s} className="skill-tag missing">{s}</span>)}</div>
          </div>

          <div className="skills-section">
            <div className="skills-title">AI recommendation</div>
            <div className="recommendation">{result.recommendation}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIAnalyzer;
