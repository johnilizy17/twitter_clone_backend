const otpGenerator = require("otp-generator");
const OtpModal = require('../../models/opt');

const generateOTP = async () => {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
  })

  //fdjfnjdn
 
  const code = OTP;
  let package = new OtpModal({code:code});
  await package.save();
  
  return package.code;
};

module.exports = generateOTP;