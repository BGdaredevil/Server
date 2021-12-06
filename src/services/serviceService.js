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
const edit = () => {};
const del = () => {};

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
