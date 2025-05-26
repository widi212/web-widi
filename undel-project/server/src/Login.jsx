// client/src/Login.jsx
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId.trim() === 'undel123') {
      onLogin();
    } else {
      setError('ID salah. Coba lagi.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'pink',
      color: 'white'
    }}>
      <form onSubmit={handleSubmit} style={{ background: '#222', padding: 30, borderRadius: 8 }}>
        <h2 style={{ marginBottom: 20 }}>PASSWORD</h2>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Masukkan ID Anda"
          style={{ padding: 10, fontSize: 16, width: '100%', marginBottom: 10 }}
        />
        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 4 }}
        >
          Masuk
        </button>
        {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
