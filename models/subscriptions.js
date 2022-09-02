const database = require('./dataBase.js')

const subscriptions = database.sequelize.define('subscriptions', {
    id: {
        type: database.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    subscription_date: {
        type: database.Sequelize.DATE,
        allowNull: false
    },
    name: {
        type: database.Sequelize.TEXT
    },
    email: {
        type: database.Sequelize.TEXT,
        uniqueKey: true
    },
    last_message: {
        type: database.Sequelize.INTEGER,
    },
    active: {
        type: database.Sequelize.BOOLEAN
    }
})

module.exports = subscriptions
subscriptions.sync()
//Criando tabela
// subscriptions.sync({ force: true })
