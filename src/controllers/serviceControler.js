import { Router } from "express";
import serviceService from "../services/serviceService.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    let r = await serviceService.create(
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        offeringShop: req.body.shopId,
      },
      req.body.shopId
    );
    res.json(r);
    res.status(200).end();
  } catch (err) {
    res.json(err.message);
    res.status(400).end();
  }
});

export default router;
