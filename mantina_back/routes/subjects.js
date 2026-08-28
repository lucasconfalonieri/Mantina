var express = require('express');
var router = express.Router();
var dbConn  = require('../core/DataBaseManager');
var jwt = require('jsonwebtoken');
const { ensureToken } = require('../core/auth');

/**
 * @swagger
 * /subjects:
 *    get:
 *      tags:
 *      -   "Subjects"
 *      summary: "Return alls subjest"
 *      responses:
 *          200:
 *              description: "successful operation"
 *          error:
 *              description: "to do implement code errors"
 */
router.get('/', function(req, res, next) {
    
    
    dbConn.query('SELECT * FROM subjects',function(err,rows)     {

        if(err) {
            res.status(409).json({
                status: 'error',
                message: err,
              });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ subjects: rows}));
        }
    });



});

/**
 * @swagger
 * /subjects/{idSubject}:
 *    get:
 *      tags:
 *      -   "Subjects"
 *      summary: "Return subject by Id"
 *      parameters:
 *      -   name: "idSubject"
 *          in: "path"
 *          description: "ID of subject to return"
 *          required: true
 *          type: "integer"
 *      responses:
 *          200:
 *              description: "successful operation"
 *          error:
 *              description: "to do implement code errors"
 */
router.get('/:id', function(req , res, next) {
const { id } = req.params;

    dbConn.query('SELECT * FROM subjects Where id_subject = ?', [id], function(err,rows)     {

        if(err) {
            res.status(409).json({
                status: 'error',
                message: err,
              });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ subjects: rows}));
        }
    });
});

/**
 * @swagger
 * /subjects:
 *    post:
 *      tags:
 *      -   "Subjects"
 *      summary: "Add new subject"
 *      consumes:
 *      - "application/json"
 *      parameters:
 *      -   in: "body"
 *          name: "body"
 *          description: "Name of subject to add"
 *          required: true
 *          schema:
 *              type: "object"
 *              properties:
 *                  name:
 *                      type: "string"
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
    const query = `
    INSERT INTO subjects (name)
    VALUES (?);
    `;

    dbConn.query(query,[name], function(err,rows)     {
        if(err) {
            res.status(409).json({
                status: 'error',
                message: err,
              });
        } else {
            res.json({ Status: 'Subject saved'});
        }
     });
    }
});
});

/**
 * @swagger
 * /subjects/{idSubject}:
 *    put:
 *      tags:
 *      -   "Subjects"
 *      summary: "Update subject"
 *      consumes:
 *      - "application/json"
 *      parameters:
 *      -   name: "idSubject"
 *          in: "path"
 *          description: "ID of subject to update"
 *          required: true
 *          type: "integer"
 *      -   in: "body"
 *          name: "body"
 *          description: "name and id of subject to update"
 *          required: true
 *          schema:
 *              type: "object"
 *              properties:
 *                  name:
 *                      type: "string"
 *      responses:
 *          200:
 *              description: "successful operation"
 *          error:
 *              description: "to do implement code errors"
 */
router.put('/:idSubject',ensureToken, function(req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if(err){
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {
            const { name } = req.body;
            const { idSubject } = req.params;
            const query = `
            UPDATE subjects SET  name = ?
            WHERE id_subject = ?;
            `;

            dbConn.query(query,[ name ,idSubject ], function(err,rows)     {
                if(err) {
                    res.status(409).json({
                        status: 'error',
                        message: err,
                    });
                } else {
                    res.json({ Status: 'Subject Updated'});
                }
            });
        }
    });
});

router.delete('/:idSubject',ensureToken, function(req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if(err){
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {
            const { idSubject } = req.params;
            const query = `
            DELETE FROM subjects
            WHERE id_subject = ?;
            `;

            dbConn.query(query,[ idSubject ], function(err,rows)     {
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
                    res.json({ Status: 'Subject Deleted'});
                }
            });
        }
    });
});

module.exports = router;