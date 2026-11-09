const Amil = require('../models/amilModel');

exports.create = async (req, res) => {
  try {
    const amil = await Amil.create(req.body);
    res.status(201).json(amil);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  res.json(await Amil.find());
};