import { Router } from "express";
import carService from "../services/carService.js";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    let tt = await carService.getAllOfUser(req.params.id);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    let tt = await carService.getOne(req.params.id);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let tt = await carService.del(req.params.id);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

router.post("/", async (req, res) => {
  try {
    const rr = await carService.create({
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      odometer: req.body.odometer,
      owner: req.body.owner,
    });
    console.log(rr);
    res.json({ pesho: "hello" });
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

export default router;
