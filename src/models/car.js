import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  year: {
    type: Number,
  },
  odometer: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  owner: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    type: String,
  },
  workHistory: [
    {
      //! make it a separate mongoose model
      type: String,
    },
  ],
});

const Car = mongoose.model("Car", CarSchema);

export default Car;
