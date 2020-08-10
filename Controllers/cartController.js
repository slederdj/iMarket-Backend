var cartManager = require('../Manager/cartManager');
var status = require('../Functions/status');
const express = require('express');
const HttpStatus = require('http-status-codes');

const app = express();

app.get('/List', async function(req, res){
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

app.get('/Product', async function(req, res){
    let answer = await cartManager.display_cart_product_manager(
        req.query.id_list,
        req.query.name_product != undefined ? `'${req.query.name_product}'`: null,
        req.query.pageNumber != undefined ? req.query.pageNumber : null,
        req.query.pageSize != undefined ? req.query.pageSize : null,
    );
    if (answer["status"] === HttpStatus.CONTINUE) {
        res.status(HttpStatus.OK).send({ "mensaje": answer["msg"], "data": answer["data"], "code": answer["code"]});
    } else {
        status.getStatus(answer["status"], answer["msg"], answer["code"],res);
    }
});
app.put('/Add_list', async function(req, res){
    let answer = await cartManager.add_new_list_manager(
        req.body.client_id, 
        req.body.shop_id,
        req.body.list_name
    );
    if (answer["status"] == HttpStatus.CONTINUE)
        res.status(HttpStatus.OK).send({ "mensaje": answer["msg"], "code": answer["code"]});
    else
        status.getStatus(answer["status"], answer["msg"], answer["code"], res);
});

app.put('/Add_product', async function(req, res){
    let answer = await cartManager.add_new_product_list_manager(
        req.body.product_id, 
        req.body.list_id,
        req.body.product_count,
        req.body.stat
    );
    if (answer["status"] == HttpStatus.CONTINUE)
        res.status(HttpStatus.OK).send({ "mensaje": answer["msg"], "code": answer["code"]});
    else
        status.getStatus(answer["status"], answer["msg"], answer["code"], res);
});

module.exports = app;