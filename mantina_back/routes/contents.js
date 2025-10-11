var express = require('express');
var router = express.Router();
var dbConn  = require('../core/DataBaseManager');
const upload = require('../utils/storage');
var jwt = require('jsonwebtoken');
const { ensureToken , isLoggedIn} = require('../core/auth');

/**
 * @swagger
 * /contents/{idSubTopic}:
 *    get:
 *      tags:
 *      -   "Contents"
 *      summary: "Return all contents belongs to subTopic"
 *      parameters:
 *      -   name: "idSubTopic"
 *          in: "path"
 *          description: "ID of subtopic to which the content belongs"
 *          required: true
 *          type: "integer"
 *      responses:
 *          200:
 *              description: "successful operation"
 *          error:
 *              description: "to do implement code errors"
 */
router.get('/:idSubTopic', function(req, res, next) {
    const { idSubTopic } = req.params;
    var response;
    
    dbConn.query('SELECT id_content , name_pdf , text_pdf FROM contents WHERE id_subtopic = ?', [idSubTopic] ,function(err,rows)     {
    
            if(err) {
                res.status(409).json({
                    status: 'error',
                    message: err,
                  });
                } else {      
                    
                        response = rows;
                        dbConn.query('SELECT * FROM subtopics WHERE id_subtopic = ?', [idSubTopic] ,function(err,rows)     {
    
                            if(err) {
                                res.status(409).json({
                                    status: 'error',
                                    message: err,
                                  });
                            }else if(!rows.length){
                                res.status(204).json({
                                    status: 'No Content',
                                    message: 'no existe subtopic',
                                  });
                               }
                             else {
                              res.setHeader('Content-Type', 'application/json');
                              res.json({contents: response , subtopicName : rows[0].name});
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
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if(err){
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {
    let namePdf  = req.file.filename;
    const { idSubtopic, textPdf } = req.body;
    const query = `
    INSERT INTO contents(name_pdf, id_subtopic, text_pdf)
    VALUES (?, ?, ?);
    `;

    dbConn.query(query,[namePdf, idSubtopic  , textPdf], function(err,rows)     {
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

/**
 * @swagger
 * /contents/{idContent}:
 *    put:
 *      tags:
 *      -   "Contents"
 *      summary: "Update content"
 *      consumes:
 *      - "application/json"
 *      parameters:
 *      -   name: "idContent"
 *          in: "path"
 *          description: "ID of content to update"
 *          required: true
 *          type: "integer"
 *      -   in: "body"
 *          name: "body"
 *          description: "NamePdf, IDSubTopic and Id of content to update"
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
router.put('/pdf/:idContent',ensureToken , upload.single('pdf'), function(req, res, next) {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if(err){
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {
    let namePdf  = req.file.filename;
    const { idContent} = req.params;
    const query = `
    UPDATE contents SET  name_pdf = ? 
    WHERE id_content = ?;
    `;

    dbConn.query(query,[ namePdf , idContent], function(err,rows)     {
        if(err) {
            res.status(409).json({
                status: 'error',
                message: err,
              });
        } else {
            res.json({ Status: 'Content Updated'});
        }
     });
    }
});
});


router.put('/text/:idContent',ensureToken ,  function(req, res, next) {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if(err){
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {
    const { idContent} = req.params;
    const { textPdf } = req.body;
    const query = `
    UPDATE contents SET text_pdf = ?
    WHERE id_content = ?;
    `;

    dbConn.query(query,[textPdf, idContent], function(err,rows)     {
        if(err) {
            res.status(409).json({
                status: 'error',
                message: err,
              });
        } else {
            res.json({ Status: 'Content Updated'});
        }
     });
    }
});
});

router.delete('/:idContent',ensureToken, function(req, res, next) {
  jwt.verify(req.token, 'my_secret_key', (err, data) => {
      if(err){
        res.status(409).json({
          status: 'error',
          message: err,
        });
      } else {
          const { idContent } = req.params;
          const query = `
          DELETE FROM contents
          WHERE id_content = ?;
          `;

          dbConn.query(query,[ idContent ], function(err,rows)     {
              if(err) {
                  res.status(409).json({
                      status: 'error',
                      message: err,
                  });
              } else {
                  res.json({ Status: 'Content Deleted'});
              }
          });
      }
  });
});



module.exports = router;