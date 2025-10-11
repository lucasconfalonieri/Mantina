var express = require('express');
var router = express.Router();
var dbConn  = require('../core/DataBaseManager');
var jwt = require('jsonwebtoken');
const { ensureToken , isLoggedIn} = require('../core/auth');

/**
 * @swagger
 * /topics/{idSubject}:
 *    get:
 *      tags:
 *      -   "Topics"
 *      summary: "Return all topics belongs to subject"
 *      parameters:
 *      -   name: "idSubject"
 *          in: "path"
 *          description: "ID of subject to which the tropic belongs"
 *          required: true
 *          type: "integer"
 *      responses:
 *          200:
 *              description: "successful operation"
 *          error:
 *              description: "to do implement code errors"
 */
router.get('/:idSubject', function(req, res, next) {
 const { idSubject } = req.params;
var response;
dbConn.query('SELECT id_topic, name FROM topics WHERE id_subject = ?', [idSubject] ,function(err,rows)     {

        if(err) {
            res.status(409).json({
                status: 'error',
                message: err,
              });
        } else {      
          
            response = rows;
                dbConn.query('SELECT * FROM subjects WHERE id_subject = ?', [idSubject] ,function(err,rows)     {

                if(err) {
                 res.status(409).json({
                     status: 'error',
                     message: err,
                   });
                 }else if(!rows.length){
                    res.status(204).json({
                        status: 'No Content',
                        message: 'No existe materia',
                      });
                   } else {
                 res.setHeader('Content-Type', 'application/json');
                res.json({topics: response , subjectName : rows[0].name});
                 }
                });
            
        }
    });

});

/**
 * @swagger
 * /topics:
 *    post:
 *      tags:
 *      -   "Topics"
 *      summary: "Add new topic"
 *      consumes:
 *      - "application/json"
 *      parameters:
 *      -   in: "body"
 *          name: "body"
 *          description: "Name and IDSubject of topic to add"
 *          required: true
 *          schema:
 *              type: "object"
 *              properties:
 *                  name:
 *                      type: "string"
 *                  idSubject:
 *                      type: "integer"
 *      responses:
 *          200:
 *              description: "successful operation"
 *          error:
 *              description: "to do implement code errors"
 */
router.post('/', ensureToken , function(req, res, next) {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if(err){
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {
    const { name } = req.body;
    const { idSubject } = req.body;
    const query = `
    INSERT INTO topics (name, id_subject)
    VALUES (?, ?);
    `;

    dbConn.query(query,[name ,idSubject], function(err,rows)     {
        if(err) {
            res.status(409).json({
                status: 'error',
                message: err,
              });
        } else {
            res.json({ Status: 'Topic saved'});
        }
     });
    }
});
});

/**
 * @swagger
 * /topics/{idTopic}:
 *    put:
 *      tags:
 *      -   "Topics"
 *      summary: "Update topic"
 *      consumes:
 *      - "application/json"
 *      parameters:
 *      -   name: "idTopic"
 *          in: "path"
 *          description: "ID of topic to update"
 *          required: true
 *          type: "integer"
 *      -   in: "body"
 *          name: "body"
 *          description: "Name, IDSubject and Id of topic to update"
 *          required: true
 *          schema:
 *              type: "object"
 *              properties:
 *                  name:
 *                      type: "string"
 *                  idSubject:
 *                      type: "integer"
 *      responses:
 *          200:
 *              description: "successful operation"
 *          error:
 *              description: "to do implement code errors"
 */
router.put('/:idTopic', ensureToken , function(req, res, next) {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if(err){
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {
    const { name } = req.body;
    const { idSubject } = req.body;
    const { idTopic } = req.params;
    const query = `
    UPDATE topics SET  name = ? , id_subject = ?
    WHERE id_topic = ?;
    `;

    dbConn.query(query,[ name, idSubject , idTopic], function(err,rows)     {
        if(err) {
            res.status(409).json({
                status: 'error',
                message: err,
              });
        } else {
            res.json({ Status: 'Topic Updated'});
        }
     });
    }
});
});

router.delete('/:idTopic',ensureToken, function(req, res, next) {
  jwt.verify(req.token, 'my_secret_key', (err, data) => {
      if(err){
        res.status(409).json({
          status: 'error',
          message: err,
        });
      } else {
          const { idTopic } = req.params;
          const query = `
          DELETE FROM topics
          WHERE id_topic = ?;
          `;

          dbConn.query(query,[ idTopic ], function(err,rows)     {
            if(err) {
              if(err.code == 'ER_ROW_IS_REFERENCED_2'){
                  res.status(910).json({
                      status: 'error',
                      message: err,
                  });
              }else{
              res.status(409).json({
                  status: 'error',
                  message: err,
              });}
          } else {
                  res.json({ Status: 'Topic Deleted'});
              }
          });
      }
  });
});

module.exports = router;