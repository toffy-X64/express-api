const HTTPError = require('../utils/customError');
const CourseDTO = require('../config/dto/CourseDTO.js');
const HTTP_STATUS = require('../utils/HTTP_STATUS.js');
const courseService = require('../services/courseService.js');
const courseOrderService = require('../services/courseOrderService.js');

class courseController
{   
    async create(req, res, next)
    {
        const { name, logo, description, is_free, price, discount } = req.body;

        if (!name || !description)
            return next(new HTTPError('Name and Description are required!', HTTP_STATUS.BAD_REQUEST));

        try {
            const existingCourse = await courseService.find({name});
            if (existingCourse)
                return next(new HTTPError('Course with this name is already exists!', HTTP_STATUS.BAD_REQUEST));

            const payload = {
                name,
                logo: logo || '',
                description,
                is_free: (is_free !== undefined) ? is_free : false,
                price: (typeof price === 'number') ? price : 0,
                discount: (typeof discount === 'number') ? discount : 0
            };
            const course = await courseService.create(payload);

            return res.status(HTTP_STATUS.CREATED).json({success: true, message: "Course created!", course});
        } catch (error) {
            return next(new HTTPError('Internal Server Error during course creating!', HTTP_STATUS.INTERNAL_SERVER_ERROR));
        }
    }

    async get(req, res, next)
    {
        const course = req.course;
        if (!course)
            return next(new HTTPError('Params are required!', HTTP_STATUS.BAD_REQUEST));

        try {
            if (!course)
                return next(new HTTPError('Course not found!', HTTP_STATUS.NOT_FOUND));

            const payload = new CourseDTO(course);
            return res.status(HTTP_STATUS.OK).json({success: true, message: "Course found!", payload})
        } catch (error) {
            return next(new HTTPError('Internal Server Error during get course!', HTTP_STATUS.INTERNAL_SERVER_ERROR));
        }
    }

    async getAll(req, res, next)
    {
        try {
            const courses = await courseService.getAll();
            let list = []

            courses.map(course => {
                const dto = new CourseDTO(course)
                list.push(dto)
            })

            return res.status(HTTP_STATUS.OK).json({success: true, message: "Courses found!", list})
        } catch (error) {
            return next(new HTTPError('Internal Server Error during getAll course!', HTTP_STATUS.INTERNAL_SERVER_ERROR));
        }
    }

    async buy(req, res, next)
    {
        const {courseId} = req.params;
        const user = req.user;
        console.log(user)
        if (!courseId || !user)
            return next(new HTTPError('Course id are required!', HTTP_STATUS.BAD_REQUEST));

        try {
            const course = await courseService.findById(courseId);
            if (!course)
                return next(new HTTPError('Course not found!', HTTP_STATUS.BAD_REQUEST));

            const order = await courseOrderService.isCourseOrdered(user.id, courseId);
            if (order)
                return next(new HTTPError('You already bought this course!', HTTP_STATUS.BAD_REQUEST));

            const payload = {
                courseId,
                userId: user.id
            }
            const new_order = await courseOrderService.create(payload);

            return res.status(HTTP_STATUS.OK).json({success: true, message: "Course successfully bought!", new_order});
        } catch (error) {
            console.error(error)
            return next(new HTTPError('Internal Server Error during course buying!', HTTP_STATUS.INTERNAL_SERVER_ERROR));
        }
    }
}   

module.exports = new courseController;