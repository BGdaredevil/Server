import Service from "../models/service.js";
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
          model: "Booking",
          populate: { path: "car", model: "Car" },
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
    let voters = await bookingService.countVoted(shopId);
    let shop = await Shop.findById(shopId);
    if (keyWord === "upvote") {
      shop.likes += 1;
    } else {
      shop.likes -= 2;
    }
    shop.rating = (shop.likes / (voters + 10)) * 10;

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
        model: "Booking",
        populate: { path: "car", model: "Car" },
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
        model: "Booking",
        populate: { path: "car", model: "Car" },
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

const getBestThree = () => {
  return Shop.find({})
    .where("likes")
    .gt(10)
    .sort({ rating: -1 })
    .limit(3)
    .populate({
      path: "offeredServices",
      model: "Shop",
      populate: "registered",
    })
    .lean();
};

const getAllWithService = async (service) => {
  let tt = (
    await Service.find({ name: { $regex: service, $options: "i" } })
      .select({ offeringShop: 1, _id: 0 })
      .lean()
  ).reduce((a, e) => {
    a.push(e.offeringShop);
    return a;
  }, []);

  return Shop.find({ _id: { $in: tt } })
    .populate({
      path: "offeredServices",
      model: "Shop",
      populate: "registered",
    })
    .sort({ rating: -1 })
    .lean();
};

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
  getBestThree,
};

export default shopService;
