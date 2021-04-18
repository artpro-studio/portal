const {Role} = require('../../models/user/auth')
const bodyParser = require('body-parser');
const ApiError = require('../../handlers/apiError')
const {handlerDataTable} = require('../../handlers/handlerDataApi')


module.exports.post = async (req, res, next) => {
  //Создание роли
  try {
    const {code, name} = req.body

    //Проверка на наличии роли
    const candidate = await Role.findOne({ where: {code} })
    if(candidate){
      return next(ApiError.errorValidations('Такая роль уже существует'))
    }

    let role = await Role.create({code, name})
    role = handlerDataTable(role, Role.rawAttributes)
    res.json({ data: role, status: true })
  } catch (e) {
    console.log(e);
    return next(ApiError.errorValidations(e))
  }
}


module.exports.get = async (req, res, next) => {
  //Получение списка ролей
  try {
    let role = await Role.findAll({
      attributes: ['id','code','name'],
    })
    role = await handlerDataTable(role, Role.rawAttributes)
    res.json({ role, status: true })
  } catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}

module.exports.getRole = async (req, res, next) => {
  //Получение данных об одной роле
  try {
    const id = req.query.id
    const role = await Role.findByPk(id,{
      attributes: ['id','code','name']
    });
    res.status(200).json({role, status: true })
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}

module.exports.put = async (req, res, next) => {
  //Обновелние Роли
  try {
    const id = req.query.id
    let role = req.body

    //Получение пользователя и проверка на существования
    const candidate = await Role.findOne({id});
    if(!candidate){
      return next(ApiError.errorValidations('Пользователь не найден'))
    }

    let newCreate = Object.assign(candidate.dataValues, role);
    await Role.update({
      code: newCreate.code,
      name: newCreate.name,
    }, { where: {
        id:newCreate.id
      }});

    res.status(200).json({status: true })
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}
module.exports.deleteRole = async (req, res, next) => {
  //Удаление данных роли
  try {
    const id = req.query.id

    //Получение пользователя и проверка на существования
    const candidate = await Role.findOne({id});
    if(!candidate){
      return next(ApiError.errorValidations('Пользователь не найден'))
    }
    await Role.destroy(
      { where: {
          id:id
        }});

    res.status(200).json({status: true })
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}
