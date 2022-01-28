const Sequelize = require('sequelize')

const connection = new Sequelize('postgres://icsbhmraspreaa:5a00c60bca00671cb1c98e9a1e8b035ef8bf4f4d23a989ed06e2109c8cfc8bad@ec2-34-230-198-12.compute-1.amazonaws.com:5432/d9qcl6r81alqfk',{
    host: 'ec2-34-230-198-12.compute-1.amazonaws.com',
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