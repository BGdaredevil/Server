import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  make: { type: String },
  model: { type: String },
  year: { type: Number },
  odometer: { type: Number },
  imageUrl: { type: String },
  owner: {
    type: String,
  },
  workHistory: { type: Array },
});

const Car = mongoose.model("Car", CarSchema);

export default Car;
