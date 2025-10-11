var express = require('express');
var router = express.Router();
var dbConn = require('../core/DataBaseManager');
var jwt = require('jsonwebtoken');
const { ensureToken } = require('../core/auth');
const upload = require('../utils/storage');


router.get('/:idStudentTopic/:user', ensureToken, function (req, res, next) {
  jwt.verify(req.token, 'my_secret_key', (err, data) => {
    if (err) {
      res.status(409).json({
        status: 'error',
        message: err,
      });
    } else {
      const { idStudentTopic } = req.params;
      const { user } = req.params;
      var response;
      var responseDos;
      dbConn.query('SELECT * FROM users where user = ? ', [user], function (err, rows) {

        if (err) {
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {

          response = rows;
          const query = `
                SELECT * FROM studentcontent as t  inner join studentuserscontent as s on t.id_studentcontent = s.id_studentcontent
                WHERE t.id_studenttopics = ? and s.id_user = ? order by t.order asc

                `;

          dbConn.query(query, [idStudentTopic, response[0].id_user], function (err, rows) {
            if (err) {
              res.status(409).json({
                status: 'error',
                message: err,
              });
            } else {
              responseDos = rows;
              dbConn.query('SELECT * FROM studenttopics WHERE id_studenttopics =  ?', [idStudentTopic], function (err, rows) {

                if (err) {
                  res.status(409).json({
                    status: 'error',
                    message: err,
                  });
                } else if (!rows.length) {
                  res.status(204).json({
                    status: 'No Content',
                    message: 'no existe subtopic',
                  });
                }
                else {
                  res.setHeader('Content-Type', 'application/json');
                  res.json({ studentcontents: responseDos, topicName: rows[0].name });
                }
              });
            }
          });
        }
      });
    }
  });
});

/** Devuelve todos los usuarios que tienen permiso para ver el topico */
router.get('/:idStudentTopic', ensureToken, function (req, res, next) {
  jwt.verify(req.token, 'my_secret_key', (err, data) => {
    if (err) {
      res.status(409).json({
        status: 'error',
        message: err,
      });
    } else {
      const { idStudentTopic } = req.params;
      dbConn.query(`SELECT id_user, name FROM users WHERE id_user in 
                            (SELECT id_user FROM studentuserscontent where id_studenttopics = ? 
                              GROUP BY id_user)` , [idStudentTopic], function (err, users) {

        if (err) {
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {

          var usersPrivileges=[];
          users.forEach(user => {
              var userCustom = {"id_user": user.id_user, "name": user.name,
               "has_privileges": false };

              usersPrivileges.push(userCustom)
              
          });


          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ users: usersPrivileges }));
        }
      });
    }
  });
});

router.get('/:idStudentContent/privileges/:idStudentTopic', ensureToken, function (req, res, next) {
  jwt.verify(req.token, 'my_secret_key', (err, data) => {
    if (err) {
      res.status(409).json({
        status: 'error',
        message: err,
      });
    } else {
      const { idStudentContent } = req.params;
      const { idStudentTopic } = req.params;
      dbConn.query(`SELECT id_user FROM studentuserscontent where id_studentcontent = ? 
                          GROUP BY id_user`,
        [idStudentContent], function (err, usersWithPrivileges) {
          if (err) {
            res.status(409).json({
              status: 'error',
              message: err,
            });
          } else {
            dbConn.query('SELECT * FROM studentcontent WHERE id_studentcontent =  ?',
              [idStudentContent], function (err, rowsContent) {
                if (err) {
                  res.status(409).json({
                    status: 'error',
                    message: err,
                  });
                } else if (!rowsContent.length) {
                  res.status(204).json({
                    status: 'No Content',
                    message: 'no existe subtopic',
                  });
                }
                else {
                  dbConn.query(`SELECT id_user, name FROM users WHERE id_user in 
                              (SELECT id_user FROM studentuserscontent where id_studenttopics = ?
                              GROUP BY id_user)`, idStudentTopic, function (err, users) {

                    if (err) {
                      res.status(409).json({
                        status: 'error',
                        message: err,
                      });
                    } else {
                      var usersPrivileges = [];
                      users.forEach(user => {
                        var hasPrivileges;
                        for (let [k, v] of Object.entries(usersWithPrivileges)) {
                          if (v.id_user == user.id_user) {
                            hasPrivileges = true;
                            break;
                          } else {
                            hasPrivileges = false;
                          }
                        }
                        var userCustom = {
                          "id_user": user.id_user,
                          "name": user.name,
                          "has_privileges": hasPrivileges
                        };
                        usersPrivileges.push(userCustom)
                      });
                      res.json({ usersPrivileges: usersPrivileges, contentName: rowsContent[0].name });
                    }
                  });
                }
              });

          }
        });
    }
  });
});

router.post('/', ensureToken, upload.single('pdf'), function (req, res, next) {
  jwt.verify(req.token, 'my_secret_key', (err, data) => {
    if (err) {
      res.status(409).json({
        status: 'error',
        message: err,
      });
    } else {
      let namePdf = req.file.filename;
      const { idstudenttopics } = req.body;
      const { textPdf } = req.body;
      const { usersStr } = req.body;
      const queryCount = `SELECT count(*) as number from studentcontent where id_studenttopics = ?;`

      dbConn.query(queryCount,[idstudenttopics], function (err, rows) {
        if (err) {
            res.status(409).json({
                status: 'error al hacer el count',
                message: err,
            });
        } else {
          var order = rows[0].number;

            const query = `
            INSERT INTO studentcontent (id_studenttopics,name_pdf,text_pdf,studentcontent.order)
            VALUES (?,?,?,?);
             `;

        dbConn.query(query, [idstudenttopics, namePdf, textPdf, order], function (err, rows) {
        if (err) {
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {
          var idStudentcontent = rows.insertId;
          var usersStr1 = usersStr.replace("[", "");
          var usersStr2 = usersStr1.replace("]", "");
          var users = usersStr2.split(",");
          for (let i = 0; i <= users.length - 1; i++) {
            const query = `
                Insert into studentuserscontent (id_user,id_studenttopics,id_studentcontent)
        VALUES (?, ?, ?);
        `;

            dbConn.query(query, [users[i], idstudenttopics, idStudentcontent], function (err, rows) {
              if (err) {
                res.status(409).json({
                  status: 'error',
                  message: err,
                });
              }
            });

          }
          res.json({ Status: 'Content saved' });
        }
      
      });
               }
      });
    }
  });
});

router.put('/pdf/:idStudentContent', ensureToken, upload.single('pdf'), function (req, res, next) {
  jwt.verify(req.token, 'my_secret_key', (err, data) => {
    if (err) {
      res.status(409).json({
        status: 'error',
        message: err,
      });
    } else {
      let namePdf = req.file.filename;
      const { idStudentContent } = req.params;
      const query = `
      UPDATE studentcontent SET  name_pdf = ? 
    WHERE id_studentcontent = ?;
      `;

      dbConn.query(query, [namePdf, idStudentContent], function (err, rows) {
        if (err) {
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {
          res.json({ Status: 'Content Updated' });
        }
      });
    }
  });
});

router.put('/textpdfusers/:idStudentContent', ensureToken, function (req, res, next) {
  jwt.verify(req.token, 'my_secret_key', (err, data) => {
    if (err) {
      res.status(409).json({
        status: 'error',
        message: err,
      });
    } else {
      const { idStudentContent } = req.params;
      const { textPdf } = req.body;
      const { users } = req.body;
      const { idstudenttopics } = req.body;
      const query = `
      UPDATE studentcontent SET text_pdf = ?
      WHERE id_studentcontent = ?;
      `;

      dbConn.query(query, [textPdf, idStudentContent], function (err, rows) {
        if (err) {
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {
          const query = `
            DELETE FROM studentuserscontent
            WHERE id_studentcontent = ?;
            `;

          dbConn.query(query, [idStudentContent], function (err, rows) {
            if (err) {
              res.status(409).json({
                status: 'error',
                message: 'name studenttopic update, but privileges are conflict' + err,
              });
            } else {

              for (let i = 0; i <= users.length - 1; i++) {
                const query = `
                        Insert into studentuserscontent (id_user,id_studenttopics, id_studentcontent)
                VALUES (?, ?,?);
                `;

                dbConn.query(query, [users[i], idstudenttopics, idStudentContent], function (err, rows) {
                  if (err) {
                    res.status(409).json({
                      status: 'error',
                      message: err,
                    });
                  }
                });

              }

              res.json({ Status: 'Topic update' });
            }
          });
        }
      });
    }
  });
});

router.delete('/:idStudentcontent/:orderContent/:idStudentTopic', ensureToken, function (req, res, next) {
  jwt.verify(req.token, 'my_secret_key', (err, data) => {
    if (err) {
      res.status(409).json({
        status: 'error',
        message: err,
      });
    } else {
      const { idStudentcontent } = req.params;
      const { orderContent } = req.params;
      const { idStudentTopic } = req.params;
      const query = `
              DELETE FROM studentcontent
              WHERE id_studentcontent = ?;
              `;

      dbConn.query(query, [idStudentcontent], function (err, rows) {
        if (err) {
          if (err.code == 'ER_ROW_IS_REFERENCED_2') {
            res.status(910).json({
              status: 'error',
              message: err,
            });
          } else {
            res.status(409).json({
              status: 'error',
              message: err,
            });
          }
        } else {
          const query = `
                  DELETE FROM studentuserscontent
                  WHERE id_studentcontent = ?;
                  `;

          dbConn.query(query, [idStudentcontent], function (err, rows) {
            if (err) {
              res.status(409).json({
                status: 'error',
                message: 'content topic ject Deleted, but privileges are conflict' + err,
              });
            } else {

              const query = `
                        UPDATE studentcontent as SC SET SC.order = SC.order - 1
                        WHERE SC.order > ? and id_studenttopics = ?;
                        `;

        
                        dbConn.query(query, [orderContent, idStudentTopic], function (err, rows) {
                            if (err) {
                                console.log(err);
                                res.status(409).json({
                                    status: 'error',
                                    message: err,
                                });
                            } else {

              res.json({ Status: 'content Deleted' });
                            } });
            }
          });
        }
      });
    }
  });
});

router.put('/allcontents/changeorder', ensureToken, function (req, res, next) {
  jwt.verify(req.token, 'my_secret_key', (err, data) => {
      if (err) {
          res.status(409).json({
              status: 'error',
              message: err,
          });
      } else {
          const { studentContents } = req.body;
          studentContents.forEach(element => 
             
             
              {
                  {
                      const query = `
                      UPDATE studentcontent SET studentcontent.order = ?
                      WHERE id_studentcontent = ?;
                      `;
      
                      dbConn.query(query, [element.order, element.id_studentcontent], function (err, rows) {
                          if (err) {
                              console.log(err);
                              res.status(409).json({
                                  status: 'error',
                                  message: err,
                              });
                          }
      
      
                      }
                      );
                  } 
              }
              

              
              );
              res.json({ Status: 'student content Order Updated' });

      } 
  });
});

module.exports = router;