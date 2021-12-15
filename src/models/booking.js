import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
  },
  feedback: { type: Boolean },
  state: { type: String, enum: ["accepted", "rejected", "pending", "complete"] },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  comment: { type: String },
});

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
