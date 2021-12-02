import { Router } from "express";
import shopService from "../services/shopService.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    let r = await shopService.create({
      name: req.body.name,
      specification: req.body.specification,
      offeredServices: req.body.services,
      owner: req.body.owner,
    });
    res.json(r);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

router.get("/:id", async (req, res) => {
  try {
    let tt = await shopService.getAllOfUser(req.params.id);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    let tt = await shopService.getOne(req.params.id);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

router.patch("/details/:id", async (req, res) => {
  try {
    let tt = await shopService.edit(req.params.id, req.body);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let tt = await shopService.del(req.params.id);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

export default router;
