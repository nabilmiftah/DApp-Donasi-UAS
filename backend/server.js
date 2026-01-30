const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Data transaksi dummy
const dummyTransactions = [
  { 
    id: 1, 
    from: "0xA57E0...Ef874", 
    to: "0x52C48...4B740",   
    amount: "0.01 ETH", 
    timestamp: "2026-01-30",
    status: "Success"
  },
  { 
    id: 2, 
    from: "0x789...Abc", 
    to: "0x52C48...4B740", 
    amount: "0.05 ETH", 
    timestamp: "2026-01-29",
    status: "Success"
  }
];

// Endpoint API sesuai instruksi soal
app.get('/api/transactions', (req, res) => {
  res.status(200).json(dummyTransactions); 
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`Cek API di: http://localhost:${PORT}/api/transactions`);
});