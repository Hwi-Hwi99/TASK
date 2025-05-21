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
 *   get:
 *     summary: Lấy tất cả các team
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Danh sách tất cả team
 */
router.get('/', teamController.getAllTeam);

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
router.post('/', teamController.createTeam);

module.exports = router;