const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
      ],
    },
    age: { type: Number, min: 20, max: 80 },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    location: String,
  },
  { timestamps: true },
);

// userSchema.pre("save", async function (next) {
//   try {
//     const salt = await bcrypt.genSalt();
//     const User = this;
//     User.password = await bcrypt.hash(User.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });


module.exports = mongoose.model("User", userSchema);
