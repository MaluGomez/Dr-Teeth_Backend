
const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'drteeth.mysql.database.azure.com',
  user: 'drteeth@drteeth',
  password: 'teethdr99.',
  database: 'drteeth',
  ssl: true,
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;