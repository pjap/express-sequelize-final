'use strict';
module.exports = function(sequelize, DataTypes) {
  var Suppliers = sequelize.define('Suppliers', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING,
    ItemsId: DataTypes.INTEGER
  });
  Suppliers.associate = function(models) {
  Suppliers.belongsTo(models.Item,{foreignKey: 'ItemsId'})
  }
  return Suppliers;
};
