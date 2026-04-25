import React from 'react';
import { signInWithGoogle } from '../firebase';
import './Login.css';

function Login() {
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">🧠</div>
        <h1 className="login-title">SmartHire</h1>
        <p className="login-sub">AI-powered job application tracker</p>
        <div className="login-features">
          <div className="login-feature">✅ Track all your job applications</div>
          <div className="login-feature">✅ AI resume fit analyzer</div>
          <div className="login-feature">✅ Kanban board</div>
          <div className="login-feature">🎁 2 free AI analyses on signup!</div>
        </div>
        <button className="google-btn" onClick={handleLogin}>
          <img src="https://www.google.com/favicon.ico" alt="Google" width="18" />
          Continue with Google
        </button>
        <p className="login-footer">Free to use · No credit card required</p>
      </div>
    </div>
  );
}

export default Login;
