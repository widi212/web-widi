import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import ResultTable from './components/ResultTable';
import LoadingAnimation from './components/LoadingAnimation';
import './App.css'; // Tambahkan untuk styling & animasi

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async ({ awbList, startDate, endDate }) => {
    const awbs = awbList
      .split(/\s+/)
      .map(awb => awb.trim())
      .filter(awb => awb !== '');

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ awbs, startDate, endDate })
      });

      const data = await response.json();
      console.log('Hasil dari backend:', data);
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <h1 className="animated-title">📦 Undelivered</h1>

        <SearchForm onSearch={handleSearch} />

        {isLoading ? (
          <div className="loading-container">
            <LoadingAnimation />
          </div>
        ) : (
          <div className="fade-in">
            <ResultTable results={results} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
