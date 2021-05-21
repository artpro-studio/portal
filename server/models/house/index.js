const { Sequelize, DataTypes } = require('sequelize')
const { Organization } = require('../../models/organization/index')
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


const House = sequelize.define('House',
  {
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
    rootGuid: {
      type: DataTypes.STRING(36),
      allowNull: true,
      comment: 'Главный guid',
    },
    planSeries: {
      type: DataTypes.STRING(255),
      comment: 'Серия',
    },
    buildingYear: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Год постройки'
    },
    operationYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Год операции'
    },
    residentialPremiseCount: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: 'Количество жилых помещений'
    },
    nonResidentialPremiseCount: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: 'Количество нежилых помещений'
    },
    residentialPremiseActualCount: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: 'Фактическое количество жилых помещений'
    },
    nonResidentialPremiseActualCount: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: 'Фактическое количество нежилых помещений'
    },
    residentialPremiseConfirmedCount: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: 'Подтвержденное количество жилых помещений'
    },
    nonResidentialPremiseConfirmedCount: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: 'Подтвержденное количество нежилых помещений'
    },
    maxFloorCount: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Максимальное количество этажей'
    },
    floorCount: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Количество этажей'
    },
    deterioration: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: 'Износ'
    },
    totalSquare: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      comment: 'Общая площадь'
    },

    residentialSquare: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      comment: 'Жилая площадь'
    },
    landSurveyTotalSquare: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      comment: 'landSurveyTotalSquare'
    },
    accountCount: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: 'Кол-во жильцов'
    },
    devices: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Устройства'
    },
    cadastreNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Кадастровый номер'
    },
    oldCadastreNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Старый кадастровый номер'
    },
    chiefFirstName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Имя главы'
    },
    chiefLastName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Фамилия главы'
    },
    chiefMiddleName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Отчество главы'
    },
    managementContractDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Дата начала контракта'
    },
    endContractDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Дата конца контракта'
    },
    houseEnergyEfficiency: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Уровень энергоэффективности'
    },
    energyInspectionDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Дата инспекции энергии'
    },
    minFloorCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Минимальное количество этажей'
    },
    undergroundFloorCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Количество этажей под землей'
    },
    overhaulFundContribution: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Капитальный ремонт взноса в фонд'
    },
    overhaulFundForming: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Формирование фонда капитального ремонта'
    },
    buildingSquare: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      comment: 'Площадь застройки'
    },
    postalCode: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: 'Почтовый индекс'
    },
    postalAddress: {
      type: DataTypes.STRING(1023),
      allowNull: true,
      comment: 'Почтовый адрес'
    },
    houseNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: 'Номер дома'
    },
    buildingNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: 'Номер структуры'
    },
    additionalName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Дополнительное имя'
    },
    formattedAddress: {
      type: DataTypes.STRING(400),
      allowNull: true,
      comment: 'Дополнительное имя'
    },
    estStatus: {
      type: DataTypes.STRING(400),
      allowNull: true,
      comment: 'Дополнительное имя'
    },
    fiasHouseGuid: {
      type: DataTypes.STRING(36),
      allowNull: true,
      comment: 'ФИАС'
    },
    houseTextAddress: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: 'Полный адрес'
    },
  },
  {
    indexes: [
      {
        unique: false,
        fields: ['city', 'area','region']
      },
      {
        unique: false,
        fields: ['city', 'area', 'settlement', 'region']
      },
      {
        unique: false,
        fields: ['street', 'city', 'area', 'settlement', 'region']
      },
      ]
  }
)


module.exports.House = House

// Связка тип дома
Types.hasOne(House, {
  as: 'typeHouse',
})


House.belongsTo(Types
  ,{
  as: 'houseTypeId',
  foreignKey: 'houseType',
  options:{
    targetKey: 'houseTypeKey'
  }
})

// Связка тип планировки

Types.hasOne(House, {
  foreignKey: {
    name: 'planType',
    comment:'Тип планировки',
  },
})

House.belongsTo(Types,{
    as: 'typePlanId',
    foreignKey: 'typePlan',
    options:{
      targetKey: 'typePlan'
    }
})

// Связка тип состояние дома

Types.hasOne(House, {
  foreignKey: {
    name: 'houseCondition',
    comment:'Состояние дома',
  },
  name: 'houseCondition',
  comment:'Состояние дома',
})
House.belongsTo(Types,{
    as: 'сonditionHouseId',
    foreignKey: 'сonditionHouse',
    options:{
      targetKey: 'сonditionHouse'
    }
})


//Тип управления домом

Types.hasOne(House, {
  foreignKey: {
    name: 'houseManagementType',
    comment:'Тип управления домом',
  },
  name: 'houseManagementType',
  comment:'Тип управления домом',
})
House.belongsTo(Types,{
  as: 'ManagementTypeHouseId',
  foreignKey: 'ManagementTypeHouse',
  options:{
    targetKey: 'ManagementTypeHouse'
  }
})


//Стадия жизненного цикла
Types.hasOne(House, {
  foreignKey: {
    name: 'lifeCycleStage',
    comment:'Стадия жизненного цикла',
  },
  name: 'lifeCycleStage',
  comment:'Стадия жизненного цикла',
})
House.belongsTo(Types,{
  as: 'lifeCycleStageTypeId',
  foreignKey: 'lifeCycleStageType',
  options:{
    targetKey: 'lifeCycleStageType'
  }
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


Organization.hasOne(House, {
  foreignKey: 'managementOrganizationId',
  name: 'managementOrganization',
  as: 'managementOrganization',
  comment:'Управляющая организация',
  constraints: false
})
House.belongsTo(Organization,{
  foreignKey: 'managementOrganizationId',
  name: 'managementOrganization',
  as: 'managementOrganization',
  comment:'Управляющая организация',
  constraints: false
})

let settingHouseOrg = {
  foreignKey: 'municipalityOrganizationId',
  name: 'municipalityOrganization',
  as: 'municipalityOrganization',
  comment:'Муниципальная организация',
  constraints: false
}
Organization.hasOne(House, settingHouseOrg)
House.belongsTo(Organization, settingHouseOrg)


House.belongsToMany(Organization, { as: 'resourceProvisionOrganizationList', through: 'House_Organization' })
Organization.belongsToMany(House, { as: 'organizationResourceProvisionList', through: 'House_Organization' })
