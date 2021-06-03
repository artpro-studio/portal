const { Sequelize, DataTypes } = require('sequelize')
const { Service } = require('../../models/organization/service')
const { PersonalAccount } = require('../../models/account/personalAccount')
const sequelize = require('../../utils/database')


module.exports.PaymentDetail = PaymentDetail

const PaymentDetail = sequelize.define('PaymentDetail', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment: 'id',
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'Месяц',
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'Год',
  },
  period: {
    type: DataTypes.STRING(6),
    allowNull: false,
    comment:'Период',
  },
  volume: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Объем потребления',
  },
  allocationAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Сумма перерасчета',
  },
  allocationReason: {
    type: DataTypes.STRING(40),
    allowNull: false,
    comment:'Основание перерасчета',
  },
  currentAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Начислено за текущий период',
  },
  currentAmountWithTransformRatio: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Начислено на основании повышающего коэффициента',
  },
  normative: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Норматив',
  },
  tariff: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Тариф',
  },
  unitType: {
    type: DataTypes.STRING(30),
    allowNull: false,
    comment:'Единица измерения',
  },
  totalPayable: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Итого к оплате',
  },
  householdConsumption: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Общедомовое потребление',
  },
})


let settingService = {
  foreignKey: 'serviceId',
  name: 'service',
  as: 'service',
  comment:'Услуга',
  constraints: false
}
Service.hasOne(PaymentDetail, settingService)
PaymentDetail.belongsTo(Service, settingService)

let settingAccount = {
  foreignKey: 'serviceId',
  name: 'account',
  as: 'account',
  comment:'Лицевой счет',
  constraints: false
}
PersonalAccount.hasOne(PaymentDetail, settingAccount)
PaymentDetail.belongsTo(PersonalAccount, settingAccount)

