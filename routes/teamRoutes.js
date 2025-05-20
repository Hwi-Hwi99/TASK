const express = require('express');
const teamController = require('../controllers/teamController');

const router = express.Router();

// Tạo team mới
router.route('/').post(teamController.createTeam);

// Truyền id team
router
  .route('/:id')
  .delete(teamController.deleteTeam)
  .get(teamController.getTeam) ///lấy team của người dùng vừa login
  .patch(teamController.addMember); // Thêm thành viên vào team  với body có id user được đặt tên là userId
router.get('/user/:id', teamController.getAllTeam); // truyền id User

// vẫn là truyền id team nhưng có chữ members với body có id user được đặt tên là userId
router.patch('/members/:id', teamController.deleteMember); // Xoá thành viên khỏi team

module.exports = router;