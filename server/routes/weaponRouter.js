const Router = require('express')
const router = new Router()
const weaponController = require('../controllers/weaponController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/' ,checkRole('ADMIN'),weaponController.create)
router.get('/' ,weaponController.getAll)
router.get('/:id' ,weaponController.getOne)


module.exports = router