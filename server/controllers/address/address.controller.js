const bodyParser = require('body-parser');
const ApiError = require('../../handlers/apiError')
const {handlerDataTable} = require('../../handlers/handlerDataApi')
const { Nsi, Types, House } = require('../../models/house/index')
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
    const area = await Nsi.findAll({ where: {parentGuid: aoGuid} })
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
    let and = req.body.and, or = req.body.or, intOffset = req.body.offset, intLimit = 10;
    let house = [];
    console.log('intOffset', intOffset)
    if(!or){
      house = await House.findAndCountAll({
        where: {
          [Op.and]: and,
        },
        limit: intLimit,
        offset: intOffset,
      })
    }else{
      house = await House.findAndCountAll({
        where: {
          [Op.or]: or,
          [Op.and]: and,
        },
        limit: intLimit,
        offset: intOffset,
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
      return next(ApiError.errorValidations('Пустой массив'))
    }

    let search = req.body.search.split(' ')
    let newSearch = search.map(item => {
      return item = '%' + item + '%'
    })
    console.log(newSearch)
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
