const { Router } = require('express')
const { Region, Area, City, Street, Home, HomeOne, LiveHouse, searchParams, findWhereOrg } = require('../../controllers/address/address.controller')
const router = Router()

router.get('/region/', Region) // Получение региона
router.post('/area/', Area) // Получение определного района(по guid)
router.post('/city/', City) // Получение определного населеного пункта(по guid)
router.post('/street/', Street) // Получение определного улицы(по guid)
router.post('/Home/', Home) // Получение дома (region, area,settlement,street)
router.post('/house-one/', HomeOne) // Получение дома по guid
router.post('/live-house/', LiveHouse) // Живой поиск дома
router.post('/search-params/', searchParams) // Поиск по параметрам
router.post('/search-house-org/', findWhereOrg) // Поиск домов по организации


module.exports = router
