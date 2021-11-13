import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  location: {
    type: String,
  },
  specification: {
    type: String,
  },
  offeredServices: {
    //! make it a separate mongoose model
    type: String,
  },
  rating: {
    type: Number,
    default: 10,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  workHistory: {
    //! make it a separate mongoose model
    type: String,
  },
});

const Shop = mongoose.model("Shop", ShopSchema);

export default Shop;
