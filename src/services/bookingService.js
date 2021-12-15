import Booking from "../models/booking.js";

const create = (data) => {
  return Booking.create(data);
};

const getOne = (id) => {
  return Booking.findById(id);
};

const getAllOfUser = (uid) => {
  return Booking.find({ owner: uid }).lean();
};

const edit = (id, data) => {
  return Booking.findOneAndUpdate({ _id: id }, data, { runValidators: true });
};

const accept = ({ carId, serviceId, shopId, comment }) => {
  return Booking.findOneAndUpdate(
    { car: carId, vendor: shopId, service: serviceId },
    { state: "accepted", comment },
    { runValidators: true }
  );
};

const del = (id) => {
  return Booking.findByIdAndDelete(id);
};

const bookingService = { create, accept };

export default bookingService;
