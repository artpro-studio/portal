const { MunicipalResource } = require ("../../models/organization/municipalResource");
const Sequelize1 = require('sequelize')
const sequelize = require('../../utils/database')
const { Organization, Chart } = require('../../models/organization/index')
const { Nsi, Types, House } = require('../../models/house/index')
const bodyParser = require('body-parser');
const ApiError = require('../../handlers/apiError')
const { Sequelize, QueryTypes, Op } = require("sequelize");
const { handlerDataTable } = require('../../handlers/handlerDataApi')
const { sendMailer } = require('../../handlers/nodeMailer')
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
    let ids = req.body.ids
    let offsetData = req.body.offset ? req.body.offset * 10 : 0
    let newSearch = search.map(item => {
      return item = '%' + item + '%'
    })
    let whereObj = {}
    if(ids.length > 0){
      whereObj = {
        id: ids
      }
    }

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
        ...filter,
        ...whereObj
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
      return next(ApiError.errorValidations('Пустая строка'))
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

    let organization = await Organization.findOne({
      where: data
    })
    const charts = await Chart.findAll({
      where: {
        chartOrganizationId: organization.id
      },
      order:[
        ['dayOfWeek', 'ASC'],
      ]
    })
    organization = JSON.parse(JSON.stringify(organization))
    organization['ReceptionHours'] = charts.filter(item => item.type === 'ReceptionHours');
    organization.OpeningHours = charts.filter(item => item.type === 'OpeningHours');

    let resources = await MunicipalResource.findAll({
      attributes:['id', 'name', 'code']
    })

    res.status(200).json({organization, resources,  status: true })
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}

module.exports.searchOrganizationParams = async (req, res, next) => {
  try {
    let and = req.body.and,
        or = req.body.or,
        intOffset = (req.body.page || 0) * 10,
        intLimit = 10;

    let query_template = {}


    if (and != undefined) {
      query_template[Op.and] = and
    }

    if (or != undefined) {
      query_template[Op.or] = or
    }
    //Получение домов
    // let queryRegion = and.region === undefined ? ''  : and.region
    // let querySettlement = and.settlement === undefined ? 'manage.settlement=' + and.settlement : true
    // let queryStreet = and.street === undefined ? '' : and.street
    //
    // let queryArea = or[0].area === undefined ? 'manage.area=' + or[0].area : true
    // let queryCity = or[1].city === undefined ? 'manage.street=' + or[1].city : true


    const count_organizations = await sequelize.query(
      `
        SELECT count(distinct org.id)
        FROM public."Organizations" as org
            LEFT JOIN public."Houses" as manage
                on org.id = manage."managementOrganizationId"
                and (
                     ${and.region === undefined ? '' : 'manage.region=' + and.region }
                     ${and.street === undefined ? '' : ' AND  manage.street=' + and.street }
                     ${and.settlement === undefined ? '' : 'AND manage.settlement=' + and.settlement }
                     ${!or ? '' : 'and ( manage.area=' + or[0].area + 'OR  manage.city=' + or[1].city + ')'}

                )
            LEFT JOIN public."Houses" as munic
                on org.id = munic."municipalityOrganizationId"
                and (

                     ${and.region === undefined ? '' : 'munic.region=' + and.region }
                     ${and.street === undefined ? '' : ' AND  munic.street=' + and.street }
                     ${and.settlement === undefined ? '' : 'AND munic.settlement=' + and.settlement }
                     ${!or ? '' : 'and ( munic.area=' + or[0].area + 'OR  munic.city=' + or[1].city + ')'}

                )
            LEFT JOIN public."House_Organization" as source
                on org.id = source."OrganizationId"
            LEFT JOIN public."Houses" as resource
                on resource.id = source."HouseId"
                and (
                     ${and.region === undefined ? '' : 'resource.region=' + and.region }
                     ${and.street === undefined ? '' : ' AND  resource.street=' + and.street }
                     ${and.settlement === undefined ? '' : 'AND resource.settlement=' + and.settlement }
                     ${!or ? '' : 'and ( resource.area=' + or[0].area + 'OR  resource.city=' + or[1].city + ')'}
                )
        where manage.id is not null
          or munic.id is not null
          or resource.id is not null
      `,

      {
        type: QueryTypes.SELECT,
        model: Organization,
      }
      );

    const organizations = await sequelize.query(
        `
        SELECT distinct org."id", org."guid", org."fullName", org."phone", org."email", org."url"
        FROM public."Organizations" as org
            LEFT JOIN public."Houses" as manage
                on org.id = manage."managementOrganizationId"
                and (
                     ${and.region === undefined ? '' : 'manage.region=' + and.region }
                     ${and.street === undefined ? '' : ' AND  manage.street=' + and.street }
                     ${and.settlement === undefined ? '' : 'AND manage.settlement=' + and.settlement }
                     ${!or ? '' : 'and ( manage.area=' + or[0].area + 'OR  manage.city=' + or[1].city + ')'}

                )
            LEFT JOIN public."Houses" as munic
                on org.id = munic."municipalityOrganizationId"
                and (

                     ${and.region === undefined ? '' : 'munic.region=' + and.region }
                     ${and.street === undefined ? '' : ' AND  munic.street=' + and.street }
                     ${and.settlement === undefined ? '' : 'AND munic.settlement=' + and.settlement }
                     ${!or ? '' : 'and ( munic.area=' + or[0].area + 'OR  munic.city=' + or[1].city + ')'}

                )
            LEFT JOIN public."House_Organization" as source
                on org.id = source."OrganizationId"
            LEFT JOIN public."Houses" as resource
                on resource.id = source."HouseId"
                and (
                     ${and.region === undefined ? '' : 'resource.region=' + and.region }
                     ${and.street === undefined ? '' : ' AND  resource.street=' + and.street }
                     ${and.settlement === undefined ? '' : 'AND resource.settlement=' + and.settlement }
                     ${!or ? '' : 'and ( resource.area=' + or[0].area + 'OR  resource.city=' + or[1].city + ')'}
                )
        where manage.id is not null
          or munic.id is not null
          or resource.id is not null
        OFFSET ${intOffset} LIMIT ${intLimit}
      `,

      {
      type: QueryTypes.SELECT,
      model: Organization,
    });


    res.status(200).json({
      status: true,
      organizations:{
        count: count_organizations[0].dataValues.count,
        rows: organizations
      }
    })
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}
