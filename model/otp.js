const mongoose = require("mongoose");
const {Schema} = mongoose;
const otpSchema = new Schema({
    otpMsg: {
        type: Number,
        trim: true,
        required: true,
    },
},{timestamps: true});



module.exports = mongoose.model('Otp', otpSchema);