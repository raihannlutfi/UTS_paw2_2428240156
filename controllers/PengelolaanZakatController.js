const PengelolaanZakat = require('../models/PengelolaanZakatModel'); //Model utama
const Amil = require('../models/amilModel'); // model Pendukung
const { errorHttp } = require('../middlewares/errorHandler');

const LIMIT_DEFAULT = 10;
const LIMIT_MAKS = 50;
const FIELD_SORT = ['namaMuzakki','NoTransaksi','createdAt'];
const FIELD_BOLEH_DIPILIH = ['NoTransaksi', 'namaMuzakki', 'jumlah', 'jenis', 'kontak', 'amailId','createdAt'];

function angkaAman(nilai, bawaan, min, maks) {
  const n = parseInt(nilai, 10);
  if (Number.isNaN(n)) return bawaan;
  return Math.min(Math.max(n, min), maks);
}

exports.create = async (req, res, next) => {
  try {
    const data = await PengelolaanZakat.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    if (err.name === 'ValidationError') err.status = 400;
    if (err.code === 11000) err.status = 409;
    next(err);
  }
};

exports.getAll = async (req, res) => {
  const filter = {};
  if (req.query.jenis) {
    filter['jenis'] = String(req.query.jenis).trim(); // bukan subdocukemn seperti latihan
  }

  const page = angkaAman(req.query.page, 1, 1, Number.MAX_SAFE_INTEGER);
  const limit = angkaAman(req.query.limit, LIMIT_DEFAULT, 1, LIMIT_MAKS);

  // Sorting: ?sort=nama (naik) atau ?sort=-nama (turun). Bawaan: terbaru dulu
  const sortParam = String(req.query.sort || '-createdAt');
  const arah = sortParam.startsWith('-') ? -1 : 1;
  const sortField = sortParam.replace(/^-/, '');
  if (!FIELD_SORT.includes(sortField)) {
    throw errorHttp(400, `sort hanya boleh: ${FIELD_SORT.join(', ')}`);
  }

    // Projection: ?fields=nama,nim
  let select = '';
  if (req.query.fields) {
    const fields = String(req.query.fields).split(',').map((f) => f.trim());
    if (!fields.every((f) => FIELD_BOLEH_DIPILIH.includes(f))) {
      throw errorHttp(400, `fields hanya boleh: ${FIELD_BOLEH_DIPILIH.join(', ')}`);
    }
    select = fields.join(' ');
  }

    const query = PengelolaanZakat.find(filter)
    .select(select)
    .sort({ [sortField]: arah, _id: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  // populate() otomatis menambahkan kendaraanId ke hasil, jadi hanya dipanggil
  // bila kendaraanId memang diminta (atau bila tidak ada pemilihan field)
  if (!select || select.split(' ').includes('amilId')) {
    query.populate('amilId', 'kode nama');
  }

  const [data, total] = await Promise.all([query, PengelolaanZakat.countDocuments(filter)]);

  res.json({ data, page, limit, total, totalPages: Math.ceil(total / limit) });
};

exports.getById = async (req, res) => {
  const data = await PengelolaanZakat.findById(req.params.id).populate('mailId');
  if (!data) throw errorHttp(404, 'Data tidak ditemukan');
  res.json(data);
};

exports.update = async (req, res) => {
  const data = await PengelolaanZakat.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: 'after', runValidators: true }
  );
  if (!data) throw errorHttp(404, 'Data tidak ditemukan');
  res.json(data);
};

exports.remove = async (req, res) => {
  const data = await PengelolaanZakat.findByIdAndDelete(req.params.id);
  if (!data) throw errorHttp(404, 'Data tidak ditemukan');
  res.status(204).send();
};