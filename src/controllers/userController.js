import { Router } from "express";
import userService from "../services/userService.js";

const router = Router();

router.get("/:uid", async (req, res) => {
  try {
    const userData = await userService.getUserByUid(req.params.uid).lean();
    res.json(userData);
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const rr = await userService.create({
      username: req.body.username,
      accountType: req.body.accountType,
      firebaseUid: req.body.uid,
    });

    res.json({ pesho: "hello" });
    res.status(200).end();
  } catch (err) {
    res.json(err);
    res.status(400).end();
  }
});

export default router;
