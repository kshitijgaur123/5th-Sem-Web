const Sequelize = require('sequelize');
module.exports = new Sequelize('foodDelivery', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
  }
  ,{
    timestamps: false
}
  );
