require('dotenv').config();
const mysql = require('mysql2/promise');

//CONEXÃO BANCO DE DADOS
async function connect() {

    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }
//    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    const connection = await mysql.createConnection({
        host: process.env.HOST_DB,
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        port: process.env.PORT_DB,
        database: process.env.DATABASE_DB,
    });

    global.connection = connection;
    return connection;

}
//EXPORTANDO QUERY
module.exports = {connect};

//TESTE CONEXÃO
// async function testConnection() {
// try {
//    const connection = await mysql.createConnection(process.env.DATABASE_URL);
//    console.log('Conexão com MySQL bem-sucedida!');
//    await connection.end();
//  } catch (error) {
//   console.error('Erro ao conectar no MySQL:', error);
//  }
// }
// testConnection();
