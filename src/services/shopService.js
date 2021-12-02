import Shop from "../models/shop.js";

const create = (data) => {
  return Shop.create(data);
};

const getOne = (id) => {
  return Shop.findById(id).lean();
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

const getAllOfType = (type) => {};

const getAllWithService = (service) => {};

const shopService = {
  create,
  getOne,
  getAll,
  edit,
  del,
  getAllOfUser,
  getAllOfType,
  getAllWithService,
};

export default shopService;
