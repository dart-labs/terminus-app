const { Sequelize, DataTypes } = require('sequelize')

export const sequelize = new Sequelize(process.env.PGSQL_DATABASE, process.env.PGSQL_USER, process.env.PGSQL_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        freezeTableName: true
    }
})

export const User = sequelize.define('Users', {
    pubkey: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING
    }
    }, {
})

export const ApiKeys = sequelize.define('apiKeys', {
    pubkey: {
        type: DataTypes.STRING,
        allowNull: false
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apikey: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

async function sqlConnect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}