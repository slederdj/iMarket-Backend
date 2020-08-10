var shopManager = require('../Manager/shopManager');
var status = require('../Functions/status');
const express = require('express');
const HttpStatus = require('http-status-codes');

const app = express();

app.get('/shops', async function(req, res){
    let answer = await shopManager.display_shops_manager(
        req.query.pageNumber != undefined ? req.query.pageNumber : 1,
        req.query.pageSize != undefined ? req.query.pageSize : 6
    );
    if (answer["status"] === HttpStatus.CONTINUE) {
        res.status(HttpStatus.OK).send({ "mensaje": answer["msg"], "data": answer["data"], "code": answer["code"]});
    } else {
        status.getStatus(answer["status"], answer["msg"], answer["code"],res);
    }
});

app.get('/category', async function(req, res){
    console.log(req.query);   
    let answer = await shopManager.display_categoty_manager(
        req.query.id_store
    );
    if (answer["status"] === HttpStatus.CONTINUE) {
        res.status(HttpStatus.OK).send({ "mensaje": answer["msg"], "data": answer["data"], "code": answer["code"]});
    } else {
        status.getStatus(answer["status"], answer["msg"], answer["code"],res);
    }
});

app.get('/Products', async function(req, res){
    let answer = await shopManager.display_products_manager(
        req.query.id_store,
        req.query.prod_name != undefined ? 'req.query.prod_name' : null,
        req.query.cat_name != undefined ? 'req.query.cat_name' : null,
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