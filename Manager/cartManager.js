var query_manager = require("../Functions/QueryManager");
const HttpStatus = require("http-status-codes");

async function display_cart_list_manager(id_usr, id_store){
    let result = await query_manager.ExecuteQuery(`SELECT * FROM displayCartList(${id_usr}, ${id_store})`);
    if (result["status"] == HttpStatus.CONTINUE){
        try{
            result = result["msg"]["rows"] 
            if (result.length > 0) {
                result = {"code": 1, "status": HttpStatus.CONTINUE, "msg": "resultado obtenido", "data": result };
            } else {
                result = {"code":0, "status": HttpStatus.EXPECTATION_FAILED, "msg": "No hay datos"};
            }
        } catch (err) {
            result = { "status": HttpStatus.INTERNAL_SERVER_ERROR, "msg": ""}
        }
    }
    return result;
}

async function display_cart_product_manager(id_list, name_product, pageNumber, pageSize) {
    let result = await query_manager.ExecuteQuery(`SELECT * FROM displayCartProduct(${id_list}, ${name_product}, ${pageNumber}, ${pageSize})`);
    if (result["status"] == HttpStatus.CONTINUE){
        try{
            result = result["msg"]["rows"] 
            if (result.length > 0) {
                result = {"code": 1, "status": HttpStatus.CONTINUE, "msg": "resultado obtenido", "data": result };
            } else {
                result = {"code":0, "status": HttpStatus.EXPECTATION_FAILED, "msg": "No hay datos"};
            }
        } catch (err) {
            result = { "status": HttpStatus.INTERNAL_SERVER_ERROR, "msg": ""}
        }
    }
    return result;
}
module.exports = {
    display_cart_list_manager,
    display_cart_product_manager
};