var userManager= require('../Manager/userManager');
var status = require('../Functions/status');
const express = require('express');
const HttpStatus = require('http-status-codes');
const jwt = require ('jsonwebtoken');

const app = express();

app.post('/sign_in', async function(req, res) {
    let answer = await userManager.sign_in_manager(
        req.body.correo,
        req.body.cedula
    );
    if (answer["status"] === HttpStatus.CONTINUE) {
        let token = await jwt.sign(answer["data"], process.env.SEED);
        res.status(HttpStatus.OK).send({ "token": token, "mensaje": answer["msg"], "data": answer["data"], "code": answer["code"]});
    } else {
        status.getStatus(answer["status"], answer["msg"], res);
    }
});

module.exports = app;