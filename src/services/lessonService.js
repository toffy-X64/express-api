const {Lesson} = require('../models');
const { Op } = require('sequelize');

class lessonService
{
    async findById(id)
    {
        const lesson = await Lesson.findByPk(id);
        return lesson || false;
    }

    async find(fields, order)
    {
        try {
            let lesson;
            if (order)
                lesson = await Lesson.findOne({ where: fields, order: order });
            else
                lesson = await Lesson.findOne({ where: fields});
            
            return lesson || false;
        } catch (error) {
            return false;
        }
    }

    async create(fields)
    {
        try {
            const lesson = await Lesson.create(fields);
            return lesson;
        } catch (error) {
            console.error(error)
            return false;
        }
    }
}

module.exports = new lessonService;