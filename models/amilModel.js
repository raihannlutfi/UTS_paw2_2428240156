
const mongoose = require('mongoose');

// Schema embedding untuk data kendaraan
const amilSchema = new mongoose.Schema({
  telpon: { type: String, required: [true, 'telpon wajib diisi'], unique: true, trim: true },
  alamat: { type: String, required: [true, 'warna wajib diisi'], trim: true },
});

module.exports = mongoose.model('amil', amilSchema);