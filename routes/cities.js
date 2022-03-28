import { Router } from "express";
import * as citiesCtrl from "../controllers/cities.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

/* ----------- Public Routes ----------- */
router.get("/", citiesCtrl.index);

/* ----------- Private Routes ----------- */
router.use(decodeUserFromToken);
router.get("/:id", checkAuth ,citiesCtrl.show);
router.post("/", checkAuth, citiesCtrl.create);
router.put("/:id", checkAuth, citiesCtrl.update);
router.patch("/:cityId/:placeId", checkAuth, citiesCtrl.addPlace);
router.get("/:id/edit", checkAuth, citiesCtrl.edit);
router.delete("/:id/edit", checkAuth, citiesCtrl.delete);


export { router };
