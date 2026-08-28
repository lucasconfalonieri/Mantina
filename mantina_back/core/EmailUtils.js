const nodemailer = require('nodemailer');
//TODO cambiar config a prod
let transport = nodemailer.createTransport({
  host: 'ci1.toservers.com',
    port: '465',
    auth: {
        user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
});

module.exports = {
    sendEmail (req, res, next) {
      const { email } = req;
      const { msj } = req;
      const { subject } = req;
    const message = {
      from: 'info@mantina.com', 
      to: email,         
      subject: subject, 
      html: msj
  };
  
  
  transport.sendMail(message, function(error, info) {
      if (error) {
        res.status(409).json({
                     status: 'error',
                     message: error,
                   });
      } else {
        res.status(200).json({
          message: "Mensaje enviado.",
        });
      }
  });
        
    }
};