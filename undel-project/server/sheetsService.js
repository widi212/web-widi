const { google } = require('googleapis');
const credentials = require('./credentials.json');
const sheetConfigs = require('./sheetConfig');

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

async function searchSheets(awbs, startDate, endDate) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });
  const allResults = [];

  for (const config of sheetConfigs) {
    try {
      console.log(`🔍 Memeriksa sheet: ${config.sheetLabel}`);

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: config.id,
        range: config.sheetName,
      });

      const rows = response.data.values;
      if (!rows || rows.length < 2) {
        console.log(`⚠️  Sheet ${config.sheetLabel} kosong atau hanya berisi header.`);
        continue;
      }

      const dataRows = rows.slice(1); // Skip header

      const mappedRows = dataRows.map((row) => {
        const c = config.columns;

        return {
          tanggal: row[c[0]] || '-',
          resi: row[c[1]] || '-',
          pengirim: row[c[2]] || '-',
          kendala: row[c[3]] || '-',
          linkBuktiKendala: row[c[4]] || '-',
          fu: row[c[5]] || '-',
          statusTerakhir: row[c[6]] || '-',
          feedbackSeller: row[c[7]] || '-',
          kurir: config.sheetLabel || '-', // dari konfigurasi
        };
      });

      const filtered = mappedRows.filter((item) => {
        const awbMatch = awbs.includes(item.resi);
        const dateMatch =
          !startDate || !endDate
            ? true
            : isValidDate(item.tanggal) &&
              new Date(item.tanggal) >= new Date(startDate) &&
              new Date(item.tanggal) <= new Date(endDate);

        return awbMatch && dateMatch;
      });

      console.log(`✅ ${config.sheetLabel}: ${filtered.length} data cocok`);
      allResults.push(...filtered);
    } catch (err) {
      console.error(`❌ Gagal memuat data dari ${config.sheetLabel}:`, err.message);
    }
  }

  console.log(`📦 Total ditemukan: ${allResults.length}`);
  return allResults;
}

function isValidDate(dateStr) {
  const d = new Date(dateStr);
  return d instanceof Date && !isNaN(d);
}

module.exports = { searchSheets };
