var express = require('express');
var router = express.Router();
var dbConn  = require('../core/DataBaseManager');
var jwt = require('jsonwebtoken');
const { ensureToken , isLoggedIn} = require('../core/auth');

/**
 * @swagger
 * /subTopics/{idTopic}:
 *    get:
 *      tags:
 *      -   "SubTopics"
 *      summary: "Return all subtopics belongs to Topic"
 *      parameters:
 *      -   name: "idTopic"
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
router.get('/:idTopic', function(req, res, next) {
 const { idTopic } = req.params;
var response;

dbConn.query('SELECT id_subtopic , name FROM subtopics WHERE id_topic = ?', [idTopic] ,function(err,rows)     {

        if(err) {
            res.status(409).json({
                status: 'error',
                message: err,
              });
            } else {      
               
                    response = rows;
                    dbConn.query('SELECT name FROM topics WHERE id_topic = ?', [idTopic] ,function(err,rows)     {

                        if(err) {
                            res.status(409).json({
                                status: 'error',
                                message: err,
                              });
                        }else if(!rows.length){
                            res.status(204).json({
                                status: 'No Content',
                                message: 'No existe tema',
                              });
                           } else {
                          res.setHeader('Content-Type', 'application/json');
                          res.json({subtopics: response , topicName : rows[0].name});
                        }
                    });
                 
             }
    });

});

/**
 * @swagger
 * /subTopics:
 *    post:
 *      tags:
 *      -   "SubTopics"
 *      summary: "Add new subTopic"
 *      consumes:
 *      - "application/json"
 *      parameters:
 *      -   in: "body"
 *          name: "body"
 *          description: "Name and IDTOpic of subTopic to add"
 *          required: true
 *          schema:
 *              type: "object"
 *              properties:
 *                  name:
 *                      type: "string"
 *                  idTopic:
 *                      type: "integer"
 *      responses:
 *          200:
 *              description: "successful operation"
 *          error:
 *              description: "to do implement code errors"
 */
router.post('/', ensureToken , function(req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if(err){
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {
    const { name } = req.body;
    const { idTopic } = req.body;
    const query = `
    INSERT INTO subtopics (name, id_topic)
    VALUES (?, ?);
    `;

    dbConn.query(query,[name , idTopic ], function(err,rows)     {
        if(err) {
            res.status(409).json({
                status: 'error',
                message: err,
              });
        } else {
            res.json({ Status: 'SubTopic saved'});
        }
     });
    }
});
});

/**
 * @swagger
 * /subtopics/{idSubTopic}:
 *    put:
 *      tags:
 *      -   "SubTopics"
 *      summary: "Update subTopic"
 *      consumes:
 *      - "application/json"
 *      parameters:
 *      -   name: "idSubTopic"
 *          in: "path"
 *          description: "ID of subtopic to update"
 *          required: true
 *          type: "integer"
 *      -   in: "body"
 *          name: "body"
 *          description: "Name, IDTopic and Id of subTopic to update"
 *          required: true
 *          schema:
 *              type: "object"
 *              properties:
 *                  name:
 *                      type: "string"
 *                  idTopic:
 *                      type: "integer"
 *      responses:
 *          200:
 *              description: "successful operation"
 *          error:
 *              description: "to do implement code errors"
 */
router.put('/:idSubTopic', ensureToken , function(req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if(err){
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {
    const { name } = req.body;
    const { idTopic } = req.body;
    const { idSubTopic } = req.params;
    const query = `
    UPDATE subtopics SET  name = ? , id_topic = ?
    WHERE id_subtopic = ?;
    `;

    dbConn.query(query,[ name , idTopic , idSubTopic], function(err,rows)     {
        if(err) {
            res.status(409);
            req.flash('error', err);
        } else {
            res.json({ Status: 'SubTopic Updated'});
        }
     });
    }
});
});

router.delete('/:idSubTopic',ensureToken, function(req, res, next) {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
      if(err){
        res.status(409).json({
          status: 'error',
          message: err,
        });
      } else {
          const { idSubTopic } = req.params;
          const query = `
          DELETE FROM subtopics
          WHERE id_subtopic = ?;
          `;

          dbConn.query(query,[ idSubTopic ], function(err,rows)     {
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
                  res.json({ Status: 'SubTopic Deleted'});
              }
          });
      }
  });
});

module.exports = router;