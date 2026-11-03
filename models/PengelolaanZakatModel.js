const mongoose = require('mongoose');

//schema untuk embedding data kendaraan
const amilSchema = new mongoose.Schema({
  amilId: { type: mongoose.Schema.Types.ObjectId, ref: 'amil' },
  telpon: String,
  alamat: String,
}, { _id: false });

// Schema utama catatan parkir
const PengelolaanZakatSchemma = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  noTransaksi: String,
  namaMuzakki: String,
  jumlah: Number,
  jenis:String,
  kontak:   {telepon: String, alamat: String },

  amil: {  type: amilSchema, required: false },
  amilId: { type: mongoose.Schema.Types.ObjectId, ref: 'amil' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PengelolaanZakat', PengelolaanZakatSchemma);