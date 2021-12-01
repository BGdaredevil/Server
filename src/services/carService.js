import Car from "../models/car.js";

const create = (data) => {
  console.log("creating");
  return Car.create(data);
};

const getOne = (id) => {
  return Car.findById(id);
};

const getAllOfUser = (uid) => {
  return Car.find({ owner: uid }).lean();
};

const edit = (id, data) => {
  return Car.findOneAndUpdate({ _id: id }, data, { runValidators: true });
};

const del = (id) => {
  return Car.findByIdAndDelete(id);
};

const carService = { create, getOne, getAllOfUser, edit, del };

export default carService;
