const express = require('express');
const Sinhvien = require('../models/SinhvienModel');
const router = express.Router();

// 1. Lấy toàn bộ danh sách sinh viên
router.get('/all', async (req, res) => {
  try {
    const sinhvien = await Sinhvien.find();
    res.json(sinhvien);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Lấy toàn bộ danh sách sinh viên thuộc khoa CNTT
router.get('/sv/cntt', async (req, res) => {
  try {
    const sinhvien = await Sinhvien.find({ BoMon: 'CNTT' });
    res.json(sinhvien);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Lấy danh sách sinh viên có điểm trung bình từ 6.5 đến 8.5
router.get('/sv/dtb', async (req, res) => {
  try {
    const sinhvien = await Sinhvien.find({ DiemTrungBinh: { $gte: 6.5, $lte: 8.5 } });
    res.json(sinhvien);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Tìm kiếm sinh viên theo MSSV
router.get('/sv/:mssv', async (req, res) => {
  try {
    const sinhvien = await Sinhvien.findOne({ MSSV: req.params.mssv });
    if (!sinhvien) return res.status(404).json({ message: 'Sinh viên không tồn tại' });
    res.json(sinhvien);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Thêm mới một sinh viên
router.post('/sv/them', async (req, res) => {
  try {
    const sinhvien = new Sinhvien(req.body);
    await sinhvien.save();
    res.status(201).json(sinhvien);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 6. Thay đổi thông tin sinh viên theo MSSV
router.put('/thaydoi/:mssv', async (req, res) => {
  try {
    const sinhvien = await Sinhvien.findOneAndUpdate({ MSSV: req.params.mssv }, req.body, { new: true });
    if (!sinhvien) return res.status(404).json({ message: 'Sinh viên không tồn tại' });
    res.json(sinhvien);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 7. Xóa một sinh viên ra khỏi danh sách
router.delete('/xoa/:mssv', async (req, res) => {
  try {
    const sinhvien = await Sinhvien.findOneAndDelete({ MSSV: req.params.mssv });
    if (!sinhvien) return res.status(404).json({ message: 'Sinh viên không tồn tại' });
    res.json({ message: 'Xóa thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Lấy danh sách sinh viên thuộc BM CNTT và có DTB từ 9.0
router.get('/sv/cntt/dtb9', async (req, res) => {
  try {
    const sinhvien = await Sinhvien.find({ BoMon: 'CNTT', DiemTrungBinh: { $gte: 9.0 } });
    res.json(sinhvien);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//404
// 9. Lấy danh sách sinh viên tuổi từ 18-20, thuộc CNTT và có DTB từ 6.5
router.get('/sv/cntt/tuoi', async (req, res) => {
  try {
    const sinhvien = await Sinhvien.find({
      BoMon: 'CNTT',
      Tuoi: { $gte: 18, $lte: 20 },
      DiemTrungBinh: { $gte: 6.5 }
    });
    res.json(sinhvien);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. Sắp xếp danh sách sinh viên tăng dần theo điểm trung bình
router.get('/sort/dtb', async (req, res) => {
  try {
    const sinhvien = await Sinhvien.find().sort({ DiemTrungBinh: 1 });
    res.json(sinhvien);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 11. Tìm sinh viên có điểm trung bình cao nhất thuộc BM CNTT
router.get('/cntt/top', async (req, res) => {
  try {
    const sinhvien = await Sinhvien.find({ BoMon: 'CNTT' }).sort({ DiemTrungBinh: -1 }).limit(1);
    res.json(sinhvien);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
