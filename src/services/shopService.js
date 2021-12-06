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

const edit = (id, data) => {
  return Shop.findOneAndUpdate({ _id: id }, data, { runValidators: true });
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
  return shop.updateOne({ $set: { offeredServices: shop.offeredServices } });
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
