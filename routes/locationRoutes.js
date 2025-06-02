import { Router } from "express";


const router = Router();
import { getLocations, searchLocation, addLocation } from "../controllers/locationController.js";

router.get("/get", getLocations);
router.get("/search", searchLocation);
router.post("/add", addLocation); // for admin use

export default router;