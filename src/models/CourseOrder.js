const {DataTypes} = require('sequelize');
const {db} = require('../config/db');

const CourseOrder = db.define('CourseOrder', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    courseId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Courses',
            key: 'id'
        },
        onDelete: 'CASCADE',
    }
}, {
    tableName: 'course_orders'
})

module.exports = CourseOrder;