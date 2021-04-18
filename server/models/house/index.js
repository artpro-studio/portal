const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../utils/database')


const Types = sequelize.define('Types', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment: 'id',
  },
  guid: {
    type: DataTypes.STRING(36),
    comment:'guid',
  },
  code: {
    type: DataTypes.STRING(5),
    allowNull: false,
    comment:'Код',
  },
  rootEntityGuid: {
    type: DataTypes.STRING(36),
    allowNull: true,
    comment:'Родительский guid',
  },
  actual: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment:'Актуален?',
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment:'Название',
  },

})


module.exports.Types = Types


const Nsi = sequelize.define('Nsi', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment: 'id',
  },
  guid: {
    type: DataTypes.STRING(36),
    comment:'guid',
  },
  aoGuid: {
    type: DataTypes.STRING(36),
    comment:'aoGuid',
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment:'Название',
  },
  parentGuid: {
    type: DataTypes.STRING(36),
    allowNull: true,
    comment:'Родительский guid',
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'Уровень',
  }
})


module.exports.Nsi = Nsi


const House = sequelize.define('House', {
  id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment:'id',
  },
  guid: {
    type: DataTypes.STRING(36),
    comment:'guid',
  },
  rootGuid: {
    type: DataTypes.STRING(36),
    allowNull: true,
    comment:'Главный guid',
  },
  planSeries: {
    type: DataTypes.STRING(255),
    comment:'Серия',
  },
  buildingYear: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment:'Год постройки'
  },
  operationYear: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment:'Год операции'
  },
  residentialPremiseCount: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment:'Количество жилых помещений'
  },
  nonResidentialPremiseCount: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment:'Количество нежилых помещений'
  },
  residentialPremiseActualCount: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment:'Фактическое количество жилых помещений'
  },
  nonResidentialPremiseActualCount: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment:'Фактическое количество нежилых помещений'
  },
  residentialPremiseConfirmedCount: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment:'Подтвержденное количество жилых помещений'
  },
  nonResidentialPremiseConfirmedCount: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment:'Подтвержденное количество нежилых помещений'
  },
  managementOrganization: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment:'Управляющая организация'
  },
  municipalityOrganization: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment:'Муниципальная организация'
  },
  maxFloorCount: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment:'Максимальное количество этажей'
  },
  floorCount: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment:'Количество этажей'
  },
  deterioration: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment:'Износ'
  },
  totalSquare: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: true,
    comment:'Общая площадь'
  },

  residentialSquare: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: true,
    comment:'Жилая площадь'
  },
  landSurveyTotalSquare: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: true,
    comment:'landSurveyTotalSquare'
  },
  accountCount: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment:'Кол-во жильцов'
  },
  devices: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment:'Устройства'
  },
  cadastreNumber: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment:'Кадастровый номер'
  },
  oldCadastreNumber: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment:'Старый кадастровый номер'
  },
  chiefFirstName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment:'Имя главы'
  },
  chiefLastName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment:'Фамилия главы'
  },
  chiefMiddleName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment:'Отчество главы'
  },
  managementContractDate: {
    type: DataTypes.DATE,
    allowNull: true,
    comment:'Дата начала контракта'
  },
  endContractDate: {
    type: DataTypes.DATE,
    allowNull: true,
    comment:'Дата конца контракта'
  },
  houseEnergyEfficiency: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment:'Уровень энергоэффективности'
  },
  energyInspectionDate: {
    type: DataTypes.DATE,
    allowNull: true,
    comment:'Дата инспекции энергии'
  },
  minFloorCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment:'Минимальное количество этажей'
  },
  undergroundFloorCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment:'Количество этажей под землей'
  },
  overhaulFundContribution: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment:'Капитальный ремонт взноса в фонд'
  },
  overhaulFundForming: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment:'Формирование фонда капитального ремонта'
  },
  buildingSquare: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: true,
    comment:'Площадь застройки'
  },
  postalCode: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment:'Почтовый индекс'
  },
  houseNumber: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment:'Номер дома'
  },
  buildingNumber: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment:'Номер структуры'
  },
  additionalName: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment:'Дополнительное имя'
  },
  formattedAddress: {
    type: DataTypes.STRING(400),
    allowNull: true,
    comment:'Дополнительное имя'
  },
  estStatus: {
    type: DataTypes.STRING(400),
    allowNull: true,
    comment:'Дополнительное имя'
  },
  fiasHouseGuid: {
    type: DataTypes.STRING(36),
    allowNull: true,
    comment:'ФИАС'
  },
  houseTextAddress: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment:'Полный адрес'
  },
})


module.exports.House = House


House.belongsTo(Types)

Types.hasOne(House, {
  foreignKey: {
    name: 'houseType',
    comment:'Тип',
  },
  name: 'houseType',
  comment:'Тип',
})

Types.hasOne(House, {
  foreignKey: {
    name: 'planType',
    comment:'Тип планировки',
  },
  name: 'planType',
  comment:'Тип планировки',
})

Types.hasOne(House, {
  foreignKey: {
    name: 'houseCondition',
    comment:'Тип планировки',
  },
  name: 'houseCondition',
  comment:'Состояние дома',
})

Types.hasOne(House, {
  foreignKey: {
    name: 'houseManagementType',
    comment:'Тип управления домом',
  },
  name: 'houseManagementType',
  comment:'Тип управления домом',
})

Types.hasOne(House, {
  foreignKey: {
    name: 'lifeCycleStage',
    comment:'Стадия жизненного цикла',
  },
  name: 'lifeCycleStage',
  comment:'Стадия жизненного цикла',
})

House.belongsTo(Nsi)
Nsi.hasOne(House, {
  foreignKey: {
    name: 'region',
    comment:'Регион',
  },
  name: 'region',
  comment:'Регион',
})

House.belongsTo(Nsi)
Nsi.hasOne(House, {
  foreignKey: {
    name: 'area',
    comment:'Район',
  },
  name: 'area',
  comment:'Район',
})

House.belongsTo(Nsi)
Nsi.hasOne(House, {
  foreignKey: {
    name: 'city',
    comment:'Город',
  },
  name: 'city',
  comment:'Город',
})

House.belongsTo(Nsi)
Nsi.hasOne(House, {
  foreignKey: {
    name: 'settlement',
    comment:'Поселение',
  },
  name: 'settlement',
  comment:'Поселение',
})

House.belongsTo(Nsi)
Nsi.hasOne(House, {
  foreignKey: {
    name: 'street',
    comment:'Улица',
  },
  name: 'street',
  comment:'Улица',
})
