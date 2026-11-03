const amil = require('../models/amilModel');

exports.create = async (req, res) => {
  try {
    const amil = await amil.create(req.body);
    res.status(201).json(amil);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  const filter = {};
  if (req.query.telpon) {
    filter['telpon'] = String(req.query.telpon).trim();
  }
  if (req.query.telpon) {
    const amil = await amil.findOne({ kode: String(req.query.amil).toUpperCase() });
    // Kode kendaraan tidak dikenal -> hasil kosong ($in: [] tidak cocok dengan apa pun)
    filter.amilId = amil ? amil._id : { $in: [] };
  }
  const data = await amil.find(filter).populate('amilId');
  res.json(data);
};