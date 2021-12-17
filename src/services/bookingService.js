import Booking from "../models/booking.js";

const create = (data) => {
  return Booking.create(data);
};

const getOne = (id) => Booking.findById(id);
const getOneFullLean = (id) =>
  Booking.findById(id).populate("car").populate("vendor").populate("service").lean();

const getFeedbackStatus = (id) => Booking.findById(id).select("feedback").lean();

const getAllOfUser = (uid) => {
  return Booking.find({ owner: uid }).lean();
};

const addLegacyService = async (service) => {
  let ss = await service.toObject();
  return Booking.updateMany({ service: service._id }, { $set: { legacyService: ss } });
};

const getAllOfCar = (carId) => {
  return Booking.find({ car: carId }).populate("car").populate("vendor").populate("service").lean();
};

const edit = (id, data) => {
  return Booking.findOneAndUpdate({ _id: id }, data, { runValidators: true, new: true });
};

const accept = ({ carId, serviceId, shopId, comment }) => {
  return Booking.findOneAndUpdate(
    { car: carId, vendor: shopId, service: serviceId },
    { state: "complete", comment },
    { runValidators: true, new: true }
  );
};

const reject = ({ carId, serviceId, shopId }) => {
  return Booking.findOneAndUpdate(
    { car: carId, vendor: shopId, service: serviceId },
    { state: "rejected" },
    { runValidators: true, new: true }
  );
};

const countVoted = (bookingId, shopId) => {
  return Booking.where({ feedback: true, vendor: shopId }).count().lean();
};

const del = (id) => {
  return Booking.findByIdAndDelete(id);
};

const bookingService = {
  create,
  accept,
  reject,
  edit,
  getAllOfCar,
  addLegacyService,
  del,
  getOne,
  countVoted,
  getFeedbackStatus,
  getOneFullLean,
};

export default bookingService;
