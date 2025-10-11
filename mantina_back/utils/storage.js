const multer = require('multer');
var path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
      cb(null, './storage/pdfs');
     
    
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + uuidv4() + path.extname(file.originalname))
  }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 50000000},
    fileFilter: (req, file, cb) =>{
              const filetypes = /pdf/;
              const mimetype = filetypes.test(file.mimetype);
              const extname = filetypes.test(path.extname(file.originalname))
              if(mimetype && extname){
                  return cb(null, true);
              }
              cb(new Error("Archivo debe ser un PDF."))
          }
    })

module.exports = upload;