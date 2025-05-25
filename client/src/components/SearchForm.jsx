import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [awbList, setAwbList] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    try {
      onSearch({ awbList, startDate: '', endDate: today });
    } catch (err) {
      console.error('Gagal fetch data:', err);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'left', marginBottom: '10px' }}>Traking awb</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          placeholder="Masukkan AWB, pisahkan dengan koma atau baris baru"
          value={awbList}
          onChange={(e) => setAwbList(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
            color: '#000',
            border: '1px solid #ccc'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '4px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none'
          }}
        >
          Cari
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
