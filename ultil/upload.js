const multer = require('multer');
const router = require('../routes/product');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images/')
    },
    filename: function(req, file,cb){
        const uniqueSuffix = Date.now() + '-'+Math.round(Math.random());
        cb(null, file.fieldname+'-'+uniqueSuffix+'-');
    }
});
module.exports = multer({storage: storage});