import mongoose from "mongoose";

const user = mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", user);
export { User };
