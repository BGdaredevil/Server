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

router.patch("/details/:id", async (req, res) => {
  try {
    let tt = await serviceService.edit(req.params.id, req.body);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

router.patch("/:id", async (req, res) => {
  try {
    console.log(req.body);
    let tt = await serviceService.bookACar(req.params.id, req.body.car);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log(req.body);
    let tt = await serviceService.removeBooking(req.params.id, req.body);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let tt = await serviceService.del(req.params.id);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

export default router;
