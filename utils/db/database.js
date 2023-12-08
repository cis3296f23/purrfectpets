import sql from 'mssql';

export default class Database {
  config = {};
  poolconnection = null;
  connected = false;

  constructor(config) {
    this.config = config;
  }

  /**
   * @function connect connects back end to database
   */
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

  /**
   * @function disconnect disconnects back end from database
   */
  async disconnect() {
    try {
      this.poolconnection.close();
      console.log('Database connection closed');
    } catch (error) {
      console.error(`Error closing database connection: ${error}`);
    }
  }

  /**
   * @function executeQuery disconnects back end from database
   * @param {String} query SQL query string
   * @return {Object} result of SQL query
   */
  async executeQuery(query) {
    await this.connect();
    const request = this.poolconnection.request();
    const result = await request.query(query);
    return result.rowsAffected[0];
  }

  /**
 * Route for creating a new user
 * @param {Object} data - new user's information
 * @returns {Object} 201 - response for new user added to database
 * @returns {Error}  500 - Server error
 */
  async create(data) {
    await this.connect();
    const request = this.poolconnection.request();
    request.input('username', sql.NVarChar(64), data.username);
    request.input('email', sql.NVarChar(64), data.email);
    request.input('password', sql.NVarChar(64), data.password);
    request.input('salt', sql.NVarChar(32), data.salt);
    request.input('preferences', sql.Int, parseInt(data.preferences));
    const result = await request.query(
      `INSERT INTO dbo.users (username, email, password, salt, preferences) VALUES (@username, @email, @password, @salt, @preferences)`
    );
    return result.rowsAffected[0];
  }

  /**
* Checks if the username exists in the database
* @function
* @param {String} username - the username of the user
* @returns {Boolean} - true if username exists in the database
*/
  async checkUsernameAvailability(username) {
    await this.connect();
    const request = this.poolconnection.request();
    const result = await request
      .input('username', sql.VarChar, username)
      .query(`SELECT 1 FROM users WHERE username = @username`);
    if (result.recordset[0]) {
      return false;
    } else {
      return true;
    }
  }

  /**
* Checks if the email exists in the database
* @function
* @param {String} email - the email of the user
* @returns {Boolean} - true if email exists in the database
*/
  async checkEmailAvailability(email) {
    await this.connect();
    const request = this.poolconnection.request();
    const result = await request
      .input('email', sql.VarChar, email)
      .query(`SELECT 1 FROM users WHERE email = @email`);
    if (result.recordset[0]) {
      return false;
    } else {
      return true;
    }
  }

  /**
* Checks if the provided password hash and email are in the same row of the database
* @function
* @param {String} hashedPass - the hashedPass of the user
* @param {String} email - the email of the user
* @returns {Boolean} - true if hashed pass and email match row entries
*/
  async checkHashedPass(hashedPass, email) {
    console.log(`CHECKING PW: ${hashedPass}`)
    console.log(`CHECKING EMAIL: ${email}`)
    await this.connect();
    const request = this.poolconnection.request();
    request.input('hashedPass', sql.NVarChar(), hashedPass);
    request.input('email', sql.NVarChar(), email);
    console.log('finding user')
    const result = await request
      .query(`SELECT 1 FROM users WHERE password = @hashedPass AND email = @email`);
    if (result.recordset[0]) {
      console.log("GOOD PASSWORD")
      return true;
    } else {
      console.log("BAD PASSWORD")
      return false;
    }
  }

  /**
* Get the user's id based on the provided username.
* @function
* @param {String} username - the username of the user
* @returns {Object} - the user's id
*/
  async readIdByUsername(username) {
    await this.connect();
    const request = this.poolconnection.request();
    const result = await request
      .input('username', sql.VarChar, username)
      .query(`SELECT id FROM users WHERE username = @username`);
    return result.recordset[0];
  }

  /**
* Gets the salt for the user with the specified email address
* @function
* @param {String} email - the email of the user
* @returns {String} - user's salt
*/
  async getSalt(email) {
    await this.connect();
    const request = this.poolconnection.request();
    const result = await request
      .input('email', sql.VarChar, email)
      .query(`SELECT salt FROM users WHERE email = @email`);
    return result.recordset[0];
  }

  /**
* Get user's username by email
* @function
* @param {String} email - the email of the user
* @returns {Object} - object containing user's username
*/
  async getUsernameByEmail(email) {
    await this.connect();
    const request = this.poolconnection.request();
    const result = await request
      .input('email', sql.VarChar, email)
      .query(`SELECT username FROM users WHERE email = @email`);
    return result.recordset[0];
  }

  /**
   * Get the user's info based on the provided email.
   *
   * @async
   * @function getUserByEmail
   * @param {string} email - the email of the user
   * @returns {object} - the user's info
   * */
  async getUserByEmail(email) {
    await this.connect();
    const request = this.poolconnection.request();
    const result = await request
      .input('email', sql.VarChar, email)
      .query(`SELECT * FROM dbo.users WHERE email = @email`);
    return result.recordset[0];
  }

  /**
   * Updates user information in the database based on the provided ID.
   *
   * @async
   * @function update
   * @param {number} id - The ID of the user to update.
   * @param {object} data - The data to update the user with.
   * @returns {number} - The number of rows affected.
   * */
  async update(id, data) {
    try {
      await this.connect();
      console.log(`id: ${id}`);
      const request = this.poolconnection.request();
      request.input('id', sql.Int, id);
      request.input('username', sql.NVarChar(64), data.username);
      request.input('email', sql.NVarChar(64), data.email);
      request.input('password', sql.NVarChar(64), data.password);
      request.input('salt', sql.NVarChar(32), data.salt);
      request.input('preferences', sql.Int, parseInt(data.preferences));
      const result = await request.query(
        `UPDATE dbo.users SET email=@email, password=@password, username = @username WHERE id = @id`
      );
      return result.rowsAffected[0];
    }
    catch (err) {
      console.log("ERROR IN UPDATE")
      console.log(err)
    }
  }


  /**
   * Updates the likes for a specific user in the database.
   *
   * @param {string} id - The ID of the user.
   * @param {string} data - The new petID to add to the user's likes.
   * @async
   * @function updateLikes
   * @returns {Promise<number>} The number of rows affected by the update.
   */
  async updateLikes(id, data) {
    await this.connect();
    console.log(`id: ${id}`)
    const request = this.poolconnection.request();
    request.input('id', sql.NVarChar(50), id);

    // Get the current likes for the user
    const getUserLikesQuery = `SELECT likes FROM dbo.users WHERE id = @id`;
    const getUserLikesResult = await request.query(getUserLikesQuery);
    const currentLikes = getUserLikesResult.recordset[0].likes;

    // Append the new petID to the current likes
    const updatedLikes = currentLikes ? `${currentLikes},${data}` : data;

    // Update the likes field in the database
    request.input('likes', sql.NVarChar(100), updatedLikes);
    const updateLikesQuery = `UPDATE dbo.users SET likes = @likes WHERE id = @id`;
    const result = await request.query(updateLikesQuery);

    return result.rowsAffected[0];
  }

  /**
   * Retrieves the likes for a specific user by email from the database.
   *
   * @param {string} email - The email of the user.
   * @async
   * @function getUserLikesByEmail
   * @returns {Promise<string>} The likes of the user.
   */
  async getUserLikesByEmail(email) {
    await this.connect();
    const request = this.poolconnection.request();
    const result = await request
      .input('email', sql.VarChar, email)
      .query(`SELECT likes FROM dbo.users WHERE email = @email`);
    return result.recordset[0].likes;
  }



  /**
   * Deletes a user from the database based on the provided ID.
   *
   * @async
   * @function delete
   * @param {number} id - The ID of the user to delete.
   * @returns {number} - The number of rows affected.
   * */
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