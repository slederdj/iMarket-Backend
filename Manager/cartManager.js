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

async function add_new_list_manager(client_id, shop_id, list_name) {
    let result = await query_manager.ExecuteQuery(`SELECT * FROM addNewList(${client_id}, ${shop_id}, '${list_name}')`);
    if (result["status"] == HttpStatus.CONTINUE){
        try{
            result = result["msg"]["rows"][0] 
            console.log(result);
            if (result.code === 1) {
                result = {"code": result.code, "status": HttpStatus.CONTINUE, "msg": result.msg };
            } else {
                result = {"code": result.code, "status": HttpStatus.EXPECTATION_FAILED, "msg": result.msg};
            }
        } catch (err) {
            result = { "status": HttpStatus.INTERNAL_SERVER_ERROR, "msg": ""}
        }
    }
    return result;
}

async function add_new_product_list_manager(product_id, list_id, product_count, stat) {
    let result = await query_manager.ExecuteQuery(`SELECT * FROM addNewProductList(${product_id}, ${list_id}, ${product_count}, '${stat}')`);
    if (result["status"] == HttpStatus.CONTINUE){
        try{
            result = result["msg"]["rows"][0] 
            console.log(result);
            if (result.code === 1) {
                result = {"code": result.code, "status": HttpStatus.CONTINUE, "msg": result.msg };
            } else {
                result = {"code": result.code, "status": HttpStatus.EXPECTATION_FAILED, "msg": result.msg};
            }
        } catch (err) {
            result = { "status": HttpStatus.INTERNAL_SERVER_ERROR, "msg": ""}
        }
    }
    return result;
}

async function delete_product_list_manager(product_id, list_id) {
    let result = await query_manager.ExecuteQuery(`SELECT * FROM deleteProductList(${product_id}, ${list_id})`);
    if (result["status"] == HttpStatus.CONTINUE){
        try{
            result = result["msg"]["rows"][0] 
            console.log(result);
            if (result.code === 1) {
                result = {"code": result.code, "status": HttpStatus.CONTINUE, "msg": result.msg };
            } else {
                result = {"code": result.code, "status": HttpStatus.EXPECTATION_FAILED, "msg": result.msg};
            }
        } catch (err) {
            result = { "status": HttpStatus.INTERNAL_SERVER_ERROR, "msg": ""}
        }
    }
    return result;
}
module.exports = {
    display_cart_list_manager,
    display_cart_product_manager,
    add_new_list_manager,
    add_new_product_list_manager,
    delete_product_list_manager
};