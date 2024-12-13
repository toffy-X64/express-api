const { Model, Sequelize } = require('sequelize');

const sequelize = new Sequelize('tests', 'root', 'root', {
    host: "127.0.0.1",
    dialect: "mysql"
});

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        await sequelize.sync({ force: false });
        console.log('Tables synchronized successfully.');
    } catch (error) {
        console.error('Error during database initialization:', error.message);
    }
};

module.exports.db = sequelize;
module.exports.init = initializeDatabase;