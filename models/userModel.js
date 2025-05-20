const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} không phải là số điện thoại hợp lệ!`,
    },
  },
  fullname: {
    type: String,
    required: [true, 'Người dùng phải có tên'],
  },
  email: {
    type: String,
    required: [true, 'Người dùng phải có email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Email không hợp lệ',
    ],
  },
  password: {
    type: String,
    required: [true, 'Người dùng phải có mật khẩu'],
    minlength: 8,
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);