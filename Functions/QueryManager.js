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

async function checkTF(valor_procedimiento) {
    let resultado;
    try {
        resultado = await valor_procedimiento["rows"][0];
        console.log(resultado)
        if (resultado["dato"] === 1) {
            resultado = { "status": HttpStatus.CONTINUE, "msg": resultado["msg"] };
        } else {
            resultado = { "status": HttpStatus.EXPECTATION_FAILED, "msg": resultado["msg"] };
        }
    } catch (err) {
        resultado = { "status": HttpStatus.INTERNAL_SERVER_ERROR, "msg": "" }
    }
    console.log(resultado)
    return resultado;
}

async function checkList(valor_procedimiento) {
    let resultado;
    try {
        resultado = await valor_procedimiento["rows"];
        if (resultado[0] === undefined)
            resultado = { "status": HttpStatus.ACCEPTED, "msg": [] };
        else
            resultado = { "status": HttpStatus.OK, "msg": resultado };
    } catch (err) {
        resultado = { "status": HttpStatus.INTERNAL_SERVER_ERROR, "msg": "" };
    }
    return resultado;
}

module.exports = {
    ExecuteQuery,
    checkTF,
    checkList
    
}