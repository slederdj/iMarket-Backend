var query_manager = require("../Functions/QueryManager");
const HttpStatus = require("http-status-codes");

async function display_shops_manager(pageNumber, pageSize){
    let result = await query_manager.ExecuteQuery(`SELECT * FROM displayShops(${pageNumber}, ${pageSize})`);
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

async function display_categoty_manager(id_store) {
    let result = await query_manager.ExecuteQuery(`SELECT * FROM displayCategory(${id_store})`);
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

async function display_products_manager(id_store, prod_name, cat_name, pageNumber, pageSize) {
    let result = await query_manager.ExecuteQuery(
        `SELECT * FROM displayProducts(${id_store}, ${prod_name}, ${cat_name}, ${pageNumber}, ${pageSize})`);
    console.log(prod_name);
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
    display_shops_manager,
    display_categoty_manager,
    display_products_manager
};