const database = require('./dataBase.js')

const subscriptions = database.sequelize.define('subscriptions', {
    id: {
        type: database.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: database.Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: database.Sequelize.STRING
    }
})

module.exports = subscriptions
subscriptions.sync()
//Criando tabela
// subscriptions.sync({ force: true })

// subscription_date: {
//     type: database.Sequelize.DATE
// },
// last_menssage: {
//     type: database.Sequelize.INTEGER
// },
// active: {
//     type: database.Sequelize.BOOLEAN
// }