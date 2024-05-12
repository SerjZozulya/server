const { Task } = require("../models/models");

class taskController {
  async create(req, res) {
    const {
      summary,
      description,
      type,
      status,
      reporterId,
      assigneeId,
      projectId,
    } = req.body;

    const task = await Task.create({
      summary,
      description,
      type,
      status,
      reporterId,
      assigneeId,
      projectId,
    });
    return res.json(task);
  }

  async get(req, res) {
    const { id } = req.params;
    const task = await Task.findOne({
      where: { id },
    });
    return res.json(task);
  }

  async getAll(req, res) {
    const { projectId } = req.query;
    let tasks;
    tasks = await Task.findAll({ where: { projectId } });
    return res.json(tasks);
  }

  async delete(req, res) {
    const { id } = req.body;
    const deletedRows = await Task.destroy({
      where: { id },
    });
    return res.json(deletedRows);
  }

  async edit(req, res) {
    const {
      id,
      summary,
      description,
      type,
      status,
      reporterId,
      assigneeId,
      projectId,
    } = req.body;

    const updatedRows = await Task.update(
      {
        summary,
        description,
        type,
        status,
        reporterId,
        assigneeId,
        projectId,
      },
      {
        where: { id },
      }
    );
    return res.json(updatedRows);
  }
}

module.exports = new taskController();
