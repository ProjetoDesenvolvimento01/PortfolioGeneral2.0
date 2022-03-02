const Sequelize = require('sequelize')
const connection = require("./connection")

const adm = connection.define('adms', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    },
    curriculo:{
        type: Sequelize.STRING
    },
    foto: {
        type: Sequelize.STRING
    },
    view: {
        type: Sequelize.INTEGER
    }
})

//adm.sync({force: true}).then(()=>{console.log("Tabela ADM criada com sucesso!")}) // <<<<<<< I need this but I need remove

module.exports = adm