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
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        acquireTimeout: 60000,
        timeout: 60000,
        reconnect: true,
        ssl: {
          rejectUnauthorized: false // Necessário para muitos provedores de cPanel
        }
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
class DatabaseManager {
  constructor() {
    this.pool = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 5000; // 5 segundos
  }

  async initialize() {
    try {
      this.pool = mysql.createPool(connectionConfig);
      await this.testConnection();
      this.isConnected = true;
      this.reconnectAttempts = 0;
      console.log('Conexão com banco de dados estabelecida');
    } catch (error) {
      console.error('Erro ao inicializar conexão:', error.message);
      await this.handleReconnection();
    }
  }

  async testConnection() {
    const connection = await this.pool.getConnection();
    await connection.ping();
    connection.release();
  }

  async handleReconnection() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      throw new Error('Máximo de tentativas de reconexão excedido');
    }

    this.reconnectAttempts++;
    console.log(`Tentativa de reconexão ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
    
    await new Promise(resolve => setTimeout(resolve, this.reconnectDelay));
    await this.initialize();
  }

  async executeQuery(query, params = []) {
    try {
      if (!this.isConnected) {
        await this.initialize();
      }
      
      const [rows] = await this.pool.execute(query, params);
      return rows;
    } catch (error) {
      if (error.code === 'PROTOCOL_CONNECTION_LOST' || 
          error.code === 'ECONNRESET' ||
          error.code === 'ETIMEDOUT') {
        this.isConnected = false;
        await this.handleReconnection();
        return this.executeQuery(query, params);
      }
      throw error;
    }
  }
}

const dbManager = new DatabaseManager();
module.exports = dbManager;
//EXPORTANDO QUERY
module.exports = {connect};
