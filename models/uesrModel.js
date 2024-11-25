const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const hihi = new Schema({
    id: {type: ObjectId},
    name:{
        type: String,
        required: true,
        unique:true,
        trim:true,
        minlength: 3,
        maxlength:50,
        default :'No name'
    },
    pass:{type:String},
    age:{type:String},

});
module.exports = mongoose.models.hihi || mongoose.model('hihi',hihi);