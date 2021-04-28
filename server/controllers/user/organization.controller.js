const { MunicipalResource } = require ("../../models/organization/municipalResource");

const { Organization } = require('../../models/organization/index')
const { Nsi, Types, House } = require('../../models/house/index')
const bodyParser = require('body-parser');
const ApiError = require('../../handlers/apiError')
const {handlerDataTable} = require('../../handlers/handlerDataApi')
const { sendMailer } = require('../../handlers/nodeMailer')
const { Op } = require("sequelize");

module.exports.post = async (req, res, next) => {
  //Создание организации
  try {
    const data = req.body['data']

    //Проверка на наличии организции
    const candidate = await Organization.findOne({ where: {fullName: data.fullName} })
    if(candidate){
      return next(ApiError.errorValidations('Такая организация уже существует'))
    }

    let organization = await Organization.create(data)
    organization = handlerDataTable(organization, Organization.rawAttributes)
    res.json({ data: organization, status: true })
  } catch (e) {
    console.log(e);
    return next(ApiError.errorValidations(e))
  }
}

module.exports.get = async (req, res, next) => {
  //Получение списка организаций
  try {
    let organization = await Organization.findAll({
      attributes: ['id','shortName','inn', 'url', 'email']
    })

    let resources = await MunicipalResource.findAll({
      attributes:['id', 'name', 'code']
    })

    organization = await handlerDataTable(organization, Organization.rawAttributes)
    res.json({ data:organization, resources, status: true })
  } catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}

module.exports.searchOrganization = async (req, res, next) => {
  //Получение списка организаций c пагниацией и поиском
  try {
    let search = req.body.search.split(' ')
    let offsetData = req.body.offset ? req.body.offset * 10 : 0
    let newSearch = search.map(item => {
      return item = '%' + item + '%'
    })
    let filter = {} // Cобираем фильтр
    if(search != ""){
      filter = {
        fullName: {
          [Op.iLike]: { [Op.all]: newSearch}
        }
      }
    }
    let organization = await Organization.findAndCountAll({
      where:{
        ...filter
      },
      attributes: ['id','shortName','inn', 'url', 'email', 'orgAddress'],
      limit: 20,
      offset: offsetData,
      include: // MunicipalResource
        [
        {
          model: MunicipalResource,
          as:'municipalResource',
          attributes:['id', 'name', 'municipalResourceName']  // включаем столбец name из таблицы teams
        }
      ]
    })

    let resources = await MunicipalResource.findAll({
      attributes:['id', 'municipalResourceName', 'code']
    })

    res.json({ data:organization, resources, status: true })
  } catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}

module.exports.getOrganization = async (req, res, next) => {
  //Получение данных об одной обрганизации
  try {
    const id = req.query.id

    const organization = await Organization.findByPk(id, {
      attributes:['id', 'shortName', 'fullName', 'inn', 'kpp', 'ogrn','url', 'email'],
      include: [{
        model: MunicipalResource,
        attributes:['id', 'name', 'code']  // включаем столбец name из таблицы teams
      }]
    });

    let resources = await MunicipalResource.findAll({
      attributes:['id', 'name', 'code']
    })

    res.status(200).json({organization, resources, status: true })
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}

module.exports.put = async (req, res, next) => {
  //Обновелние Организации
  try {
    const id = req.query.id
    let organization = req.body

    //Получение пользователя и проверка на существования
    const candidate = await Organization.findOne({id});
    if(!candidate){
      return next(ApiError.errorValidations('Организация не найден'))
    }

    let newCreate = Object.assign(candidate.dataValues, organization);
    await Organization.update(organization, { where: {
        id:newCreate.id
      }});

    res.status(200).json({status: true })
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}
module.exports.deleteOrganization = async (req, res, next) => {
  //Удаление организации
  try {
    const id = req.query.id

    //Получение пользователя и проверка на существования
    const candidate = await Organization.findOne({id});
    if(!candidate){
      return next(ApiError.errorValidations('Организация не найден'))
    }
    await Organization.destroy(
      { where: {
          id:id
        }});

    res.status(200).json({status: true })
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}

module.exports.liveSearch = async (req, res, next) => {
  //Живой поиск по огранизациям
  try {
    if(req.body.search == ''){
      return next(ApiError.errorValidations('Пустой массив'))
    }

    let search = req.body.search.split(' ')
    let newSearch = search.map(item => {
      return item = '%' + item + '%'
    })
    const organizations= await Organization.findAndCountAll({
      where:{
        fullName: {
          [Op.iLike]: { [Op.all]: newSearch}
        }
      },
      limit: 10
    })
    res.json({status: true, data: organizations })
  } catch (e) {
    console.log(e)
    return next(ApiError.errorValidations(e))
  }
  return next(ApiError.errorValidations('Ошибка'))
}

module.exports.getOrganizationGUID = async (req, res, next) => {
  //Получение данных об одной обрганизации по GUID
  try {
    let data = req.body

    const organization = await Organization.findOne({
      where: data,
    })

    let resources = await MunicipalResource.findAll({
      attributes:['id', 'name', 'code']
    })

    res.status(200).json({organization, resources, status: true })
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}

module.exports.searchOrganizationParams = async (req, res, next) => {
  try {
    let and = req.body.and
    let or = req.body.or
    const organizations= await Organization.findAndCountAll({
      include: [
{
        model: House,
        as: 'managementOrganization',
        where: {
          [Op.or]: or,
          [Op.and]: and
        }
      }, 
{
        model: House,
        as: 'municipulOrganization',
        where: {
          [Op.or]: or,
          [Op.and]: and
        }
      }
] 
    })
    // column House.OrganizationId does not exist

    res.status(200).json({status: true , organizations})
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}
