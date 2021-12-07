import Shop from "../models/shop.js";

const create = (data) => {
  return Shop.create(data);
};

const getOne = (id) => {
  return Shop.findById(id)
    .populate({
      path: "offeredServices",
      model: "Shop",
      populate: "registered",
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

const del = (id) => {
  return Shop.findByIdAndDelete(id);
};

const getAllOfUser = (uid) => {
  return Shop.find({ owner: uid }).lean();
};

const getAllOfType = (type) => {
  const types = {
    body: "bodyShop",
    mechanics: "mechanicShop",
    performance: "performanceShop",
  };

  return Shop.find({ specification: types[type] });
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
};

export default shopService;
