const { Sequelize, DataTypes } = require('sequelize')
const { PersonalAccount } = require('../../models/account/personalAccount')
const sequelize = require('../../utils/database')


module.exports.PaymentMeteringDevice = PaymentMeteringDevice

const PaymentMeteringDevice = sequelize.define('PaymentMeteringDevice', {
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
  deviceType: {
    type: DataTypes.STRING(5),
    allowNull: false,
    comment:'Тип счетчика (ИПУ/ОДПУ)',
  },
  deviceName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment:'Наименование счетчика',
  },
  serviceName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment:'Наименование услуги',
  },
  serialNumber: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment:'Заводской номер',
  },
  lastValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Предыдущее показание',
  },
  lastValueDate: {
    type: DataTypes.DATE,
    allowNull: false,
    comment:'Дата предыдущего показания',
  },
  transformRatio: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Коэффициент трансформации',
  },
  lastVerificationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    comment:'Дата последней поверки',
  },
  currentValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Текущее показание',
  },
  consumption: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Расход (текущее - предыдущее)',
  },
  consumptionWithTransformRatio: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Расход с учетом КТР',
  },
  consumptionNorm: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment:'Норматив',
  },
})


let settingAccount = {
  foreignKey: 'serviceId',
  name: 'account',
  as: 'account',
  comment:'Лицевой счет',
  constraints: false
}
PersonalAccount.hasOne(PaymentMeteringDevice, settingAccount)
PaymentMeteringDevice.belongsTo(PersonalAccount, settingAccount)

