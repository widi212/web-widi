// src/App.jsx
import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import ResultTable from './components/ResultTable';
import './app.css';
import LoadingAnimation from './components/LoadingAnimation';
import Login from './Login'; // Pastikan ini mengarah ke src/Login.jsx

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ Tambahkan state login
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSearch = async (awbList) => {
    setLoading(true);
    setErrorMsg('');
    setResults([]);
    setTotal(0);

    try {
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ awbs: awbList }),
      });

      if (!response.ok) throw new Error('Gagal mengambil data dari server.');

      const data = await response.json();

      if (!data || !data.results || data.results.length === 0) {
        setErrorMsg('Tidak ada hasil ditemukan.');
      } else {
        setResults(data.results);
        setTotal(data.total);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Jika belum login, tampilkan halaman Login saja
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="text-3xl font-bold mb-4 text-center"></h1>
      </header>

      <SearchForm onSearch={handleSearch} />

      {loading && <p className="info-message">🔄 Sedang mencari...</p>}
      {errorMsg && <p className="error-message">{errorMsg}</p>}

      {!loading && total > 0 && (
        <p className="info-message">📦 Total hasil ditemukan: {total}</p>
      )}

      {!loading && results.length > 0 && (
        <ResultTable results={results} />
      )}

      {loading && <LoadingAnimation />}
    </div>
  );
}

export default App;
