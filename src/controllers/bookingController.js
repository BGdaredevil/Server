import { Router } from "express";
import bookingService from "../services/bookingService.js";
import carService from "../services/carService.js";
import serviceService from "../services/serviceService.js";

const router = Router();

router.post("/accept", async (req, res) => {
  try {
    let car = await carService.edit(req.body.carId, { odometer: req.body.odometer });
    let tt = await bookingService.accept({
      carId: req.body.carId,
      serviceId: req.body.serviceId,
      shopId: req.body.shopId,
      comment: req.body.comment,
      odometer: req.body.odometer,
    });
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

router.post("/reject", async (req, res) => {
  try {
    let tt = await bookingService.reject({
      carId: req.body.carId,
      serviceId: req.body.serviceId,
      shopId: req.body.shopId,
    });
    // let ss = await serviceService.removeBooking(req.body.serviceId, tt);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

router.get("/car/:carId", async (req, res) => {
  try {
    let tt = await bookingService.getAllOfCar(req.params.carId);
    // let ss = await serviceService.removeBooking(req.body.serviceId, tt);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let tt = await bookingService.del(req.params.id);
    console.log(tt);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

export default router;
