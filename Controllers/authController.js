var authManager = require('../Manager/authManager');
var status = require('../Functions/status');
const express = require('express');
const HttpStatus = require('http-status-codes');
const jwt = require ('jsonwebtoken');

const app = express();

app.post('/login', async function(req, res) {
    let answer = await authManager.sign_in_manager(
        req.body.mail,
        req.body.password
    );
    if (answer["status"] === HttpStatus.CONTINUE) {
        let token = await jwt.sign(answer["data"], process.env.SEED);
        res.status(HttpStatus.OK).send({ "token": token, "mensaje": answer["msg"], "data": answer["data"], "code": answer["code"]});
    } else {
        status.getStatus(answer["status"], answer["msg"], answer["code"],res);
    }
});

app.post('/register', async function(req, res) {
    let answer = await authManager.sign_up_manager(
        req.body.username,
        req.body.mail,
        req.body.password
    );
    status.getStatus(answer["status"], answer["msg"], answer["code"], res);
});

module.exports = app;