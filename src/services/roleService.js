const {Role} = require('../models');
const { Op } = require('sequelize');

class roleService
{
    async getID(value)
    {
        const role = await Role.findOne({where: {
            [Op.or]: [
                {id: value},
                {name: value}
            ]
        }});
        return role.id || false;
    }

    async getName(id)
    {
        const role = await Role.findByPk(id);
        return role.name || false;
    }
}

module.exports = new roleService;