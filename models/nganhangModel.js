const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const nganhangs = new Schema({
    id: { type: ObjectId },
    code: { type: String },
    link: { type: String },
    date: { type: Date },
});

module.exports = mongoose.models.nganhang || mongoose.model('nganhang', nganhangs);
