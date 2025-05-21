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
 * /api/tasks/{teamId}:
 *   post:
 *     summary: Tạo task mới trong team
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         description: ID của team để thêm task
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Thông tin task cần tạo
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
 *                 example: "Task 1"
 *               description:
 *                 type: string
 *                 example: "Mô tả chi tiết task 1"
 *               status:
 *                 type: string
 *                 enum: [Todo, In Progress, Done]
 *                 example: "Todo"
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: "medium"
 *               assignedTo:
 *                 type: string
 *                 description: ID người dùng được giao task
 *                 example: "60c72b2f9b1d8e4567890123"
 *     responses:
 *       201:
 *         description: Tạo task thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Dữ liệu gửi lên không hợp lệ
 */

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   get:
 *     summary: Lấy thông tin chi tiết task theo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID task cần lấy
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin chi tiết task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task không tồn tại
 *   put:
 *     summary: Cập nhật thông tin task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID task cần cập nhật
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Các trường có thể cập nhật của task
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Task 1 cập nhật"
 *               description:
 *                 type: string
 *                 example: "Mô tả chi tiết task 1 cập nhật"
 *               status:
 *                 type: string
 *                 enum: [Todo, In Progress, Done]
 *                 example: "In Progress"
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: "high"
 *               assignedTo:
 *                 type: string
 *                 example: "60c72b2f9b1d8e4567890123"
 *     responses:
 *       200:
 *         description: Cập nhật task thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Dữ liệu gửi lên không hợp lệ
 *       404:
 *         description: Task không tồn tại
 *   delete:
 *     summary: Xoá task theo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID task cần xoá
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Xóa thành công, không trả dữ liệu
 *       404:
 *         description: Task không tồn tại
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của task
 *           example: "60c72b2f9b1d8e4567890123"
 *         title:
 *           type: string
 *           description: Tiêu đề task
 *           example: "Task 1"
 *         description:
 *           type: string
 *           description: Mô tả chi tiết task
 *           example: "Mô tả công việc cần làm"
 *         status:
 *           type: string
 *           enum: [Todo, In Progress, Done]
 *           example: "Todo"
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           example: "medium"
 *         assignedTo:
 *           type: string
 *           description: ID người dùng được giao task
 *           example: "60c72b2f9b1d8e4567890123"
 */

// Tạo task mới trong 1 team (id team)
router.post('/:id', taskController.createTask);

// Truyền id task
router
  .route('/:id')
  .get(taskController.getTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;