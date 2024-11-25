const mongoose = require('mongoose');

const sinhvien = new mongoose.Schema({
  mssv: { type: String },
  hoTen: { type: String },
  diemTrungBinh: { type: Number },
  boMon: { type: String },
  tuoi: { type: Number }
});

module.exports = mongoose.models.sinhvien || mongoose.model('sinhvien', sinhvien);
