const HTTPError = require('../utils/customError');
const HTTP_STATUS = require('../utils/HTTP_STATUS.js');
const courseService = require('../services/courseService.js');
const courseOrderService = require('../services/courseOrderService.js');

const checkAccess = async (req, res, next) => {
    const {courseId} = req.params;
    const user = req.user;
    if (!courseId || !user)
        return next(new HTTPError('Course id required!', HTTP_STATUS.BAD_REQUEST));

    const course = await courseService.findById(courseId);
    if (!course)
        return next(new HTTPError('Course not found!', HTTP_STATUS.NOT_FOUND));

    const order = await courseOrderService.isCourseOrdered(user.id, courseId);
    if (!course.is_free && !order)
        return next(new HTTPError('Access denied!', HTTP_STATUS.ACCESS_FORBIDDEN));

    req.course = course;

    next();
}

module.exports.checkCourseAccess = checkAccess;