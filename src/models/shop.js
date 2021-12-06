import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  specification: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  offeredServices: {
    registered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    notRegistered: [
      {
        //! make it a separate mongoose model
        type: String,
      },
    ],
  },
  rating: {
    type: Number,
    default: 10,
  },
  owner: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    type: String,
  },
  workHistory: {
    //! make it a separate mongoose model
    type: String,
  },
});

const Shop = mongoose.model("Shop", ShopSchema);

export default Shop;
