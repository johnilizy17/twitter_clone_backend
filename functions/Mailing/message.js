const nodemailer = require("nodemailer");
const generateOTP = require("./Otp")

async function MessagSystem(e, value) {
  const code = await generateOTP()

  if (e === 'forgotten') {
    const opt = code
    const report = {
      subject: "Forgotten Password", // Subject line
      text: "your forgotten password", // plain text body
      html: `copy and past the OPT below <br/> ${opt}`// html body}
    }
    return report
  } else {
    const report = {
      subject: "Welcome", // Subject line
      text: "Welcome to twitter", // plain text body
      html: `<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
 <head>
    <meta charset="UTF-8" />
    <link href="./fonts/fonts.css" rel="stylesheet" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: #ffffff;
            font-family: "Axiforma";
        }
    </style>
</head>

<body style="margin: 0; padding: 0">
    <table role="presentation" style="
        width: 100%;
        border-collapse: collapse;
        border: 0;
        border-spacing: 0;
        background: #ffffff;
        margin-top: 20px;
        margin-bottom: 20px;
      ">
        <tr>
            <td align="center" style="padding: 0">

                <table role="presentation" style="
              min-width: 375px;
              border-collapse: collapse;
              border: 1px solid #cccccc;
              background-color: #FF7312;
              border-spacing: 0;
              text-align: left;
            ">
                    <tr>
                        <td style="background: #FF7312; padding-top: 20px">
                            <img src="data:image/jpeg;base64,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"
                                alt="" style="
                              height: auto;
                              display: block;
                              width: 100%;
                              margin-top: 10px;
                            " />
                        </td>
                    </tr>
                    <tr style="float: right; min-width: 344.8px">
                        <td style="
                  padding: 36px 30px 42px 30px;
                  max-width: 329px;
                  background-color: #FF7312;
                ">
                            <table role="presentation" style="
                    width: 100%;
                    color: #000000;
                    border-collapse: collapse;
                    border: 0;
                    border-spacing: 0;
                  ">
                                <tr>
                                    <td style="padding: 0 0 36px 0; color: #000000">
                                        <p style="
                          font-size: 26.3px;
                          margin: 0 0 29px 0;
                          max-width: 232px;
                          font-weight: 900;
                          line-height: 36px;
                        ">
                                            Welcome to twitter!
                                        </p>
                                        <p style="
                          margin: 0 0 29px 0;
                          font-size: 14.5px;
                          line-height: 24px;
                        ">
                                            Hi,
                                        </p>
                                        <p style="
                          margin: 0 0 29px 0;
                          width: 243px;
                          font-size: 14.5px;
                          line-height: 25px;
                        ">
                                            You're in! We're excited to have you here!
                                        </p>
                                   
                                       
                                        <p style="
                          margin: 0 0 0px 0;
                          width: 260px;
                          font-size: 8.3px;
                          font-weight: 400;
                          line-height: 15px;
                          color: #006e72;
                        ">
                                            You’re receiving this email because you signed up with
                                            your email address. If you have any inquiry or feedback
                                            on twitter, feel free to drop a line at admin@twitter.com.
                                            Remember to follow us on <span
                                                style="text-decoration:underline">Twitter</span> for more updates!
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr></tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`// html body}
    }
    return report
  }
}
//fidjfioddd

module.exports = { MessagSystem }
