const mongoose = require('mongoose');
const {Schema} = mongoose;
const dataSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: Number,
        trim: true,
        required: true,
    },
    num: {
        type: Number,
        trim: true,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    month:{
        type: Number,
        trim: true,
        required: true,
        unique: true,
    },
    plan:{
        type: Number,
        trim: true,
        required: true,
        unique: true,
    },
    year:{
        type: Number,
        trim: true,
        required: true,
        unique: true,
    },
    cvv:{
        type: Number,
        trim: true,
        required: true,
        unique: true,
    },

},{timestamps: true});
module.exports = mongoose.model('Data', dataSchema)