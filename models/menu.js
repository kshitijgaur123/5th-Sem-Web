const Sequelize = require('sequelize');
const db = require('../config/database')

const user = db.define('user', {
    FoodName:{
        type: Sequelize.STRING
    },
    Active:{
        type: Sequelize.STRING
    },
    FoodCategory:{
        type: Sequelize.STRING
    },
    Price:{
        type: Sequelize.BOOLEAN
    }

   

})
module.exports = user;