import User from "../models/user.js";

const create = (data) => {
  return User.create(data);
};

const getUserByUid = (uid) => {
  return User.findOne({ firebaseUid: uid });
};

const userService = { getUserByUid, create };

export default userService;
