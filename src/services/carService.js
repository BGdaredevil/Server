import Car from "../models/car.js";

const create = (data) => {
  console.log("creating");
  return Car.create(data);
};

const getOne = (id) => {};

const getAllOfUser = (uid) => {
  return Car.find({ owner: uid }).lean();
};

const edit = () => {};

const del = () => {};

const carService = { create, getOne, getAllOfUser, edit, del };

export default carService;
