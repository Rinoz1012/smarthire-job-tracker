import React, { useState, useEffect } from 'react';
import { getUserCredits, deductCredit, addCredits } from '../utils/credits';
import './AIAnalyzer.css';

function AIAnalyzer({ user }) {
  const [resume, setResume] = useState('');
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [credits, setCredits] = useState(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (user) {
      loadCredits();
    }
  }, [user]);

  const loadCredits = async () => {
    const c = await getUserCredits(user.uid);
    setCredits(c);
  };

  const handlePayment = async (creditAmount, price) => {
    setPaying(true);
    try {
      const orderRes = await fetch('https://smarthire-job-tracker.onrender.com/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: price }),
      });
      const order = await orderRes.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'SmartHire',
        description: `${creditAmount} AI Analysis Credits`,
        order_id: order.id,
        handler: async (response) => {
          const verifyRes = await fetch('https://smarthire-job-tracker.onrender.com/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          const verify = await verifyRes.json();
          if (verify.success) {
            const newCredits = await addCredits(user.uid, creditAmount);
            setCredits(newCredits);
            alert(`Payment successful! ${creditAmount} credits added!`);
          }
        },
        prefill: {
          name: user.displayName,
          email: user.email,
        },
        theme: { color: '#34d399' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert('Payment failed. Please try again.');
    }
    setPaying(false);
  };

  const analyze = async () => {
    if (!resume || !jd) { alert('Please fill in both fields.'); return; }
    if (credits <= 0) { alert('No credits! Please buy credits to continue.'); return; }

    setLoading(true);
    setResult(null);
    setError('');

    const prompt = `You are a technical recruiter AI. Analyze the candidate profile against this job description.

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
      const res = await fetch('https://smarthire-job-tracker.onrender.com/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const text = data.choices[0].message.content.replace(/```json|```/g, '').trim();
      setResult(JSON.parse(text));
      const newCredits = await deductCredit(user.uid);
      setCredits(newCredits);
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

      <div className="credits-bar">
        <div className="credits-info">
          <span className="credits-label">Your credits</span>
          <span className="credits-count">{credits !== null ? credits : '...'}</span>
        </div>
        <div className="credits-packages">
          <button className="pkg-btn" onClick={() => handlePayment(1, 29)} disabled={paying}>
            1 credit — ₹29
          </button>
          <button className="pkg-btn pkg-popular" onClick={() => handlePayment(5, 99)} disabled={paying}>
            5 credits — ₹99 ⭐
          </button>
          <button className="pkg-btn" onClick={() => handlePayment(10, 179)} disabled={paying}>
            10 credits — ₹179
          </button>
        </div>
      </div>

      {credits === 0 && (
        <div className="no-credits-banner">
          You have no credits left! Buy credits above to continue analyzing. 🎯
        </div>
      )}

      <div className="form-card">
        <div className="field" style={{ marginBottom: 14 }}>
          <label className="field-label">Your profile / resume summary</label>
          <textarea value={resume} onChange={e => setResume(e.target.value)}
            placeholder="e.g. 1.5 years experience in React, Java Spring Boot..."
            rows={4} />
        </div>
        <div className="field" style={{ marginBottom: 18 }}>
          <label className="field-label">Job description to analyze</label>
          <textarea value={jd} onChange={e => setJd(e.target.value)}
            placeholder="Paste the full job description here..."
            rows={5} />
        </div>
        <button className="btn-primary" onClick={analyze} disabled={loading || credits === 0}>
          {loading ? 'Analyzing...' : `Analyze fit with AI (${credits} credits left)`}
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
