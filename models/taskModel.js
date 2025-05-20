const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Task phải có một cái title'],
    },
    description: {
      type: String,
      required: [true, 'Task phải có một cái mô tả'],
    },
    status: {
      type: String,
      enum: ['Todo', 'In Progress', 'Done'],
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  });

  module.exports = mongoose.model('Task', taskSchema);