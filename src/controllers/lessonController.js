const { Op } = require('sequelize');
const HTTPError = require('../utils/customError');
const HTTP_STATUS = require('../utils/HTTP_STATUS.js');
const lessonService = require('../services/lessonService.js');
const courseService = require('../services/courseService.js');

class lessonController
{
    async create(req, res, next)
    {
        const { name, description, video_url, is_open } = req.body;
        const {courseId} = req.params;

        if (!name || !description || !video_url || !courseId)
            return next(new HTTPError('More parameters are required!', HTTP_STATUS.BAD_REQUEST));

        try {
            const existingCourse = await courseService.findById(courseId);
            if (!existingCourse)
                return next(new HTTPError('Course not found!', HTTP_STATUS.NOT_FOUND));

            const existingLesson = await lessonService.find({
                [Op.and]: [
                    {name},
                    {courseId}
                ]
            });
            if (existingLesson)
                return next(new HTTPError('Lesson with this name is already exists!', HTTP_STATUS.BAD_REQUEST));

            const lastLesson = await lessonService.find(
                { courseId },
                [['lesson_number', 'DESC']]
            );
            

            const lesson_number = lastLesson ? lastLesson.lesson_number + 1 : 1;

            const payload = {
                name,
                description,
                video_url,
                is_open: (is_open !== undefined) ? is_open : false,
                lesson_number,
                courseId
            }
            const lesson = await lessonService.create(payload);
            return res.status(HTTP_STATUS.CREATED).json({success: true, message: "Lesson created!", lesson});
        } catch (error) {
            console.error(error)
            return next(new HTTPError('Internal Server Error during lesson creating!', HTTP_STATUS.INTERNAL_SERVER_ERROR));
        }
    }

    async getOne(req, res, next)
    {
        const {courseId, lesson_number} = req.params;

        if(!courseId || !lesson_number)
            return next(new HTTPError('course and lesson are required!', HTTP_STATUS.BAD_REQUEST));

        try {
            const lesson = await lessonService.find({
                [Op.and]: [
                    {courseId},
                    {lesson_number}
                ]
            });
            if (!lesson)
                return next(new HTTPError('Lesson not found!', HTTP_STATUS.NOT_FOUND));

            return res.status(HTTP_STATUS.OK).json({success: true, message: "Lesson found!", lesson});
        } catch (error) {
            return next(new HTTPError('Internal Server Error during lesson getOne!', HTTP_STATUS.INTERNAL_SERVER_ERROR));
        }
    }
}

module.exports = new lessonController;