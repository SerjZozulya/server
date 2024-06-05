const Router = require('express')
const router = new Router()
const projectRouter = require('./projectRouter')
const taskRouter = require('./taskRouter')
const userRouter = require('./userRouter')

router.use('/projects', projectRouter)
router.use('/tasks', taskRouter)
router.use('/users', userRouter)

module.exports = router