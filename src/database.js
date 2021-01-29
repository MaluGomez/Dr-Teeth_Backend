const {db} = require('./config')
const mysql = require('mysql');
const mysqlConnection = mysql.createConnection(db);

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('base de datos conectada');
  }
});

module.exports = mysqlConnection;