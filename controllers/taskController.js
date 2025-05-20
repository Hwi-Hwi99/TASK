const Task = require('../models/taskModel');

// Tạo task cho team
const createTask = async (req, res) => {
    try {
      const { title, description, status, priority, assignedTo } = req.body;
      const team = await Team.findById(req.params.id);
      if (!team)
        return res
          .status(404)
          .json({ status: 'fail', message: 'Team không tồn tại' });
  
      const newTask = await Task.create({
        title,
        description,
        status,
        priority,
        assignedTo,
      });
      team.tasks.push(newTask._id);
      await team.save();
  
      res.status(201).json({ status: 'success', data: newTask });
    } catch (err) {
      res.status(400).json({ status: 'fail', message: err.message });
    }
  };
  
  // Xoá task
  const deleteTask = async (req, res) => {
    try {
      const { id: teamId, taskId } = req.params;
  
      const team = await Team.findById(teamId);
      if (!team)
        return res
          .status(404)
          .json({ status: 'fail', message: 'Team không tồn tại' });
  
      await Task.findByIdAndDelete(taskId);
  
      team.tasks.pull(taskId);
      await team.save();
  
      res.status(200).json({ status: 'success', message: 'Xoá task thành công' });
    } catch (err) {
      res.status(400).json({ status: 'fail', message: err.message });
    }
  };
  
  // Cập nhật task
  const updateTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
        new: true,
      });
      if (!task)
        return res
          .status(404)
          .json({ status: 'fail', message: 'Task không tồn tại' });
  
      res.status(200).json({ status: 'success', data: task });
    } catch (err) {
      res.status(400).json({ status: 'fail', message: err.message });
    }
  };
  
  // Lấy 1 task
  const getTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.taskId).populate('assignedTo');
      if (!task)
        return res
          .status(404)
          .json({ status: 'fail', message: 'Task không tồn tại' });
  
      res.status(200).json({ status: 'success', data: task });
    } catch (err) {
      res.status(400).json({ status: 'fail', message: err.message });
    }
  };
  
  module.exports = { createTask, deleteTask, updateTask, getTask };