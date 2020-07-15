var Envio = require("../Models/Envio");
const HttpStatus = require('http-status-codes');

function getStatus(estado, mensaje, dato, res) {
    let envio;
    switch (estado) {
        case HttpStatus.INTERNAL_SERVER_ERROR:
            envio = new Envio("Error al conectar con el servidor", [])
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(envio);
            break;
        case HttpStatus.BAD_REQUEST:
            envio = new Envio("Error al devolver información", [])
            res.status(HttpStatus.BAD_REQUEST).send(envio);
            break;
        case HttpStatus.ACCEPTED:
            envio = new envio("No hay datos almacenados", [])
            res.status(HttpStatus.ACCEPTED).send(envio);
            break;
        case HttpStatus.CONTINUE:
            envio = new Envio(mensaje,[])
            res.status(HttpStatus.CONTINUE).send(envio);
            break;
            default:
                envio = new Envio(mensaje, dato);
                res.status(HttpStatus.OK).send(envio);
                break;
    }
}

module.exports = {
    getStatus
}