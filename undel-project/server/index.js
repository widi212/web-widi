const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { searchSheets } = require('./sheetsService'); // ✅ Perbaiki ini

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));
app.use(bodyParser.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.send('✅ Server API Undel is running!');
});

app.post('/api/search', async (req, res) => {
  try {
    const { awbs, startDate, endDate } = req.body;

    if (!Array.isArray(awbs) || awbs.length === 0) {
      return res.status(400).json({ error: 'Daftar AWB tidak boleh kosong dan harus berbentuk array.' });
    }

    const results = await searchSheets(awbs, startDate, endDate);

    res.status(200).json({
      total: results.length,
      results,
    });

  } catch (error) {
    console.error('❌ API Error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan di server.' });
  }
});
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});