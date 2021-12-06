import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  offeringShop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
  },
});

const Service = mongoose.model("Service", ServiceSchema);

export default Service;
