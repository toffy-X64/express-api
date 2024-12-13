const HTTPError = require('../utils/customError');
const HTTP_STATUS = require('../utils/HTTP_STATUS.js');
const jwtService = require('../utils/jwtService.js');

const checkAuth = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return next( new HTTPError('No auth token!', HTTP_STATUS.ACCESS_FORBIDDEN) )
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token)
    {
        return next( new HTTPError('Unathorised request!', HTTP_STATUS.UNAUTHORISED) )
    }

    let payload;

    try {
        payload = jwtService.verify(token)
    } catch(error) {
        return next( new HTTPError('Invalid or expired token', HTTP_STATUS.UNAUTHORISED) )
    }

    req.user = payload
    next();
}

module.exports = checkAuth;