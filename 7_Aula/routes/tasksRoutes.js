const express = require('express');

const router = express.Router();

const TaskController = require('../controllers/TaskController');

router.get('/', TaskController.showTask);

router.get('/add', TaskController.createTask);
router.get('/edit/:id', TaskController.updateTask);

router.post('/add', TaskController.createTaskSave);
router.post('/remove', TaskController.removeTask);
router.post('/edit', TaskController.updateTaskPost);
router.post('/updatestatus', TaskController.toggleTaskStatus);

module.exports = router;