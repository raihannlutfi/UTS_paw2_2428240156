const mongoose = require('mongoose');

//schema untuk embedding data kendaraan
const amilSchema = new mongoose.Schema({
  telpon: String,
  alamat: String,
}, { _id: false });

// Schema utama catatan parkir
const PengelolaanZakatSchemma = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  noTransaksi: { type: String, required: [true, 'noTransaksi wajib diisi'], unique: true, trim: true },
  namaMuzakki: { type: String, required: [true, 'namaMuzakki wajib diisi'], trim: true },
  jumlah: { type: Number, required: [true, 'jumlah wajib minimal 0'] },
  jenis: { type: String, required: [true, 'jenis wajib diisi'], trim: true },

  amil: amilSchema,
  amilId: { type: mongoose.Schema.Types.ObjectId, ref: 'amil' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PengelolaanZakat', PengelolaanZakatSchemma);