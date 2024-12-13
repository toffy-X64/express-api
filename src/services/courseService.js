const {Course} = require('../models');
const { Op } = require('sequelize');

class courseService
{
    async findById(id)
    {
        const course = await Course.findByPk(id);
        return course || false;
    }

    async find(fields, order) {
        try {
            const options = { where: fields };
            if (order) options.order = order;
    
            const lesson = await Lesson.findOne(options);
            return lesson;
        } catch (error) {
            console.error('Error in find method:', error);
            return false;
        }
    }

    async getAll()
    {
        try {
            const cources = await Course.findAll()
            return cources;
        } catch (error) {
            return false;
        }
    }
}

module.exports = new courseService;