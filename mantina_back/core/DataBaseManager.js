var mysql = require('mysql');
const { database } = require('../keys');

const pool = mysql.createPool(database);

module.exports = pool;
