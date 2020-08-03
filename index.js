require('./config');
const http = require('http');
const https = require('https');
const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
const app = express();

function config(){
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header("Access-Control-Allow-Headers: Authorization");
        next();
    });
}

config();

app.use(cors())

app.use(require('./router'));
app.use(express.static('client'));
var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);
httpServer.listen(process.env.PORT, () => console.log(`Escuchando en el puerto ${process.env.PORT}!`));
httpsServer.listen(3002, () => console.log(`Escuchando en el puerto 3002!`));
