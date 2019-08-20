import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { convertDateToISO } from "shared/helpers";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  events: { type: Number, default: 0 },
  role: { type: String, default: "employee" },
  status: { type: String, default: "active" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  registered: { type: Date, default: convertDateToISO(Date.now()) },
  schedule: [{ type: Schema.Types.ObjectId, ref: "Schedule" }],
  token: { type: String, unique: true },
  timesAvailable: Number,
  timesUnavailable: Number,
});

userSchema.statics.createUser = function newUser(user) {
  return this.create(user);
};

// // Generate a salt, password, then run callback
userSchema.statics.createPassword = async function createNewPassword(password) {
  const salt = await bcrypt.genSalt(12);
  const newPassword = await bcrypt.hash(password, salt, null);
  return newPassword;
};

// Set a compare password method on the model
userSchema.methods.comparePassword = async function compareNewPassword(
  incomingPassword,
) {
  const isMatch = await bcrypt.compare(incomingPassword, this.password);
  return isMatch;
};

export default model("User", userSchema);
