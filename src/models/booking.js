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
  legacyService: { type: Object },
  comment: { type: String },
  odometer: { type: Number },
});

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
