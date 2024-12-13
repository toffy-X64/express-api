const HTTPError = require('../utils/customError');
const HTTP_STATUS = require('../utils/HTTP_STATUS.js');

const roleMiddleware = (roles) => (req, res, next) => {
    if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
        return next( new HTTPError('Access denied!', HTTP_STATUS.ACCESS_FORBIDDEN) );
    }

    next();
}

module.exports = roleMiddleware;