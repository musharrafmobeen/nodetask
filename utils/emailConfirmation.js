const nodemailer = require('nodemailer');
const randomString = require('../utils/randomString');

const sendEmailConfirmation = async (email, subject, text) => {
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'musharrafmobeen24@gmail.com',
        pass: 'Blackviking125'
    }
    });

    var mailOptions = {
    from: 'musharrafmobeen24@gmail.com',
    to: email,
    subject: subject,
    text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

const emailVerification = async (email,verificationId) => {
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'musharrafmobeen24@gmail.com',
        pass: 'Blackviking125'
    }
    });

    let stringVerificationId = randomString(30);

    var mailOptions = {
    from: 'musharrafmobeen24@gmail.com',
    to: email,
    subject: "Email Verification",
    html: `<p>Click Here To Verify Email <a href="http://localhost:5000/userVerificaion/${verificationId}"> ${stringVerificationId} </a></p>`,
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}


module.exports = {sendEmailConfirmation, emailVerification};

