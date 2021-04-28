const { Router } = require('express')
const { ImportData, ImportBindingData } = require('../../controllers/integration/integration.controller')
const router = Router()

router.post('/integration/nsi/', ImportData) // загрузка nsi
router.post('/integration/bind/', ImportBindingData) // загрузка nsi


module.exports = router
