const config = require("../config/configDB.json");

const Db = class {
  constructor(querys) {
    this.querys = querys;
    const { Pool } = require("pg");
    this.pool = new Pool(config);
  }

  async exe(querys, params) {
    try {
      let client = await this.pool.connect();
      let res = await client.query(querys, params);
      client.release();
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
};

module.exports = Db;
