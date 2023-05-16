const { MailingSystem } = require("../../functions/Mailing");
const { tokenCallback } = require('../../functions/token');
const OtpModal = require('../../models/opt');
const { verifyToken } = tokenCallback()
const User = require("../../models/user");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let routes = (app) => {

    app.post('/forgotten_password', async (req, res) => {

        const email = req.body.email
        try {
            await MailingSystem("forgotten", req.body.email)

            res.status(200).send("an email has been sent to you")
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }

    });

    app.post('/verify', async (req, res) => {

        const { email, code, password } = req.body
        try {

            if (password.length < 8)
                return res.status(400).json({ msg: "Password must be atleaast 8 characters long!" });

            const passwordHash = await bcrypt.hash(password, 12);
            const otp = await OtpModal.findOne({ code })
            const verify_User = await User.findOne({ email })
            if (!verify_User)
                return res.status(400).json({ msg: "user does not exist" });

            if (otp) {
                const update = {
                    password: passwordHash,
                };
                await User.updateOne({ email }, update, {
                    returnOriginal: false,
                });
                return res.status(200).json({ msg: "password successfully change" });

            }else {
                return res.status(400).json({ msg: "invalid token" });

            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }

    });


}


module.exports = routes;