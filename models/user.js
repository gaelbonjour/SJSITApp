import mongoosePaginate from "mongoose-paginate-v2";
import { Schema, model } from "mongoose";
import moment from "moment";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  role: { type: String, default: "employee" },
  status: { type: String, default: "active" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  registered: {
    type: Date,
    default: moment(Date.now())
      .utcOffset(-7)
      .toISOString(true),
  },
  token: { type: String, unique: true },
  timesAvailable: Number,
  timesUnavailable: Number,
});

userSchema.plugin(mongoosePaginate);

userSchema.statics.createUser = function newUser(user) {
  return this.create(user);
};

// Generate a salt, password, then run callback
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
