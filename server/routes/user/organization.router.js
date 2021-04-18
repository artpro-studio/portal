const { Router } = require('express')
const { post, get, deleteOrganization, put, getOrganization, liveSearch } = require('../../controllers/user/organization.controller')
const { postResources, getResources, deleteResources, putResources, getResourc } = require('../../controllers/user/resources.controller')

const router = Router()

router.post('/auth/organization', post) // Cоздание организации
router.get('/auth/organization', get) // Получение списка организаций
router.get('/auth/organization/single', getOrganization) // Получение одной организации
router.put('/auth/organization', put) // Обновление одной организации
router.delete('/auth/organization/', deleteOrganization) // Удаление одной организации


router.post('/auth/organization/resources', postResources) // Cоздание ресурса
router.get('/auth/organization/resources', getResources) // Получение списка ресурссов
router.get('/auth/organization/resources/single', getResourc) // Получение одного ресурса
router.put('/auth/organization/resources', putResources) // Обновление одного ресурса
router.delete('/auth/organization/resources/', deleteResources) // Удаление одного ресурса

router.post('/organization/live-search/', liveSearch) // Живой поиск по организациям


module.exports = router
