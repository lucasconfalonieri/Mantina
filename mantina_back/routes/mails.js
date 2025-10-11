var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
  
  
  let transport = nodemailer.createTransport({
    host: 'ci1.toservers.com',
    port: '465',
    auth: {
        user: 'info@mantina.com',
         pass: 'Mantina.2112'
    }
});
  
  router.post('/', (req, res) => {
    const { email } = req.body;
    const { name } = req.body;
    const { msj } = req.body;

  const message = {
    from: 'info@mantina.com', 
    to: 'www.mantina.com@gmail.com',        
    subject: 'Tenes una nueva consulta de: ' + name + '.', 
    text: '\n Nombre: ' + name + '\n Email: ' + email + '\n \n Consulta: ' + msj
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
    
  });

  module.exports = router;