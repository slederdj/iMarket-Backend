var cartManager = require('../Manager/cartManager');
var status = require('../Functions/status');
const express = require('express');
const HttpStatus = require('http-status-codes');

const app = express();

app.post('/List', async function(req, res){
    let answer = await cartManager.display_cart_list_manager(
        req.query.id_usr,
        req.query.id_store
    );
    if (answer["status"] === HttpStatus.CONTINUE) {
        res.status(HttpStatus.OK).send({ "mensaje": answer["msg"], "data": answer["data"], "code": answer["code"]});
    } else {
        status.getStatus(answer["status"], answer["msg"], answer["code"],res);
    }
});

app.post('/Product', async function(req, res){
    let answer = await cartManager.display_cart_product_manager(
        req.query.id_list,
        req.query.name_product != undefined ? req.query.name_product : null,
        req.query.pageNumber != undefined ? req.query.pageNumber : null,
        req.query.pageSize != undefined ? req.query.pageSize : null,
    );
    if (answer["status"] === HttpStatus.CONTINUE) {
        res.status(HttpStatus.OK).send({ "mensaje": answer["msg"], "data": answer["data"], "code": answer["code"]});
    } else {
        status.getStatus(answer["status"], answer["msg"], answer["code"],res);
    }
});

module.exports = app;