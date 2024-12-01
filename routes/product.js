var express = require('express');
var router = express.Router();
var product = require("../models/ProductModel");
var upload = require("../ultil/upload")
const JWT = require('jsonwebtoken');
const config = require("../ultil/Config");




router.get("/all", async function (req, res) {
  try {
    const token = req.header("Authorization").split(' ')[1];
    if (token) {
      JWT.verify(token, config.SECRETKEY, async function (err, id) {
        if (err) {
          res.status(403).json({ "status": false, message: "có lỗi xảy ra" + err });
        } else {
          var list = await product.find();
          res.status(200).json(list);
        }
      });
    } else {
      res.status(401).json({ "status": false, message: "có lỗi xảy ra" + err });
    }
  } catch (e) {
    res.status(400).json({ status: false, message: "Không Xác Thực" });
  }
});

// Lấy danh sách tất cả các sản phẩm có số lượng lớn hơn giá trị X
// localhost:3000/product/sp-lon-hon-X?soluong=200
router.get("/sp-lon-hon-X", async function (req, res) {
  try {
    const token = req.header("Authorization").split(' ')[1];
    if (token) {
      JWT.verify(token, config.SECRETKEY, async function (err, id) {
        if (err) {
          res.status(403).json({ "status": false, message: "có lỗi xảy ra" + err });
        } else {
          const { soluong } = req.query;
          var list = await product.find({ soluong: { $gt: Number(soluong) } });
          res.status(200).json(list);
        }
      });
    } else {
      res.status(401).json({ "status": false, message: "có lỗi xảy ra" + err });
    }

  } catch (e) {
    res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
  }
});

// Lấy danh sách sản phẩm có giá từ 20000 đến 50000
// localhost:3000/products/sp-trong-khoang-gia?min=20000&max=50000
router.get("/sp-trong-khoang-gia", async function (req, res) {
  try {
    const token = req.header("Authorization").split(' ')[1];
    if (token) {
      JWT.verify(token, config.SECRETKEY, async function (err, id) {
        if (err) {
          res.status(403).json({ "status": false, message: "có lỗi xảy ra" + err });
        } else {
          const { min, max } = req.query;
          var list = await product.find({ gia: { $gte: Number(min), $lte: Number(max) } });
          res.status(200).json(list);
        }
      });
    } else {
      res.status(401).json({ "status": false, message: "có lỗi xảy ra" + err });
    }

  } catch (e) {
    res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
  }
});

// Lấy danh sách sản phẩm có số lượng nhỏ hơn 10 hoặc giá lớn hơn 15000
//localhost:3210/product/so-sanh?soluong=10&gia=20000
router.get("/so-sanh", async function (req, res) {
  try {
    const token = req.header("Authorization").split(' ')[1];
    if (token) {
      JWT.verify(token, config.SECRETKEY, async function (err, id) {
        if (err) {
          res.status(403).json({ "status": false, message: "có lỗi xảy ra" + err });
        } else {
          const { soluong, gia } = req.query;
          var list = await product.find({ $or: [{ soluong: { $lt: Number(soluong) } }, { gia: { $gt: Number(gia) } }], });
          res.status(200).json(list);
        }
      });
    } else {
      res.status(401).json({ "status": false, message: "có lỗi xảy ra" + err });
    }

  } catch (e) {
    res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
  }
});

// Lấy thông tin chi tiết của sản phẩm
//localhost:3210/product/chi-tiet-sp/672f51668011c2592855ab7c
router.get("/chi-tiet-sp/:id", async function (req, res) {
  try {
    const token = req.header("Authorization").split(' ')[1];
    if (token) {
      JWT.verify(token, config.SECRETKEY, async function (err, id) {
        if (err) {
          res.status(403).json({ "status": false, message: "có lỗi xảy ra" + err });
        } else {
          const { id } = req.params;
          var detail = await product.findById(id);
          res.status(200).json(detail);
        }
      });
    } else {
      res.status(401).json({ "status": false, message: "có lỗi xảy ra" + err });
    }

  } catch (e) {
    res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
  }
});

//thêm một sản phẩm mới
router.post("/add", async function (req, res) {
  try {
    const token = req.header("Authorization").split(' ')[1];
    if (token) {
      JWT.verify(token, config.SECRETKEY, async function (err, id) {
        if (err) {
          res.status(403).json({ "status": false, message: "có lỗi xảy ra" + err });
        } else {
          const { masp, tensp, gia, soluong } = req.body;
          const newItem = { masp, tensp, gia, soluong };
          await product.create(newItem);
          res.status(200).json({ status: true, message: "Thành công" });

        }
      });
    } else {
      res.status(401).json({ "status": false, message: "có lỗi xảy ra" + err });
    }

  } catch (e) {
    res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
  }
})

// localhost:3210/product/edit/672f51668011c2592855ab7c
// lưu ý nhập đủ thông tin quan trọng nhất là id
router.put("/edit/:id", async function (req, res) {
  try {
    const token = req.header("Authorization").split(' ')[1];
    if (token) {
      JWT.verify(token, config.SECRETKEY, async function (err, id) {
        if (err) {
          res.status(403).json({ "status": false, message: "có lỗi xảy ra" + err });
        } else {
          const { id, ten, gia, soluong } = req.body;
          const findProduct = await product.findById(id);
          if (findProduct) {
            findProduct.ten = ten ? ten : findProduct.ten;
            findProduct.gia = gia ? gia : findProduct.gia;
            findProduct.soluong = soluong ? soluong : findProduct.soluong;
            await findProduct.save();
            res.status(200).json({ status: true, message: "Thành công" });
          } else {
            res.status(400).json({ status: false, message: "Không tìm thấy sp" });
          }
        }
      });
    } else {
      res.status(401).json({ "status": false, message: "có lỗi xảy ra" + err });
    }

  } catch (e) {
    res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
  }
})

//xóa
router.delete("/delete/:id", async function (req, res) {
  try {
    const token = req.header("Authorization").split(' ')[1];
    if (token) {
      JWT.verify(token, config.SECRETKEY, async function (err, id) {
        if (err) {
          res.status(403).json({ "status": false, message: "có lỗi xảy ra" + err });
        } else {
          const { id } = req.params;
          await product.findByIdAndDelete(id);
          res.status(200).json({ status: true, message: "Thành công" });
        }
      });
    } else {
      res.status(401).json({ "status": false, message: "có lỗi xảy ra" + err });
    }

  } catch (e) {
    res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
  }
});
//upload file
//192.168.1.13 (id wifi)
// const url = http://192.168.1.13:3210/images/${file.filename};
router.post('/upload', [upload.single('image', 10)],
  async (req, res, next) => {
    try {
      const { file } = req;
      if (!file) {
        return res.json({ status: 0, link: "" });
      } else {
        const url = `http://localhost:3210/images/${file.filename}`;
        return res.json({ status: 1, url: url });
      }
    } catch (error) {
      console.log('upload image error:', error);
      return res.json({ status: 0, link: "" });
    }
  }
)
module.exports = router;