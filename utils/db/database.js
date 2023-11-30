import sql from 'mssql';

export default class Database {
  config = {};
  poolconnection = null;
  connected = false;

  constructor(config) {
    this.config = config;
  }

  async connect() {
    try {
      console.log(`Database connecting...${this.connected}`);
      if (this.connected === false) {
        this.poolconnection = await sql.connect(this.config);
        this.connected = true;
        console.log('Database connection successful');
      } else {
        console.log('Database already connected');
      }
    } catch (error) {
      console.error(`Error connecting to database: ${JSON.stringify(error)}`);
    }
  }

  async disconnect() {
    try {
      this.poolconnection.close();
      console.log('Database connection closed');
    } catch (error) {
      console.error(`Error closing database connection: ${error}`);
    }
  }

  async executeQuery(query) {
    await this.connect();
    const request = this.poolconnection.request();
    const result = await request.query(query);
    return result.rowsAffected[0];
  }

  async create(data) {
    await this.connect();
    const request = this.poolconnection.request();
    request.input('username', sql.NVarChar(50), data.username);
    request.input('email', sql.NVarChar(50), data.email);
    request.input('password', sql.NVarChar(50), data.password);
    request.input('preferences', sql.Int, parseInt(data.preferences));
    const result = await request.query(
      `INSERT INTO dbo.users (username, email, password, preferences) VALUES (@username, @email, @password, @preferences)`
    );
    return result.rowsAffected[0];
  }

  async readAll() {
    await this.connect();
    const request = this.poolconnection.request();
    const result = await request.query(`SELECT * FROM Users`);
    return result.recordsets[0];
  }

  async readById(id) {
    await this.connect();
    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, +id)
      .query(`SELECT * FROM dbo.users WHERE id = @id`);

    return result.recordset[0];
  }


  async readByUsername(username) {
    await this.connect();
    const request = this.poolconnection.request();
    const result = await request
      .input('username', sql.VarChar, username)  
      .query(`SELECT * FROM users WHERE username = @username`);
    return result.recordset[0];
  }

  async readByEmail(email) {
    await this.connect();
    const request = this.poolconnection.request();
    const result = await request
      .input('email', sql.VarChar, email)  
      .query(`SELECT * FROM users WHERE email = @email`);
    return result.recordset[0];
  }

  async update(id, data) {
    await this.connect();
    const request = this.poolconnection.request();
    request.input('id', sql.Int, +id);
    request.input('username', sql.NVarChar(50), data.username);
    request.input('email', sql.NVarChar(50), data.email);
    request.input('password', sql.NVarChar(50), data.password);
    request.input('preferences', sql.Int, parseInt(data.preferences));
    const result = await request.query(
      `UPDATE dbo.users SET email=@email, password=@password WHERE id = @id`
    );

    return result.rowsAffected[0];
  }

  async delete(id) {
    await this.connect();
    const idAsNumber = Number(id);
    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, idAsNumber)
      .query(`DELETE FROM dbo.users WHERE id = @id`);
    return result.rowsAffected[0];
  }
}