var express = require('express');
var router = express.Router();
var dbConn = require('../core/DataBaseManager');
var jwt = require('jsonwebtoken');
const { ensureToken } = require('../core/auth');

router.get('/:user', ensureToken, function (req, res, next) {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.status(409).json({
                status: 'error',
                message: err,
            });
        } else {
            const { user } = req.params;
            var response;
            dbConn.query('SELECT * FROM users where user = ? ', [user], function (err, rows) {

                if (err) {
                    res.status(409).json({
                        status: 'error',
                        message: err,
                    });
                } else {
                    response = rows;


                    const query = `
                    SELECT * from studenttopics WHERE id_studenttopics  in
                    (
                        SELECT id_studenttopics
                        FROM studentuserscontent
                        where id_user = ?
                        GROUP BY id_studenttopics
                        ORDER BY id_studenttopics asc
                    ) ORDER by studenttopics.order asc;

                        `;

                    dbConn.query(query, [response[0].id_user], function (err, rows) {
                        if (err) {
                            res.status(409).json({
                                status: 'error',
                                message: err,
                            });
                        } else {
                            res.json({ studenttopics: rows });
                        }
                    });
                }
            });
        }
    });
});

router.get('/all/topics', ensureToken, function (req, res, next) {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.status(409).json({
                status: 'error',
                message: err,
            });
        } else {

            const query = `
            SELECT * from studenttopics ORDER BY studenttopics.order
                `;

            dbConn.query(query, function (err, rows) {
                if (err) {
                    res.status(409).json({
                        status: 'error',
                        message: err,
                    });
                } else {
                    res.json({ studenttopics: rows });
                }
            });

        }
    });
});

router.get('/:topic/topic', ensureToken, function (req, res, next) {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.status(409).json({
                status: 'error',
                message: err,
            });
        } else {
            const { topic } = req.params;
            var response;
            dbConn.query(`SELECT id_user FROM studentuserscontent where id_studenttopics = ? 
            GROUP BY id_user
            `
                , [topic], function (err, rows) {

                    if (err) {
                        res.status(409).json({
                            status: 'error',
                            message: err,
                        });
                    } else {

                        response = rows;


                        const query = `
                    SELECT * from studentcontent WHERE id_studenttopics = ? order by studentcontent.order asc

                        `;

                        dbConn.query(query, [topic], function (err, rows) {
                            if (err) {
                                res.status(409).json({
                                    status: 'error',
                                    message: err,
                                });
                            } else {

                                dbConn.query('SELECT * FROM studenttopics WHERE id_studenttopics =  ?', [topic], function (err, rowsTopic) {

                                    if (err) {
                                        res.status(409).json({
                                            status: 'error',
                                            message: err,
                                        });
                                    } else if (!rowsTopic.length) {
                                        res.status(204).json({
                                            status: 'No Content',
                                            message: 'no existe subtopic',
                                        });
                                    }
                                    else {
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json({ studentcontents: rows, privileges: response, topicName: rowsTopic[0].name });
                                    }
                                });







                            }
                        });
                    }
                });
        }
    });
});

router.get('/edit/:topic', ensureToken, function (req, res, next) {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.status(409).json({
                status: 'error',
                message: err,
            });
        } else {
            const { topic } = req.params;
            dbConn.query(`SELECT id_user FROM studentuserscontent where id_studenttopics = ? 
            GROUP BY id_user
            `
                , [topic], function (err, usersWithPrivileges) {

                    if (err) {
                        res.status(409).json({
                            status: 'error',
                            message: err,
                        });
                    } else {
                        dbConn.query('SELECT * FROM studenttopics WHERE id_studenttopics =  ?', [topic], function (err, rowsTopic) {

                            if (err) {
                                res.status(409).json({
                                    status: 'error',
                                    message: err,
                                });
                            } else if (!rowsTopic.length) {
                                res.status(204).json({
                                    status: 'No Content',
                                    message: 'no existe subtopic',
                                });
                            }
                            else {
                                dbConn.query('SELECT id_user, name FROM users', function (err, users) {

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
                                                "id_user": user.id_user, "name": user.name,
                                                "has_privileges": hasPrivileges
                                            };

                                            usersPrivileges.push(userCustom)

                                        });
                                        res.json({ usersPrivileges: usersPrivileges, topicName: rowsTopic[0].name });
                                    }
                                });
                            }
                        });

                    }
                });
        }
    });
});

router.post('/', ensureToken, function (req, res, next) {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.status(409).json({
                status: 'error',
                message: err,
            });
        } else {
            const { users } = req.body;
            const { name } = req.body;
            const queryCount = `SELECT count(*) as number from studenttopics`
            dbConn.query(queryCount, function (err, rows) {
                if (err) {
                    res.status(409).json({
                        status: 'error al hacer el count',
                        message: err,
                    });
                } else {

                    var order = rows[0].number;

                    const query = `
    INSERT INTO studenttopics (name, studenttopics.order)
    VALUES (?, ?);
    `;

                    dbConn.query(query, [name, order], function (err, rows) {
                        if (err) {
                            res.status(409).json({
                                status: 'error',
                                message: err,
                            });
                        } else {
                            var idTopic = rows.insertId;
                            for (let i = 0; i <= users.length - 1; i++) {
                                const query = `
                Insert into studentuserscontent (id_user,id_studenttopics)
        VALUES (?, ?);
        `;

                                dbConn.query(query, [users[i], idTopic], function (err, rows) {
                                    if (err) {
                                        res.status(409).json({
                                            status: 'error',
                                            message: err,
                                        });
                                    }
                                });

                            }

                            res.json({ Status: 'Topic saved' });


                        }
                    });
                }
            });
        }
    });
});

router.delete('/:idTopic/:orderTopic', ensureToken, function (req, res, next) {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.status(409).json({
                status: 'error',
                message: err,
            });
        } else {
            const { idTopic } = req.params;
            const { orderTopic } = req.params;
            const query = `
            DELETE FROM studenttopics
            WHERE id_studenttopics = ?;
            `;

            dbConn.query(query, [idTopic], function (err, rows) {
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
            WHERE id_studenttopics = ?;
            `;

                    dbConn.query(query, [idTopic], function (err, rows) {
                        if (err) {
                            res.status(409).json({
                                status: 'error',
                                message: 'topic ject Deleted, but privileges are conflict' + err,
                            });
                        } else {

                            const query = `
                        UPDATE studenttopics SET studenttopics.order = studenttopics.order - 1
                        WHERE studenttopics.order > ?;
                        `;

        
                        dbConn.query(query, [orderTopic], function (err, rows) {
                            if (err) {
                                console.log(err);
                                res.status(409).json({
                                    status: 'error',
                                    message: err,
                                });
                            } else {
                                res.json({ Status: 'topic Deleted' });
                            }
        
        
                        });
                            
                        }
                    });
                }
            });
        }
    });
});

router.put('/:idTopic', ensureToken, function (req, res, next) {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.status(409).json({
                status: 'error',
                message: err,
            });
        } else {
            const { users } = req.body;
            const { name } = req.body;
            const { idTopic } = req.params;
            const query = `
    UPDATE studenttopics SET name = ?
    WHERE id_studenttopics = ?;
    `;

            dbConn.query(query, [name, idTopic], function (err, rows) {
                if (err) {
                    res.status(409).json({
                        status: 'error',
                        message: err,
                    });
                } else {
                    const query = `
            DELETE FROM studentuserscontent
            WHERE id_studenttopics = ? AND id_user not in (${users})
            `;

                    dbConn.query(query, [idTopic], function (err, rows) {
                        if (err) {
                            res.status(409).json({
                                status: 'error',
                                message: 'name topict update, but privileges are conflict' + err,
                            });
                        } else {

                            for (let i = 0; i <= users.length - 1; i++) {
                                const query = `
                        Insert into studentuserscontent (id_user,id_studenttopics)
                VALUES (?, ?);
                `;

                                dbConn.query(query, [users[i], idTopic], function (err, rows) {
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

router.put('/alltopics/changeorder', ensureToken, function (req, res, next) {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.status(409).json({
                status: 'error',
                message: err,
            });
        } else {
            const { studentTopics } = req.body;
            studentTopics.forEach(element => 
               
               
                {
                    {
                        const query = `
                        UPDATE studenttopics SET studenttopics.order = ?
                        WHERE id_studenttopics = ?;
                        `;
        
                        dbConn.query(query, [element.order, element.id_studenttopics], function (err, rows) {
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
                res.json({ Status: 'student topics Order Updated' });

        } 
    });
});

module.exports = router;