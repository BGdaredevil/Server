import Shop from "../models/shop.js";
import bookingService from "./bookingService.js";

const create = (data) => {
  return Shop.create(data);
};

const getOne = (id) => {
  return Shop.findById(id)
    .populate({
      path: "offeredServices",
      populate: {
        path: "registered",
        model: "Service",
        populate: {
          path: "bookings",
          model: "Car",
        },
      },
    })
    .lean();
};

const getAll = () => {};

const edit = async (id, data) => {
  const shop = await Shop.findById(id);
  shop.offeredServices.notRegistered.push(...data.offeredServices.notRegistered);
  shop.offeredServices.notRegistered = [...new Set(shop.offeredServices.notRegistered)];
  return Shop.findOneAndUpdate(
    { _id: id },
    { ...data, offeredServices: shop.offeredServices },
    { runValidators: true }
  );
};

const vote = async (bookingId, shopId, keyWord) => {
  const booking = await bookingService.getFeedbackStatus(bookingId);
  if (!booking.feedback) {
    let res = await bookingService.edit(bookingId, { feedback: true });
    let voters = await bookingService.countVoted(bookingId, shopId);
    let shop = await Shop.findById(shopId);
    if (keyWord === "upvote") {
      shop.rating += 1;
    }
    shop.rating = (shop.rating / (voters + 10)) * 10;

    await Shop.findByIdAndUpdate(shopId, shop, { runValidators: true, new: true });
  }
  return bookingService.getOneFullLean(bookingId);
};

const remService = async (shopId, serviceId) => {
  const shop = await Shop.findById(shopId);
  shop.offeredServices.registered = shop.offeredServices.registered.filter(
    (e) => e._id.toString() !== serviceId
  );
  return Shop.findOneAndUpdate(
    { _id: shopId },
    { ...shop, offeredServices: shop.offeredServices },
    { runValidators: true, new: true }
  ).populate({
    path: "offeredServices",
    populate: {
      path: "registered",
      model: "Service",
      populate: {
        path: "bookings",
        model: "Car",
      },
    },
  });
};

const remSimpleService = async (shopId, { item }) => {
  const shop = await Shop.findById(shopId);
  shop.offeredServices.notRegistered = shop.offeredServices.notRegistered.filter((e) => e !== item);
  return Shop.findOneAndUpdate(
    { _id: shopId },
    { ...shop, offeredServices: shop.offeredServices },
    { runValidators: true, new: true }
  ).populate({
    path: "offeredServices",
    populate: {
      path: "registered",
      model: "Service",
      populate: {
        path: "bookings",
        model: "Car",
      },
    },
  });
};

const del = (id) => {
  return Shop.findByIdAndDelete(id);
};

const getAllOfUser = (uid) => {
  return Shop.find({ owner: uid })
    .populate({
      path: "offeredServices",
      model: "Shop",
      populate: "registered",
    })
    .lean();
};

const getAllOfType = (type) => {
  const types = {
    body: "bodyShop",
    mechanics: "mechanicShop",
    performance: "performanceShop",
  };

  return Shop.find({ specification: types[type] })
    .populate({
      path: "offeredServices",
      model: "Shop",
      populate: "registered",
    })
    .lean();
};

const getAllWithService = (service) => {};

const regService = async (shopId, service) => {
  const shop = await Shop.findById(shopId);
  shop.offeredServices.registered.push(service._id);
  shop.offeredServices.notRegistered = shop.offeredServices.notRegistered.filter(
    (x) => x !== service.name
  );
  await shop.updateOne({ $set: { offeredServices: shop.offeredServices } });
  return getOne(shopId);
};

const shopService = {
  create,
  getOne,
  getAll,
  edit,
  del,
  getAllOfUser,
  getAllOfType,
  getAllWithService,
  regService,
  remService,
  remSimpleService,
  vote,
};

export default shopService;
