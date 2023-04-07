const mongoose = require("mongoose");
const {Schema} = mongoose;
const userSchema = new Schema({
    img: {
        url: String,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    priceOne: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    priceTwo: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    priceThree: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    condition:{
        type: String,
        trim: true,
        required: true,
        unique: true,
    }
},{timestamps: true});



module.exports = mongoose.model('Product', userSchema);