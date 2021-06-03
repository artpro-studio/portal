const { Sequelize, DataTypes } = require('sequelize')
const { Service } = require('../../models/organization/service')
const { PersonalAccount } = require('../../models/account/personalAccount')
const sequelize = require('../../utils/database')


module.exports.PaymentTotal = PaymentTotal

const PaymentTotal = sequelize.define('PaymentTotal', {
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
  debt: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Долг',
  },
  lastPenalties: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'В том числе долг по пени',
  },
  privileges: {
    type: DataTypes.STRING(20),
    allowNull: false,
    comment:'Льготы',
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Начислено за текущий период',
  },
  currentPenalties: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'В том числе начислено пени',
  },
  totalPayable: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Итого к оплате',
  },
  lastPaymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    comment:'Дата последнего платежа',
  },
  lastPayment: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Послдений платеж',
  }
})


let settingAccount = {
  foreignKey: 'serviceId',
  name: 'account',
  as: 'account',
  comment:'Лицевой счет',
  constraints: false
}
PersonalAccount.hasOne(PaymentTotal, settingAccount)
PaymentTotal.belongsTo(PersonalAccount, settingAccount)

