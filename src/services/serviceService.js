import Service from "../models/service.js";
import shopService from "./shopService.js";

const create = async (data, shopId) => {
  const service = await Service.create(data);
  return shopService.regService(shopId, service);
};
const getOne = () => {};
const getAll = () => {};
const getAllShopsWith = () => {};
const getAllInShop = () => {};
const edit = (id, data) => {
  return Service.findOneAndUpdate(
    { _id: id },
    { price: data.price, description: data.description },
    { runValidators: true }
  );
};
const del = async (id) => {
  const deletedService = await Service.findByIdAndDelete(id);
  return shopService.remService(deletedService.offeringShop, id);
};

const serviceService = {
  create,
  getOne,
  getAll,
  getAllInShop,
  getAllShopsWith,
  edit,
  del,
};

export default serviceService;
