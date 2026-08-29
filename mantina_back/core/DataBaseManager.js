var mysql = require('mysql2');
const { database } = require('../keys');

const pool = mysql.createPool(database);

module.exports = pool;
