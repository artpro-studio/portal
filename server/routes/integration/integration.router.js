const { Router } = require('express')
const { ImportData } = require('../../controllers/integration/integration.controller')
const router = Router()

router.post('/integration/nsi/', ImportData) // загрузка nsi


module.exports = router
