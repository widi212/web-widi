import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [awbInput, setAwbInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const awbs = awbInput
      .split('\n')
      .map((awb) => awb.trim())
      .filter((awb) => awb !== '');
    if (awbs.length > 0) {
      onSearch(awbs);
    }
  };

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '20px auto',
        color: 'white',
        padding: '0 20px',
      }}
    >
      {/* Judul di tengah */}
      <h1 style={{ textAlign: 'center', fontSize: '49px', fontWeight: 'bold', marginBottom: '20px' }}>
        📦 Undelivered Tracker
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Label + Textarea kiri */}
        <div style={{ textAlign: 'left', maxWidth: '900px', marginBottom: '10px' }}>
          <label htmlFor="awbInput" style={{ fontWeight: 'bold', fontSize: '18px', display: 'block', marginBottom: '8px' }}>
            Nomor AWB🔍
          </label>
          <textarea
            id="awbInput"
            value={awbInput}
            onChange={(e) => setAwbInput(e.target.value)}
            rows={8}
            placeholder="Masukkan nomor AWB, satu per baris"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              resize: 'vertical',
              color: 'black',
            }}
          />
        </div>

        {/* Tombol Cari kecil dan di tengah */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            style={{
              padding: '10px 30px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Cari
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
