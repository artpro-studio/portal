const { Sequelize, DataTypes } = require('sequelize')
const { House } = require('../../models/house/index')
const sequelize = require('../../utils/database')

const HouseElement = sequelize.define('HouseElement', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment: 'id',
  },
  own: {
    type: DataTypes.STRING(8),
    comment:'Вида владения',
  },
  apartmentNumber: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment:'Номер квартиры',
  },
  roomNumber: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment:'Номер комнаты',
  },
})

let settingHouse = {
  foreignKey: 'houseId',
  name: 'house',
  as: 'house',
  comment:'Дом',
  constraints: false
}
House.hasOne(HouseElement, settingHouse)
HouseElement.belongsTo(House, settingHouse)

module.exports.HouseElement = HouseElement
