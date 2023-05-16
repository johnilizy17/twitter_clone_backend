const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    code: { type: String, required: true, default: 12 },
}, {
    timestamps: true
});

const OTP = mongoose.model('OTP', OTPSchema);

module.exports = OTP;