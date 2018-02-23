const Mysql = require('mysql');
const dbConfig = require('../config.js')
const database = Mysql.createConnection(dbConfig);

module.exports.databaseResponder = (sql) => {
     return new Promise((resolve, reject) => {
     database.query(sql, (err, result) => {
       (err)? reject(err) : resolve(result);      
     })
   })
}

