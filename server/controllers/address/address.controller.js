const bodyParser = require('body-parser');
const ApiError = require('../../handlers/apiError')
const {handlerDataTable} = require('../../handlers/handlerDataApi')
const { Nsi, Types, House } = require('../../models/house/index')
const { Organization } = require('../../models/organization/index')
const { Op } = require("sequelize");


module.exports.Region = async (req, res, next) => {
  //Регион - get(Без параметров)
  try {
    const region = await Nsi.findAll({ where: {level: 1} })

    res.json({status: true, data: region })
  } catch (e) {
    console.log(e);
    return next(ApiError.errorValidations(e))
  }
}


module.exports.Area = async (req, res, next) => {
  //Района по guid
  try {
    let aoGuid = req.body.aoGuid
    let area = await Nsi.findAll({
      where: {parentGuid: aoGuid},
      order: [
        ['level', 'DESC'],
      ],
    })
    area = area.map(item => {
      if(item.level === 3){
        item.name = 'р-н. ' + item.name
      }
      if(item.level === 4){
        item.name = 'г. ' + item.name
      }
      return item
    })
    res.json({status: true, area })
  } catch (e) {
    console.log(e)
    return next(ApiError.errorValidations(e))
  }
}

module.exports.City = async (req, res, next) => {
  //Населеный пункт по guid
  try {
    let aoGuid = req.body.aoGuid
    const city = await Nsi.findAll({ where: {parentGuid: aoGuid, level: [4,6]} })
    const street = await Nsi.findAll({ where: {parentGuid: aoGuid, level: 7} })
    res.json({status: true, city, street })
  } catch (e) {
    console.log(e)
    return next(ApiError.errorValidations(e))
  }
}

module.exports.Street = async (req, res, next) => {
  //Улицы по guid
  try {
    let aoGuid = req.body.aoGuid
    const street = await Nsi.findAll({ where: {parentGuid: aoGuid} })
    res.json({status: true, street })
  } catch (e) {
    console.log(e)
    return next(ApiError.errorValidations(e))
  }
}
module.exports.Home = async (req, res, next) => {
  //Улицы по guid
  try {
    let and = req.body.and,
        or = req.body.or,
        intOffset = req.body.page || 1,
        intLimit = req.body.limit || 10;
    intOffset -= 1
    let house = [];
    if(!or){
      house = await House.findAndCountAll({
        include:[
          {
            model: Organization,
            as: 'managementOrganization',
          }
        ],

        where: {
          [Op.and]: and,
        },
        limit: intLimit,
        offset: intOffset * intLimit,
      })
    }else{
      house = await House.findAndCountAll({
        include:[
          {
            model: Organization,
            as: 'managementOrganization',
          }
        ],
        where: {
          [Op.or]: or,
          [Op.and]: and,
        },
        limit: intLimit,
        offset: intOffset * intLimit,
      })
    }

    res.json({status: true, house })
  } catch (e) {
    console.log(e)
    return next(ApiError.errorValidations(e))
  }
}

module.exports.HomeOne = async (req, res, next) => {
  //Получение дома по guid
  try {
    let data = req.body
    const house = await House.findOne({
      where: data,
      include:[
        {
          model:Types,
          as:'houseTypeId'
        },
        {
          model:Organization,
          as:'managementOrganization'
        },
        {
          model:Organization,
          as:'resourceProvisionOrganizationList'
        }

      ]
    })
    res.json({status: true, house })
  } catch (e) {
    console.log(e)
    return next(ApiError.errorValidations(e))
  }
}

module.exports.searchParams = async (req, res, next) => {
  //Получение домов по параметрам
  try {
    let data = req.body
    const house = await House.findOne({
      include: [{
        model: Types,
      }],

      where: data,
    })
    res.json({status: true, house })
  } catch (e) {
    console.log(e)
    return next(ApiError.errorValidations(e))
  }
}

module.exports.LiveHouse = async (req, res, next) => {
  //Живой поиск дома
  try {
    if(req.body.search == ''){
      return next(ApiError.errorValidations('Пустая строка'))
    }

    let search = req.body.search.split(' ')
    let newSearch = search.map(item => {
      return item = '%' + item + '%'
    })
    const house = await House.findAndCountAll({
      where:{
        formattedAddress: {
          [Op.iLike]: { [Op.all]: newSearch}
        }
      },
      limit: 10
    })
    res.json({status: true, house })
  } catch (e) {
    console.log(e)
    return next(ApiError.errorValidations(e))
  }
}

module.exports.findWhereOrg = async (req, res, next) =>{
  //Поиск адресов по организации

  try {

    let org = req.body.org,
      intOffset = req.body.offset - 1 || 0,
      intLimit = req.body.limit || 10;

    let search = req.body.search.split(' ')
    let newSearch = search.map(item => {
      return item = '%' + item + '%'
    })

    if(org == ''){
      return next(ApiError.errorValidations('Вы не указали организацию'))
    }

    const house = await House.findAndCountAll({
      where:{
        formattedAddress: {
          [Op.iLike]: { [Op.all]: newSearch}
        },
        managementOrganizationId: org
      },
      limit: intLimit,
      offset: intOffset * intLimit,
    })
    res.json({status: true, house })
  } catch (e) {
    console.log();
    return next(ApiError.errorValidations(e))
  }
}
