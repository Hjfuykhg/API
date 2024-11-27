var express = require('express');
var router = express.Router();
var uesrModel = require("../models/uesrModel")
const JWT = require('jsonwebtoken');
const config = require("../ultil/Config");
router.get("/all", async function(req,res){
  var list = await uesrModel.find();
  res.json(list);
});

router.post("/login", async function(req,res){
  try {
    const{name,password}=req.body;
    const checkUesr = await uesrModel.findOne({name: name,password: password});
    if (checkUesr == null) {
      res.status(200).json({status: false, message:"sai thông tinh"});
    } else {
      const token = JWT.sign({name: name},config.SECRETKEY,{expiresIn: '30s'});
      const refreshToken = JWT.sign({name: name},config.SECRETKEY,{expiresIn: '1d'});
      res.status(400).json({status: true, message:"đăng nhập thành công", token: token, refreshToken:refreshToken});
    }
    
  } catch (e) {
    res.status(401).json({status: false, message:"có lỗi"});
  }
});
module.exports = router;
