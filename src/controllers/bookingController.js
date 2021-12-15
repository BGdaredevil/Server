import { Router } from "express";
import bookingService from "../services/bookingService.js";

const router = Router();

router.post("/accept", async (req, res) => {
  try {
    let tt = await bookingService.accept({
      carId: req.body.carId,
      serviceId: req.body.serviceId,
      shopId: req.body.shopId,
      comment: req.body.comment,
    });
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

export default router;
