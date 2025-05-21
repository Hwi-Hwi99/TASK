const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Quản lý công việc trong team
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   post:
 *     summary: Tạo task mới trong team
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của team
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Todo, In Progress, Done]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               assignedTo:
 *                 type: string
 *                 description: ID user
 *     responses:
 *       201:
 *         description: Tạo task thành công
 */
router.post('/:id', taskController.createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Lấy chi tiết một task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID task
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết task
 *
 *   put:
 *     summary: Cập nhật task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID task
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *               assignedTo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật task thành công
 *
 *   delete:
 *     summary: Xoá task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID task
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xoá task thành công
 */
router
  .route('/:id')
  .get(taskController.getTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;