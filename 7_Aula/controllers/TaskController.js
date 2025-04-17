const Task = require('../models/Task');

class TaskController {
  static showTask(req, res) {
    res.render('tasks/all');
  };

  static createTask(req, res) {
    res.render('tasks/create');
  };

  static async createTaskSave(req, res) {
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    };

    await Task.create(task);
    res.redirect('/tasks');
  }
};

module.exports = TaskController;