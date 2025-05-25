import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ResultTable = ({ results }) => {
  if (!results || results.length === 0) return null;

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(results);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hasil Pencarian");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "hasil-pencarian.xlsx");
  };

  const cellStyle = {
    padding: '10px',
    borderBottom: '1px solid #444',
    color: '#fff'
  };

  return (
    <div
      style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '10px',
        padding: '20px',
        marginTop: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        animation: 'fadeIn 0.5s ease-in-out'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#fff' }}>Hasil Pencarian</h2>
        <button
          onClick={exportToExcel}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          Export Excel
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
        <thead>
          <tr>
            {[
              'Tanggal', 'Resi', 'Pengirim', 'Kendala',
              'Link Bukti', 'Status FU', 'Status Akhir',
              'Feedback Seller', 'Kurir'
            ].map((header, index) => (
              <th
                key={index}
                style={{
                  backgroundColor: '#333',
                  color: '#fff',
                  padding: '10px',
                  borderBottom: '1px solid #444',
                  textAlign: 'left'
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((row, index) => (
            <tr key={index} className="hover-row">
              <td style={cellStyle}>{row.tanggal || '-'}</td>
              <td style={cellStyle}>{row.resi || '-'}</td>
              <td style={cellStyle}>{row.pengirim || '-'}</td>
              <td style={cellStyle}>{row.kendala || '-'}</td>
              <td style={cellStyle}>
                {row.link_kendala ? (
                  <a
                    href={row.link_kendala}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#4FC3F7' }}
                  >
                    Lihat Link
                  </a>
                ) : '-'}
              </td>
              <td style={cellStyle}>{row.fu || '-'}</td>
              <td style={cellStyle}>{row.final_status || '-'}</td>
              <td style={cellStyle}>{row.feedback_seller || '-'}</td>
              <td style={cellStyle}>{row.courier || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hover-row:hover {
          background-color: #2a2a2a;
        }
      `}</style>
    </div>
  );
};

export default ResultTable;
