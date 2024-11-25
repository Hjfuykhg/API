const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const products = new Schema({
    id:{type: ObjectId},
    masp:{type: String,},
    tensp:{type: String},
    gia:{type: Number},
    soluong:{type: Number},
});
module.exports = mongoose.models.product || mongoose.model('Product', products);