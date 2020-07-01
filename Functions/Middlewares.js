const jwt = require('jsonwebtoken');
const status = require('./status');
const HttpStatus = require('http-status-codes');

let verificarToken = (req, res, next) => {
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }
        jwt.verify(token, process.env.SEED, (err, decoded) =>{
            if (err) {
                return status.getStatus(HttpStatus.UNAUTHORIZED, "No autorizado", res);
            }
            req.usuario = decoded.usuario;
            next();
        });
    } catch (error) {
        return status.getStatus(HttpStatus.UNAUTHORIZED, "No autorizado", res);
    }
};

module.exports = {
    verificarToken
}