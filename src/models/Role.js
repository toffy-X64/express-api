const {DataTypes} = require('sequelize');
const {db} = require('../config/db');

const Role = db.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

Role.beforeCreate(async (role) => {
    role.name = role.name.toUpperCase()
})

module.exports = Role;