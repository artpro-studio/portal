const { Router } = require('express')
const { get, post, postToken, getToken, getUser, putUser, deleteUser } = require('../controllers/auth.controller')
const router = Router()

router.post('/auth', post) // Cоздание пользователя
router.get('/auth', get) // Получение списка пользователй
router.get('/auth/user', getUser) // Получение одного пользотвателя
router.put('/auth/user', putUser) // Обновление одного пользотвателя
router.delete('/auth/user/', deleteUser) // Обновление одного пользотвателя


router.post('/auth/token', postToken) // Авторизация
router.get('/auth/token', getToken) // Авторизация по токену

module.exports = router
