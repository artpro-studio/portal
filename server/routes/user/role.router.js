const { Router } = require('express')
const { post, get, deleteRole, put, getRole } = require('../../controllers/user/role.controller')
const router = Router()

router.post('/auth/role', post) // Cоздание роли
router.get('/auth/role', get) // Получение списка ролей
router.get('/auth/role/single', getRole) // Получение одной роли
router.put('/auth/role', put) // Обновление одной роли
router.delete('/auth/role/', deleteRole) // Удаление одной роли


module.exports = router
