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

const accept = ({ comment, odometer, bookingId }) => {
  return Booking.findOneAndUpdate(
    { _id: bookingId },
    { state: "complete", comment, odometer },
    { runValidators: true, new: true }
  );
};

const reject = ({ bookingId }) => {
  return Booking.findOneAndUpdate(
    { _id: bookingId },
    { state: "rejected" },
    { runValidators: true, new: true }
  );
};

const countVoted = (shopId) => {
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
