const database = require('./dataBase.js')

const message_flow = database.sequelize.define('message_flow', {
    id: {
        type: database.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    template_name: {
        type: database.Sequelize.TEXT
    },
    position: {
        type: database.Sequelize.INTEGER
    }
})

module.exports = message_flow
message_flow.sync()

// message_flow.sync({ force: true })
