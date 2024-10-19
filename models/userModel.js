const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role_id: {
    type: String,
    default: "user",
    enum: ["user", "admin", "Sadmin"],
  },
  resetPasswordToken:String,
  resetPasswordExpires:Date
});

module.exports = mongoose.model('User', userSchema);
