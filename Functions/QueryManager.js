var config = require('../global');
var pg = require('pg');
const HttpStatus = require('http-status-codes');

const pool = new pg.Pool(config.config).connect().then(pool => {
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
            return { "status": HttpStatus.INTERNAL_SERVER_ERROR, "msg": "" };
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

async function checkTF(valor_procedimiento) {
    let result;
    try {
        result = await valor_procedimiento["rows"][0];
        if (result["code"] === 1) {
            result = { "code": result["code"], "status": HttpStatus.CONTINUE, "msg": result["msg"] };
        } else {
            result = { "code": result["code"], "status": HttpStatus.EXPECTATION_FAILED, "msg": result["msg"] };
        }
    } catch (err) {
        result = { "status": HttpStatus.INTERNAL_SERVER_ERROR, "msg": "" }
    }
    return result;
}

async function checkList(valor_procedimiento) {
    let result;
    try {
        result = await valor_procedimiento["rows"];
        if (result[0] === undefined)
            result = { "status": HttpStatus.ACCEPTED, "msg": [] };
        else
            result = { "status": HttpStatus.OK, "msg": result };
    } catch (err) {
        result = { "status": HttpStatus.INTERNAL_SERVER_ERROR, "msg": "" };
    }
    return result;
}

module.exports = {
    ExecuteQuery,
    checkTF,
    checkList

}