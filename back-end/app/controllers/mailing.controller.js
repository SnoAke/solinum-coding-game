const nodemailer = require("nodemailer");

const confGlobal = require("../config/" + process.env.NODE_ENV + "/global.config");
const mailConfig = require("../config/" + process.env.NODE_ENV + "/mailing.config");

exports.sendEmail = (poiId, opEmail = null , poiState = null) => {

  let transporter = nodemailer.createTransport(mailConfig.transport);

  let mailOptions;

  if ( opEmail ) {

    mailOptions = {
      from: mailConfig.standard_email,
      to: opEmail,
      subject: "Le statut de votre POI a changé.",
      text: `Un administrateur a changé le statut de votre POI à changé pour "${poiState}". Vous pouvez y accéder à l'adresse : ${confGlobal.url}/${poiId}`
    };

  } else {

    mailOptions = {
      from: mailConfig.standard_email,
      to: mailConfig.admin_email,
      subject: "Un nouveau POI a été créé.",
      text: `Un nouveau POI a été créé. Vous pouvez y accéder à l'adresse : ${confGlobal.url}/${poiId}`
    };

  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
