const Router = require('express')
const projectController = require('../controllers/projectController')
const router = new Router()

router.post('/', projectController.create)
router.get('/:id', projectController.get)
router.get('/', projectController.getAll)
router.delete('/:id', projectController.delete)

module.exports = router