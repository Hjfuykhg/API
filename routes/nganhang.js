const express = require('express');
const router = express.Router();
const nganhang = require('../models/nganhangModel');

//localhost:3210/nganhang/list?code=ADN103
router.get('/list', async (req, res) => {
  try {
    const code = req.query.code;

    if (!code) {
      return res.status(400).json({ error: 'Vui lòng cung cấp mã môn học (code).' });
    }

    const nganhangs = await nganhang.find({ code });

    if (nganhangs.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy đề thi nào cho mã môn học này.' });
    }

    res.status(200).json(nganhangs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách đề thi.' });
  }
});

router.post('/update/:id', async (req, res) => {
    try {
      const _id = req.params.id;
      const updateData = req.body;
  
      if (!_id) {
        return res.status(400).json({ error: 'Vui lòng cung cấp ID của đề thi.' });
      }
  
      const update = await Exam.findByIdAndUpdate(
        _id,
        updateData,
        { new: true, runValidators: true } 
      );
  
      if (!update) {
        return res.status(404).json({ error: 'Không tìm thấy đề thi với ID này.' });
      }
  
      res.status(200).json({ message: 'Cập nhật thành công!', update });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật đề thi.' });
    }
  });

module.exports = router;
