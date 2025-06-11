require('dotenv').config();
const mysql = require('mysql2/promise');

//CCONEXÃO BANCO DE DADOS
async function connect() {

    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    const connection = await mysql.createConnection({
        // connectTimeout: 60000,
        // host: process.env.HOST_DB,
        // user: process.env.USER_DB,
        // password: process.env.PASSWORD_DB,
        // port: process.env.PORT_DB,
        // database: process.env.DATABASE_DB,
        // debug: true
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });

    connection.connect((err) => {
        if (err) {
          console.error('Erro ao conectar no banco: ', err);
          return;
        }
        console.log('Banco de dados conectado com sucesso!');
      });

    global.connection = connection;
    return connection;
}

//EXPORTANDO QUERY
module.exports = {connect};
