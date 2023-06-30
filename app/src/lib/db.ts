import { Pool } from "pg"
const { Sequelize, DataTypes } = require('sequelize')

// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize(process.env.DATABASE, process.env.PGSQL_USER, process.env.PGSQL_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})

export const User = sequelize.define('User', {
    pubkey: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING
    }
    }, {
    // Other model options go here
})

export const ApiKeys = sequelize.define('apiKeys', {
    pubkey: {
        type: DataTypes.STRING,
        allowNull: false
    },
    helius: {
        type: DataTypes.STRING
    },
    glassnode: {
        type: DataTypes.STRING
    },
    dune: {
        type: DataTypes.STRING
    },
    messari: {
        type: DataTypes.STRING
    },
    solscan: {
        type: DataTypes.STRING
    },
    coinbase: {
        type: DataTypes.STRING
    },
    coinmarketcap: {
        type: DataTypes.STRING
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