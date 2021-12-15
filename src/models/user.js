import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
    // validate: [/^[a-z]+$/i, "Last name must be only letters. No special characters allowed."],
  },
  accountType: {
    type: String,
    enum: ["business", "personal"],
  },
  rating: {
    type: Number,
    default: 10,
  },
  // cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "car" }],
  // shops: [{ type: mongoose.Schema.Types.ObjectId, ref: "shop" }],
});

// UserSchema.pre("save", async function (next) {
//   this.password = await bcrypt.hash(this.password, saltRounds);
//   next();
// });

// UserSchema.method("verifyPass", function (pass) {
//   return bcrypt.compare(pass, this.password);
// });

const User = mongoose.model("User", UserSchema);

export default User;
