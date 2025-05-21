const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Quản lý team và thành viên
 */

/**
 * @swagger
 * /api/teams:
 *   post:
 *     summary: Tạo team mới
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Tạo team thành công
 */
router.route('/').post(teamController.createTeam);

/**
 * @swagger
 * /api/teams/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 team
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của team
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin team
 */

/**
 * @swagger
 * /api/teams/{id}:
 *   patch:
 *     summary: Thêm thành viên vào team
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của team
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đã thêm thành viên
 */

/**
 * @swagger
 * /api/teams/{id}:
 *   delete:
 *     summary: Xoá team
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của team
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Xoá thành công
 */
router
  .route('/:id')
  .delete(teamController.deleteTeam)
  .get(teamController.getTeam)
  .patch(teamController.addMember);

/**
 * @swagger
 * /api/teams/user/{id}:
 *   get:
 *     summary: Lấy tất cả các team mà người dùng tham gia
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của người dùng
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách các team
 */
router.get('/user/:id', teamController.getAllTeam);

/**
 * @swagger
 * /api/teams/members/{id}:
 *   patch:
 *     summary: Xoá thành viên khỏi team
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của team
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Xoá thành viên khỏi team thành công
 */
router.patch('/members/:id', teamController.deleteMember);

module.exports = router;