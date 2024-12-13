const {DataTypes} = require('sequelize');
const {db} = require('../config/db');


const Course = db.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_free: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
});

module.exports = Course;