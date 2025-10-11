var express = require('express');
var router = express.Router();
const upload = require('../utils/storage');
const { appConfig } = require('../configs/config');
var dbConn  = require('../core/DataBaseManager');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'host: ' + appConfig.host + ' port: ' + appConfig.port });
});

/* upload pdf test  */
router.post('/', upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'img', maxCount: 1 }]), function(req, res, next) {
        const { textPdf, namePdf ,idSubTopic , nameImg } = req.body;
        const query = `
        CALL contentAdd(0,?,?,?,?);
    `;

    dbConn.query(query,[idSubTopic , namePdf , textPdf, nameImg], function(err,rows)     {
        if(err) {
            res.status(409).json({
                status: 'error',
                message: err,
              });        } else {
            res.json({ Status: 'Content saved'});
        }
     });
});

module.exports = router;