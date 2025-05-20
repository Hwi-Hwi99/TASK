const Team = require('../models/teamModel');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

// Tạo team mới
const createTeam = async (req, res) => {
  try {
    const { name, members = [] } = req.body;

    const newTeam = await Team.create({ name, members });

    // Thêm teamId vào từng user
    await User.updateMany(
      { _id: { $in: members } },
      { $addToSet: { teams: newTeam._id } },
    );

    res.status(201).json({ status: 'success', data: newTeam });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Thêm thành viên vào team
const addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: userId } },
      { new: true },
    ).lean();

    if (!team)
      return res
        .status(404)
        .json({ status: 'fail', message: 'Team không tồn tại' });

    // Thêm teamId vào user
    await User.findByIdAndUpdate(userId, {
      $addToSet: { teams: team._id },
    });

    res.status(200).json({ status: 'success', data: team });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Xoá thành viên khỏi team
const deleteMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: userId } },
      { new: true },
    ).lean();

    if (!team)
      return res
        .status(404)
        .json({ status: 'fail', message: 'Team không tồn tại' });

    // Xoá teamId khỏi user
    await User.findByIdAndUpdate(userId, {
      $pull: { teams: team._id },
    });

    res.status(200).json({ status: 'success', data: team });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Xoá team
const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team)
      return res
        .status(404)
        .json({ status: 'fail', message: 'Team không tồn tại' });

    // Xoá teamId khỏi tất cả user đã có team đó
    await User.updateMany({ teams: team._id }, { $pull: { teams: team._id } });

    res
      .status(200)
      .json({ status: 'success', message: 'Đã xoá team thành công' });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Lấy tất cả team mà người dùng đang tham gia
const getAllTeam = async (req, res) => {
  try {
    const userId = req.params.id;

    const teams = await Team.find({ members: userId })
      .populate('members')
      .populate('tasks');

    res.status(200).json({ status: 'success', data: teams });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Lấy chi tiết 1 team
const getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('members')
      .populate('tasks');
    if (!team)
      return res
        .status(404)
        .json({ status: 'fail', message: 'Không tìm thấy team' });

    res.status(200).json({ status: 'success', data: team });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

module.exports = {
  createTeam,
  deleteTeam,
  addMember,
  deleteMember,
  getAllTeam,
  getTeam,
};