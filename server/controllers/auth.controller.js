const {User, Role} = require('../models/user/auth')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../handlers/apiError')
const {handlerDataTable} = require('../handlers/handlerDataApi')
let config = require('../../nuxt.config.js')


module.exports.postToken = async (req, res, next) => {
  //Авторизация
  try {
    const {login, password} = req.body

    //Проверка на наличия пользеователя
    const candidate = await User.findOne(
      { attributes: ['id','login','firstName','lastName'],
        include: [{
          model: Role,
          attributes:['id', 'name', 'code']  // включаем столбец name из таблицы teams
        }],
        where: {login}
      });
    if(!candidate){
      res.status(200).json({ status: false })
      return false;
    }
    console.log(Math.floor(new Date().getTime()))
    const token = jwt.sign({ login, id: candidate.id, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, config.env.apiJWT);

    res.json({ token, user: candidate, status: true })
  } catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}

module.exports.getToken = async (req, res, next) => {
  //Авторизация по токену
  try {
    const token = req.headers. authorization.split(' ')[1]

    if(!token){
      return next(ApiError.errorValidations('Не авторизованы'))
    }
    console.log(token)
    const decoded = jwt.verify(token, config.env.apiJWT)
    console.log(decoded)


    //Проверка на наличия пользеователя
    const candidate = await User.findOne({
      attributes: ['id','login','firstName','lastName'],
      include: [{
        model: Role,
        attributes:['id', 'name', 'code']  // включаем столбец name из таблицы teams
      }],
      where: {login: decoded.login} });
    if(!candidate){
      res.status(200).json({ status: false })
      return false;
    }

    res.json({ user: candidate, status: true })
  } catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}


module.exports.post = async (req, res, next) => {
  //Регистрация и создание
  try {
    const {firstName, lastName, login, password, Role} = req.body
    const hashPassword = await bcrypt.hash(password, 10)

    //Проверка на наличии польователя с таким же логином
    const candidate = await User.findOne({ where: {login} })
    if(candidate){
      return next(ApiError.errorValidations('Такой пользователь уже зарегестрирован'))
    }

    let user = await User.create({firstName, lastName, login, password : hashPassword, RoleId:Role })
    user = handlerDataTable(user, User.rawAttributes)
    res.json({ data: user, status: true })
  } catch (e) {
    console.log(e);
    return next(ApiError.errorValidations(e))
  }
}


module.exports.get = async (req, res, next) => {
  //Получение списка пользователей
  try {
    let users = await User.findAll({
      attributes: ['id','login','firstName','lastName'],
      include: [{
        model: Role,
        attributes:['name']  // включаем столбец name из таблицы teams
      }]
    })

    //Список ролей
    let role = await Role.findAll({
      attributes: ['id','code','name'],
    })

    users = await handlerDataTable(users, User.rawAttributes)
    res.json({ users, role, status: true })
  } catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}

module.exports.getUser = async (req, res, next) => {
  //Получение данных об одном пользователе
  try {
    const id = req.query.id

    //Список ролей
    let role = await Role.findAll({
      attributes: ['id','code','name'],
    })

    const user = await User.findByPk(id,{
      attributes: ['id','login','firstName','lastName'],
      include: [{
        model: Role,
        attributes:['id', 'name']  // включаем столбец name из таблицы teams
      }]
    });

    res.status(200).json({user, role, status: true })
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}

module.exports.putUser = async (req, res, next) => {
  //Обновелние данных об одном пользователе
  try {
    const id = req.query.id
    let user = req.body

    //Получение пользователя и проверка на существования
    const candidate = await User.findOne({id});
    if(!candidate){
      return next(ApiError.errorValidations('Пользователь не найден'))
    }

    let newCreate = Object.assign(candidate.dataValues, user);
    await User.update({
      login: newCreate.login,
      lastName: newCreate.lastName,
      firstName: newCreate.firstName,
    }, { where: {
        id:newCreate.id
      }});

    res.status(200).json({user, status: true })
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}
module.exports.deleteUser = async (req, res, next) => {
  //Обновелние данных об одном пользователе
  try {
    const id = req.query.id

    //Получение пользователя и проверка на существования
    const candidate = await User.findOne({id});
    if(!candidate){
      return next(ApiError.errorValidations('Пользователь не найден'))
    }
    await User.destroy(
      { where: {
        id:id
      }});

    res.status(200).json({status: true })
  }catch (e) {
    console.log(e)
    return next(ApiError.errorValidations('Ошибка'))
  }
}
