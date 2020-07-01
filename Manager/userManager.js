var query_manager = require('../Functions/QueryManager');
const HttpStatus = require('http-status-codes');

async function sign_in_manager(correo, cedula){
    let result = await query_manager.ExecuteQuery(`SELECT * FROM sign_in_user('${correo}', ${cedula});`);
    if (result["status"] == HttpStatus.CONTINUE){
        try{
            result = result["msg"]["rows"][0]
            if (result["code"] === 1 ) {
                result = { "code": result["dato"], "status": HttpStatus.CONTINUE, "msg": result["msg"],
                "data": { "id": result["id"]}};
            } else {
                result = { "code": result["dato"], "status": HttpStatus.EXPECTATION_FAILED, "msg": result["msg"]};
            }
        } catch (err) {
            result = { "status": HttpStatus.INTERNAL_SERVER_ERROR, "msg": ""};
        }
    }
    return result;
}

module.exports = {
    sign_in_manager
}