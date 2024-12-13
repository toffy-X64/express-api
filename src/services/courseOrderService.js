const {CourseOrder} = require('../models');
const { Op } = require('sequelize');

class courseOrderService
{
    async findById(id)
    {
        const order = await CourseOrder.findByPk(id);
        return order || false;
    }

    async find(fields)
    {
        try {
            const order = await CourseOrder.findOne({ where: fields });
            return order || false;
        } catch (error) {
            return false;
        }
    }

    async create(fields)
    {
        try {
            const order = await CourseOrder.create(fields);
            return order;
        } catch (error) {
            console.error(error)
            return false;
        }
    }

    async isCourseOrdered(userId, courseId)
    {
        try {
            const order = await this.find({
                [Op.and]: [
                    {userId},
                    {courseId}
                ]
            })
            return order || false;
        } catch (error) {
            console.error(error)
            return false;
        }
    }
}

module.exports = new courseOrderService;