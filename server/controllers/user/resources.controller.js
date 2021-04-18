const { MunicipalResource } = require('../../models/organization/municipalResource')
const bodyParser = require('body-parser');
const ApiError = require('../../handlers/apiError')
const {handlerDataTable} = require('../../handlers/handlerDataApi')


module.exports.postResources = async (req, res, next) => {
  //Создание ресурса
  try {
    const data = req.body['data']

    //Проверка на наличии организции
    const candidate = await MunicipalResource.findOne({ where: {name: data.name} })
    if(candidate){
      return next(ApiError.errorValidations('Такой ресурс уже существует'))
    }

    let resources = await MunicipalResource.create(data)
    resources = handlerDataTable(resources, MunicipalResource.rawAttributes)
    res.json({ data: resources, status: true })
  } catch (e) {
    console.log(e);
    return next(ApiError.errorValidations(e))
  }
}

module.exports.getResources = async (req, res, next) => {
  //Получение списка организаций
  try {
    let resources = await MunicipalResource.findAll({
      attributes: ['id','name', 'municipalResourceName', 'code', 'canLinkWithDevice', 'isDeleted'],
    })
    resources = await handlerDataTable(resources, MunicipalResource.rawAttributes)
    res.json({ data:resources, status: true })
  } catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}

module.exports.getResourc = async (req, res, next) => {
  //Получение данных об одной обрганизации
  try {
    const id = req.query.id
    const resources = await MunicipalResource.findByPk(id);
    res.status(200).json({resources, status: true })
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}

module.exports.putResources = async (req, res, next) => {
  //Обновелние Организации
  try {
    const id = req.query.id
    let resources = req.body

    //Получение пользователя и проверка на существования
    const candidate = await MunicipalResource.findOne({id});
    if(!candidate){
      return next(ApiError.errorValidations('Ресурс не найден'))
    }

    let newCreate = Object.assign(candidate.dataValues, resources);
    await MunicipalResource.update(resources, { where: {
        id:newCreate.id
      }});

    res.status(200).json({status: true })
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}
module.exports.deleteResources = async (req, res, next) => {
  //Удаление организации
  try {
    const id = req.query.id

    //Получение пользователя и проверка на существования
    const candidate = await MunicipalResource.findOne({id});
    if(!candidate){
      return next(ApiError.errorValidations('Ресурс не найден'))
    }
    await MunicipalResource.destroy(
      { where: {
          id:id
        }});

    res.status(200).json({status: true })
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}
