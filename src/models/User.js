const {DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const {db} = require('../config/db');


const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Roles',
            key: 'id'
        }
    }
});

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.roleId = 1
});

User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;