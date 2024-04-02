const {Project} = require('../models/models')

class projectController {
    async create(req, res) {
        const {title, description} = req.body
        const project = await Project.create({title, description})
        return res.json({})
    }
    async get(req, res) {
        const project = req.query
        return res.json(project)
    }

    async getAll(req, res) {
        const projects = await Project.findAll()
        return res.json(projects)
    }

    async delete(req, res) {

    }
}

module.exports = new projectController()