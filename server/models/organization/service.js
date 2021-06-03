const { Sequelize, DataTypes } = require('sequelize')
const { HouseElement } = require('../../models/account/houseElement')
const { HouseIs } = require('../../models/house/houseIS')
const { Organization } = require('../../models/organization/index')
const sequelize = require('../../utils/database')


module.exports.Service = Service

const Service = sequelize.define('Service', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment: 'id',
  },
  linkIs: {
    type: DataTypes.STRING(36),
    comment:'ИД услуги в ИС',
  },
  serviceName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment:'Название',
  },
  serviceType: {
    type: DataTypes.STRING(8),
    allowNull: false,
    comment:'Тип услуги (0 - коммунальные, 1 - жилищные, 2 - прочие)',
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'Порядок следования услуги',
  }
})


let settingService = {
  foreignKey: 'organizationId',
  name: 'organization',
  as: 'organization',
  comment:'Организация',
  constraints: false
}
Organization.hasOne(Service, settingService)
Service.belongsTo(Organization, settingService)
