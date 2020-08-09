const nodemailer = require("nodemailer");

// get the URL of the front-end and the admin mails
const confGlobal = require("../config/" + process.env.NODE_ENV + "/global.config");
const mailConfig = require("../config/" + process.env.NODE_ENV + "/mailing.config");



exports.sendEmail = (poiId, opEmail = null , poiState = null) => {

  let transporter = nodemailer.createTransport(mailConfig.transport);

  let mailOptions;

  if ( poiState ) {

    mailOptions = {
      from: mailConfig.standard_email,
      to: opEmail,
      subject: "Le statut de votre point d'intérêt a changé.",
      text: `Un administrateur a changé le statut de votre point d'intérêt à changé pour "${poiState}". Vous pouvez y accéder à l'adresse : ${confGlobal.url}/poi/${poiId}`
    };

  } else {

    if( opEmail ) {
      mailOptions = {
        from: mailConfig.standard_email,
        to: opEmail,
        subject: "Votre POI a bien été enregistré.",
        text: `Votre POI a bien été enregistré. Vous pouvez y accéder à l'adresse : ${confGlobal.url}/poi/${poiId}`
      };
    } else {
      mailOptions = {
        from: mailConfig.standard_email,
        to: mailConfig.admin_email,
        subject: "Un nouveau POI a été créé.",
        text: `Un nouveau POI a été créé. Vous pouvez y accéder à l'adresse : ${confGlobal.url}/poi/${poiId}`
      };
    }

  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
