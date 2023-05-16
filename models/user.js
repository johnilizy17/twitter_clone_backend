const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: { type: String, minlength: 8, trim: true, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
