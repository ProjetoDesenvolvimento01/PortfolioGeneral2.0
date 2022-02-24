const Sequelize = require('sequelize')

const connection = new Sequelize('postgres://qopyrtmwiovasx:b6aeb95318f35412fbfdd1b436612227f260029a97ec0e6b919c0bd659616962@ec2-3-212-143-188.compute-1.amazonaws.com:5432/dfhd041c9j8mli',{
    host: 'ec2-3-212-143-188.compute-1.amazonaws.com',
    dialect: 'postgres',
    logging: true,
    dialectOptions: {
        ssl: {
            require: false,
            rejectUnauthorized: false
        }
    }
})

module.exports = connection;