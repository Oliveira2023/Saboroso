const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'newuser',
  database: 'saboroso',
  password: 'beluca18',
  multipleStatements: true
});

module.exports = connection;