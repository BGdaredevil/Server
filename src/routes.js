import { Router } from "express";
const router = Router();

import carController from "./controllers/carController.js";
import shopController from "./controllers/shopController.js";
import userController from "./controllers/userController.js";
import serviceController from "./controllers/serviceControler.js";

// * debug
router.use((req, res, next) => {
  console.log("\x1b[34m", ">>> " + req.method + " >>> " + req.url, "\x1b[0m");
  next();
});
// * debug

router.use("/car", carController);
router.use("/shop", shopController);
router.use("/user", userController);
router.use("/service", serviceController);

router.use("*", (req, res) => {
  console.log(req.body);
  res.write("Hello i am restfull API -- please use my endpoints correctly -- /user; -- /posts");
  res.end();
});

export default router;
