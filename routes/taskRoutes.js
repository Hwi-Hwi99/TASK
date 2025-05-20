const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

// Tạo task mới trong 1 team (id team)
router.post('/:id', taskController.createTask);

// Truyền id task
router
  .route('/:id')
  .get(taskController.getTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;