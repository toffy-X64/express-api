const HTTPError = require('../utils/customError');
const HTTP_STATUS = require('../utils/HTTP_STATUS.js');
const lessonService = require('../services/lessonService.js');
const courseOrderService = require('../services/courseOrderService.js');

const checkLessonAccess = async (req, res, next) => {
    const courseId = req.course.id;
    const {lesson_number} = req.params;
    const userId = req.user.id;

    if (!lesson_number)
        return next(new HTTPError('Lesson number required!', HTTP_STATUS.BAD_REQUEST))

    const lesson = await lessonService.find({courseId, lesson_number})
    if (!lesson)
        return next(new HTTPError('Lesson not found!', HTTP_STATUS.NOT_FOUND));

    if (!lesson.is_open)
    {
        const order = await courseOrderService.isCourseOrdered(userId, courseId);
        if (!order)
            return next(new HTTPError('Access denied for this lesson', HTTP_STATUS.ACCESS_FORBIDDEN));
    }

    next()
}

module.exports.checkLessonAccess = checkLessonAccess;