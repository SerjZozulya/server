const Router = require('express')
const tasksController = require('../controllers/tasksController')
const router = new Router()

router.get('/', tasksController.getAll)
router.post('/', tasksController.create)
router.patch('/', tasksController.edit)
router.delete('/', tasksController.delete)

module.exports = router