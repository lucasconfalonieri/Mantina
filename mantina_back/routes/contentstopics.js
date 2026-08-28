var express = require('express');
var router = express.Router();
var dbConn  = require('../core/DataBaseManager');
const upload = require('../utils/storage');
var jwt = require('jsonwebtoken');
const { ensureToken , isLoggedIn} = require('../core/auth');


router.get('/:idTopic', function(req, res, next) {
    const { idTopic } = req.params;
    var response;
    
    dbConn.query('SELECT id_content_topic , name_pdf , text_pdf FROM contentstopics WHERE id_topicc = ?', [idTopic] ,function(err,rows)     {
    
            if(err) {
                res.status(409).json({
                    status: 'error',
                    message: err,
                  });
                } else {      
                    
                        response = rows;
                        dbConn.query('SELECT * FROM topics WHERE id_topic = ?', [idTopic] ,function(err,rows)     {
    
                            if(err) {
                                res.status(409).json({
                                    status: 'error',
                                    message: err,
                                  });
                            }else if(!rows.length){
                                res.status(204).json({
                                    status: 'No Content',
                                    message: 'no existe topic',
                                  });
                               }
                             else {
                              res.setHeader('Content-Type', 'application/json');
                              res.json({contentstopics: response , topicName : rows[0].name});
                            }
                        });
                     
                 }
        });

});

/**
 * @swagger
 * /contents:
 *    post:
 *      tags:
 *      -   "Contents"
 *      summary: "Add new Content"
 *      consumes:
 *      - "application/json"
 *      parameters:
 *      -   in: "body"
 *          name: "body"
 *          description: "Name and IDSubTopic of content to add"
 *          required: true
 *          schema:
 *              type: "object"
 *              properties:
 *                  namePdf:
 *                      type: "string"
 *                  idSubTopic:
 *                      type: "integer"
 *                  textPdf:
 *                      type: "string"
 *      responses:
 *          200:
 *              description: "successful operation"
 *          error:
 *              description: "to do implement code errors"
 */
router.post('/',ensureToken , upload.single('pdf'), function(req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if(err){
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {
    let namePdf  = req.file.filename;
    const { idTopic, textPdf } = req.body;
    const query = `
    INSERT INTO contentstopics(name_pdf, id_topicc, text_pdf)
    VALUES (?, ?, ?);
    `;

    dbConn.query(query,[namePdf, idTopic  , textPdf], function(err,rows)     {
        if(err) {
            res.status(409).json({
                status: 'error',
                message: err,
              });
        } else {
            res.json({ Status: 'Content saved'});
        }
     });
    }
});
});

router.put('/pdf/:idContentTopic',ensureToken , upload.single('pdf'), function(req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if(err){
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {
    let namePdf  = req.file.filename;
    const { idContentTopic} = req.params;
    const query = `
    UPDATE contentstopics SET  name_pdf = ? 
    WHERE id_content_topic = ?;
    `;

    dbConn.query(query,[ namePdf , idContentTopic], function(err,rows)     {
        if(err) {
            res.status(409).json({
                status: 'error',
                message: err,
              });
        } else {
            res.json({ Status: 'ContentTopic Updated'});
        }
     });
    }
});
});


router.put('/text/:idContentTopic',ensureToken ,  function(req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if(err){
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {
    const { idContentTopic} = req.params;
    const { textPdf } = req.body;
    const query = `
    UPDATE contentstopics SET text_pdf = ?
    WHERE id_content_topic = ?;
    `;

    dbConn.query(query,[textPdf, idContentTopic], function(err,rows)     {
        if(err) {
            res.status(409).json({
                status: 'error',
                message: err,
              });
        } else {
            res.json({ Status: 'ContentTopic Updated'});
        }
     });
    }
});
});

router.delete('/:idContentTopic',ensureToken, function(req, res, next) {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
      if(err){
        res.status(409).json({
          status: 'error',
          message: err,
        });
      } else {
          const { idContentTopic } = req.params;
          const query = `
          DELETE FROM contentstopics
          WHERE id_content_topic = ?;
          `;

          dbConn.query(query,[ idContentTopic ], function(err,rows)     {
              if(err) {
                  res.status(409).json({
                      status: 'error',
                      message: err,
                  });
              } else {
                  res.json({ Status: 'ContentTopic Deleted'});
              }
          });
      }
  });
});



module.exports = router;