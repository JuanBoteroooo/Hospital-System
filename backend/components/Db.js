const fs = require('fs');
const path = require('path');

class Db {
    constructor() {
        try {
            const queriesPath = path.join(__dirname, '..', 'data', 'querys.json');
            const queryData = fs.readFileSync(queriesPath, 'utf8');
            this.querys = JSON.parse(queryData);
            console.log(this.querys);
        } catch (error) {
            console.error("Error loading queries from JSON file:", error);
        }
        const { Pool } = require("pg");
        this.pool = new Pool({
          "database": "clinica",
          "user": "postgres",
          "password": "12bote34",
          "port": 5432,
          "ssl": false,
          "max": 20, 
          "idleTimeoutMillis": 1000,
          "connectionTimeoutMillis": 1000, 
          "maxUses": 7500
      });
    }

    async exe(queryName, params) {
        const queryString = this.querys[queryName];
        if (!queryString) {
            console.error(`Query not found: ${queryName}`);
            return null;
        }
        try {
            let client = await this.pool.connect();
            let res = await client.query(queryString, params);
            client.release();
            return res;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

module.exports = Db;
