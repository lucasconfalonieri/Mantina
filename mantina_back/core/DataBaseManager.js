var mysql = require('mysql');

var configLocal = {
  host: 'localhost' , 
    	user: 'root' , 
    	password: 'lobo' , 
    	database: 'mantina'
  };

	var configServer = {
          host: '190.61.250.130' , 
    user: 'mickyni1' , 
    password: 'mvwSKrscAv' , 
    database: 'mickyni1_mantina'
    }
  
  const pool = mysql.createPool(configServer);
  
  module.exports = pool;