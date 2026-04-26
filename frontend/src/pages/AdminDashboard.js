import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './AdminDashboard.css';

const ADMIN_EMAIL = 'fathimarinoz10@gmail.com';

function AdminDashboard({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) {
      loadUsers();
    }
  }, [user]);

  const loadUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const userList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);

      const totalAnalyses = userList.reduce((s, u) => s + (u.totalAnalyses || 0), 0);
      const totalRevenue = totalAnalyses * 29;
      setStats({
        totalUsers: userList.length,
        totalAnalyses,
        totalRevenue,
        activeUsers: userList.filter(u => u.totalAnalyses > 0).length,
      });
    } catch (error) {
      console.error('Error loading users:', error);
    }
    setLoading(false);
  };

  if (user?.email !== ADMIN_EMAIL) {
    return (
      <div style={{ padding: '40px', color: 'var(--red)' }}>
        ❌ Access denied. Admin only!
      </div>
    );
  }

  if (loading) {
    return <div style={{ padding: '40px', color: 'var(--muted)' }}>Loading...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-sub">Monitor users and revenue</p>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-label">Total users</div>
          <div className="admin-stat-val" style={{ color: 'var(--accent)' }}>{stats.totalUsers}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Active users</div>
          <div className="admin-stat-val" style={{ color: 'var(--blue)' }}>{stats.activeUsers}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Total analyses</div>
          <div className="admin-stat-val" style={{ color: 'var(--purple)' }}>{stats.totalAnalyses}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Est. revenue</div>
          <div className="admin-stat-val" style={{ color: 'var(--amber)' }}>₹{stats.totalRevenue}</div>
        </div>
      </div>

      <div className="admin-table">
        <div className="admin-table-header">
          <span>User ID</span>
          <span>Credits left</span>
          <span>Total analyses</span>
          <span>Joined</span>
        </div>
        {users.map(u => (
          <div className="admin-table-row" key={u.id}>
            <div className="admin-user-id">{u.id.slice(0, 16)}...</div>
            <div>
              <span className="credits-badge">{u.credits} credits</span>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text)' }}>{u.totalAnalyses || 0}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
              {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
            No users yet!
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
