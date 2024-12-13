const {DataTypes} = require('sequelize');
const {db} = require('../config/db');

const Lesson = db.define('Lesson', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    video_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lesson_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_open: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    courseId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Courses',
            key: 'id'
        },
        onDelete: 'CASCADE',
    }
});

module.exports = Lesson;