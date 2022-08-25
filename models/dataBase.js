const Sequelize = require('sequelize')

const sequelize = new Sequelize('backendprecato', 'precatodb', 'gabriel123', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    logging: false
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}