const {User} = require('../models');
const { Op } = require('sequelize');
const roleService = require('./roleService');

const DEFAULT_ROLE = "USER"

class userService
{
    async findById(id)
    {
        const user = await User.findByPk(id);
        return user || false;
    }

    async find(fields) {
        try {
            const user = await User.findOne({ where: fields });
            return user || false;
        } catch (error) {
            return false;
        }
    }

    async create(fields) {
        try {
            const role = await roleService.getID(DEFAULT_ROLE);
            if (!role) {
                console.error("Role USER not found!")
                return false;
            }

            fields.roleId = role;
            const user = await User.create(fields);
            return user;
        } catch (error) {
            console.error(error)
            return false;
        }
    }
}

module.exports = new userService;