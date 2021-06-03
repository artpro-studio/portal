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
  },
  fullName: {
    type: DataTypes.STRING(400),
    allowNull: true,
    comment:'Полное наименование',
  },
  ogrn: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment:'ОГРН',
  },
  okfs: {
    type: DataTypes.STRING(300),
    allowNull: true,
    comment:'ОКФС',
  },
  inn: {
    type: DataTypes.STRING(40),
    allowNull: true,
    comment:'ИНН',
  },
  kpp: {
    type: DataTypes.STRING(40),
    allowNull: true,
    comment:'КПП',
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment:'E-mail',
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment:'Официальный сайт в сети Интернет',
  },
  phone: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment:'Телефон',
  },
  ogrnip: {
    type: DataTypes.STRING(30),
    allowNull: true,
    comment:'ОГРНИП',
  },
  orgOid: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment:'orgOid',
  },
  bankCode: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment:'Код банка',
  },
  orgAddress: {
    type: DataTypes.STRING(1024),
    allowNull: true,
    comment:'Адрес организации',
  },
  chiefLastName: {
    type: DataTypes.STRING(1024),
    allowNull: true,
    comment:'Фамилия директора',
  },
  chiefFirstName: {
    type: DataTypes.STRING(1024),
    allowNull: true,
    comment:'Имя директора',
  },
  chiefMiddleName: {
    type: DataTypes.STRING(1024),
    allowNull: true,
    comment:'Отчество директора',
  },
  organizationType: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment:'Тип организации',
  },
  organizationTypeName: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment:'Тип организации (название)',
  },
  managementPost: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment:'Тип организации (название)',
  },
  okved: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment:'Тип организации (название)',
  },
  registrationDate: {
    type: DataTypes.DATE,
    allowNull: true,
    comment:'Дата регистрации',
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
  sberCode: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment:'Код в сбербанке',
  },
  sberName: {
    type: DataTypes.STRING(40),
    allowNull: true,
    comment:'Код в сбербанке',
  },
  bik: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment:'Код в сбербанке',
  },
  qr_code: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment:'QR-код',
    default:'ST00011'
  },
  bar_code: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment:'BAR-код',
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment:'order',
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
