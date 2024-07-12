const mysql = require('mysql2');
const dbConfig = require('../config/db.config.js');

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000, // 20 seconds
  acquireTimeout: 20000 // 20 seconds
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }

  console.log('Connected to MySQL as ID:', connection.threadId);

  // Perform queries or other database operations here

  // Release the connection
  connection.release();
});

module.exports = pool;
