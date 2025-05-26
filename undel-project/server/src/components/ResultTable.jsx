import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ITEMS_PER_PAGE = 10;

const ResultTable = ({ results }) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!results || results.length === 0) return null;

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = results.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const exportToExcel = () => {
    const cleanedData = results.map(row => ({
      Tanggal: row.tanggal || '-',
      Resi: row.resi || '-',
      Pengirim: row.pengirim || '-',
      Kendala: row.kendala || '-',
      'Link Bukti Kendala': row.linkBuktiKendala || 'Tidak Ada',
      FU: row.fu || '-',
      'Status Terakhir': row.statusTerakhir || '-',
      'Feedback Seller': row.feedbackSeller || '-',
      Kurir: row.kurir || '-',
    }));

    const ws = XLSX.utils.json_to_sheet(cleanedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hasil');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'hasil-pencarian.xlsx');
  };

  return (
    <div style={containerStyle}>
      <div style={topControlsStyle}>
        <button onClick={exportToExcel} style={exportButtonStyle}>📤 Export Excel</button>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={thStyle}>Tanggal</th>
            <th style={thStyle}>Resi</th>
            <th style={thStyle}>Pengirim</th>
            <th style={thStyle}>Kendala</th>
            <th style={centerThStyle}>Link Bukti Kendala</th>
            <th style={thStyle}>FU</th>
            <th style={thStyle}>Status Terakhir</th>
            <th style={thStyle}>Feedback Seller</th>
            <th style={thStyle}>Kurir</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, idx) => (
            <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#101010' : '#1c1c1c', color: 'white' }}>
              <td style={tdStyle}>{row.tanggal || '-'}</td>
              <td style={tdStyle}>{row.resi || '-'}</td>
              <td style={tdStyle}>{row.pengirim || '-'}</td>
              <td style={tdStyle}>{row.kendala || '-'}</td>
              <td style={centerTdStyle}>
                {row.linkBuktiKendala && row.linkBuktiKendala !== '-' ? (
                  <a
                    href={row.linkBuktiKendala}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={buktiLinkStyle}
                  >
                    Lihat Bukti
                  </a>
                ) : (
                  'Tidak Ada'
                )}
              </td>
              <td style={tdStyle}>{row.fu || '-'}</td>
              <td style={tdStyle}>{row.statusTerakhir || '-'}</td>
              <td style={tdStyle}>{row.feedbackSeller || '-'}</td>
              <td style={tdStyle}>{row.kurir || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={paginationContainerStyle}>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={paginationButtonStyle}
        >
          ⬅ Prev
        </button>
        <span style={{ margin: '0 10px', color: 'white' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={paginationButtonStyle}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

// === Styles ===

const containerStyle = {
  width: '100%',
  maxWidth: '100%',
  padding: '0 20px',
  boxSizing: 'border-box',
};

const topControlsStyle = {
  marginBottom: '10px',
  textAlign: 'right',
};

const exportButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
};

const headerRowStyle = {
  backgroundColor: '#e56a6a',
};

const thStyle = {
  padding: '12px 8px',
  borderBottom: '2px solid #ddd',
  color: 'white',
  textAlign: 'left',
};

const centerThStyle = {
  ...thStyle,
  textAlign: 'center',
};

const tdStyle = {
  padding: '10px 8px',
  borderBottom: '1px solid #333',
  verticalAlign: 'top',
};

const centerTdStyle = {
  ...tdStyle,
  textAlign: 'center',
};

const buktiLinkStyle = {
  color: '#66ccff',
  textDecoration: 'underline',
  fontWeight: 'bold',
};

const paginationContainerStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
};

const paginationButtonStyle = {
  padding: '6px 12px',
  backgroundColor: '#444',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default ResultTable;
