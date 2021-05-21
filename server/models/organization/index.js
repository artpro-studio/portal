const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../utils/database')
const { MunicipalResource, OrganizationRoles } = require('../organization/municipalResource')


const Organization = sequelize.define('Organization', {
  id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment:'id',
  },
  guid: {
    type: DataTypes.STRING(36),
    allowNull: false,
    comment:'guid',
  },
  shortName: {
    type: DataTypes.STRING(400),
    comment:'Сокращенное наименование',
    // allowNull defaults to true
  },
  fullName: {
    type: DataTypes.STRING(400),
    allowNull: true,
    comment:'Полное наименование',
    // allowNull defaults to true
  },
  ogrn: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment:'ОГРН',
    // allowNull defaults to true
  },
  okfs: {
    type: DataTypes.STRING(300),
    allowNull: true,
    comment:'ОКФС',
    // allowNull defaults to true
  },
  inn: {
    type: DataTypes.STRING(40),
    allowNull: true,
    comment:'ИНН',
    // allowNull defaults to true
  },
  kpp: {
    type: DataTypes.STRING(40),
    allowNull: true,
    comment:'КПП',
    // allowNull defaults to true
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment:'E-mail',
    // allowNull defaults to true
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment:'Официальный сайт в сети Интернет',
    // allowNull defaults to true
  },
  phone: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment:'Телефон',
    // allowNull defaults to true
  },
  ogrnip: {
    type: DataTypes.STRING(30),
    allowNull: true,
    comment:'ОГРНИП',
    // allowNull defaults to true
  },
  orgOid: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment:'orgOid',
    // allowNull defaults to true
  },
  bankCode: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment:'Код банка',
    // allowNull defaults to true
  },
  orgAddress: {
    type: DataTypes.STRING(1024),
    allowNull: true,
    comment:'Адрес организации',
    // allowNull defaults to true
  },
  chiefLastName: {
    type: DataTypes.STRING(1024),
    allowNull: true,
    comment:'Фамилия директора',
    // allowNull defaults to true
  },
  chiefFirstName: {
    type: DataTypes.STRING(1024),
    allowNull: true,
    comment:'Имя директора',
    // allowNull defaults to true
  },
  chiefMiddleName: {
    type: DataTypes.STRING(1024),
    allowNull: true,
    comment:'Отчество директора',
    // allowNull defaults to true
  },
  organizationType: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment:'Тип организации',
    // allowNull defaults to true
  },
  organizationTypeName: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment:'Тип организации (название)',
    // allowNull defaults to true
  },
  managementPost: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment:'Тип организации (название)',
    // allowNull defaults to true
  },
  okved: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment:'Тип организации (название)',
    // allowNull defaults to true
  },
  registrationDate: {
    type: DataTypes.DATE,
    allowNull: true,
    comment:'Дата регистрации',
    // allowNull defaults to true
  },
  dispatcherPhones:{
    type: DataTypes.STRING(100),
    comment: 'Телефон диспетчера',
  },
  citizensReceptionPhones:{
    type: DataTypes.STRING(100),
    comment: 'Телефон приема граждан',
  },
  citizensReceptionLocation:{
    type: DataTypes.STRING(1023),
    comment: 'Адрес приема граждан',
  },
})

module.exports.Organization = Organization

Organization.belongsToMany(MunicipalResource, { as: 'municipalResource', through: 'Organization_MunicipalResource' })
MunicipalResource.belongsToMany(Organization, { as: 'organization', through: 'Organization_MunicipalResource' })


Organization.belongsToMany(OrganizationRoles, { as: 'organizationRoles', through: 'Organization_OrganizationRoles' })
OrganizationRoles.belongsToMany(Organization, { as: 'rolesOrganization', through: 'Organization_OrganizationRoles' })



const Chart = sequelize.define('Chart', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment: 'id',
  },
  guid: {
    type: DataTypes.STRING(36),
    comment: 'guid',
  },
  dayOfWeek: {
    type: DataTypes.INTEGER,
    comment: 'День недели',
  },
  openHoursBegin: {
    type: DataTypes.TIME,
    comment: 'Время начала приема',
  },
  openHoursEnd: {
    type: DataTypes.TIME,
    comment: 'Время конца приема',
  },
  breakHoursBegin: {
    type: DataTypes.TIME,
    comment: 'Время начала перерыва',
  },
  breakHoursEnd: {
    type: DataTypes.TIME,
    comment: 'Время конца приема',
  },
  comment: {
    type: DataTypes.STRING(1023),
    comment: 'Комментарий',
  },
  type: {
    type: DataTypes.STRING(15),
    comment: 'Тип',
  },
})

Organization.hasOne(Chart, {
  foreignKey: 'chartOrganizationId',
  name: 'chartOrganization',
  as: 'chartOrganization',
  comment:'Организация',
  constraints: false
})
Chart.belongsTo(Organization,{
  foreignKey: 'chartOrganizationId',
  name: 'chartOrganization',
  as: 'chartOrganization',
  comment:'Организация',
  constraints: false
})

module.exports.Chart = Chart
