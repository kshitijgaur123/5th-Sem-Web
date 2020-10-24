const Sequelize = require('sequelize');
const db = require('../config/database')

const user = db.define('Customers', {
    Name:{
        type: Sequelize.STRING
    },
    Email:{
        type: Sequelize.STRING
    },
    Password:{
        type: Sequelize.STRING
    }

},{
    timestamps: false
});
module.exports = user;