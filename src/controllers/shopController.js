import { Router } from "express";
import shopService from "../services/shopService.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    let r = await shopService.create({
      name: req.body.name,
      specification: req.body.specification,
      offeredServices: {
        notRegistered: req.body.services,
      },
      imageUrl: req.body.imageUrl,
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

router.put("/details/:id", async (req, res) => {
  try {
    let tt = await shopService.remSimpleService(req.params.id, req.body);
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

router.get("/shops/best", async (req, res) => {
  const { service } = req.query;
  try {
    let tt;
    if (service) {
      tt = await shopService.getAllWithService(service);
    } else {
      tt = await shopService.getBestThree();
    }
    // console.log(tt);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.json(err);
    res.status(400).end();
  }
});

router.get("/shops/:type", async (req, res) => {
  try {
    let tt = await shopService.getAllOfType(req.params.type);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

router.get("/voting/:keyWord/:bookingId/:shopId", async (req, res) => {
  try {
    let tt = await shopService.vote(req.params.bookingId, req.params.shopId, req.params.keyWord);
    res.json(tt);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

export default router;
