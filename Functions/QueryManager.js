var config = require('../global');
var pg = require('pg');
const HttpStatus = require('http-status-codes');

const pool = new pg.Pool(config.config).connect().then(pool =>{
    return pool;
}).catch(err => {
    return HttpStatus.INTERNAL_SERVER_ERROR;
})

async function ExecuteQuery(query) {
    await pool;
    try {
        const request = await pool;
        const result = await request.query(query);
        if (result == HttpStatus.INTERNAL_SERVER_ERROR) {
            return { "status": HttpStatus.INTERNAL_SERVER_ERROR, "msg": ""};
        }
        return { "status": HttpStatus.CONTINUE, "msg": result };
    } catch (err) {
        if (err["name"] == "ConnectionErro") {
            return { "status": HttpStatus.INTERNAL_SERVER_ERROR, "msg": "" };
        } else {
            return { "status": HttpStatus.BAD_REQUEST, "msg": "" };
        }
    }
}

module.exports = {
    ExecuteQuery
}