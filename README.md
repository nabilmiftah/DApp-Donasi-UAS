# DApp Donasi UAS


## Fitur Utama
- **Koneksi MetaMask**: Autentikasi pengguna menggunakan dompet digital.
- **Smart Contract Integration**: Melakukan transaksi donasi secara langsung ke blockchain Sepolia.
- **Real-time Data**: Membaca total saldo donasi dan daftar donatur dari smart contract.
- **RESTful API Backend**: Menyediakan data transaksi dummy melalui endpoint API.
- **Responsive Design**: Tampilan yang optimal di berbagai perangkat menggunakan CSS Flexbox/Grid.

## Teknologi yang Digunakan
- **Frontend**: React.js, Ethers.js, Tailwind CSS.
- **Backend**: Node.js, Express.js, CORS.
- **Blockchain**: Solidity, Remix IDE, Sepolia Testnet.

## Struktur Folder
- `/frontend`: Aplikasi React untuk antarmuka pengguna.
- `/backend`: Server Node.js untuk menyediakan endpoint API dummy.
- `/contract`: File Smart Contract Solidity (DonationContract.sol).

## Cara Instalasi & Menjalankan

### Prasyarat
- Node.js terinstal.
- Ekstensi MetaMask di browser.
- Saldo SepoliaETH (dapat diperoleh dari faucet).

### Menjalankan Backend
cd backend
npm install express cors
node server.js.

### Menjalankan Frontend
cd backend
npm install express cors
node server.js