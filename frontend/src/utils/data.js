export const initialJobs = [
  { id: 1, company: 'Zoho',      role: 'Full Stack Developer',   location: 'Chennai',   status: 'interview', score: 82, date: '2026-04-10' },
  { id: 2, company: 'Infosys',   role: 'Java Backend Engineer',  location: 'Bangalore', status: 'applied',   score: 71, date: '2026-04-12' },
  { id: 3, company: 'Freshworks',role: 'React Developer',        location: 'Chennai',   status: 'offer',     score: 90, date: '2026-04-05' },
  { id: 4, company: 'TCS',       role: 'Software Engineer',      location: 'Mumbai',    status: 'rejected',  score: 55, date: '2026-04-08' },
  { id: 5, company: 'Razorpay',  role: 'Full Stack Engineer',    location: 'Remote',    status: 'applied',   score: 78, date: '2026-04-14' },
];

export const STATUS_COLS = ['applied', 'interview', 'offer', 'rejected'];

export const STATUS_COLOR = {
  applied:   'var(--blue)',
  interview: 'var(--amber)',
  offer:     'var(--accent)',
  rejected:  'var(--red)',
};

export const scorePillClass = (score) => {
  if (score >= 75) return 'score-pill score-high';
  if (score >= 55) return 'score-pill score-mid';
  return 'score-pill score-low';
};

export const getStats = (jobs) => ({
  total:     jobs.length,
  applied:   jobs.filter(j => j.status === 'applied').length,
  interview: jobs.filter(j => j.status === 'interview').length,
  offer:     jobs.filter(j => j.status === 'offer').length,
  rejected:  jobs.filter(j => j.status === 'rejected').length,
  avgScore:  jobs.length ? Math.round(jobs.reduce((s, j) => s + j.score, 0) / jobs.length) : 0,
});
