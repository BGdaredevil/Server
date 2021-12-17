import Service from "../models/service.js";
import bookingService from "./bookingService.js";
import shopService from "./shopService.js";

const create = async (data, shopId) => {
  const service = await Service.create(data);
  return shopService.regService(shopId, service);
};
const getOne = () => {};
const getAll = () => {};
const getAllShopsWith = () => {};
const getAllInShop = () => {};

const bookACar = async (serviceId, carId) => {
  const service = await Service.findById(serviceId);
  service.bookings.push(carId);
  await service.updateOne({ $set: { bookings: service.bookings } });
  await bookingService.create({
    car: carId,
    feedback: false,
    state: "pending",
    vendor: service.offeringShop,
    service: serviceId,
  });
  return shopService.getOne(service.offeringShop);
};

const removeBooking = async (serviceId, booking) => {
  const service = await Service.findById(serviceId);
  service.bookings = service.bookings.filter((b) => b._id.toString() !== booking.car.toString());
  await service.updateOne({ $set: { bookings: service.bookings } });
  return bookingService.edit(booking._id, booking);
};

const edit = (id, data) => {
  return Service.findOneAndUpdate(
    { _id: id },
    { price: data.price, description: data.description },
    { runValidators: true }
  );
};

const del = async (id) => {
  const deletedService = await Service.findByIdAndDelete(id);
  await bookingService.addLegacyService(deletedService);
  return await shopService.remService(deletedService.offeringShop, id);
};

const serviceService = {
  create,
  getOne,
  getAll,
  getAllInShop,
  bookACar,
  getAllShopsWith,
  edit,
  del,
  removeBooking,
};

export default serviceService;
