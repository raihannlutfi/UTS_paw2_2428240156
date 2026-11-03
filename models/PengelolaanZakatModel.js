const mongoose = require('mongoose');

//schema untuk embedding data kendaraan
const kendaraanSchema = new mongoose.Schema({
  kendaraanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Kendaraan' },
  jenisKendaraan: String,
  warna: String,
}, { _id: false });

// Schema utama catatan parkir
const PengelolaanSchemma = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  noTransaksi: String,
  namaMuzakki: String,
  jumlah: Number,
  jumlah: { type: Number, default: 0 },

  kendaraan: {  type: kendaraanSchema, required: false },
  kendaraanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Kendaraan' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ParkingRecord', parkingRecordsSchema);